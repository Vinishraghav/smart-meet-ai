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

# Make startup script executable
RUN chmod +x start.sh

# Create uploads directory for video storage
RUN mkdir -p /app/uploads/videos /app/uploads/thumbnails

# Expose port (Railway uses 8080)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=90s --retries=3 \
  CMD curl http://localhost:8080/health || exit 1

# Start the application using the startup script
CMD ["./start.sh"]
