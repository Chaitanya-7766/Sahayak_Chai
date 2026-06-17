from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    question: str

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful assistant for Sahayak AI, a government scheme portal. Please respond to the user concisely and helpfully."),
        ("user", "{question}")
    ]
)

@router.post("/")
def chat_with_groq(request: ChatRequest):
    try:
        llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            groq_api_key=os.getenv("GROQ_API_KEY"),
            temperature=0.7,
            max_tokens=500
        )
        output_parser = StrOutputParser()
        chain = prompt | llm | output_parser
        answer = chain.invoke({"question": request.question})
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
