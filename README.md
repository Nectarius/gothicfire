# Gothic Fire

A turn-based multiplayer tactical strategy game built with Kotlin Multiplatform, Kilua (Compose-like Web UI), Ktor, and MongoDB.

## Features
- Interactive territory map with dynamic sector rendering and fog-of-war visibility mechanics.
- Turn-based army recruitment, resource gathering (food, gold), territory upgrades, and combat.
- Real-time multiplayer synchronization using WebSockets.
- Automatic asynchronous turn persistence with MongoDB.
- OAuth authentication support (Google & Twitter).

## Docker & Server Deployment
For building Docker images and running the server with Docker Compose, see the complete guide:
👉 **[README_DOCKER.md](file:///home/taffeite/workspaces/gothicfire/gothicfire/README_DOCKER.md)**

### Quick Start with Docker
```bash
docker compose up -d --build
```

Access the application at `http://localhost:8081`.

## Local Development
```bash
# Build fat JAR with bundled JS frontend
./gradlew jarWithJs

# Run JVM server locally
./gradlew jvmRun
```
