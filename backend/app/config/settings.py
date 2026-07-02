import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    def __init__(self):
        self.MONGO_URI: str = os.getenv("MONGO_URI", "mongodb://localhost:27017")
        self.MONGO_DB_NAME: str = os.getenv("MONGO_DB_NAME", "cnic_database")
        self.MONGO_COLLECTION_NAME: str = os.getenv("MONGO_COLLECTION_NAME", "cnic_records")
        self.GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
        self.GOOGLE_APPLICATION_CREDENTIALS: str = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "")
        raw_max_image_size = os.getenv("MAX_IMAGE_SIZE_MB", "10")
        try:
            self.MAX_IMAGE_SIZE_MB: float = float(raw_max_image_size)
        except ValueError:
            self.MAX_IMAGE_SIZE_MB = 10.0

settings = Settings()
