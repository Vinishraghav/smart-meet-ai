#!/usr/bin/env python3
"""
Deploy SmartMeet AI Frontend to Railway
This script creates a new Railway project for the frontend
"""

import subprocess
import os
import sys
from pathlib import Path

def run_command(cmd, cwd=None):
    """Run command and return output"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd)
        if result.returncode != 0:
            print(f"❌ Error: {result.stderr}")
            return False
        return result.stdout.strip()
    except Exception as e:
        print(f"❌ Error running command: {e}")
        return False

def main():
    print("🚀 SmartMeet AI Frontend Deployment")
    print("=" * 50)
    
    # Check if Railway CLI is installed
    if not run_command("railway --version"):
        print("❌ Railway CLI not found. Please install it first:")
        print("npm install -g @railway/cli")
        return False
    
    # Login to Railway
    print("\n🔐 Logging into Railway...")
    if not run_command("railway login"):
        print("❌ Failed to login to Railway")
        return False
    
    # Create new project for frontend
    print("\n📦 Creating new Railway project for frontend...")
    project_output = run_command("railway create --name smart-meet-ai-frontend")
    if not project_output:
        print("❌ Failed to create project")
        return False
    
    # Initialize git in frontend directory if not already
    frontend_dir = Path("frontend")
    if not (frontend_dir / ".git").exists():
        print("\n📁 Initializing git in frontend directory...")
        run_command("git init", cwd="frontend")
        run_command("git add .", cwd="frontend")
        run_command('git commit -m "Initial frontend commit"', cwd="frontend")
    
    # Link to Railway project
    print("\n🔗 Linking frontend to Railway project...")
    if not run_command("railway link", cwd="frontend"):
        print("❌ Failed to link to Railway project")
        return False
    
    # Add environment variables
    print("\n⚙️ Setting environment variables...")
    backend_url = "https://smart-meet-ai-production.up.railway.app"
    run_command(f'railway variables set VITE_API_URL="{backend_url}"', cwd="frontend")
    
    # Deploy
    print("\n🚀 Deploying frontend to Railway...")
    if not run_command("railway up", cwd="frontend"):
        print("❌ Failed to deploy")
        return False
    
    # Get deployment URL
    print("\n🌐 Getting deployment URL...")
    url_output = run_command("railway domains")
    if url_output:
        print(f"✅ Frontend deployed successfully!")
        print(f"🌐 URL: {url_output}")
        print(f"\n🎉 Your SmartMeet AI Frontend is live!")
        print(f"🔗 Visit: {url_output}")
        print(f"📱 Test on mobile: {url_output}")
        return True
    
    return False

if __name__ == "__main__":
    success = main()
    if not success:
        print("\n❌ Deployment failed. Please try manual deployment.")
        print("📖 See FRONTEND_DEPLOYMENT.md for manual instructions.")
        sys.exit(1)
    else:
        print("\n🎉 Deployment completed successfully!")
        sys.exit(0)
