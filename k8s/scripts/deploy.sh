#!/usr/bin/env bash
# =============================================================================
# deploy.sh — One-command deployment orchestrator
# Usage: ./deploy.sh <local|prod> [--build] [--secrets]
#
# Examples:
#   ./deploy.sh local --build --secrets   # Full fresh deploy
#   ./deploy.sh local                     # Apply manifests only
#   ./deploy.sh prod --build              # Build + deploy to prod
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Parse arguments
ENV="${1:-}"
DO_BUILD=false
DO_SECRETS=false

shift || true
for arg in "$@"; do
    case "$arg" in
        --build)   DO_BUILD=true ;;
        --secrets) DO_SECRETS=true ;;
        *)         echo "❌ Unknown option: $arg"; exit 1 ;;
    esac
done

if [[ "$ENV" != "local" && "$ENV" != "prod" ]]; then
    echo "❌ Usage: $0 <local|prod> [--build] [--secrets]"
    echo ""
    echo "   Environments:"
    echo "     local  — Local K3s with HTTP (localhost:5120)"
    echo "     prod   — Production K3s with TLS (gothiccastles.com)"
    echo ""
    echo "   Flags:"
    echo "     --build    Build Docker image and import into K3s"
    echo "     --secrets  Create/update K8s secrets from .env"
    exit 1
fi

echo "🚀 Deploying Gothic Fire to K3s ($ENV)"
echo "========================================="
echo ""

# Step 1: Build and import image
if $DO_BUILD; then
    echo "📦 Step 1: Building and importing Docker image..."
    bash "$SCRIPT_DIR/build-and-import.sh"
    echo ""
else
    echo "⏭️  Step 1: Skipping build (use --build to include)"
fi

# Step 2: Create secrets from .env
if $DO_SECRETS; then
    echo "🔐 Step 2: Creating secrets from .env..."
    bash "$SCRIPT_DIR/create-secrets.sh"
    echo ""
else
    echo "⏭️  Step 2: Skipping secrets (use --secrets to include)"
fi

# Step 3: Apply Kustomize overlay
echo "📋 Step 3: Applying Kustomize overlay (k8s/$ENV)..."
kubectl apply -k "$PROJECT_ROOT/k8s/$ENV"

echo ""
echo "========================================="
echo "✅ Deployment complete!"
echo ""
echo "   Check pods:    kubectl get pods -n gothicfire"
echo "   Check ingress: kubectl get ingress -n gothicfire"
echo "   View logs:     kubectl logs -n gothicfire deployment/gothicfire-app -f"
echo ""

if [[ "$ENV" == "local" ]]; then
    echo "🌐 Local access:"
    echo "   1. Open: http://localhost:5120"
elif [[ "$ENV" == "prod" ]]; then
    echo "🌐 Production access:"
    echo "   1. Ensure DNS A record for gothiccastles.com → server IP"
    echo "   2. Open: https://gothiccastles.com"
    echo ""
    echo "   Check TLS certificate:"
    echo "   kubectl get certificate -n gothicfire"
    echo "   kubectl describe certificate gothiccastles-com-tls -n gothicfire"
fi
