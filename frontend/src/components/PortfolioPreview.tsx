import React from 'react';
import type { ResumeData, ExperienceItem, EducationItem, ProjectItem } from '../types';

interface PortfolioPreviewProps {
    data: ResumeData;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ data }) => {
    const { personal_info, summary, experience, education, skills, projects } = data;

    return (
        <div className="portfolio-content p-8" style={{ overflowY: 'auto', height: '100%' }}>
            {/* Hero Section */}
            <div className="portfolio-header text-center mb-8">
                <h1 className="text-4xl font-bold text-primary mb-2">{personal_info.name}</h1>
                {personal_info.title && <p className="text-xl text-muted mb-4">{personal_info.title}</p>}
                {personal_info.bio && <p className="mb-4 max-w-2xl mx-auto">{personal_info.bio}</p>}

                <div className="flex justify-center gap-4 text-sm text-primary">
                    {personal_info.contact.email && <a href={`mailto:${personal_info.contact.email}`}>{personal_info.contact.email}</a>}
                    {personal_info.contact.phone && <span>{personal_info.contact.phone}</span>}
                    {personal_info.contact.linkedin && <a href={personal_info.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                    {personal_info.contact.github && <a href={personal_info.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                    {personal_info.contact.website && <a href={personal_info.contact.website} target="_blank" rel="noopener noreferrer">Website</a>}
                </div>
            </div>

            {/* Summary */}
            {summary && (
                <section className="mb-8 section-container">
                    <h2 className="section-title">Professional Summary</h2>
                    <p className="leading-relaxed">{summary}</p>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section className="mb-8 section-container">
                    <h2 className="section-title">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map((cat, idx) => (
                            <div key={idx} className="card">
                                <h3 className="font-bold mb-2">{cat.category_name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((skill, sIdx) => (
                                        <span key={sIdx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-8 section-container">
                    <h2 className="section-title">Experience</h2>
                    <div className="space-y-6">
                        {experience.map((job, idx) => (
                            <div key={idx} className="card">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg">{job.role}</h3>
                                        <div className="text-primary font-medium">{job.company}</div>
                                    </div>
                                    <div className="text-sm text-muted text-right">
                                        <div>{job.start_date} - {job.end_date || (job.is_current ? 'Present' : '')}</div>
                                        <div>{job.location}</div>
                                    </div>
                                </div>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    {job.highlights.map((point, pIdx) => (
                                        <li key={pIdx}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="mb-8 section-container">
                    <h2 className="section-title">Projects</h2>
                    <div className="space-y-6">
                        {projects.map((proj, idx) => (
                            <div key={idx} className="card">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold">{proj.name}</h3>
                                    <div className="flex gap-2 text-sm">
                                        {proj.url && <a href={proj.url} target="_blank" className="text-primary hover:underline">View Project</a>}
                                    </div>
                                </div>
                                <p className="mb-2 text-sm">{proj.description}</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {proj.tech_stack.map((t, tIdx) => (
                                        <span key={tIdx} className="text-xs font-mono bg-gray-100 px-1 rounded">{t}</span>
                                    ))}
                                </div>
                                <ul className="list-disc list-inside text-sm text-muted">
                                    {proj.key_points.map((pt, kIdx) => <li key={kIdx}>{pt}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-8 section-container">
                    <h2 className="section-title">Education</h2>
                    {education.map((edu, idx) => (
                        <div key={idx} className="mb-4">
                            <div className="flex justify-between">
                                <h3 className="font-bold">{edu.institution}</h3>
                                <span className="text-sm text-muted">{edu.start_date} - {edu.end_date}</span>
                            </div>
                            <div>{edu.degree}</div>
                            {edu.grade && <div className="text-sm text-muted">Grade: {edu.grade}</div>}
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};
