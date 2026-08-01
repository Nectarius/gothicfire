import cv2
import numpy as np
import json
import os

def process_map(image_path, output_path):
    print(f"Loading image from {image_path}...")
    img = cv2.imread(image_path)
    
    if img is None:
        print(f"Error: Could not load image at {image_path}. Please check the path.")
        return

    # 1. Convert to HSV color space
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Comments explaining the HSV bounds:
    # In OpenCV, Hue has a range of [0, 179]. Red color wraps around the 0/180 hue boundary.
    # Therefore, we need to capture two ranges for red:
    # - Lower Red: Hue 0 to 10
    # - Upper Red: Hue 170 to 179
    # Saturation (S) and Value (V) are set to [70, 255] and [50, 255] respectively to 
    # exclude white/gray/black and dark/desaturated pixels.
    
    lower_red1 = np.array([0, 70, 50])
    upper_red1 = np.array([10, 255, 255])
    mask1 = cv2.inRange(hsv, lower_red1, upper_red1)

    lower_red2 = np.array([170, 70, 50])
    upper_red2 = np.array([180, 255, 255])
    mask2 = cv2.inRange(hsv, lower_red2, upper_red2)

    # Combine both red masks
    red_mask = cv2.bitwise_or(mask1, mask2)

    # 2. Morphological operations to close small gaps
    # We use Morphological Closing (Dilation followed by Erosion) to fill small holes and gaps in the red lines.
    kernel = np.ones((5, 5), np.uint8)
    closed_mask = cv2.morphologyEx(red_mask, cv2.MORPH_CLOSE, kernel, iterations=2)

    # Invert mask so territories are white (255) and borders are black (0)
    # Background might also become white depending on borders, so contour size filters handle it.
    inverted_mask = cv2.bitwise_not(closed_mask)

    # 3. Find Contours
    # RETR_CCOMP retrieves all of the contours and organizes them into a two-level hierarchy.
    contours, hierarchy = cv2.findContours(inverted_mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)

    territories = []
    territory_masks = {}
    territory_id = 0

    image_area = img.shape[0] * img.shape[1]
    
    for i, contour in enumerate(contours):
        area = cv2.contourArea(contour)
        
        # Ignore regions that are too small (noise) or too large (the bounding box of the whole image/background)
        if area < 1000 or area > image_area * 0.8:
            continue

        # 4. Calculate Centroid using image moments
        M = cv2.moments(contour)
        if M["m00"] != 0:
            cX = int(M["m10"] / M["m00"])
            cY = int(M["m01"] / M["m00"])
        else:
            # Fallback
            x, y, w, h = cv2.boundingRect(contour)
            cX = x + w // 2
            cY = y + h // 2

        # Create a filled mask of this specific territory for adjacency calculation later
        t_mask = np.zeros(inverted_mask.shape, dtype=np.uint8)
        cv2.drawContours(t_mask, [contour], -1, 255, thickness=cv2.FILLED)
        territory_masks[territory_id] = t_mask
        
        territories.append({
            "id": territory_id,
            "centroid": [cX, cY],
            "adjacent_territory_ids": []
        })
        territory_id += 1

    print(f"Detected {len(territories)} valid territories. Calculating adjacencies...")

    # 5. Determine adjacency
    # Two territories are adjacent if their masks, when slightly expanded, overlap.
    # The expansion needs to bridge across the red border line separating them.
    # We dilate by a larger kernel (e.g., 15x15) assuming border width is less than 15 pixels.
    # Adjust this kernel size (iterations) if your red lines are exceptionally thick.
    adjacency_kernel = np.ones((15, 15), np.uint8)
    
    for i in range(len(territories)):
        # Dilate territory A's mask
        mask_i_dilated = cv2.dilate(territory_masks[i], adjacency_kernel, iterations=2)
        
        for j in range(i + 1, len(territories)):
            # Check overlap between dilated territory A and territory B
            mask_j = territory_masks[j]
            overlap = cv2.bitwise_and(mask_i_dilated, mask_j)
            
            if cv2.countNonZero(overlap) > 0:
                territories[i]["adjacent_territory_ids"].append(j)
                territories[j]["adjacent_territory_ids"].append(i)

    # 6. Export to JSON
    with open(output_path, 'w') as f:
        json.dump(territories, f, indent=4)
        
    print(f"Success! Data exported to {output_path}")

if __name__ == "__main__":
    # Uses the map provided in the workspace context or falls back to 'map_1.jpg'
    input_image = "gothic_fire_map.png" if os.path.exists("gothic_fire_map.png") else "map_1.jpg"
    output_json = "map_data.json"
    
    process_map(input_image, output_json)
