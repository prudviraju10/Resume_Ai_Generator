import React, { useState, useEffect } from 'react';
import type { ResumeData, EditResponse } from '../types';
import { editSection } from '../api';

interface EditorPanelProps {
    resumeData: ResumeData;
    onUpdate: (newData: ResumeData) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ resumeData, onUpdate }) => {
    const [activeTab, setActiveTab] = useState<keyof ResumeData>('summary');
    const [aiInstruction, setAiInstruction] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewContent, setPreviewContent] = useState<string | null>(null);

    // Helper to get raw string content for editing
    const getContent = (section: keyof ResumeData): string => {
        const data = resumeData[section];
        return typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    };

    // Sections available to edit
    const tabs: (keyof ResumeData)[] = [
        'summary', 'experience', 'education', 'skills', 'projects'
    ];

    const handleAiEdit = async () => {
        if (!aiInstruction.trim()) return;
        setLoading(true);
        try {
            const currentContent = getContent(activeTab);
            const res: EditResponse = await editSection(currentContent, aiInstruction, activeTab as string);
            setPreviewContent(res.content); // Store suggestion
        } catch (e) {
            alert("Failed to generate edit");
        } finally {
            setLoading(false);
        }
    };

    const acceptChange = () => {
        if (previewContent) {
            let parsed: any = previewContent;
            // Try to parse if it's JSON structure
            try {
                if (activeTab !== 'summary') {
                    parsed = JSON.parse(previewContent);
                }
            } catch (e) {
                // If parse fails, keep as string (for simple fields) or shows error
                console.warn("Could not parse JSON", e);
            }

            onUpdate({
                ...resumeData,
                [activeTab]: parsed
            });
            setPreviewContent(null);
            setAiInstruction('');
        }
    };

    return (
        <div className="editor-panel">
            <div className="editor-tabs">
                {tabs.map(tab => (
                    <div
                        key={tab}
                        className={`tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => { setActiveTab(tab); setPreviewContent(null); }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </div>
                ))}
            </div>

            <div className="editor-content">
                <div className="my-4">
                    <label className="block text-sm font-bold mb-2">Current Content (JSON/Text)</label>
                    <textarea
                        className="textarea font-mono text-sm"
                        rows={10}
                        readOnly
                        value={getContent(activeTab)}
                    />
                </div>

                <div className="card bg-blue-50 border-blue-200">
                    <h4 className="font-bold mb-2">AI Assistant</h4>
                    <textarea
                        className="textarea mb-2"
                        placeholder={`Ask AI to improve your ${activeTab}... e.g. "Make it more punchy" or "Fix typos"`}
                        value={aiInstruction}
                        onChange={(e) => setAiInstruction(e.target.value)}
                    />
                    <button
                        className="btn btn-primary w-full"
                        onClick={handleAiEdit}
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate Suggestions'}
                    </button>
                </div>

                {previewContent && (
                    <div className="my-4 border border-green-300 rounded p-4 bg-green-50">
                        <h4 className="font-bold text-success mb-2">Suggested Change</h4>
                        <textarea
                            className="textarea font-mono text-sm mb-2"
                            rows={8}
                            readOnly
                            value={previewContent}
                        />
                        <div className="flex gap-2">
                            <button className="btn btn-success flex-1" onClick={acceptChange}>Accept</button>
                            <button className="btn btn-danger flex-1" onClick={() => setPreviewContent(null)}>Reject</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
