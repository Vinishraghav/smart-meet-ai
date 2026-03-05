#!/usr/bin/env python3
"""
Setup script for Supabase PostgreSQL database with RLS
Run this to create database schema with authentication and security policies
"""

import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def setup_supabase_database():
    # Load environment variables
    load_dotenv()
    
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("DATABASE_URL not found in .env file")
        return False
    
    print("Connecting to Supabase PostgreSQL database...")
    
    try:
        # Create engine
        engine = create_engine(database_url)
        
        # Read and execute schema
        with open("schema_supabase.sql", "r") as f:
            schema_sql = f.read()
        
        print("Creating Supabase database schema with RLS...")
        
        # Execute schema
        with engine.connect() as conn:
            conn.execute(text(schema_sql))
            conn.commit()
        
        print("Supabase database schema created successfully!")
        print("Row Level Security (RLS) policies enabled!")
        print("User authentication integration ready!")
        
        # Test connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT COUNT(*) FROM meetings"))
            count = result.scalar()
            print(f"Current meetings count: {count}")
        
        return True
        
    except Exception as e:
        print(f"Error setting up Supabase database: {e}")
        return False

if __name__ == "__main__":
    print("SmartMeet AI - Supabase Database Setup")
    print("=" * 50)
    
    if setup_supabase_database():
        print("\nSetup complete! Features ready:")
        print("  ✓ PostgreSQL database")
        print("  ✓ Row Level Security (RLS)")
        print("  ✓ User authentication")
        print("  ✓ Meeting ownership control")
        print("  ✓ Participant access control")
        print("\nYou can now run the FastAPI backend:")
        print("   uvicorn app.main:app --reload")
        print("\nNext: Configure frontend to use authentication endpoints")
    else:
        print("\nSetup failed. Please check your configuration.")
        sys.exit(1)
