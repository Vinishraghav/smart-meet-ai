#!/bin/bash

echo "Starting SmartMeet AI Backend..."
echo "Working directory: $(pwd)"
echo "Python version: $(python --version)"
echo "Environment variables:"
env | grep RAILWAY
env | grep PORT

echo "Checking if app directory exists..."
ls -la

echo "Starting FastAPI application..."
cd /app
# Use Railway's PORT environment variable or default to 8080
PORT=${PORT:-8080}
exec uvicorn app.main:app --host 0.0.0.0 --port $PORT
