import logging
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from app.config import settings
from app.schemas.response_schema import CNICResponseSchema
from app.prompts.extraction_prompt import CNIC_EXTRACTION_PROMPT

logger = logging.getLogger(__name__)

def get_llm_client() -> ChatGoogleGenerativeAI:
    """
    Initializes and returns the ChatGoogleGenerativeAI client.
    """
    if not settings.GEMINI_API_KEY:
        logger.warning("GEMINI_API_KEY is not set in application configuration settings. The LLM service will fail if called.")
    
    return ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=settings.GEMINI_API_KEY,
        temperature=0.0,
        max_retries=2
    )

async def extract_structured_data(base64_data: str, mime_type: str) -> CNICResponseSchema:
    """
    Sends the base64-encoded image and the extraction prompt to Gemini
    using LangChain's structured output feature.
    """
    # 1. Initialize LLM
    llm = get_llm_client()
    
    # 2. Configure structured output using CNICResponseSchema
    structured_llm = llm.with_structured_output(CNICResponseSchema)
    
    # 3. Create the multi-modal message
    message = HumanMessage(
        content=[
            {
                "type": "text",
                "text": CNIC_EXTRACTION_PROMPT
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:{mime_type};base64,{base64_data}"
                }
            }
        ]
    )
    
    # 4. Invoke LLM and get validated structured output
    try:
        response = await structured_llm.ainvoke([message])
        return response
    except Exception as e:
        logger.error(f"LLM extraction error: {e}")
        raise e
