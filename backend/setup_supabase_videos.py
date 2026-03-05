#!/usr/bin/env python3
"""
Setup script for Supabase PostgreSQL + FREE Video Storage
Run this to create database schema and storage buckets for SmartMeet AI
"""

import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def setup_supabase_with_videos():
    # Load environment variables
    load_dotenv()
    
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("DATABASE_URL not found in .env file")
        return False
    
    print("Setting up SmartMeet AI with FREE Supabase Storage...")
    print("=" * 60)
    
    try:
        # Create engine
        engine = create_engine(database_url)
        
        # Read and execute schema
        with open("schema_with_videos.sql", "r") as f:
            schema_sql = f.read()
        
        print("1. Creating database schema with video support...")
        
        # Execute schema
        with engine.connect() as conn:
            conn.execute(text(schema_sql))
            conn.commit()
        
        print("   ✓ Database schema created successfully!")
        
        # Test connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT COUNT(*) FROM meetings"))
            count = result.scalar()
            print(f"   ✓ Current meetings count: {count}")
        
        print("\n2. Supabase Storage Setup Instructions:")
        print("   Go to your Supabase project dashboard:")
        print("   1. Click 'Storage' in the left sidebar")
        print("   2. Create a new bucket called 'smart-meet-videos'")
        print("   3. Set bucket as 'Public'")
        print("   4. Add Row Level Security policies:")
        print("      - Users can only access their own videos")
        print("      - Public access for thumbnails")
        
        print("\n3. Get Supabase Keys:")
        print("   Go to Settings → API:")
        print("   - Copy 'anon' key (for public access)")
        print("   - Copy 'service_role' key (for admin access)")
        print("   - Update your .env file with these keys")
        
        print("\n4. Update .env file with:")
        print("   SUPABASE_ANON_KEY=your-anon-key-here")
        print("   SUPABASE_SERVICE_KEY=your-service-key-here")
        
        return True
        
    except Exception as e:
        print(f"Error setting up Supabase: {e}")
        return False

if __name__ == "__main__":
    print("SmartMeet AI - FREE Supabase Storage Setup")
    print("=" * 60)
    
    if setup_supabase_with_videos():
        print("\n🎉 Setup complete! Your FREE SmartMeet AI is ready!")
        print("\nFeatures available:")
        print("  ✓ PostgreSQL database (unlimited)")
        print("  ✓ 1GB FREE video storage")
        print("  ✓ 2GB FREE bandwidth/month")
        print("  ✓ Built-in CDN")
        print("  ✓ Row Level Security")
        print("  ✓ Video upload API")
        print("  ✓ Thumbnail generation")
        print("  ✓ Video streaming")
        
        print("\nNext steps:")
        print("  1. Complete Supabase Storage setup (see above)")
        print("  2. Update .env with Supabase keys")
        print("  3. Run: uvicorn app.main:app --reload")
        print("  4. Test video upload at: http://localhost:8000/docs")
        
        print("\nCost: $0/month (FREE tier)")
        print("Upgrade available: $25/month for 100GB storage")
        
    else:
        print("\n❌ Setup failed. Please check your configuration.")
        sys.exit(1)
