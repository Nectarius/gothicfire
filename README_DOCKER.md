# Gothic Fire - Docker & Server Deployment Guide

This guide explains how to build, configure, and run **Gothic Fire** on your server or local environment using Docker and Docker Compose.

---

## 📋 Modes: DEV vs PROD (`APP_MODE`)

Gothic Fire includes dual environment configuration controlled by the `APP_MODE` environment variable:

| Setting | DEV Mode (`APP_MODE=DEV`) | PROD Mode (`APP_MODE=PROD`) |
| :--- | :--- | :--- |
| **Protocol & Port** | HTTP on port `8080` (Addr: `:8080`) | HTTPS (TLS) on port `443` (Addr: `:443`) |
| **TLS Certificates** | Not required | `gothiccastles.com.pem` & `gothiccastles.com.key` (or `cert.pem` / `key.pem`) |
| **Cookie Domain** | Unrestricted (Localhost) | `gothiccastles.com` (`HttpOnly=true`, `Secure=true`) |
| **Google Redirect URI** | `http://localhost:5120/auth/google/callback` | `https://gothiccastles.com/auth/google/callback?provider=google` |
| **Twitter Callback URI**| `http://localhost:5120/auth/twitter/callback` | `https://gothiccastles.com/auth/twitter/callback` |
| **Google OAuth Scopes** | `email`, `profile` | `email`, `profile` |

---

## 🚀 Option 1: Run with Docker Compose (Recommended)

Docker Compose starts both the application container and a persistent MongoDB database with automatic health checks and networking.

### 1. Configure `.env`

Create or adjust your `.env` file:

```env
# Set to PROD for production deployment with TLS
APP_MODE=PROD
MONGODB_URI=mongodb://mongo:27017
MONGODB_DB=gothicfire

# TLS Configuration (For PROD mode)
TLS_CERT_FILE=gothiccastles.com.pem
TLS_KEY_FILE=gothiccastles.com.key

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Twitter OAuth Credentials
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret

# Optional: Override OAuth redirect URIs
# GOOGLE_REDIRECT_URI=http://localhost:5120/auth/google/callback
# TWITTER_CALLBACK_URL=http://localhost:5120/auth/twitter/callback
```

### 2. Start the Stack

```bash
docker compose up -d --build
```

### 3. Verify Status & Logs

```bash
# Check container status
docker compose ps

# View application logs
docker compose logs -f app
```

### 4. Stop the Stack

```bash
# Stop containers (preserves database data)
docker compose down

# Stop containers and remove volumes (WARNING: wipes database)
docker compose down -v
```

---

## 🐳 Option 2: Standalone Docker Run

### 1. Build the Docker Image

```bash
docker build -t gothicfire:latest .
```

### 2. Run in Production Mode (Port 443 with TLS)

```bash
docker run -d \
  --name gothicfire-app \
  --restart unless-stopped \
  -p 443:443 \
  -v $(pwd)/gothiccastles.com.pem:/app/gothiccastles.com.pem:ro \
  -v $(pwd)/gothiccastles.com.key:/app/gothiccastles.com.key:ro \
  -e APP_MODE=PROD \
  -e TLS_CERT_FILE=gothiccastles.com.pem \
  -e TLS_KEY_FILE=gothiccastles.com.key \
  -e MONGODB_URI="mongodb://your-mongo-host:27017" \
  -e MONGODB_DB="gothicfire" \
  -e GOOGLE_CLIENT_ID="your_google_client_id" \
  -e GOOGLE_CLIENT_SECRET="your_google_client_secret" \
  gothicfire:latest
```

### 3. Run in Local Development Mode (Port 8080 over HTTP)

```bash
docker run -d \
  --name gothicfire-dev \
  -p 8080:8080 \
  -e APP_MODE=DEV \
  -e MONGODB_URI="mongodb://localhost:27017" \
  -e MONGODB_DB="gothicfire" \
  gothicfire:latest
```

---

## ⚙️ Environment Variables Reference

| Variable | Default | Description |
| :--- | :--- | :--- |
| `APP_MODE` | `PROD` (Docker) / `DEV` (local) | `DEV` enables HTTP on port 8080; `PROD` enables HTTPS on port 443 |
| `PORT` | `8080` (DEV) / `443` (PROD) | Custom listening port override |
| `TLS_CERT_FILE` | `gothiccastles.com.pem` | Path to X.509 TLS certificate (PEM) |
| `TLS_KEY_FILE` | `gothiccastles.com.key` | Path to PKCS#8 private key (PEM) |
| `MONGODB_URI` | `mongodb://localhost:27017` | MongoDB connection string |
| `MONGODB_DB` | `gothicfire` | MongoDB database name |
| `GOOGLE_CLIENT_ID` | *optional* | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | *optional* | Google OAuth Client Secret |
| `GOOGLE_REDIRECT_URI` | *auto* | Override Google OAuth redirect URI |
| `TWITTER_CLIENT_ID` | *optional* | Twitter OAuth 2.0 Client ID |
| `TWITTER_CLIENT_SECRET`| *optional* | Twitter OAuth 2.0 Client Secret |
| `TWITTER_CALLBACK_URL` | *auto* | Override Twitter OAuth callback URL |
