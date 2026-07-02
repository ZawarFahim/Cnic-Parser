from datetime import datetime
from fastapi import APIRouter, File, UploadFile, HTTPException
from app.models.cnic import CNICData, CNICRecord, CNICResponse
from app.services import vision, llm, storage

router = APIRouter()

@router.post("/extract")
async def extract_single_image(file: UploadFile = File(...)):
    front_bytes = await file.read()

    try:
        front_text = vision.extract_text(front_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"OCR extraction failed: {str(e)}"
        )

    try:
        cnic_data = llm.extract_cnic_data(front_text)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"LLM data extraction failed: {str(e)}"
        )

    record = CNICRecord(
        name=cnic_data.name,
        father_name=cnic_data.father_name,
        cnic_number=cnic_data.cnic_number,
        gender=cnic_data.gender,
        date_of_birth=cnic_data.date_of_birth,
        date_of_issue=cnic_data.date_of_issue,
        expiry_date=cnic_data.expiry_date,
        created_at=datetime.utcnow(),
        raw_front_text=front_text
    )

    try:
        await storage.save_record(record.model_dump())
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database storage failed: {str(e)}"
        )

    return {
        "name": cnic_data.name,
        "father_name": cnic_data.father_name,
        "cnic_number": cnic_data.cnic_number,
        "gender": cnic_data.gender,
        "date_of_birth": cnic_data.date_of_birth,
        "date_of_issue": cnic_data.date_of_issue,
        "date_of_expiry": cnic_data.expiry_date
    }

@router.post("/cnic/upload", response_model=CNICResponse)
async def upload_cnic(
    front_image: UploadFile = File(...)
):
    front_bytes = await front_image.read()

    try:
        front_text = vision.extract_text(front_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"OCR extraction failed: {str(e)}"
        )

    try:
        cnic_data = llm.extract_cnic_data(front_text)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"LLM data extraction failed: {str(e)}"
        )

    record = CNICRecord(
        name=cnic_data.name,
        father_name=cnic_data.father_name,
        cnic_number=cnic_data.cnic_number,
        gender=cnic_data.gender,
        date_of_birth=cnic_data.date_of_birth,
        date_of_issue=cnic_data.date_of_issue,
        expiry_date=cnic_data.expiry_date,
        created_at=datetime.utcnow(),
        raw_front_text=front_text
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

@router.get("/cnic/record/{id}")
async def get_cnic_record(id: str):
    record = await storage.get_record(id)
    if not record:
        raise HTTPException(
            status_code=404,
            detail="CNIC record not found"
        )
    return record

@router.get("/cnic/records")
async def get_cnic_records():
    records = await storage.list_records()
    return records
