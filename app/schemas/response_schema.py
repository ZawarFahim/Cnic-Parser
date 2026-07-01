from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class CNICResponseSchema(BaseModel):
    name: Optional[str] = Field(None, description="Full Name of the CNIC holder")
    father_name: Optional[str] = Field(None, description="Father's Name of the CNIC holder")
    cnic_number: Optional[str] = Field(None, description="CNIC Number in format XXXXX-XXXXXXX-X")
    gender: Optional[str] = Field(None, description="Gender (Male/Female/Other)")
    date_of_birth: Optional[str] = Field(None, description="Date of Birth in format YYYY-MM-DD or DD.MM.YYYY")
    date_of_issue: Optional[str] = Field(None, description="Date of Issue in format YYYY-MM-DD or DD.MM.YYYY")
    date_of_expiry: Optional[str] = Field(None, description="Date of Expiry in format YYYY-MM-DD or DD.MM.YYYY")
    address: Optional[str] = Field(None, description="Residential Address")

class CNICRecordDBResponse(CNICResponseSchema):
    id: str = Field(..., alias="_id", description="MongoDB record ID")
    created_at: datetime = Field(..., description="Timestamp when record was created")

    class Config:
        populate_by_name = True
