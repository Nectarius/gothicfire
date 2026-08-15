#!/usr/bin/env bash
# =============================================================================
# build-and-import.sh — Build Docker image and import into local K3s
# Usage: ./build-and-import.sh [image-tag]
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
IMAGE_TAG="${1:-gothicfire:latest}"

echo "🔨 Building Docker image: $IMAGE_TAG"
echo "   Context: $PROJECT_ROOT"
echo ""

cd "$PROJECT_ROOT"

# Build the multi-stage Docker image
docker build -t "$IMAGE_TAG" .

echo ""
echo "📦 Importing image into K3s containerd..."

# Export from Docker and import into K3s's containerd
docker save "$IMAGE_TAG" | sudo k3s ctr images import -

echo ""
echo "✅ Image '$IMAGE_TAG' is now available in K3s"
echo ""
echo "   Verify with: sudo k3s ctr images list | grep gothicfire"
echo ""
echo "   To force pods to pick up the new image:"
echo "   kubectl rollout restart deployment/gothicfire-app -n gothicfire"
