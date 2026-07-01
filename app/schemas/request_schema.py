from pydantic import BaseModel, Field

# Since file upload is handled via standard multipart/form-data with FastAPI's UploadFile,
# this schema file can define any additional API request bodies, or be blank.
class ExtractRequestSchema(BaseModel):
    # Placeholders for future options (e.g., enable_ocr, language_hints)
    pass
