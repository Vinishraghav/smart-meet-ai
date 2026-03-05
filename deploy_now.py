#!/usr/bin/env python3
"""
Direct Railway Deployment for SmartMeet AI (FREE)
"""

import subprocess
import sys

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"\n[INFO] {description}")
    print(f"Running: {command}")
    
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"[SUCCESS] {result.stdout}")
            return True
        else:
            print(f"[ERROR] {result.stderr}")
            return False
    except Exception as e:
        print(f"[EXCEPTION] {e}")
        return False

def deploy_now():
    """Deploy SmartMeet AI to Railway now"""
    
    print("SmartMeet AI - Railway Deployment")
    print("=" * 50)
    
    # Step 1: Check if Railway CLI is installed
    if not run_command("railway --version", "Checking Railway CLI"):
        print("Installing Railway CLI...")
        if not run_command("npm install -g @railway/cli", "Installing Railway CLI"):
            print("Failed to install Railway CLI")
            return False
    
    # Step 2: Login to Railway
    print("\nPlease login to Railway...")
    if not run_command("railway login", "Login to Railway"):
        print("Failed to login to Railway")
        return False
    
    # Step 3: Initialize Railway project
    print("\nInitializing Railway project...")
    if not run_command("railway init", "Initialize Railway project"):
        print("Failed to initialize Railway project")
        return False
    
    # Step 4: Add PostgreSQL service
    print("\nAdding PostgreSQL database...")
    if not run_command("railway add postgresql", "Add PostgreSQL service"):
        print("Failed to add PostgreSQL service")
        return False
    
    # Step 5: Deploy to Railway
    print("\nDeploying to Railway...")
    if not run_command("railway up", "Deploy to Railway"):
        print("Failed to deploy to Railway")
        return False
    
    # Step 6: Get deployment URL
    print("\nGetting deployment URL...")
    result = subprocess.run("railway domain", shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        domain = result.stdout.strip()
        print(f"SUCCESS! Your SmartMeet AI is live at: {domain}")
        print(f"API docs: {domain}/docs")
        print(f"Health check: {domain}/health")
        return domain
    else:
        print("Failed to get deployment URL")
        return None

if __name__ == "__main__":
    print("Deploying SmartMeet AI to Railway for FREE...")
    print("Features: PostgreSQL + 500MB storage + 100GB bandwidth")
    
    domain = deploy_now()
    if domain:
        print(f"\nDEPLOYMENT SUCCESSFUL!")
        print(f"Your app is live at: {domain}")
        print(f"Test video upload at: {domain}/docs")
        print(f"Cost: $0/month (FREE tier)")
    else:
        print("\nDEPLOYMENT FAILED!")
        print("Please check the errors above and try manually.")
