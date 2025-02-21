import os
from dotenv import load_dotenv


class Settings:
    load_dotenv()
    FLASK_ENV: str = os.environ.get("FLASK_ENV", "development")
    HOST: str = os.environ.get("HOST", "localhost")  # default to localhost if not set
    PORT: int = os.environ.get("PORT", 8000)
    DEBUG_MODE: bool = os.environ.get("DEBUG_MODE", "False").lower() == "true"
    DATABASE_URI: str = os.environ.get("DATABASE_URI", "sqlite:///example.db")
    SECRET_KEY: str = os.environ.get("SECRET_KEY", "dev")


settings = Settings()
