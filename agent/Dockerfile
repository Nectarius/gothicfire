# ==========================================
# Stage 1: Build & Compilation Stage
# ==========================================
FROM python:3.11-slim AS builder

WORKDIR /build

# Install compilation tools required for llama-cpp-python C++ extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies to dedicated prefix
COPY agent/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ==========================================
# Stage 2: Minimal Runtime Stage
# ==========================================
FROM python:3.11-slim AS runner

# Install OpenMP runtime library needed by llama-cpp-python and curl for diagnostics
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create dedicated non-root user for security
RUN groupadd -r -g 1001 agentgroup && \
    useradd -r -u 1001 -g agentgroup agentuser

WORKDIR /app

# Copy compiled python packages from builder
COPY --from=builder /install /usr/local

# Prepare models directory with proper permissions
RUN mkdir -p /app/models /models && \
    chown -R agentuser:agentgroup /app /models

# Copy server code and shared core package
COPY --chown=agentuser:agentgroup agent/core ./agent/core
COPY --chown=agentuser:agentgroup agent/server.py ./agent/server.py
COPY --chown=agentuser:agentgroup agent/verify_agent.py ./agent/verify_agent.py

# Switch to non-root user
USER agentuser

# Default runtime configuration
ENV PYTHONUNBUFFERED=1 \
    MODEL_PATH="/app/models/qwen2.5-1.5b-instruct-q4_k_m.gguf" \
    AI_PORT="8000" \
    AI_HOST="0.0.0.0" \
    AI_THREADS="4" \
    AI_CTX="2048" \
    AI_BATCH="512" \
    AI_USE_MLOCK="true"

EXPOSE 8000

# Built-in Docker health check using Python standard library
HEALTHCHECK --interval=20s --timeout=5s --start-period=30s --retries=3 \
    CMD python3 -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/live')" || exit 1

ENTRYPOINT ["python3", "agent/server.py"]
