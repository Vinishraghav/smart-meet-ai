from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite:///./app.db"  # Default to SQLite, change to Railway later

    # API
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "SmartMeet AI"

    # Supabase (for future use)
    SUPABASE_URL: Optional[str] = None
    SUPABASE_ANON_KEY: Optional[str] = None
    SUPABASE_SERVICE_KEY: Optional[str] = None

    # CORS
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:5173",  # Vite frontend
        "http://localhost:3000",  # Next.js fallback
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "*",  # Allow all origins for Railway deployment
    ]

    class Config:
        env_file = ".env"
        extra = "ignore"  # Allow extra fields in .env without validation errors

settings = Settings()
