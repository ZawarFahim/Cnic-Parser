from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class CNICData(BaseModel):
    name: Optional[str] = None
    father_name: Optional[str] = None
    cnic_number: Optional[str] = None
    gender: Optional[str] = None
    date_of_birth: Optional[str] = None
    date_of_issue: Optional[str] = None
    expiry_date: Optional[str] = None

class CNICRecord(CNICData):
    created_at: datetime
    raw_front_text: Optional[str] = None

class CNICResponse(BaseModel):
    success: bool
    message: str
    record_id: Optional[str] = None
    data: Optional[CNICData] = None
