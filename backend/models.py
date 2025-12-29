from typing import List, Optional
from pydantic import BaseModel, Field

class ContactInfo(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None
    location: Optional[str] = None

class PersonalInfo(BaseModel):
    name: str = Field(description="Full name of the person")
    title: Optional[str] = Field(description="Professional title e.g. 'Full Stack Engineer'")
    contact: ContactInfo = Field(default_factory=ContactInfo)
    bio: Optional[str] = Field(description="Short bio or objective")

class ExperienceItem(BaseModel):
    company: str
    role: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    is_current: bool = False
    location: Optional[str] = None
    highlights: List[str] = Field(description="List of key achievements or responsibilities", default_factory=list)

class EducationItem(BaseModel):
    institution: str
    degree: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    grade: Optional[str] = Field(description="GPA or Honor", default=None)

class ProjectItem(BaseModel):
    name: str
    description: str
    tech_stack: List[str] = Field(default_factory=list)
    key_points: List[str] = Field(default_factory=list)
    url: Optional[str] = None
    image_url: Optional[str] = None

class SkillCategory(BaseModel):
    category_name: str = Field(description="e.g. Languages, Frameworks")
    skills: List[str]

class ResumeData(BaseModel):
    personal_info: PersonalInfo
    summary: Optional[str] = None
    experience: List[ExperienceItem] = Field(default_factory=list)
    education: List[EducationItem] = Field(default_factory=list)
    projects: List[ProjectItem] = Field(default_factory=list)
    skills: List[SkillCategory] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    publications: List[str] = Field(default_factory=list)
    languages: List[str] = Field(default_factory=list)
    awards: List[str] = Field(default_factory=list)
    interests: List[str] = Field(default_factory=list)
