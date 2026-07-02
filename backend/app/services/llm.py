from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from ..config.settings import settings
from ..models.cnic import CNICData

api_key = settings.GOOGLE_API_KEY or "DUMMY_API_KEY"

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=api_key,
    temperature=0.0
)

structured_llm = llm.with_structured_output(CNICData)

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

chain = prompt | structured_llm

def extract_cnic_data(raw_text: str) -> CNICData:
    return chain.invoke({"raw_text": raw_text})
