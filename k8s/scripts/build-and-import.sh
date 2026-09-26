#!/usr/bin/env bash
# =============================================================================
# build-and-import.sh — Build Docker images and import into local/server K3s
# Usage: ./build-and-import.sh [app-image-tag] [agent-image-tag]
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
APP_IMAGE="${1:-gothicfire:latest}"
AGENT_IMAGE="${2:-gothicfire-agent:latest}"

echo "🔨 Building Gothic Fire Application: $APP_IMAGE"
echo "   Context: $PROJECT_ROOT"
cd "$PROJECT_ROOT"
docker build -t "$APP_IMAGE" -f Dockerfile .

echo ""
echo "🧠 Building Gothic Fire AI Agent: $AGENT_IMAGE"
docker build -t "$AGENT_IMAGE" -f agent/Dockerfile .

echo ""
echo "📦 Importing images into K3s containerd..."
docker save "$APP_IMAGE" | sudo k3s ctr images import -
docker save "$AGENT_IMAGE" | sudo k3s ctr images import -

echo ""
echo "✅ Images '$APP_IMAGE' and '$AGENT_IMAGE' are now available in K3s"
echo ""
echo "   Verify with: sudo k3s ctr images list | grep gothicfire"
echo ""
echo "   To force pods to pick up new images:"
echo "   kubectl rollout restart deployment/gothicfire-app deployment/gothicfire-agent -n gothicfire"
