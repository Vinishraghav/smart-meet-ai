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
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
