import React from 'react';

interface ResultDisplayProps {
  beforeImage: string;
  afterImage: string;
  onReset: () => void;
}

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ beforeImage, afterImage, onReset }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Before Image */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-slate-700 mb-3">Before</h3>
          <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
            <img src={beforeImage} alt="Original uploaded" className="w-full h-auto aspect-square object-contain" />
          </div>
        </div>
        
        {/* After Image */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-slate-700 mb-3">After</h3>
          <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
            <img src={afterImage} alt="AI Generated full body" className="w-full h-auto aspect-square object-contain" />
          </div>
          <a
              href={afterImage}
              download="fulluni-generated-image.png"
              className="mt-4 inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <DownloadIcon />
              Download Image
            </a>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
            onClick={onReset}
            className="px-6 py-2 bg-gradient-to-r from-slate-500 to-slate-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
        >
            Start Over
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;