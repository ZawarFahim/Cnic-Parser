import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import connect_to_mongo, close_mongo_connection, db_instance
from app.routes import extract

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Establish database connection
    try:
        await connect_to_mongo()
    except Exception as e:
        logger.error(f"Could not connect to MongoDB during startup: {e}")
    yield
    # Shutdown: Close database connection
    await close_mongo_connection()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for CNIC.io - AI-based Pakistani CNIC Parser",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(extract.router)

@app.get("/", tags=["General"])
async def root():
    return {
        "message": "Welcome to the CNIC.io API Backend",
        "docs_url": "/docs",
        "status": "active"
    }

@app.get("/health", tags=["General"])
async def health_check():
    """Verify application health and MongoDB connection status."""
    db_connected = False
    if db_instance.client:
        try:
            await db_instance.client.admin.command('ping')
            db_connected = True
        except Exception:
            pass

    return {
        "status": "healthy" if db_connected else "degraded",
        "database_connected": db_connected,
        "service": settings.PROJECT_NAME
    }
