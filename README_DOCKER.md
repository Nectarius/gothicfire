# Gothic Fire - Docker & Server Deployment Guide

This guide explains how to build, configure, and run **Gothic Fire** along with its **Tactical AI & Advisor Agent** microservice on your server or local environment using Docker and Docker Compose.

---

## 🏗️ Architecture Overview

The system consists of three interconnected containerized services:

1. **`gothicfire-app`** (Port `8080` HTTP / `443` HTTPS):
   - Standalone fat JAR bundling both the Ktor backend and the Kilua (Kotlin/JS) frontend.
   - Evaluates bot actions and advisor requests via HTTP communication with `gothicfire-agent`.
2. **`gothicfire-agent`** (Port `8000` HTTP):
   - Python FastAPI microservice running `qwen2.5-1.5b-instruct-q4_k_m.gguf` via `llama-cpp-python`.
   - Powers PvE computer opponent moves and interactive War Council advisors (Zorax the Mighty & Jade the Enlightened).
   - Features built-in auto-download if the model is missing, context-capped inference (1024 tokens), and serialized execution.
3. **`gothicfire-mongo`** (Port `27017`):
   - MongoDB 7.0 database persisting user profiles, match state, turn histories, and statistics.

```
       ┌────────────────────────┐
       │   Browser / Client     │
       └───────────┬────────────┘
                   │ :8080 (or :443 with TLS)
                   ▼
       ┌────────────────────────┐
       │     gothicfire-app     │ (Ktor + Kilua JS)
       └───────┬────────┬───────┘
               │        │
  :8000 (HTTP) │        │ :27017 (Mongo)
               ▼        ▼
┌──────────────────┐  ┌──────────────────┐
│ gothicfire-agent │  │ gothicfire-mongo │
│ (Qwen2.5-1.5B)   │  │  (MongoDB 7.0)   │
└──────────────────┘  └──────────────────┘
```

---

## 📋 Modes: DEV vs PROD (`APP_MODE`)

The game application features dual environment modes via `APP_MODE`:

| Setting | DEV Mode (`APP_MODE=DEV`) | PROD Mode (`APP_MODE=PROD`) |
| :--- | :--- | :--- |
| **App Protocol & Port** | HTTP on port `8080` (or reverse proxy) | HTTPS (TLS) on port `443` or behind proxy |
| **TLS Certificates** | Not required | `gothiccastles.com.pem` & `.key` (if direct TLS) |
| **Behind Proxy (`BEHIND_REVERSE_PROXY`)** | Not required | `true` when routed via Traefik/Nginx |
| **Cookie Domain** | Unrestricted (Localhost) | `gothiccastles.com` (`HttpOnly=true`, `Secure=true`) |
| **Google Redirect URI** | `http://localhost:5120/auth/google/callback` | `https://gothiccastles.com/auth/google/callback?provider=google` |
| **Twitter Callback URI**| `http://localhost:5120/auth/twitter/callback` | `https://gothiccastles.com/auth/twitter/callback` |
| **AI Agent Endpoint** | `http://agent:8000` | `http://agent:8000` (Docker) / `http://gothicfire-agent:8000` (K8s) |

---

## 🚀 Option 1: Run with Docker Compose (Recommended)

Docker Compose starts the full stack: `app`, `agent`, and `mongo` with health checks, volume mounts, and network orchestration.

### 1. Model Preparation

The AI Agent uses the Qwen2.5-1.5B Instruct GGUF quantized model (`qwen2.5-1.5b-instruct-q4_k_m.gguf`, ~1.1 GB).

- **Existing local model**: If `models/qwen2.5-1.5b-instruct-q4_k_m.gguf` already exists in your project directory, Docker Compose mounts it into the container at `/app/models/` in read-only mode.
- **Automatic download**: If missing on a fresh server, the container automatically downloads it on first boot when `AUTO_DOWNLOAD_MODEL=true` is set.

### 2. Configure `.env`

Create or edit your `.env` file in the project root:

```env
# Mode: DEV (port 8080) or PROD (port 443 with TLS or behind proxy)
APP_MODE=DEV
MONGODB_URI=mongodb://mongo:27017
MONGODB_DB=gothicfire

# AI Agent Configuration
AI_AGENT_URL=http://agent:8000
USE_AI_AGENT=true
AI_THREADS=4
AI_CTX=2048
AUTO_DOWNLOAD_MODEL=true

# OAuth Credentials (optional for local testing, required for social auth)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
```

### 3. Build & Start the Stack

```bash
# Build and start all three containers in background
docker compose up -d --build
```

### 4. Verify Stack Status & Logs

```bash
# Check running containers and health status
docker compose ps

# View AI Agent logs (model loading and inference)
docker compose logs -f agent

# View Game Application logs
docker compose logs -f app

# Test AI Agent health directly
curl http://localhost:8000/health
```

### 5. Stop the Stack

```bash
# Stop containers (preserves database data and models)
docker compose down

# Stop containers and remove database volume (CAUTION: wipes database)
docker compose down -v
```

---

## 🐳 Option 2: Standalone Docker Run

If you wish to run the containers independently without Docker Compose:

### 1. Build Both Images

```bash
# 1. Build the Game Application image
docker build -t gothicfire:latest -f Dockerfile .

# 2. Build the AI Agent image
docker build -t gothicfire-agent:latest -f agent/Dockerfile .
```

### 2. Create Common Network

```bash
docker network create gothicfire-network
```

### 3. Run MongoDB

```bash
docker run -d \
  --name gothicfire-mongo \
  --network gothicfire-network \
  --restart unless-stopped \
  -v mongo_data:/data/db \
  mongo:7.0
```

### 4. Run AI Agent Microservice

```bash
docker run -d \
  --name gothicfire-agent \
  --network gothicfire-network \
  --restart unless-stopped \
  -p 8000:8000 \
  -v $(pwd)/models:/app/models:ro \
  -e MODEL_PATH=/app/models/qwen2.5-1.5b-instruct-q4_k_m.gguf \
  -e AI_THREADS=4 \
  -e AI_CTX=2048 \
  -e AUTO_DOWNLOAD_MODEL=true \
  gothicfire-agent:latest
```

### 5. Run Game Application

```bash
# Development Mode (HTTP on port 8080)
docker run -d \
  --name gothicfire-app \
  --network gothicfire-network \
  --restart unless-stopped \
  -p 8080:8080 \
  -e APP_MODE=DEV \
  -e MONGODB_URI=mongodb://gothicfire-mongo:27017 \
  -e MONGODB_DB=gothicfire \
  -e AI_AGENT_URL=http://gothicfire-agent:8000 \
  -e USE_AI_AGENT=true \
  gothicfire:latest
```

---

## 🧪 Testing the AI Agent Microservice

You can verify the running AI Agent at any time using `curl`:

### Health & RAM Footprint:
```bash
curl -s http://localhost:8000/health | jq .
```
Response:
```json
{
  "status": "healthy",
  "model_path": "/app/models/qwen2.5-1.5b-instruct-q4_k_m.gguf",
  "model_loaded": true,
  "n_ctx": 1024,
  "n_threads": 4,
  "ram_rss_mb": 1114.39
}
```

### Computer Opponent Tactical Decision:
```bash
curl -s -X POST http://localhost:8000/api/v1/decide \
  -H "Content-Type: application/json" \
  -d '{
    "game_id": "test_game",
    "turn": 1,
    "player_id": "bot_yellow",
    "legal_moves": ["RECRUIT_HEAVY_INFANTRY", "RECRUIT_LIGHT_INFANTRY", "WAIT"],
    "state_summary": "Stationed at Castle Khorinis. 150 gold, 40 food. Goal: recruit garrison."
  }' | jq .
```

### War Council Advisor Consultation:
```bash
curl -s -X POST http://localhost:8000/api/v1/advisor/consult \
  -H "Content-Type: application/json" \
  -d '{
    "game_id": "test_game",
    "turn": 1,
    "player_id": "player_red",
    "advisor_id": "ZORAX",
    "question_type": "STATUS",
    "player_summary": "Controlled Sectors: 1. Army: 5 Heavy Infantry. Treasury: 150 Gold.",
    "opponents_summary": "Rival Teams: YELLOW. Enemy Army: 8 units.",
    "map_summary": "Turn 1/50."
  }' | jq .
```

---

## ⚙️ Environment Variables Reference

| Variable | Default | Component | Description |
| :--- | :--- | :--- | :--- |
| `APP_MODE` | `PROD` / `DEV` | Game App | Dual mode: `DEV` (HTTP :8080) vs `PROD` (HTTPS :443 or reverse proxy) |
| `PORT` | `8080` (DEV) / `443` | Game App | Port override for the Netty JVM server |
| `BEHIND_REVERSE_PROXY`| `false` | Game App | Set to `true` when running behind Ingress/Traefik with TLS termination |
| `AI_AGENT_URL` | `http://127.0.0.1:8000` | Game App | URL of the AI Agent microservice |
| `USE_AI_AGENT` | `true` | Game App | `true` enables LLM agent for bots/advisors; `false` falls back to heuristics |
| `MONGODB_URI` | `mongodb://localhost:27017`| Game App | MongoDB connection URI |
| `MONGODB_DB` | `gothicfire` | Game App | MongoDB database name |
| `MODEL_PATH` | `/app/models/...` | AI Agent | Path to the GGUF model file |
| `AI_PORT` | `8000` | AI Agent | Listening port for FastAPI microservice |
| `AI_HOST` | `0.0.0.0` | AI Agent | Host binding interface |
| `AI_THREADS` | `4` | AI Agent | Number of CPU threads dedicated to llama.cpp inference |
| `AI_CTX` | `2048` | AI Agent | Context window cap in tokens |
| `AUTO_DOWNLOAD_MODEL` | `true` | AI Agent | If `true`, downloads GGUF model from Hugging Face if missing at boot |
