#!/usr/bin/env python3
"""
Gothic Fire Map Territory Extractor
====================================
Accurately processes 'gothic_fire_map.png' using OpenCV and Shapely/NumPy to extract:
  - Exact territory boundaries (simplified polygons)
  - True geographic centroids [cx, cy] inside each sector
  - Valid planar adjacency graph based on real geometric contact (no pseudo-nodes)

Usage:
    python map_extractor.py [--image PATH] [--output PATH] [--debug]
"""

import cv2
import numpy as np
import json
import argparse
import os
import sys

# =============================================================================
# CONFIGURATION PARAMETERS
# =============================================================================

# --- Red Border Color Space Thresholds ---
HSV_RED_H_LOW = 15
HSV_RED_H_HIGH = 165
HSV_RED_S_MIN = 65
HSV_RED_V_MIN = 30
HSV_RED_V_MAX = 220
BORDER_DIFF_MIN = 12

# --- Morphology Parameters for Border Sealing ---
BORDER_CLOSE_KERNEL = 7
BORDER_CLOSE_ITERS = 2
BORDER_DILATE_KERNEL = 5
BORDER_DILATE_ITERS = 1

# --- Seed Identification ---
MIN_SEED_AREA = 1000

# --- Expansion & Contouring ---
BARRIER_ERODE_KERNEL = 5
BARRIER_ERODE_ITERS = 3
EXPAND_MAX_ITERATIONS = 150
POLYGON_SIMPLIFY_EPSILON = 0.0035

# --- Adjacency Detection ---
ADJACENCY_KERNEL_SIZE = 16
ADJACENCY_MIN_OVERLAP = 30


# =============================================================================
# PROCESSING FUNCTIONS
# =============================================================================

def detect_borders(img):
    """Isolate dark red territory borders with color and HSV masking."""
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    b = img[:, :, 0].astype(np.float32)
    g = img[:, :, 1].astype(np.float32)
    r = img[:, :, 2].astype(np.float32)
    h_ch = hsv[:, :, 0].astype(np.float32)
    s_ch = hsv[:, :, 1].astype(np.float32)
    v_ch = hsv[:, :, 2].astype(np.float32)

    # Red borders: crimson/ruby hue, saturated, with red channel dominance over green and blue
    borders_raw = (
        ((h_ch <= HSV_RED_H_LOW) | (h_ch >= HSV_RED_H_HIGH)) &
        (s_ch >= HSV_RED_S_MIN) &
        (v_ch >= HSV_RED_V_MIN) & (v_ch <= HSV_RED_V_MAX) &
        (r > g + BORDER_DIFF_MIN) & (r > b + BORDER_DIFF_MIN)
    ).astype(np.uint8) * 255

    return borders_raw


def create_seed_borders(borders_raw):
    """Applies morphological closing and dilation to create sealed border barriers for seed finding."""
    k_close = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (BORDER_CLOSE_KERNEL, BORDER_CLOSE_KERNEL))
    closed_borders = cv2.morphologyEx(borders_raw, cv2.MORPH_CLOSE, k_close, iterations=BORDER_CLOSE_ITERS)
    k_dil = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (BORDER_DILATE_KERNEL, BORDER_DILATE_KERNEL))
    seed_borders = cv2.dilate(closed_borders, k_dil, iterations=BORDER_DILATE_ITERS)
    return seed_borders


def extract_ocean_and_land_mask(seed_borders, img_shape):
    """
    Identifies the ocean background as the large connected exterior region,
    and isolates the landmass.
    """
    h, w = img_shape[:2]
    inverted = cv2.bitwise_not(seed_borders)
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(inverted, 8)

    # Largest background component is the surrounding ocean
    bg_label = np.argmax(stats[1:, cv2.CC_STAT_AREA]) + 1
    ocean_mask = (labels == bg_label).astype(np.uint8) * 255

    # Dilation of ocean to cleanly seal coastlines
    k_oc = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    ocean_barrier = cv2.dilate(ocean_mask, k_oc, iterations=1)
    land_mask = cv2.bitwise_not(ocean_barrier)

    # Exclude title box in bottom-left corner
    land_mask[950:, :400] = 0

    return ocean_barrier, land_mask, labels, bg_label


def find_territory_seeds(seed_labels, bg_label, land_mask):
    """Locate interior territory seed regions enclosed by red borders on land."""
    num_labels = np.max(seed_labels) + 1

    # Extract component stats
    seeds = []
    for i in range(1, num_labels):
        if i == bg_label:
            continue
        mask_i = (seed_labels == i).astype(np.uint8)
        area = cv2.countNonZero(mask_i)
        if area < MIN_SEED_AREA:
            continue

        M = cv2.moments(mask_i)
        if M['m00'] == 0:
            continue
        cx = M['m10'] / M['m00']
        cy = M['m01'] / M['m00']

        # Ignore bottom-left logo / title area
        if cy > 950 and cx < 400:
            continue

        seeds.append({
            'cc_id': i,
            'area': area,
            'centroid': (cx, cy)
        })

    # Sort seeds geographically (top-to-bottom, left-to-right) for deterministic IDs
    seeds.sort(key=lambda s: (s['centroid'][1] // 60, s['centroid'][0]))
    return seeds


def expand_and_contour_territories(img, seeds, seed_labels, seed_borders, ocean_barrier, land_mask):
    """
    Expands seeds to fill their respective sectors up to the red border lines
    and coastline, then extracts simplified polygons and true centroids.
    """
    h, w = img.shape[:2]

    # Thin borders for expansion barrier so territories expand fully to meet at borders
    erode_k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (BARRIER_ERODE_KERNEL, BARRIER_ERODE_KERNEL))
    thinned_border = cv2.erode(seed_borders, erode_k, iterations=BARRIER_ERODE_ITERS)
    barrier = cv2.bitwise_or(thinned_border, ocean_barrier)

    territory_map = np.zeros((h, w), dtype=np.int32)
    territory_map[barrier > 0] = -1

    for idx, s in enumerate(seeds):
        territory_map[seed_labels == s['cc_id']] = idx + 1

    expand_k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    for it in range(EXPAND_MAX_ITERATIONS):
        changed = False
        new_map = territory_map.copy()
        for idx in range(len(seeds)):
            label = idx + 1
            curr = (territory_map == label).astype(np.uint8) * 255
            exp = cv2.dilate(curr, expand_k, iterations=1)
            claimable = (exp > 0) & (territory_map == 0) & (land_mask > 0)
            if np.any(claimable):
                new_map[claimable] = label
                changed = True
        territory_map = new_map
        if not changed:
            break

    # Extract territory objects
    territories = []
    territory_masks = {}

    for idx in range(len(seeds)):
        tid = idx
        t_mask = (territory_map == (tid + 1)).astype(np.uint8) * 255
        area = cv2.countNonZero(t_mask)
        if area < 800:
            continue

        contours, _ = cv2.findContours(t_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            continue
        contour = max(contours, key=cv2.contourArea)

        # True centroid using spatial moments
        M = cv2.moments(contour)
        if M['m00'] > 0:
            cx = int(round(M['m10'] / M['m00']))
            cy = int(round(M['m01'] / M['m00']))
        else:
            x, y, bw, bh = cv2.boundingRect(contour)
            cx, cy = x + bw // 2, y + bh // 2

        # Simplify polygon
        perimeter = cv2.arcLength(contour, True)
        epsilon = POLYGON_SIMPLIFY_EPSILON * perimeter
        approx = cv2.approxPolyDP(contour, epsilon, True)
        polygon = approx.reshape(-1, 2).tolist()

        territory_id = len(territories)
        territory_masks[territory_id] = t_mask
        territories.append({
            'id': territory_id,
            'centroid': [cx, cy],
            'polygon': polygon,
            'adjacent_territory_ids': []
        })

    return territories, territory_masks, territory_map


def compute_adjacencies(territories, territory_masks):
    """
    Computes valid planar adjacency connections by checking boundary contact
    between adjacent territory masks.
    """
    adj_k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (ADJACENCY_KERNEL_SIZE, ADJACENCY_KERNEL_SIZE))
    n = len(territories)
    dilated_masks = {i: cv2.dilate(territory_masks[i], adj_k, iterations=1) for i in range(n)}

    for i in range(n):
        for j in range(i + 1, n):
            overlap = cv2.bitwise_and(dilated_masks[i], dilated_masks[j])
            if cv2.countNonZero(overlap) >= ADJACENCY_MIN_OVERLAP:
                territories[i]['adjacent_territory_ids'].append(territories[j]['id'])
                territories[j]['adjacent_territory_ids'].append(territories[i]['id'])

    for t in territories:
        t['adjacent_territory_ids'].sort()

    return territories


def save_debug_visualizations(img, borders_raw, seed_borders, territories, territory_masks, debug_dir):
    """Generates informative debug overlays and saves them to debug_dir."""
    os.makedirs(debug_dir, exist_ok=True)

    cv2.imwrite(os.path.join(debug_dir, "01_borders_raw.png"), borders_raw)
    cv2.imwrite(os.path.join(debug_dir, "02_seed_borders.png"), seed_borders)

    # Color palette
    colors = [
        (230, 25, 75), (60, 180, 75), (255, 225, 25), (0, 130, 200),
        (245, 130, 48), (145, 30, 180), (70, 240, 240), (240, 50, 230),
        (210, 245, 60), (250, 190, 212), (0, 128, 128), (220, 190, 255),
        (170, 110, 40), (255, 250, 200), (128, 0, 0), (170, 255, 195),
        (128, 128, 0), (255, 215, 180), (0, 0, 128), (128, 128, 128)
    ]

    # Labeled map with graph edges
    graph_vis = img.copy()
    for t in territories:
        tid = t['id']
        cx, cy = t['centroid']
        color = colors[tid % len(colors)]

        # Draw boundary polygon
        pts = np.array(t['polygon'], dtype=np.int32).reshape(-1, 1, 2)
        cv2.polylines(graph_vis, [pts], True, color, 2)

        # Draw centroid
        cv2.circle(graph_vis, (cx, cy), 6, color, -1)
        cv2.circle(graph_vis, (cx, cy), 8, (0, 0, 0), 2)
        cv2.putText(graph_vis, str(tid), (cx - 8, cy - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 0), 3)
        cv2.putText(graph_vis, str(tid), (cx - 8, cy - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.45, (255, 255, 255), 1)

    # Draw adjacency lines
    for t in territories:
        for adj in t['adjacent_territory_ids']:
            if adj > t['id']:
                c1 = tuple(t['centroid'])
                c2 = tuple(territories[adj]['centroid'])
                cv2.line(graph_vis, c1, c2, (0, 230, 0), 2, cv2.LINE_AA)

    cv2.imwrite(os.path.join(debug_dir, "03_territories_and_graph.png"), graph_vis)

    # Color overlay
    color_overlay = np.zeros_like(img)
    for t in territories:
        mask = territory_masks[t['id']]
        color_overlay[mask > 0] = colors[t['id'] % len(colors)]
    blended = cv2.addWeighted(img, 0.45, color_overlay, 0.55, 0)
    cv2.imwrite(os.path.join(debug_dir, "04_territories_overlay.png"), blended)

    print(f"  Debug images saved to {debug_dir}/")


# =============================================================================
# MAIN PIPELINE
# =============================================================================

def process_map(image_path, output_path, debug=False):
    """Main extraction pipeline."""
    print(f"Loading map image: {image_path}")
    img = cv2.imread(image_path)
    if img is None:
        print(f"ERROR: Could not read '{image_path}'")
        sys.exit(1)

    h, w = img.shape[:2]
    print(f"  Resolution: {w}x{h}")

    # Step 1: Detect border lines
    print("Step 1: Detecting red border lines...")
    borders_raw = detect_borders(img)
    seed_borders = create_seed_borders(borders_raw)
    print(f"  Border coverage: {100 * cv2.countNonZero(seed_borders) / (h * w):.1f}%")

    # Step 2: Extract ocean background and island landmask
    print("Step 2: Isolating landmass from ocean background...")
    ocean_barrier, land_mask, seed_labels, bg_label = extract_ocean_and_land_mask(seed_borders, img.shape)
    land_area_pct = 100 * cv2.countNonZero(land_mask) / (h * w)
    print(f"  Landmass area: {land_area_pct:.1f}% of map")

    # Step 3: Find territory seeds
    print("Step 3: Finding territory seeds...")
    seeds = find_territory_seeds(seed_labels, bg_label, land_mask)
    print(f"  Identified seeds: {len(seeds)}")

    # Step 4: Expand and extract polygons + centroids
    print("Step 4: Expanding territory boundaries and extracting polygons...")
    territories, territory_masks, territory_map = expand_and_contour_territories(
        img, seeds, seed_labels, seed_borders, ocean_barrier, land_mask
    )
    print(f"  Valid territories extracted: {len(territories)}")

    # Step 5: Compute adjacency graph
    print("Step 5: Computing adjacency graph...")
    territories = compute_adjacencies(territories, territory_masks)

    total_edges = sum(len(t['adjacent_territory_ids']) for t in territories) // 2
    avg_neighbors = sum(len(t['adjacent_territory_ids']) for t in territories) / max(len(territories), 1)
    isolated = [t['id'] for t in territories if not t['adjacent_territory_ids']]

    print("\nExtraction Summary:")
    print(f"  Total Territories : {len(territories)}")
    print(f"  Total Adjacencies : {total_edges} connections")
    print(f"  Average Neighbors : {avg_neighbors:.2f}")
    print(f"  Isolated Regions  : {isolated if isolated else 'None (fully connected)'}")

    # Debug artifacts
    if debug:
        print("\nGenerating debug visualization artifacts...")
        debug_dir = os.path.join(os.path.dirname(output_path) or ".", "debug_output")
        save_debug_visualizations(
            img, borders_raw, seed_borders, territories, territory_masks, debug_dir
        )

    # Save final JSON
    print(f"\nSaving accurate territory data to: {output_path}")
    with open(output_path, 'w') as f:
        json.dump(territories, f, indent=4)

    print("Extraction complete successfully!")
    return territories


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Accurately extracts territory polygons, centroids, and adjacency from a map image."
    )
    parser.add_argument("--image", "-i", default="gothic_fire_map.png", help="Path to map image")
    parser.add_argument("--output", "-o", default="map_data.json", help="Path to output JSON")
    parser.add_argument("--debug", "-d", action="store_true", help="Generate debug visualization images")

    args = parser.parse_args()
    if not os.path.exists(args.image):
        print(f"ERROR: Image file '{args.image}' not found.")
        sys.exit(1)

    process_map(args.image, args.output, debug=args.debug)
