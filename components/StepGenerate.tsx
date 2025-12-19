import React, { useEffect } from 'react';
import { ChefConfig } from '../types';
import { LIGHTING_OPTS } from '../constants';

interface Props {
  config: ChefConfig;
  isGenerating: boolean;
  generatedImage: string | null;
  error: string | null;
  onGenerate: () => void;
  onReset: () => void;
}

export const StepGenerate: React.FC<Props> = ({ config, isGenerating, generatedImage, error, onGenerate, onReset }) => {
  
  // Auto-trigger generation on mount if not already generated
  useEffect(() => {
    if (!generatedImage && !isGenerating && !error) {
      onGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-full animate-fade-in space-y-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-chef-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-chef-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Preparando sua foto...</h2>
          <p className="text-gray-400">Aplicando {LIGHTING_OPTS[config.lighting].toLowerCase()}...</p>
          <p className="text-gray-500 text-sm mt-2">Isso pode levar até 30 segundos.</p>
        </div>
      </div>
    );
  }

  if (error) {
    const isKeyError = error.toLowerCase().includes('api key');
    
    return (
      <div className="flex flex-col items-center justify-center h-full animate-fade-in space-y-6">
        <div className="bg-red-900/20 p-6 rounded-2xl border border-red-500/50 max-w-lg text-center">
          <h3 className="text-red-400 font-bold text-lg mb-2">
            {isKeyError ? 'Configuração Necessária' : 'Problema no Forno'}
          </h3>
          <p className="text-gray-300 mb-4 text-sm leading-relaxed">{error}</p>
          
          {isKeyError && (
            <div className="bg-black/30 p-3 rounded-lg text-xs text-left mb-4 font-mono text-gray-400">
              Dica Vercel: Settings &gt; Environment Variables &gt; Add API_KEY
            </div>
          )}

          <button 
            onClick={onGenerate}
            className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-500 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in pb-20">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-1">Bon Appétit!</h2>
        <p className="text-gray-400 text-sm">Sua foto profissional está pronta.</p>
      </div>

      {generatedImage && (
        <div className="relative group">
          <img 
            src={generatedImage} 
            alt="Generated Food" 
            className="rounded-xl shadow-2xl max-h-[50vh] object-contain border border-gray-800"
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
             <a 
              href={generatedImage} 
              download={`chef-studio-${Date.now()}.jpg`}
              className="bg-chef-500 text-black px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-chef-400 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Baixar
            </a>
          </div>
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <button 
          onClick={onReset}
          className="text-gray-400 hover:text-white underline"
        >
          Começar Novo Prato
        </button>
      </div>
    </div>
  );
};