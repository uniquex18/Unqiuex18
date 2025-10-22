import React, { useCallback, useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);
  
  const handleClick = () => {
      inputRef.current?.click();
  }

  return (
    <div
      className="w-full max-w-lg p-8 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-400 hover:bg-slate-100/50 transition-colors duration-300"
      onClick={handleClick}
    >
      <input
        type="file"
        ref={inputRef}
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload an image"
      />
      <div className="text-center text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="mt-4 text-xl font-semibold">Click to upload an image</p>
        <p className="text-sm">or drag and drop (JPG, PNG)</p>
        <p className="text-xs mt-2 text-slate-400">Upload a half-body or cropped photo to get started.</p>
      </div>
    </div>
  );
};

export default ImageUploader;