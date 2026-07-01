from fastapi import APIRouter, File, UploadFile, HTTPException, status
from app.schemas.response_schema import CNICResponseSchema
from app.models.cnic_model import CNICRecord
from app.services.database_service import save_record

router = APIRouter(prefix="/extract", tags=["Extraction"])

SUPPORTED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/jpg"}

@router.post("", response_model=CNICResponseSchema, status_code=status.HTTP_201_CREATED)
async def extract_cnic_details(file: UploadFile = File(...)):
    """
    Accepts a CNIC image upload, validates the image, and returns
    a dummy response for now without calling the Gemini API.
    Also saves the dummy result to the database.
    """
    # 1. Validate File MIME Type
    if file.content_type not in SUPPORTED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type: {file.content_type}. Only JPEG and PNG images are allowed."
        )
    
    # 2. Simulate extraction with dummy response data
    dummy_data = CNICRecord(
        name="Muhammad Ali",
        father_name="Ahmad Ali",
        cnic_number="42101-1234567-1",
        gender="Male",
        date_of_birth="1990-01-01",
        date_of_issue="2015-05-12",
        date_of_expiry="2025-05-12",
        address="House 123, Street 4, Sector G-11/2, Islamabad"
    )
    
    # 3. Save to Database
    try:
        saved_record = await save_record(dummy_data)
    except Exception as e:
        # If DB connection fails, we log it and raise internal error, 
        # or we can return the model without saving depending on production resiliency choices.
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to persist CNIC record to database: {str(e)}"
        )
        
    # Return dummy schema representation
    return CNICResponseSchema(**saved_record)
