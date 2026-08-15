# Gothic Fire — Kubernetes (K3s) Deployment Guide

Complete guide for deploying Gothic Fire to K3s for both **local development** (Linux Mint) and **production** (single Linux server with TLS).

---

## 📋 Architecture

- **Single container**: Backend (Ktor) + Frontend (Kotlin/JS) bundled in one fat JAR
- **TLS termination**: Handled by Traefik Ingress (not the app) — app always runs HTTP on port 8080 internally
- **Database**: MongoDB 7.0 with persistent storage via K3s `local-path` provisioner
- **Overlays**: Kustomize manages `local` vs `prod` configuration differences

```
k8s/
├── base/         # Shared: Deployments, Services, PVC
├── local/        # Local: HTTP Ingress (gothicfire.local)
├── prod/         # Prod: HTTPS Ingress + cert-manager (gothiccastles.com)
└── scripts/      # Helpers: build, secrets, deploy
```

---

## 🔧 Prerequisites

### Install K3s

```bash
# Install K3s (lightweight Kubernetes)
curl -sfL https://get.k3s.io | sh -

# Verify installation
sudo k3s kubectl get nodes

# Set up kubectl shortcut (optional but recommended)
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $USER:$USER ~/.kube/config
export KUBECONFIG=~/.kube/config

# Verify kubectl works without sudo
kubectl get nodes
```

### Install kubectl (if not bundled)

```bash
sudo apt install -y kubectl
# Or use the K3s built-in: sudo k3s kubectl ...
```

### Install k9s (optional, great for debugging)

```bash
# Via snap
sudo snap install k9s

# Or download binary
curl -sS https://webi.sh/k9s | sh
```

### Install Helm (needed for cert-manager in prod)

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

---

## 🏠 Environment 1: Local Development

### Step 1: Build & Import Docker Image into K3s

```bash
# Option A: Use the helper script
./k8s/scripts/build-and-import.sh

# Option B: Manual commands
docker build -t gothicfire:latest .
docker save gothicfire:latest | sudo k3s ctr images import -

# Verify image is available in K3s
sudo k3s ctr images list | grep gothicfire
```

### Step 2: Create Secrets from .env

```bash
# Uses your project's .env file
./k8s/scripts/create-secrets.sh

# Or specify a custom .env path
./k8s/scripts/create-secrets.sh /path/to/custom/.env
```

### Step 3: Deploy to Local K3s

```bash
# Option A: One-command deploy (build + secrets + apply)
./k8s/scripts/deploy.sh local --build --secrets

# Option B: Apply manifests only (if image and secrets already exist)
kubectl apply -k k8s/local/
```

### Step 4: Access the App

K3s will automatically expose port 5120 on your host machine.

### Step 5: Verify

```bash
# Check all resources
kubectl get all -n gothicfire

# Check pods are running
kubectl get pods -n gothicfire -w

# View app logs
kubectl logs -n gothicfire deployment/gothicfire-app -f
```

Open your browser: **http://localhost:5120**

### Redeployment (after code changes)

```bash
# Rebuild image and restart pod
./k8s/scripts/build-and-import.sh
kubectl rollout restart deployment/gothicfire-app -n gothicfire

# Watch rollout progress
kubectl rollout status deployment/gothicfire-app -n gothicfire
```

---

## 🌐 Environment 2: Production Server

### Step 1: Install K3s on Production Server

```bash
# SSH into your production server
ssh user@your-server-ip

# Install K3s
curl -sfL https://get.k3s.io | sh -

# Set up kubectl
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $USER:$USER ~/.kube/config
```

### Step 2: Install cert-manager

```bash
# Add the Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io
helm repo update

# Install cert-manager with CRDs
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set crds.enabled=true

# Verify cert-manager is running
kubectl get pods -n cert-manager
```

### Step 3: Configure DNS

Point your domain's **A record** to your server's public IP:

| Record Type | Host              | Value            |
|:------------|:------------------|:-----------------|
| A           | `gothiccastles.com`   | `YOUR_SERVER_IP` |

### Step 4: Build, Import & Deploy

```bash
# Clone the repo on your server (or copy files)
cd /path/to/gothicfire

# Full deploy: build + secrets + apply prod overlay
./k8s/scripts/deploy.sh prod --build --secrets
```

### Step 5: Verify TLS Certificate

```bash
# Check certificate status
kubectl get certificate -n gothicfire
kubectl describe certificate gothiccastles.com-tls -n gothicfire

# Check the cert-manager logs if issues
kubectl logs -n cert-manager deployment/cert-manager -f
```

Open your browser: **https://gothiccastles.com**

### Step 6 (Optional): Test with Staging Certs First

To avoid Let's Encrypt rate limits while testing, switch to the staging issuer:

1. In `k8s/prod/ingress.yaml`, change `letsencrypt-prod` → `letsencrypt-staging`
2. Re-apply: `kubectl apply -k k8s/prod/`
3. The certificate will be untrusted (staging) but confirms the flow works
4. Switch back to `letsencrypt-prod` and re-apply for a real certificate

---

## 🛠️ Common kubectl & Debugging Commands

### Inspection

```bash
# List all resources in namespace
kubectl get all -n gothicfire

# Describe a pod (for troubleshooting)
kubectl describe pod -n gothicfire <pod-name>

# Get pod events (useful for crash loops)
kubectl get events -n gothicfire --sort-by=.metadata.creationTimestamp
```

### Logs

```bash
# App logs (follow)
kubectl logs -n gothicfire deployment/gothicfire-app -f

# MongoDB logs
kubectl logs -n gothicfire deployment/mongo -f

# Previous container logs (if pod restarted)
kubectl logs -n gothicfire deployment/gothicfire-app --previous
```

### Interactive Debugging

```bash
# Shell into the app container
kubectl exec -it -n gothicfire deployment/gothicfire-app -- /bin/bash

# Shell into MongoDB
kubectl exec -it -n gothicfire deployment/mongo -- mongosh

# Use k9s for interactive dashboard
k9s -n gothicfire
```

### Scaling & Restart

```bash
# Restart a deployment (picks up new image)
kubectl rollout restart deployment/gothicfire-app -n gothicfire

# Scale up/down
kubectl scale deployment/gothicfire-app -n gothicfire --replicas=2

# Check rollout status
kubectl rollout status deployment/gothicfire-app -n gothicfire
```

### Cleanup

```bash
# Delete all resources (preserves PVC data)
kubectl delete -k k8s/local/
# or
kubectl delete -k k8s/prod/

# Delete PVC too (WARNING: wipes MongoDB data)
kubectl delete pvc mongo-data -n gothicfire

# Delete the namespace entirely
kubectl delete namespace gothicfire
```

---

## ⚙️ Environment Variables

| Source | Variable | Description |
|:-------|:---------|:------------|
| ConfigMap | `APP_MODE` | Always `DEV` in K8s (Traefik handles TLS) |
| ConfigMap | `MONGODB_URI` | Points to in-cluster MongoDB service |
| ConfigMap | `MONGODB_DB` | Database name (`gothicfire`) |
| ConfigMap | `GOOGLE_REDIRECT_URI` | OAuth callback URL (varies by env) |
| ConfigMap | `TWITTER_CALLBACK_URL` | OAuth callback URL (varies by env) |
| Secret | `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| Secret | `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
| Secret | `TWITTER_CLIENT_ID` | Twitter OAuth Client ID |
| Secret | `TWITTER_CLIENT_SECRET` | Twitter OAuth Client Secret |

---

## 🔑 Secrets Management

**Never commit secrets to Git.** The `create-secrets.sh` script reads your local `.env` file and creates a Kubernetes Secret object.

```bash
# Create/update secrets
./k8s/scripts/create-secrets.sh

# View existing secrets (base64 encoded)
kubectl get secret gothicfire-secrets -n gothicfire -o yaml

# Decode a specific value
kubectl get secret gothicfire-secrets -n gothicfire -o jsonpath='{.data.GOOGLE_CLIENT_ID}' | base64 -d
```
