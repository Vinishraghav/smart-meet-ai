import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def test_connection():
    load_dotenv()
    database_url = os.getenv("DATABASE_URL")
    
    print(f"Testing connection to: {database_url.split('@')[1] if '@' in database_url else 'unknown'}")
    
    try:
        engine = create_engine(database_url, connect_args={"connect_timeout": 10})
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version()"))
            version = result.scalar()
            print(f"Connected successfully! PostgreSQL version: {version}")
            return True
    except Exception as e:
        print(f"Connection failed: {e}")
        return False

if __name__ == "__main__":
    test_connection()
