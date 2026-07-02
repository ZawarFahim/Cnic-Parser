from typing import List, Optional
from bson import ObjectId
from app.database import get_collection

async def save_record(record_data: dict) -> str:
    collection = get_collection()
    result = await collection.insert_one(record_data)
    return str(result.inserted_id)

async def get_record(record_id: str) -> Optional[dict]:
    collection = get_collection()
    try:
        obj_id = ObjectId(record_id)
    except Exception:
        return None

    document = await collection.find_one({"_id": obj_id})
    if document:
        document["_id"] = str(document["_id"])
    return document

async def list_records() -> List[dict]:
    collection = get_collection()
    cursor = collection.find()
    records = []
    async for document in cursor:
        document["_id"] = str(document["_id"])
        records.append(document)
    return records
