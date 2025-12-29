import os
from typing import Optional
from fastapi import UploadFile
import pypdf
import docx
from langchain_core.utils.function_calling import convert_to_openai_function
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel

from models import ResumeData

async def extract_text(file: UploadFile) -> str:
    filename = file.filename.lower()
    content = await file.read()
    temp_filename = f"temp_{file.filename}"
    
    # Save to temp file for libraries that need path or file-like object
    with open(temp_filename, "wb") as f:
        f.write(content)

    text = ""
    try:
        if filename.endswith(".pdf"):
            reader = pypdf.PdfReader(temp_filename)
            for page in reader.pages:
                text += page.extract_text() + "\n"
        elif filename.endswith(".docx"):
            doc = docx.Document(temp_filename)
            for para in doc.paragraphs:
                text += para.text + "\n"
        else:
            # Fallback for text files
            text = content.decode("utf-8", errors="ignore")
    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
            
    return text

from utils.llm_factory import get_llm

async def parse_resume(text: str) -> ResumeData:
    """
    Parses resume text into structured ResumeData using LangChain.
    """
    llm = get_llm(temperature=0)
    
    # We want structured output matching ResumeData
    structured_llm = llm.with_structured_output(ResumeData)
    
    system_prompt = """You are an expert resume parser. 
    Extract the following information from the resume text provided.
    Ensure all fields are populated as accurately as possible.
    If a section is missing, leave it empty.
    For Experience and Projects, try to split large text blocks into individual highlight/key points.
    """
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{text}"),
    ])
    
    chain = prompt | structured_llm
    
    result = chain.invoke({"text": text})
    return result
