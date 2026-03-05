from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite:///./app.db"  # Default to SQLite, change to Neon later
    
    # API
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "SmartMeet AI"
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:5173",  # Vite frontend
        "http://localhost:3000",  # Next.js fallback
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]

    class Config:
        env_file = ".env"

settings = Settings()
