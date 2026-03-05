import urllib.parse
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def test_encoded_connection():
    load_dotenv()
    
    # Properly URL encode the connection string
    password = "a+VL3*mx?5u-XMX"
    encoded_password = urllib.parse.quote_plus(password)
    
    database_url = f"postgresql://postgres:{encoded_password}@db.yhwwtxcbamhvroxiqdht.supabase.co:5432/postgres"
    
    print(f"Testing encoded Supabase connection...")
    print(f"Encoded password: {encoded_password}")
    print(f"Full URL: postgresql://postgres:{encoded_password}@db.yhwwtxcbamhvroxiqdht.supabase.co:5432/postgres")
    
    try:
        engine = create_engine(database_url)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version()"))
            version = result.scalar()
            print(f"SUCCESS! Connected to Supabase PostgreSQL version: {version}")
            return True, database_url
    except Exception as e:
        print(f"Connection failed: {e}")
        return False, None

if __name__ == "__main__":
    success, working_url = test_encoded_connection()
    if success:
        print(f"\n*** WORKING CONNECTION FOUND ***")
        print(f"Use this URL in your .env file:")
        print(f"DATABASE_URL={working_url}")
    else:
        print("\n*** CONNECTION FAILED ***")
