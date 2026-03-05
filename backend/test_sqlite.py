import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def test_sqlite_connection():
    load_dotenv()
    database_url = os.getenv("DATABASE_URL")
    
    print(f"Testing SQLite connection: {database_url}")
    
    try:
        engine = create_engine(database_url)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT sqlite_version()"))
            version = result.scalar()
            print(f"SUCCESS! SQLite version: {version}")
            return True
    except Exception as e:
        print(f"FAILED: {e}")
        return False

if __name__ == "__main__":
    test_sqlite_connection()
