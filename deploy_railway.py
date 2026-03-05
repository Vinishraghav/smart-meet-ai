#!/usr/bin/env python3
"""
Automatic Railway Deployment Script for SmartMeet AI (FREE)
"""

import subprocess
import sys
import time

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"\n🚀 {description}")
    print(f"Running: {command}")
    
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Success: {result.stdout}")
            return True
        else:
            print(f"❌ Error: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False

def deploy_to_railway():
    """Deploy SmartMeet AI to Railway automatically"""
    
    print("🎯 SmartMeet AI - Automatic Railway Deployment")
    print("=" * 60)
    
    # Step 1: Check if Railway CLI is installed
    if not run_command("railway --version", "Checking Railway CLI"):
        print("📦 Installing Railway CLI...")
        if not run_command("npm install -g @railway/cli", "Installing Railway CLI"):
            print("❌ Failed to install Railway CLI")
            return False
    
    # Step 2: Login to Railway
    print("\n🔐 Please login to Railway...")
    if not run_command("railway login", "Login to Railway"):
        print("❌ Failed to login to Railway")
        return False
    
    # Step 3: Initialize Railway project
    print("\n📋 Initializing Railway project...")
    if not run_command("railway init", "Initialize Railway project"):
        print("❌ Failed to initialize Railway project")
        return False
    
    # Step 4: Add PostgreSQL service
    print("\n🗄️ Adding PostgreSQL database...")
    if not run_command("railway add postgresql", "Add PostgreSQL service"):
        print("❌ Failed to add PostgreSQL service")
        return False
    
    # Step 5: Deploy to Railway
    print("\n🚀 Deploying to Railway...")
    if not run_command("railway up", "Deploy to Railway"):
        print("❌ Failed to deploy to Railway")
        return False
    
    # Step 6: Get deployment URL
    print("\n🌐 Getting deployment URL...")
    result = subprocess.run("railway domain", shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        domain = result.stdout.strip()
        print(f"✅ Your SmartMeet AI is live at: {domain}")
        print(f"📖 API docs: {domain}/docs")
        print(f"🏥 Health check: {domain}/health")
    else:
        print("❌ Failed to get deployment URL")
    
    return True

def main():
    """Main deployment function"""
    
    print("🎯 This will deploy SmartMeet AI to Railway for FREE!")
    print("Features:")
    print("  ✅ PostgreSQL database (FREE)")
    print("  ✅ 500MB file storage (FREE)")
    print("  ✅ 100GB bandwidth (FREE)")
    print("  ✅ Automatic HTTPS")
    print("  ✅ Custom domain")
    print("  ✅ Zero cost")
    
    # Ask for confirmation
    response = input("\n🚀 Do you want to deploy now? (y/n): ")
    if response.lower() != 'y':
        print("❌ Deployment cancelled")
        return
    
    # Deploy
    if deploy_to_railway():
        print("\n🎉 Deployment completed successfully!")
        print("\nNext steps:")
        print("  1. Test your app at the provided URL")
        print("  2. Upload videos using the API")
        print("  3. Share your SmartMeet AI with others!")
        print("\nCost: $0/month (FREE tier)")
    else:
        print("\n❌ Deployment failed. Please check the errors above.")

if __name__ == "__main__":
    main()
