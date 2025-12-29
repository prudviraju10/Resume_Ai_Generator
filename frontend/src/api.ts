import type { ResumeData, EditResponse } from './types';

const API_BASE = 'http://localhost:8000';

export async function uploadResume(file: File): Promise<ResumeData> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Upload failed');
    }

    return response.json();
}

export async function editSection(
    currentContent: string,
    instruction: string,
    sectionName: string
): Promise<EditResponse> {
    const response = await fetch(`${API_BASE}/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            current_content: currentContent,
            instruction,
            section_name: sectionName,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Editing failed');
    }

    return response.json();
}
