import { useState } from 'react';
import { UploadScreen } from './components/UploadScreen';
import { PortfolioPreview } from './components/PortfolioPreview';
import { EditorPanel } from './components/EditorPanel';
import type { ResumeData } from './types';
import './index.css';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  if (!resumeData) {
    return <UploadScreen onUploadSuccess={setResumeData} />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left: Preview (70%) */}
      <div className="flex-1 bg-white overflow-hidden relative shadow-lg z-10" style={{ flex: '7' }}>
        <PortfolioPreview data={resumeData} />

        {/* Floating Badge */}
        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-xs opacity-50 hover:opacity-100 transition-opacity">
          Live Preview
        </div>
      </div>

      {/* Right: Editor (30%) */}
      <div className="bg-gray-50 border-l border-gray-200" style={{ flex: '3', minWidth: '400px' }}>
        <EditorPanel
          resumeData={resumeData}
          onUpdate={setResumeData}
        />
      </div>
    </div>
  );
}

export default App;
