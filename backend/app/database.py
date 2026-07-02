from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import settings

_client = None

def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(settings.MONGO_URI)
    return _client

def get_database():
    client = get_client()
    return client[settings.MONGO_DB_NAME]

def get_collection():
    db = get_database()
    return db[settings.MONGO_COLLECTION_NAME]

def close_database():
    global _client
    if _client is not None:
        _client.close()
        _client = None
