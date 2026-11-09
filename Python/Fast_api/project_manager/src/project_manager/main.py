from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from project_manager.core.config import settings
from project_manager.db.mongodb import (
    connect_to_mongo,
    close_mongo_connection,
    get_database,
)
from project_manager.routers.users import router as user_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan
)

app.include_router(user_router, prefix="/api/v1")

@app.get("/health/db")
async def check_db_connection(database: AsyncIOMotorDatabase = Depends(get_database)):
    pong = await database.command("ping")
    return {"status": "connected", "database_name": database.name, "ping_response": pong}