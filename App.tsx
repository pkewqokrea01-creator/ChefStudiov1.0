import React, { useState } from 'react';
import { AppState, CameraAngle, ChefConfig, EnvironmentMode, Framing, LightingStyle, PhotoType, ProductType } from './types';
import { STEP_LABELS } from './constants';
import { StepUpload } from './components/StepUpload';
import { StepConcept } from './components/StepConcept';
import { StepEnvironment } from './components/StepEnvironment';
import { StepCamera } from './components/StepCamera';
import { StepGenerate } from './components/StepGenerate';
import { generateFoodImage } from './services/geminiService';

const INITIAL_CONFIG: ChefConfig = {
  photoType: PhotoType.STUDIO,
  productType: ProductType.TRADITIONAL_DISH,
  containerType: 'ORIGINAL', // Default to original
  environmentMode: EnvironmentMode.PRESET,
  environmentPreset: 'clean_marble',
  cameraAngle: CameraAngle.FORTY_FIVE,
  framing: Framing.MEDIUM,
  lighting: LightingStyle.NATURAL,
  aspectRatio: '1:1'
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    step: 0,
    originalImage: null,
    processedImage: null,
    generatedImage: null,
    isGenerating: false,
    config: INITIAL_CONFIG,
    error: null
  });

  const updateConfig = (key: keyof ChefConfig, value: any) => {
    setState(prev => ({
      ...prev,
      config: { ...prev.config, [key]: value }
    }));
  };

  const handleImageSelect = (base64: string) => {
    setState(prev => ({
      ...prev,
      originalImage: base64,
      processedImage: base64, // Already cropped in component
      step: 1 // Move to next step
    }));
  };

  const handleNext = () => {
    if (state.step < STEP_LABELS.length - 1) {
      setState(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const handleBack = () => {
    if (state.step > 0) {
      setState(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleGenerate = async () => {
    if (!state.processedImage) return;

    setState(prev => ({ ...prev, isGenerating: true, error: null }));

    try {
      const resultBase64 = await generateFoodImage(state.processedImage, state.config);
      setState(prev => ({
        ...prev,
        generatedImage: resultBase64,
        isGenerating: false
      }));
    } catch (err: any) {
      console.error(err);
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: err.message || "Falha ao gerar imagem. Por favor, tente novamente."
      }));
    }
  };

  const handleReset = () => {
    setState({
      step: 0,
      originalImage: null,
      processedImage: null,
      generatedImage: null,
      isGenerating: false,
      config: INITIAL_CONFIG,
      error: null
    });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100 flex flex-col font-sans selection:bg-chef-500 selection:text-black">
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-gray-800 bg-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-chef-500 rounded-lg flex items-center justify-center text-black font-bold text-xl">
            C
          </div>
          <h1 className="text-xl font-bold tracking-tight">CHEF STUDIO</h1>
        </div>
        <div className="text-xs font-mono text-gray-500 uppercase">
          Beta v1.0
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800">
        <div 
          className="h-full bg-chef-500 transition-all duration-300 ease-out"
          style={{ width: `${((state.step) / (STEP_LABELS.length - 1)) * 100}%` }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-8">
        
        {/* Step Indicator */}
        <div className="mb-8 flex items-center justify-between">
           <span className="text-chef-500 font-bold uppercase text-sm tracking-widest">
            Passo {state.step + 1}
           </span>
           <span className="text-2xl font-bold text-white">
            {STEP_LABELS[state.step]}
           </span>
        </div>

        {/* Dynamic Step Component */}
        <div className="min-h-[60vh]">
          {state.step === 0 && <StepUpload onImageSelect={handleImageSelect} />}
          {state.step === 1 && <StepConcept config={state.config} updateConfig={updateConfig} />}
          {state.step === 2 && <StepEnvironment config={state.config} updateConfig={updateConfig} />}
          {state.step === 3 && <StepCamera config={state.config} updateConfig={updateConfig} />}
          {state.step === 4 && (
            <StepGenerate 
              config={state.config} 
              isGenerating={state.isGenerating} 
              generatedImage={state.generatedImage}
              error={state.error}
              onGenerate={handleGenerate}
              onReset={handleReset}
            />
          )}
        </div>

      </main>

      {/* Sticky Footer Navigation */}
      {state.step > 0 && state.step < 4 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 p-4">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-xl font-medium text-gray-400 hover:text-white transition-colors"
            >
              Voltar
            </button>
            
            <button
              onClick={handleNext}
              className="bg-chef-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-chef-400 transition-colors shadow-lg shadow-chef-500/20"
            >
              Próximo
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;