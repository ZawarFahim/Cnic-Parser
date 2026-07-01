from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # MongoDB Config
    MONGODB_URI: str = "mongodb://localhost:27017/cnic_db"
    
    # Gemini API Config
    GEMINI_API_KEY: str = ""

    # App Config
    PROJECT_NAME: str = "CNIC.io Backend"
    DEBUG: bool = False
    
    # CORS Configuration: comma-separated list of origins, or *
    CORS_ORIGINS: str = "*"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
