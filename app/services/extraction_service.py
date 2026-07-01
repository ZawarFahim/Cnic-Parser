import logging
from fastapi import UploadFile, HTTPException, status
from app.schemas.response_schema import CNICResponseSchema
from app.services.image_service import process_image_upload
from app.services.llm_service import extract_structured_data

logger = logging.getLogger(__name__)

async def extract_cnic(file: UploadFile) -> CNICResponseSchema:
    """
    Orchestrates the CNIC parsing workflow:
    1. Validates and converts the image using the image service.
    2. Sends the image data to Gemini via LangChain for structured extraction.
    3. Returns the validated CNICResponseSchema object.
    
    This service does not persist data to the database, keeping it highly reusable.
    """
    try:
        # 1. Process and validate the image upload
        image_metadata = await process_image_upload(file)
        
        base64_data = image_metadata["base64_data"]
        mime_type = image_metadata["mime_type"]
        
        # 2. Extract structured data using Gemini LLM service
        logger.info(f"Initiating Gemini CNIC extraction for file: {file.filename}")
        extracted_data = await extract_structured_data(base64_data, mime_type)
        
        # 3. Validate structured output
        if not extracted_data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="AI extraction returned an empty result."
            )
            
        return extracted_data

    except HTTPException as he:
        # Re-raise known API/HTTP errors
        raise he
    except Exception as e:
        logger.error(f"CNIC extraction workflow failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process and extract CNIC details: {str(e)}"
        )
