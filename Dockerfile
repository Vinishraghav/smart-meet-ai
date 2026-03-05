FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY backend/requirements_railway.txt .
RUN pip install --no-cache-dir -r requirements_railway.txt

# Copy backend code
COPY backend/ .

# Create uploads directory for video storage
RUN mkdir -p /app/uploads/videos /app/uploads/thumbnails

# Expose port
EXPOSE 8000

# Health check - use curl instead of curl -f for more reliability
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl http://localhost:8000/health || exit 1

# Start the application with a delay to ensure proper startup
CMD ["sh", "-c", "sleep 10 && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
