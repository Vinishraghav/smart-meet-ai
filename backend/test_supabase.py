import urllib.parse
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def test_supabase_connection():
    load_dotenv()
    
    # URL encode the connection string to handle special characters
    database_url = "postgresql://postgres.a+VL3*mx?5u-XMX@db.yhwwtxcbamhvroxiqdht.supabase.co:5432/postgres"
    
    print(f"Testing Supabase connection...")
    print(f"URL: {database_url}")
    
    try:
        engine = create_engine(database_url)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version()"))
            version = result.scalar()
            print(f"SUCCESS! Connected to Supabase PostgreSQL version: {version}")
            return True
    except Exception as e:
        print(f"Connection failed: {e}")
        return False

if __name__ == "__main__":
    test_supabase_connection()
