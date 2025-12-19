import React, { useRef, useState } from 'react';

interface Props {
  onImageSelect: (base64: string) => void;
}

export const StepUpload: React.FC<Props> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        processImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Basic center crop to 1:1 square
  const processImage = (base64Str: string) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;
        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);
        const croppedBase64 = canvas.toDataURL('image/jpeg', 0.9);
        setPreview(croppedBase64);
        onImageSelect(croppedBase64);
      }
    };
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Envie sua Foto</h2>
        <p className="text-gray-400">A imagem que seu prato merece.</p>
      </div>

      <div 
        onClick={() => inputRef.current?.click()}
        className={`
          relative w-64 h-64 md:w-80 md:h-80 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all
          ${preview ? 'border-chef-500 bg-black' : 'border-gray-600 hover:border-chef-400 hover:bg-chef-800'}
        `}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
        ) : (
          <div className="text-center p-6">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-300 font-medium">Clique para Enviar</p>
            <p className="text-xs text-gray-500 mt-1">JPG ou PNG</p>
          </div>
        )}
        <input 
          ref={inputRef}
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
        />
      </div>

      {preview && (
         <button 
         onClick={() => inputRef.current?.click()}
         className="text-sm text-gray-400 hover:text-white underline"
       >
         Trocar foto
       </button>
      )}
    </div>
  );
};