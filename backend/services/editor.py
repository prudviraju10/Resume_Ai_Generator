from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from utils.llm_factory import get_llm
from models import ExperienceItem, ProjectItem, SkillCategory, PersonalInfo, ResumeData
from typing import List, Union

from pydantic import BaseModel, Field

class SkillsWrapper(BaseModel):
    skills: List[SkillCategory]

from typing import Any, List, Union, Dict
import json

async def edit_section_content(current_content: Union[str, Dict, List[Any]], instruction: str, section_name: str) -> Union[str, dict, list]:
    """
    Rewrites a specific section of the resume based on the user's instruction.
    Returns structured data for specific sections, or string for others.
    """
    llm = get_llm(temperature=0.7)
    
    # Ensure content is string for the prompt
    content_str = current_content
    if not isinstance(current_content, str):
        content_str = json.dumps(current_content, indent=2)
    
    # Determine the target schema based on section_name
    target_schema = None
    is_list_wrapper = False
    
    if section_name == "experience":
        target_schema = ExperienceItem
    elif section_name == "projects":
        target_schema = ProjectItem
    elif section_name == "skills":
        target_schema = SkillsWrapper
        is_list_wrapper = True
    # elif section_name == "personal_info":
    #     target_schema = PersonalInfo
    
    if target_schema:
        structured_llm = llm.with_structured_output(target_schema)
        
        system_prompt = f"""You are an expert professional resume editor.
        You are editing a part of the '{section_name}' section of a resume.
        
        Current Content:
        {{current_content}}
        
        User Instruction:
        {{instruction}}
        
        Please provide the rewritten content based on user instruction following the schema. do not change the other fields or parts of current content.

        Return ONLY the structured data.
        """
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a professional resume editor."),
            ("human", system_prompt),
        ])
        
        chain = prompt | structured_llm
    else:
        # Default string behavior for summary or unknown sections
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
        "current_content": content_str, 
        "instruction": instruction
    })
    
    if is_list_wrapper and hasattr(result, 'skills'):
        return result.skills
        
    return result
