export interface ContactInfo {
    email?: string | null;
    phone?: string | null;
    linkedin?: string | null;
    github?: string | null;
    website?: string | null;
    location?: string | null;
}

export interface PersonalInfo {
    name: string;
    title?: string | null;
    contact: ContactInfo;
    bio?: string | null;
}

export interface ExperienceItem {
    company: string;
    role: string;
    start_date?: string | null;
    end_date?: string | null;
    is_current: boolean;
    location?: string | null;
    highlights: string[];
}

export interface EducationItem {
    institution: string;
    degree: string;
    start_date?: string | null;
    end_date?: string | null;
    grade?: string | null;
}

export interface ProjectItem {
    name: string;
    description: string;
    tech_stack: string[];
    key_points: string[];
    url?: string | null;
    image_url?: string | null;
}

export interface SkillCategory {
    category_name: string;
    skills: string[];
}

export interface ResumeData {
    personal_info: PersonalInfo;
    summary?: string | null;
    experience: ExperienceItem[];
    education: EducationItem[];
    projects: ProjectItem[];
    skills: SkillCategory[];
    certifications: string[];
    publications: string[];
    languages: string[];
    awards: string[];
    interests: string[];
}

export interface EditRequest {
    current_content: string;
    instruction: string;
    section_name: string;
}

export interface EditResponse {
    content: string | any;
}
