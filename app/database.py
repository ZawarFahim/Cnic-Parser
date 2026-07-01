import logging
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure, ConfigurationError
from app.config import settings

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    db = None

db_instance = Database()

async def connect_to_mongo():
    """Establish connection to MongoDB Atlas or local instance."""
    logger.info("Connecting to MongoDB...")
    try:
        db_instance.client = AsyncIOMotorClient(settings.MONGODB_URI)
        # Verify connection by triggering a command
        await db_instance.client.admin.command('ping')
        # Extract DB name from URI or default to cnic_db
        db_name = settings.MONGODB_URI.split("/")[-1].split("?")[0] or "cnic_db"
        db_instance.db = db_instance.client[db_name]
        logger.info(f"Successfully connected to MongoDB database: {db_name}")
    except (ConnectionFailure, ConfigurationError) as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise e

async def close_mongo_connection():
    """Close MongoDB connection."""
    if db_instance.client:
        logger.info("Closing MongoDB connection...")
        db_instance.client.close()
        logger.info("MongoDB connection closed.")

def get_database():
    """Retrieve database instance."""
    if db_instance.db is None:
        raise RuntimeError("Database connection not initialized. Call connect_to_mongo first.")
    return db_instance.db
