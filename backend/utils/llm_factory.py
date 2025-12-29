import os
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
# from langchain.chat_models import init_chat_model
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

# LangSmith Tracing
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")
os.environ["LANGCHAIN_PROJECT"] = "resume-ai-editor"

def get_llm(temperature: float = 0.0):
    """
    Returns a configured LangChain Chat model instance.
    Reads 'LLM_MODEL_NAME' and 'LLM_API_KEY' (or 'OPENAI_API_KEY') from environment.
    """
    model_name = os.getenv("LLM_MODEL_NAME", "gpt-4o")
    api_key = os.getenv("LLM_API_KEY") or os.getenv("GOOGLE_API_KEY")
    
    if not api_key:
        raise ValueError("LLM_API_KEY or GOOGLE_API_KEY must be set in environment")

    return ChatGoogleGenerativeAI(
        model=model_name,
        temperature=temperature,
        api_key=api_key
    )
