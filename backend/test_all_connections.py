import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def test_connection(name, database_url):
    print(f"\nTesting {name}...")
    print(f"URL: {database_url}")
    
    try:
        if database_url.startswith("sqlite"):
            engine = create_engine(database_url)
        else:
            engine = create_engine(database_url, connect_args={"connect_timeout": 15})
            
        with engine.connect() as conn:
            if database_url.startswith("sqlite"):
                result = conn.execute(text("SELECT sqlite_version()"))
                version = result.scalar()
                print(f"SUCCESS! SQLite version: {version}")
            else:
                result = conn.execute(text("SELECT version()"))
                version = result.scalar()
                print(f"SUCCESS! PostgreSQL version: {version}")
            return True, database_url
    except Exception as e:
        print(f"FAILED: {e}")
        return False, None

def test_all_formats():
    # Test different connection string formats
    formats = [
        ("Basic Format", "postgresql://neondb_owner:npg_7flCoy3WSznV@ep-patient-cloud-a12cdfvm-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"),
        ("Without Pooler", "postgresql://neondb_owner:npg_7flCoy3WSznV@ep-patient-cloud-a12cdfvm.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"),
        ("Primary Direct", "postgresql://neondb_owner:npg_7flCoy3WSznV@ep-patient-cloud-a12cdfvm-primary.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"),
        ("With Timeout", "postgresql://neondb_owner:npg_7flCoy3WSznV@ep-patient-cloud-a12cdfvm-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=30"),
        ("SQLite Fallback", "sqlite:///./smartmeet.db")
    ]
    
    print("Testing all connection formats...")
    print("=" * 60)
    
    for name, url in formats:
        success, working_url = test_connection(name, url)
        if success:
            print(f"\n*** WORKING CONNECTION FOUND ***")
            print(f"Format: {name}")
            print(f"URL: {working_url}")
            return working_url
    
    print("\n*** NO WORKING CONNECTIONS FOUND ***")
    return None

if __name__ == "__main__":
    working_url = test_all_formats()
    if working_url:
        print(f"\nUse this URL in your .env file:")
        print(f"DATABASE_URL={working_url}")
    else:
        print("\nRecommendation: Create new Neon project in US East region")
