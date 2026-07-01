from bson import ObjectId
from typing import List, Optional, Dict, Any
from app.database import get_database
from app.models.cnic_model import CNICRecord

def serialize_doc(doc: Dict[str, Any]) -> Dict[str, Any]:
    """Helper to convert MongoDB object IDs to strings."""
    if not doc:
        return doc
    doc["_id"] = str(doc["_id"])
    return doc

async def save_record(record_data: CNICRecord) -> Dict[str, Any]:
    """Saves a CNIC record to MongoDB."""
    db = get_database()
    # Convert model to dict
    record_dict = record_data.model_dump()
    result = await db.cnic_records.insert_one(record_dict)
    
    # Retrieve the saved document
    saved_doc = await db.cnic_records.find_one({"_id": result.inserted_id})
    return serialize_doc(saved_doc)

async def get_record(record_id: str) -> Optional[Dict[str, Any]]:
    """Retrieves a single CNIC record by its string ID."""
    db = get_database()
    try:
        obj_id = ObjectId(record_id)
    except Exception:
        return None
    
    doc = await db.cnic_records.find_one({"_id": obj_id})
    return serialize_doc(doc)

async def get_all_records() -> List[Dict[str, Any]]:
    """Retrieves all CNIC records from the database."""
    db = get_database()
    cursor = db.cnic_records.find()
    records = []
    async for doc in cursor:
        records.append(serialize_doc(doc))
    return records
