import React, { useState } from 'react';
import { uploadResume } from '../api';
import type { ResumeData } from '../types';

interface UploadScreenProps {
    onUploadSuccess: (data: ResumeData) => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onUploadSuccess }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFile = async (file: File) => {
        setLoading(true);
        setError(null);
        try {
            // const data = await uploadResume(file);
            const data = {
                "personal_info": {
                    "name": "Prudvi Raju Borra",
                    "title": "Data Scientist",
                    "contact": {
                        "email": "borraprudviraju@gmail.com",
                        "phone": "+91-9182604309",
                        "linkedin": "Linkedin",
                        "github": "Github",
                        "website": null,
                        "location": "Hyderabad"
                    },
                    "bio": "Experienced Data Scientist specializing in machine learning and generative AI solutions, with a strong background in automation, predictive modeling, and building intelligent systems using LLMs."
                },
                "summary": "Worked on machine learning and generative AI solutions for business problems, and used python for tasks like PII data masking and automation of application servers admin tasks.",
                "experience": [
                    {
                        "company": "Hitachi Digital Systems",
                        "role": "Data Scientist",
                        "start_date": "Jul 2021",
                        "end_date": "Present",
                        "is_current": true,
                        "location": "Hyderabad",
                        "highlights": [
                            "Developed an intelligent troubleshooting assistant for application server admins using LLMs and LangGraph to automate common diagnostic tasks.",
                            "Enabled faster and consistent issue resolution, reducing manual effort for support teams by automating routine investigation steps.",
                            "Built a Resume-RAG system for internal talent matching using LangGraph, ChromaDB, and Azure OpenAI.",
                            "Improved profile to requirement matching efficiency for the RMG team, enabling faster and more accurate talent identification.",
                            "Developed a telecom churn prediction model using Decision Trees, XGBoost, and LightGBM; achieved 94% recall.",
                            "Analyzed key factors behind customer churn using SHAP values, providing actionable and explainable insights to business teams.",
                            "Reduced churn by 9%, segmenting customers with decile and lift charts to target high-risk segments."
                        ]
                    }
                ],
                "education": [
                    {
                        "institution": "Scaler",
                        "degree": "Specialization in Data Science & Machine Learning",
                        "start_date": null,
                        "end_date": "2024",
                        "grade": null
                    },
                    {
                        "institution": "Gayatri Vidya Parishad College of Engineering",
                        "degree": "BE/B.Tech/BS in Information Technology",
                        "start_date": null,
                        "end_date": "2021",
                        "grade": "7.96 CGPA"
                    }
                ],
                "projects": [
                    {
                        "name": "Data Analysis & Business Insights",
                        "description": "Performed detailed exploratory data analysis (EDA) on business case studies to derive actionable insights for decision-making.",
                        "tech_stack": [
                            "Python",
                            "SQL",
                            "Statistical Hypothesis Testing"
                        ],
                        "key_points": [
                            "Applied statistical hypothesis testing (Z-test, T-test, ANOVA, chi-square) to validate assumptions about data.",
                            "Implemented standardization and encoding techniques for preparing data for reporting and model building.",
                            "Handled outliers and missing data to clean and transform datasets."
                        ],
                        "url": "https://github.com/prudviraju10/data_analysis/tree/main",
                        "image_url": null
                    },
                    {
                        "name": "Delivery Time Estimation",
                        "description": "Estimated delivery times for a food delivery app, achieving a MAPE of 6%.",
                        "tech_stack": [
                            "Keras",
                            "Adam optimizer",
                            "Optuna",
                            "Batch normalization"
                        ],
                        "key_points": [
                            "Analyzed data to pinpoint peak order times and effectively manage outliers.",
                            "Developed a Sequential Keras model utilizing Optuna for hyperparameter tuning and regularization for generalization."
                        ],
                        "url": "https://drive.google.com/file/d/1qPcLUGU7scwIANvCzWlYe_OVRKaordRa/view?usp=sharing",
                        "image_url": null
                    },
                    {
                        "name": "AI-Powered Chatbot",
                        "description": "Built a three-page AI app using Streamlit, integrating Llama 3.3 70b model and agentic tools.",
                        "tech_stack": [
                            "Streamlit",
                            "Llama 3.3 70b",
                            "Groq API",
                            "LangChain",
                            "Langgraph",
                            "ChromaDB",
                            "Google embeddings"
                        ],
                        "key_points": [
                            "Designed chatbots with generic Q&A, RAG capabilities, and AI agents with tools.",
                            "Utilized Google embeddings for semantic search and enhanced response accuracy.",
                            "Used wikipedia and search tools to provide the LLM with additional knowledge sources."
                        ],
                        "url": "https://aillmdemoapp.streamlit.app/",
                        "image_url": null
                    },
                    {
                        "name": "Movie Recommender System",
                        "description": "Developed a personalized movie recommender system using collaborative filtering.",
                        "tech_stack": [
                            "Pearson Correlation",
                            "Cosine Similarity",
                            "Matrix Factorization"
                        ],
                        "key_points": [
                            "Used user-based and item-based collaborative filtering to enhance user engagement.",
                            "Applied matrix factorization to handle sparse user-item matrices, improving prediction accuracy."
                        ],
                        "url": "https://github.com/prudviraju10/recommender_system",
                        "image_url": null
                    }
                ],
                "skills": [
                    {
                        "category_name": "Technical Skills",
                        "skills": [
                            "Python",
                            "SQL",
                            "NumPy",
                            "Pandas",
                            "Scikit-learn",
                            "TensorFlow",
                            "FastAPI",
                            "Data Analysis",
                            "Clustering",
                            "Recommender Systems",
                            "Time Series Forecasting",
                            "Bagging & Boosting",
                            "DL",
                            "NLP",
                            "Transformers",
                            "Gen AI",
                            "Langgraph",
                            "AWS : EC2, ECS, ECR",
                            "Docker",
                            "MLOps"
                        ]
                    }
                ],
                "certifications": [
                    "AI Agents (HuggingFace)",
                    "Python & SQL (HackerRank)",
                    "Geospatial Analysis (Kaggle)"
                ],
                "publications": [],
                "languages": [],
                "awards": [],
                "interests": []
            };
            onUploadSuccess(data);
        } catch (err: any) {
            setError(err.message || 'Failed to upload resume');
        } finally {
            setLoading(false);
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="container flex items-center justify-center" style={{ minHeight: '100vh' }}>
            <div
                className={`card p-8 flex flex-col items-center justify-center gap-4 ${isDragOver ? 'bg-blue-50 border-blue-500' : ''}`}
                style={{ width: '100%', maxWidth: '500px', minHeight: '300px', borderStyle: 'dashed', borderWidth: '2px' }}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={onDrop}
            >
                <h2 className="section-title" style={{ border: 'none' }}>Upload Resume</h2>
                <p className="text-muted text-center">Drag and drop your PDF or DOCX resume here</p>

                {loading && <p className="text-primary">Parsing resume with AI...</p>}
                {error && <p className="text-danger">{error}</p>}

                <label className="btn btn-primary cursor-pointer">
                    Select File
                    <input type="file" hidden accept=".pdf,.docx,.txt" onChange={onChange} disabled={loading} />
                </label>
            </div>
        </div>
    );
};
