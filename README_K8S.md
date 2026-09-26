# Gothic Fire — Kubernetes (K3s) Deployment Guide

Complete step-by-step guide for deploying Gothic Fire along with its **Tactical AI & Advisor Agent** microservice to K3s for both **local development** and **production server** (with automated Let's Encrypt TLS).

---

## 🏗️ Architecture

- **`gothicfire-app`**: Ktor Netty backend + Kilua (Kotlin/JS) frontend bundled into a single fat JAR. Runs HTTP internally on port `8080` (behind reverse proxy).
- **`gothicfire-agent`**: Python FastAPI microservice running `qwen2.5-1.5b-instruct-q4_k_m.gguf` via `llama-cpp-python`. Runs on port `8000`.
- **`gothicfire-models-pvc`**: 5Gi PersistentVolumeClaim backing `/models` to persist the 1.1GB GGUF model across pod rollouts and restarts.
- **TLS Termination**: Handled at the edge by K3s Traefik Ingress Controller via cert-manager.
- **Kustomize Overlays**: Clean separation between `local` (port 5120 LoadBalancer) and `prod` (HTTPS Ingress for `gothiccastles.com`).

```
                              ┌─────────────────────────────────────┐
                              │     Internet / Web Client           │
                              └──────────────────┬──────────────────┘
                                                 │ HTTPS (:443)
                                                 ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ K3s Cluster (Namespace: gothicfire)                                          │
│                                                                              │
│   ┌────────────────────────────────────────────────────────┐                 │
│   │                 Traefik Ingress Controller             │                 │
│   │                 (TLS: gothiccastles.com)               │                 │
│   └────────────────────────────┬───────────────────────────┘                 │
│                                │ HTTP (:8080)                                │
│                                ▼                                             │
│   ┌────────────────────────────────────────────────────────┐                 │
│   │           Service & Deployment: gothicfire-app         │                 │
│   │                 (Game Application Backend)             │                 │
│   └─────────────────┬──────────────────────────────────────┘                 │
│                     │                                                        │
│                     │ HTTP (:8000)                                           │
│                     ▼                                                        │
│   ┌────────────────────────────────────────────────────────┐                 │
│   │          Service & Deployment: gothicfire-agent        │                 │
│   │            (Qwen2.5-1.5B Tactical & Advisor)           │                 │
│   └─────────────────┬──────────────────────────────────────┘                 │
│                     │ Volume Mount (/models)                                 │
│                     ▼                                                        │
│   ┌────────────────────────────────────────────────────────┐                 │
│   │     PVC: gothicfire-models-pvc (K3s local-path)        │                 │
│   └────────────────────────────────────────────────────────┘                 │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Kubernetes Directory Layout

```
k8s/
├── base/
│   ├── namespace.yaml           # Dedicated namespace 'gothicfire'
│   ├── agent-pvc.yaml           # 5Gi PersistentVolumeClaim for GGUF model storage
│   ├── agent-deployment.yaml    # Python AI agent deployment (resource requests/limits)
│   ├── agent-service.yaml       # ClusterIP service 'gothicfire-agent' on port 8000
│   ├── app-deployment.yaml      # Game application deployment
│   ├── app-service.yaml         # ClusterIP service 'gothicfire-app' on port 8080
│   └── kustomization.yaml       # Base resources aggregator
├── local/
│   ├── env-configmap.yaml       # Local config (APP_MODE=DEV, AI_AGENT_URL, port 5120 OAuth)
│   └── kustomization.yaml       # Patches app-service to LoadBalancer on port 5120
├── prod/
│   ├── env-configmap.yaml       # Production config (APP_MODE=PROD, BEHIND_REVERSE_PROXY=true)
│   ├── ingress.yaml             # Traefik Ingress routing gothiccastles.com
│   ├── cert-issuer.yaml         # cert-manager Let's Encrypt ClusterIssuer
│   ├── certificate.yaml         # TLS certificate definition for gothiccastles.com
│   └── kustomization.yaml       # Production overlay aggregator
└── scripts/
    ├── build-and-import.sh      # Builds both Docker images and imports to K3s containerd
    ├── create-secrets.sh        # Generates K8s secret from .env safely
    └── deploy.sh                # One-command build, secret, and apply orchestrator
```

---

## 💻 Server Requirements

- **OS**: Ubuntu 22.04 / 24.04 LTS or Debian 12 (x86_64)
- **CPU**: 2+ cores (4 cores recommended for fast AI turn inference)
- **RAM**: Minimum 4 GB (8 GB recommended):
  - `gothicfire-app`: ~512 MB – 1 GB JVM
  - `gothicfire-agent`: ~1.5 GB – 2.2 GB Resident Memory
  - K3s + OS: ~800 MB
- **Disk**: 20 GB free disk space (Docker build cache + 1.1 GB GGUF model + container images)

---

## 🌐 Full Production Deployment Walkthrough

### Step 1: Install K3s on the Server

SSH into your remote server as root or a user with sudo privileges:

```bash
# 1. Update system packages
sudo apt update && sudo apt install -y curl git jq

# 2. Install K3s (lightweight Kubernetes)
curl -sfL https://get.k3s.io | sh -

# 3. Configure kubectl for non-root user
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $USER:$USER ~/.kube/config
export KUBECONFIG=~/.kube/config

# 4. Verify node is Ready
kubectl get nodes
```

### Step 2: Install Docker (for building images locally)

```bash
# Install Docker Engine
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

### Step 3: Install cert-manager (via Helm)

cert-manager will automatically request and renew free SSL/TLS certificates from Let's Encrypt:

```bash
# 1. Install Helm 3
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# 2. Add Jetstack Helm repo
helm repo add jetstack https://charts.jetstack.io
helm repo update

# 3. Install cert-manager with Custom Resource Definitions (CRDs)
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set crds.enabled=true

# 4. Verify cert-manager pods are Running
kubectl get pods -n cert-manager
```

### Step 4: Configure DNS

Log into your domain DNS registrar and add an **A Record**:

| Type | Host | Target / Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `gothiccastles.com` | `YOUR_SERVER_PUBLIC_IP` | 300 (or automatic) |
| **A** | `www.gothiccastles.com` | `YOUR_SERVER_PUBLIC_IP` | 300 (or automatic) |

Verify resolution:
```bash
dig +short gothiccastles.com
```

### Step 5: Clone Project & Prepare `.env`

```bash
git clone https://github.com/your-org/gothicfire.git /opt/gothicfire
cd /opt/gothicfire

# Create production .env file
nano .env
```

Example production `.env`:
```env
APP_MODE=PROD
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=gothicfire

# AI Agent Settings
AI_AGENT_URL=http://gothicfire-agent:8000
USE_AI_AGENT=true
AUTO_DOWNLOAD_MODEL=true
AI_THREADS=4
AI_CTX=1024

# Social OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
```

### Step 6: Deploy Stack with One Command

Run the orchestrator script with `--build` and `--secrets`:

```bash
./k8s/scripts/deploy.sh prod --build --secrets
```

This single command automatically:
1. Builds `gothicfire:latest` (fat JAR with Netty + Kotlin/JS)
2. Builds `gothicfire-agent:latest` (FastAPI + llama-cpp)
3. Imports both images directly into K3s containerd
4. Generates Kubernetes Secret `gothicfire-secrets` from `.env`
5. Applies the `k8s/prod` overlay (PVC, deployments, services, ingress, certificate issuer)

---

## 🔍 Verification & Diagnostics

### 1. Check Pods Status

```bash
kubectl get pods -n gothicfire -w
```
Expected output:
```
NAME                                READY   STATUS    RESTARTS   AGE
gothicfire-agent-688df5549d-abcde   1/1     Running   0          45s
gothicfire-app-797746cb98-fghij     1/1     Running   0          45s
```

### 2. Inspect AI Agent Logs

```bash
kubectl logs -n gothicfire deployment/gothicfire-agent -f
```
You will see the model loading into memory:
```
[INFO] AiAgentServer: Loading GGUF model from /models/qwen2.5-1.5b-instruct-q4_k_m.gguf (n_ctx=1024, n_threads=4)...
[INFO] AiAgentServer: Model loaded successfully.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 3. Inspect Game Application Logs

```bash
kubectl logs -n gothicfire deployment/gothicfire-app -f
```
You will see:
```
[INFO] [Server] Running in PROD mode (Behind Proxy) on port 8080
[INFO] Initializing bot party with LLM AI Agent at http://gothicfire-agent:8000
```

### 4. Check TLS Certificate Status

```bash
kubectl get certificate -n gothicfire
kubectl describe certificate gothiccastles-com-tls -n gothicfire
```
When Let's Encrypt successfully challenges your domain, `READY` will turn to `True`.

### 5. Test Live Endpoints

```bash
# 1. Test HTTPS web app
curl -I https://gothiccastles.com

# 2. Test AI Agent internally via pod exec
kubectl exec -it -n gothicfire deployment/gothicfire-agent -- curl -s http://localhost:8000/health
```

---

## 🔄 Redeployment & Updates

Whenever you make changes to either the game code or the Python AI microservice:

```bash
# Rebuild and reload both pods with zero disruption
./k8s/scripts/build-and-import.sh
kubectl rollout restart deployment/gothicfire-app deployment/gothicfire-agent -n gothicfire

# Watch rollout
kubectl rollout status deployment/gothicfire-app -n gothicfire
kubectl rollout status deployment/gothicfire-agent -n gothicfire
```

---

## 🛠️ Model Storage Options

The AI Agent requires the GGUF model `qwen2.5-1.5b-instruct-q4_k_m.gguf` (1.1 GB).

### Option A: Automatic Download (Default)
When `AUTO_DOWNLOAD_MODEL="true"` is set in the Deployment env, the agent automatically downloads the model directly into the 5Gi PVC on its initial launch. Once downloaded, it is permanently cached in the PVC.

### Option B: Pre-populating the Host Storage
If you have pre-downloaded the model or want to avoid downloading on the server:
1. Find the volume path created by K3s `local-path`:
   ```bash
   ls -la /var/lib/rancher/k3s/storage/pvc-*_gothicfire_gothicfire-models-pvc/
   ```
2. Copy `qwen2.5-1.5b-instruct-q4_k_m.gguf` directly into that directory:
   ```bash
   cp /path/to/qwen2.5-1.5b-instruct-q4_k_m.gguf /var/lib/rancher/k3s/storage/pvc-*_gothicfire_gothicfire-models-pvc/
   ```
3. Restart the agent:
   ```bash
   kubectl rollout restart deployment/gothicfire-agent -n gothicfire
   ```

---

## ⚡ Performance Tuning

In `k8s/base/agent-deployment.yaml`, you can tune resource utilization based on your server capacity:

- **`AI_THREADS`**: Number of CPU cores used during LLM generation. Set to `2` for low-spec dual-core servers, or `4` to `8` for quad/octa-core VPS.
- **`AI_CTX`**: Context size in tokens. Defaults to `1024`. Keeps peak RAM strictly under 2 GB.
- **Resource Limits**:
  - `requests.memory`: `1536Mi`
  - `limits.memory`: `2560Mi`
  - `requests.cpu`: `500m`
  - `limits.cpu`: `2000m`
