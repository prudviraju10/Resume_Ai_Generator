from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from utils.llm_factory import get_llm

async def edit_section_content(current_content: str, instruction: str, section_name: str) -> str:
    """
    Rewrites a specific section of the resume based on the user's instruction.
    """
    llm = get_llm(temperature=0.7)
    
    system_prompt = f"""You are an expert professional resume editor.
    You are editing the '{section_name}' section of a resume.
    
    Current Content:
    {{current_content}}
    
    User Instruction:
    {{instruction}}
    
    Please provide the rewritten content for this section. 
    Return ONLY the rewritten content, ready to be inserted into the resume.
    Do not add markdown formatting unless appropriate for the section structure.
    Keep the tone professional and impactful.
    """
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a professional resume editor."),
        ("human", system_prompt),
    ])
    
    chain = prompt | StrOutputParser()
    
    result = chain.invoke({
        "current_content": current_content, 
        "instruction": instruction
    })
    
    return result
