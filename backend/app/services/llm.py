from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from app.config.settings import settings
from app.models.cnic import CNICData

# Initialize Gemini using GOOGLE_API_KEY from settings
api_key = settings.GOOGLE_API_KEY or "DUMMY_API_KEY"

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=api_key,
    temperature=0.0
)

# Use LangChain structured output instead of manually parsing JSON
structured_llm = llm.with_structured_output(CNICData)

# Create one prompt telling Gemini to extract fields and return ONLY valid JSON
prompt = ChatPromptTemplate.from_messages([
    ("system", (
        "You are an expert system designed to extract structured information from Pakistani CNIC (National Identity Card) raw OCR text.\n"
        "Extract the following fields:\n"
        "- name\n"
        "- father_name\n"
        "- cnic_number\n"
        "- date_of_birth\n"
        "- expiry_date\n"
        "- address\n\n"
        "Return ONLY valid JSON.\n"
        "No markdown.\n"
        "No explanation.\n"
        "Return null if any field is missing."
    )),
    ("user", "{raw_text}")
])

# Create the runnable chain
chain = prompt | structured_llm

def extract_cnic_data(raw_text: str) -> CNICData:
    """
    Extracts CNIC details from raw OCR text using Gemini 2.5 Flash and LangChain structured output.

    Args:
        raw_text (str): The raw text extracted from the CNIC image.

    Returns:
        CNICData: A structured Pydantic object containing the extracted details.
    """
    return chain.invoke({"raw_text": raw_text})
