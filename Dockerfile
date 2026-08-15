# ==========================================
# Stage 1: Build Stage
# ==========================================
FROM eclipse-temurin:25-jdk AS builder

WORKDIR /app

# Copy Gradle wrapper and configuration files first to leverage Docker caching
COPY gradlew settings.gradle.kts build.gradle.kts gradle.properties ./
COPY gradle ./gradle

# Install native dependencies required by Node.js (downloaded by Kotlin JS plugin)
RUN apt-get update && apt-get install -y libatomic1 && rm -rf /var/lib/apt/lists/*

# Make gradlew executable and preload wrapper/dependencies
RUN chmod +x gradlew

# Copy source code and build assets
COPY src ./src
COPY webpack.config.d ./webpack.config.d
COPY map_data.json ./map_data.json
COPY Castle_icon.png knight_icon.png gothic_fire_map.png ./

# Build fat JAR with bundled JS frontend
RUN ./gradlew jarWithJs --no-daemon

# ==========================================
# Stage 2: Runtime Stage
# ==========================================
FROM eclipse-temurin:25-jre AS runner

# Create a non-root system user and group for security
RUN groupadd -r -g 1001 appgroup && \
    useradd -r -u 1001 -g appgroup appuser

WORKDIR /app

# Copy standalone fat JAR from builder stage
COPY --from=builder --chown=appuser:appgroup /app/build/libs/kilua-ktor-mongo.jar /app/app.jar

# Switch to non-root user
USER appuser

# Default runtime configuration
ENV APP_MODE="PROD" \
    MONGODB_URI="mongodb://localhost:27017" \
    MONGODB_DB="gothicfire"

EXPOSE 8080 443

# Optimize JVM memory consumption for containers
ENTRYPOINT ["java", "-XX:+UseParallelGC", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]
