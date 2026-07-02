from typing import List, Dict, Any, Optional
from bson import ObjectId
from app.database import get_collection

async def save_record(record_data: dict) -> str:
    """
    Saves a record to the MongoDB collection.

    Args:
        record_data (dict): The record document to save.

    Returns:
        str: The string representation of the inserted document's ObjectId.
    """
    collection = get_collection()
    result = await collection.insert_one(record_data)
    return str(result.inserted_id)

async def get_record(record_id: str) -> Optional[dict]:
    """
    Retrieves a single record by its string ID.

    Args:
        record_id (str): The hexadecimal string of the document's ObjectId.

    Returns:
        Optional[dict]: The matching document with _id converted to a string, or None if not found.
    """
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
    """
    Retrieves all records from the collection.

    Returns:
        List[dict]: A list of all documents with their _id converted to strings.
    """
    collection = get_collection()
    cursor = collection.find()
    records = []
    async for document in cursor:
        document["_id"] = str(document["_id"])
        records.append(document)
    return records
