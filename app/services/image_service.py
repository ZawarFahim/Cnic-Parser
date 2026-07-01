import io
import base64
from fastapi import UploadFile, HTTPException, status
from PIL import Image

SUPPORTED_MIME_TYPES = {"image/jpeg", "image/png", "image/jpg", "image/webp"}

def validate_and_convert_image(file_bytes: bytes, filename: str = "image") -> dict:
    """
    Validates image bytes and converts to base64 format for Gemini.
    Returns a dictionary with base64 data and mime type.
    """
    try:
        image = Image.open(io.BytesIO(file_bytes))
        image.verify()  # Verify it's a valid image
        # Re-open for format/size check because verify() closes the file pointer
        image = Image.open(io.BytesIO(file_bytes))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid image file: {str(e)}"
        )

    # Determine format and MIME type
    img_format = image.format
    if not img_format:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not determine image format."
        )
    
    mime_type = f"image/{img_format.lower()}"
    if mime_type == "image/jpg":
        mime_type = "image/jpeg"

    if mime_type not in SUPPORTED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported image type: {mime_type}. Supported types are: JPEG, PNG, WEBP."
        )

    # Convert to base64
    base64_data = base64.b64encode(file_bytes).decode("utf-8")

    return {
        "mime_type": mime_type,
        "base64_data": base64_data,
        "width": image.width,
        "height": image.height
    }

async def process_image_upload(file: UploadFile) -> dict:
    """
    Processes an UploadFile, validates it, and converts it to base64 representation.
    """
    # Double check MIME type from request header
    if file.content_type not in SUPPORTED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported MIME type: {file.content_type}. Supported: JPEG, PNG, WEBP."
        )
    
    try:
        content = await file.read()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not read uploaded file: {str(e)}"
        )
    finally:
        await file.seek(0)  # Reset cursor for potential downstream reads

    return validate_and_convert_image(content, file.filename)
