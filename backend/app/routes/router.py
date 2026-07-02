from datetime import datetime
from fastapi import APIRouter, File, UploadFile, HTTPException
from app.models.cnic import CNICData, CNICRecord, CNICResponse
from app.services import vision, llm, storage

router = APIRouter(prefix="/cnic")

@router.post("/upload", response_model=CNICResponse)
async def upload_cnic(
    front_image: UploadFile = File(...),
    back_image: UploadFile = File(...)
):
    front_bytes = await front_image.read()
    back_bytes = await back_image.read()

    try:
        front_text = vision.extract_text(front_bytes)
        back_text = vision.extract_text(back_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"OCR extraction failed: {str(e)}"
        )

    combined_text = f"{front_text}\n{back_text}"

    try:
        cnic_data = llm.extract_cnic_data(combined_text)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"LLM data extraction failed: {str(e)}"
        )

    record = CNICRecord(
        name=cnic_data.name,
        father_name=cnic_data.father_name,
        cnic_number=cnic_data.cnic_number,
        date_of_birth=cnic_data.date_of_birth,
        expiry_date=cnic_data.expiry_date,
        address=cnic_data.address,
        created_at=datetime.utcnow(),
        raw_front_text=front_text,
        raw_back_text=back_text
    )

    try:
        record_id = await storage.save_record(record.model_dump())
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database storage failed: {str(e)}"
        )

    return CNICResponse(
        success=True,
        message="CNIC processed and saved successfully.",
        record_id=record_id,
        data=cnic_data
    )

@router.get("/record/{id}")
async def get_cnic_record(id: str):
    record = await storage.get_record(id)
    if not record:
        raise HTTPException(
            status_code=404,
            detail="CNIC record not found"
        )
    return record

@router.get("/records")
async def get_cnic_records():
    records = await storage.list_records()
    return records
