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

# Run JVM JS frontend locally
./gradlew jsBrowserDevelopmentRun --continuous

# docker build

docker build -t gothicfire:latest .   

# K3S
sudo k3s ctr images import gothicfire.tar 
kubectl rollout restart deployment gothicfire-app -n gothicfire

# Python Tactical AI & Advisor Agent

The game includes an AI agent microservice (`agent/server.py`) powered by a local GGUF model (`qwen2.5-1.5b-instruct-q4_k_m.gguf` via `llama-cpp-python`).
It serves two core functions:
1. **Computer Opponent**: Evaluates tactical board states and selects legal actions for PvE bots.
2. **War Council Advisors**:
   - **Zorax the Mighty**: Seasoned grey-haired military general advising on fortress garrisons, force ratios, and blunt tactical strikes.
   - **Jade the Enlightened**: Arcane sorceress with velvet hair advising on long-term cultivation, mystical economy, and strategic pacing.
   - Players can choose their advisor at game creation and consult them during gameplay on:
     - *Current Status* (Comparative summary of player affairs vs rivals)
     - *What should I do next?* (Immediate turn tactical counsel)
     - *Strategy for the future* (Long-term campaign roadmap)

### Running the Python Microservice
```bash
# Run FastAPI agent server on port 8000
.venv/bin/python agent/server.py
```

### Self-Test & Verification
```bash
# Validate model loading, RAM footprint (< 1.5 GB), decision latency, and advisor personas
.venv/bin/python agent/verify_agent.py
```
