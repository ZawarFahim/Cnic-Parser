from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class CNICRecord(BaseModel):
    name: Optional[str] = None
    father_name: Optional[str] = None
    cnic_number: Optional[str] = None
    gender: Optional[str] = None
    date_of_birth: Optional[str] = None
    date_of_issue: Optional[str] = None
    date_of_expiry: Optional[str] = None
    address: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
