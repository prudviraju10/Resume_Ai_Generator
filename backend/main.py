from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from models import ResumeData
from services.parser import extract_text, parse_resume
from services.editor import edit_section_content
from pydantic import BaseModel

app = FastAPI(title="Resume AI Editor API")

# CORS Setup
origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Resume AI Editor Backend is running"}

from dotenv import load_dotenv
load_dotenv()

@app.post("/upload", response_model=ResumeData)
async def upload_resume(file: UploadFile = File(...)):
    try:
        text = await extract_text(file)

        # Check if text extraction worked
        if not text.strip():
             raise HTTPException(status_code=400, detail="Could not extract text from file")
        
        # DEBUG: Write extracted text to file
        with open("debug_extracted_text.txt", "w", encoding="utf-8") as f:
            f.write(text)
        
        parsed_data = await parse_resume(text)
        return parsed_data

    except Exception as e:
        print(f"Error processing file: {e}")
        raise HTTPException(status_code=500, detail=str(e))

class EditRequest(BaseModel):
    current_content: str
    instruction: str
    section_name: str

@app.post("/edit")
async def edit_section(request: EditRequest):
    try:
        new_content = await edit_section_content(
            request.current_content, 
            request.instruction, 
            request.section_name
        )
        return {"content": new_content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
