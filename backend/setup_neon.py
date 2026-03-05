#!/usr/bin/env python3
"""
Setup script for Neon Postgres database
Run this after creating your Neon database and updating .env
"""

import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def setup_neon_database():
    # Load environment variables
    load_dotenv()

    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("DATABASE_URL not found in .env file")
        print("Please update your .env file with your Neon connection string")
        return False

    print("Connecting to Neon database...")

    try:
        # Create engine
        engine = create_engine(database_url)

        # Read and execute schema
        with open("schema.sql", "r") as f:
            schema_sql = f.read()

        print("Creating database schema...")

        # Split SQL commands and execute
        commands = [cmd.strip() for cmd in schema_sql.split(";") if cmd.strip()]

        with engine.connect() as conn:
            for command in commands:
                if command:
                    try:
                        conn.execute(text(command))
                        conn.commit()
                    except Exception as e:
                        if "already exists" not in str(e):
                            print(f"Warning: {e}")

        print("Database schema created successfully!")

        # Test connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT COUNT(*) FROM meetings"))
            count = result.scalar()
            print(f"Current meetings count: {count}")

        return True

    except Exception as e:
        print(f"Error setting up database: {e}")
        return False

if __name__ == "__main__":
    print("SmartMeet AI - Neon Database Setup")
    print("=" * 50)

    if setup_neon_database():
        print("\nSetup complete! You can now run the FastAPI backend:")
        print("   uvicorn app.main:app --reload")
    else:
        print("\nSetup failed. Please check your configuration.")
        sys.exit(1)
