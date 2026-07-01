import io
from PIL import Image
from unittest.mock import AsyncMock, MagicMock, patch
from fastapi import UploadFile
from app.schemas.response_schema import CNICResponseSchema
from app.services.extraction_service import extract_cnic

async def test_extraction_workflow():
    # 1. Generate a valid 1x1 pixel PNG image bytes programmatically using PIL
    img = Image.new('RGB', (1, 1), color='red')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    valid_png_bytes = img_byte_arr.getvalue()

    # 2. Prepare mock UploadFile
    mock_file = MagicMock(spec=UploadFile)
    mock_file.filename = "test_cnic.png"
    mock_file.content_type = "image/png"
    mock_file.read = AsyncMock(return_value=valid_png_bytes)
    mock_file.seek = AsyncMock()

    # 3. Prepare mock LLM extraction response
    mock_response = CNICResponseSchema(
        name="Muhammad Ali",
        father_name="Ahmad Ali",
        cnic_number="42101-1234567-1",
        gender="Male",
        date_of_birth="1990-01-01",
        date_of_issue="2015-05-12",
        date_of_expiry="2025-05-12",
        address="House 123, Street 4, Islamabad"
    )

    # 4. Patch extract_structured_data where it is imported in extraction_service
    # Also patch settings.GEMINI_API_KEY to avoid validation issues
    with patch("app.services.extraction_service.extract_structured_data", new_callable=AsyncMock) as mock_extract, \
         patch("app.config.settings.GEMINI_API_KEY", "dummy_key"):
        
        mock_extract.return_value = mock_response
        
        # 5. Invoke extraction service
        result = await extract_cnic(mock_file)
        
        # 6. Assertions
        assert result.name == "Muhammad Ali"
        assert result.cnic_number == "42101-1234567-1"
        assert result.gender == "Male"
        assert result.address == "House 123, Street 4, Islamabad"
        
        # Verify call parameters
        mock_extract.assert_called_once()
