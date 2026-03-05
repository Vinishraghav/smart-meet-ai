#!/usr/bin/env python3
"""
Setup script for SQLite database
Run this to create the database schema for MVP development
"""

import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def setup_sqlite_database():
    # Load environment variables
    load_dotenv()
    
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("DATABASE_URL not found in .env file")
        return False
    
    print("Connecting to SQLite database...")
    
    try:
        # Create engine
        engine = create_engine(database_url)
        
        # Read and execute schema
        with open("schema_sqlite.sql", "r") as f:
            schema_sql = f.read()
        
        print("Creating SQLite database schema...")
        
        # Execute schema
        with engine.connect() as conn:
            conn.execute(text(schema_sql))
            conn.commit()
        
        print("SQLite database schema created successfully!")
        
        # Test connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT COUNT(*) FROM meetings"))
            count = result.scalar()
            print(f"Current meetings count: {count}")
        
        return True
        
    except Exception as e:
        print(f"Error setting up SQLite database: {e}")
        return False

if __name__ == "__main__":
    print("SmartMeet AI - SQLite Database Setup")
    print("=" * 50)
    
    if setup_sqlite_database():
        print("\nSetup complete! You can now run the FastAPI backend:")
        print("   uvicorn app.main:app --reload")
    else:
        print("\nSetup failed. Please check your configuration.")
        sys.exit(1)
