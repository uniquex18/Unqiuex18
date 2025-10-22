import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import Spinner from './components/Spinner';
import { generateFullBodyImage } from './services/geminiService';

const App: React.FC = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [generatedPhoto, setGeneratedPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!uploadedPhoto) {
      setError("Please upload a photo first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPhoto(null);

    try {
      const result = await generateFullBodyImage(uploadedPhoto);
      setGeneratedPhoto(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [uploadedPhoto]);

  const handleReset = () => {
    setUploadedPhoto(null);
    setGeneratedPhoto(null);
    setError(null);
    setIsLoading(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-slate-600 animate-pulse">Generating your full-body image...</p>
          <p className="text-sm text-slate-500">This may take a moment.</p>
        </div>
      );
    }
    
    if (error) {
        return (
            <div className="text-center p-4">
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p><strong>Oops! Something went wrong.</strong></p>
                    <p>{error}</p>
                </div>
                <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-slate-500 to-slate-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (generatedPhoto && uploadedPhoto) {
      return <ResultDisplay beforeImage={uploadedPhoto} afterImage={generatedPhoto} onReset={handleReset} />;
    }

    if (uploadedPhoto) {
      return (
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg border border-slate-200">
            <img src={uploadedPhoto} alt="Uploaded preview" className="w-full h-auto object-cover" />
          </div>
          <button
            onClick={handleGenerate}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Generate Full Body Image
          </button>
        </div>
      );
    }

    return <ImageUploader onImageUpload={setUploadedPhoto} />;
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            FullUni
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            From Half to Whole — Perfectly You.
          </p>
        </header>

        <main className="bg-white/70 rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-lg border border-slate-200 min-h-[400px] flex items-center justify-center">
          {renderContent()}
        </main>
        
        <footer className="text-center mt-8 text-slate-500 text-sm">
            <p>Powered by Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;