import urllib.parse
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def test_railway_connection():
    # Test different Railway connection formats
    formats = [
        # Original format
        "postgresql://postgres:YcPfqteEKzbJoeZerWiPSfvqqMTYfMrE@gondola.proxy.rlwy.net:39632/railway",
        # With SSL
        "postgresql://postgres:YcPfqteEKzbJoeZerWiPSfvqqMTYfMrE@gondola.proxy.rlwy.net:39632/railway?sslmode=require",
        # With connect_timeout
        "postgresql://postgres:YcPfqteEKzbJoeZerWiPSfvqqMTYfMrE@gondola.proxy.rlwy.net:39632/railway?connect_timeout=30",
        # Combined parameters
        "postgresql://postgres:YcPfqteEKzbJoeZerWiPSfvqqMTYfMrE@gondola.proxy.rlwy.net:39632/railway?sslmode=require&connect_timeout=30"
    ]
    
    for i, url in enumerate(formats, 1):
        print(f"\nTesting format {i}:")
        print(f"URL: {url}")
        
        try:
            engine = create_engine(url, connect_args={"connect_timeout": 15})
            with engine.connect() as conn:
                result = conn.execute(text("SELECT version()"))
                version = result.scalar()
                print(f"SUCCESS! Connected to Railway PostgreSQL version: {version}")
                return True, url
        except Exception as e:
            print(f"FAILED: {e}")
    
    return False, None

if __name__ == "__main__":
    success, working_url = test_railway_connection()
    if success:
        print(f"\n*** WORKING CONNECTION FOUND ***")
        print(f"Use this URL in your .env file:")
        print(f"DATABASE_URL={working_url}")
    else:
        print("\n*** ALL CONNECTIONS FAILED ***")
