#!/usr/bin/env bash
# =============================================================================
# create-secrets.sh — Generate Kubernetes Secrets from .env file
# Usage: ./create-secrets.sh [path-to-env-file]
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
ENV_FILE="${1:-$PROJECT_ROOT/.env}"
NAMESPACE="gothicfire"

if [[ ! -f "$ENV_FILE" ]]; then
    echo "❌ Error: .env file not found at: $ENV_FILE"
    echo "   Usage: $0 [path-to-env-file]"
    exit 1
fi

echo "📦 Creating Kubernetes secret 'gothicfire-secrets' from: $ENV_FILE"
echo "   Namespace: $NAMESPACE"
echo ""

# Parse .env and extract only secret-worthy values
# (non-sensitive config goes in ConfigMap, not here)
declare -A SECRETS
while IFS= read -r line; do
    # Skip blank lines and comments
    [[ -z "$line" || "$line" =~ ^# ]] && continue
    key="${line%%=*}"
    value="${line#*=}"
    # Trim whitespace
    key="$(echo "$key" | xargs)"
    value="$(echo "$value" | xargs)"

    case "$key" in
        GOOGLE_CLIENT_ID|GOOGLE_CLIENT_SECRET|\
        TWITTER_CLIENT_ID|TWITTER_CLIENT_SECRET|\
        MONGODB_URI)
            SECRETS["$key"]="$value"
            echo "   ✅ $key = ${value:0:10}..."
            ;;
        *)
            # Skip non-secret values (they go in ConfigMap)
            ;;
    esac
done < "$ENV_FILE"

if [[ ${#SECRETS[@]} -eq 0 ]]; then
    echo "⚠️  No secret values found in .env file."
    exit 1
fi

# Ensure namespace exists
kubectl get namespace "$NAMESPACE" &>/dev/null || \
    kubectl create namespace "$NAMESPACE"

# Build the kubectl command
CMD="kubectl create secret generic gothicfire-secrets -n $NAMESPACE"
for key in "${!SECRETS[@]}"; do
    # Escape the value safely so special characters like '&' don't break the eval command
    escaped_value=$(printf '%q' "${SECRETS[$key]}")
    CMD+=" --from-literal=$key=$escaped_value"
done
CMD+=" --dry-run=client -o yaml | kubectl apply -f -"

echo ""
echo "🔐 Applying secret..."
eval "$CMD"

echo ""
echo "✅ Secret 'gothicfire-secrets' created/updated in namespace '$NAMESPACE'"
echo ""
echo "   Verify with: kubectl get secret gothicfire-secrets -n $NAMESPACE -o yaml"
