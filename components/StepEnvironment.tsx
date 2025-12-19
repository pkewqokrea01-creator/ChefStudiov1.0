import React, { useRef } from 'react';
import { ChefConfig, EnvironmentMode, PhotoType } from '../types';
import { ENV_PRESETS, STUDIO_COLORS, STUDIO_TEXTURES } from '../constants';

interface Props {
  config: ChefConfig;
  updateConfig: (key: keyof ChefConfig, value: any) => void;
}

export const StepEnvironment: React.FC<Props> = ({ config, updateConfig }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isStudio = config.photoType === PhotoType.STUDIO;

  const handleRefImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateConfig('environmentRefImage', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- STUDIO MODE UI ---
  if (isStudio) {
    return (
      <div className="space-y-8 animate-fade-in pb-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Estúdio Profissional</h2>
          <p className="text-gray-400 text-sm">Configure o fundo e a superfície do seu produto.</p>
        </div>

        {/* Studio Tabs (implicitly just settings) */}
        <div className="space-y-6">
          
          {/* Background Colors */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-chef-500 uppercase tracking-wider">Cor de Fundo</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {STUDIO_COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => {
                    updateConfig('environmentMode', EnvironmentMode.STUDIO_SOLID);
                    updateConfig('environmentColor', color.id);
                  }}
                  className={`
                    group relative p-2 rounded-xl border transition-all flex flex-col items-center gap-2
                    ${config.environmentColor === color.id 
                      ? 'border-chef-500 bg-chef-900 ring-1 ring-chef-500' 
                      : 'border-transparent bg-chef-800 hover:bg-gray-700'}
                  `}
                >
                  <div 
                    className="w-full h-10 rounded-lg shadow-inner border border-gray-600/30"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs font-medium text-gray-300 group-hover:text-white">{color.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Surface Textures */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-chef-500 uppercase tracking-wider">Superfície / Textura</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {STUDIO_TEXTURES.map((tex) => (
                <button
                  key={tex.id}
                  onClick={() => {
                     updateConfig('environmentMode', EnvironmentMode.STUDIO_SOLID);
                     updateConfig('environmentTexture', tex.id);
                  }}
                  className={`
                    px-4 py-3 rounded-lg text-sm font-medium border text-left transition-all
                    ${config.environmentTexture === tex.id 
                      ? 'bg-chef-900 border-chef-500 text-white' 
                      : 'bg-chef-800 border-transparent text-gray-400 hover:bg-gray-700'}
                  `}
                >
                  {tex.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reference Image (Optional for Studio) */}
           <div className="pt-4 border-t border-gray-800">
             <button
               onClick={() => updateConfig('environmentMode', EnvironmentMode.REFERENCE_IMAGE)}
               className={`w-full text-center py-3 text-sm rounded-lg border border-dashed border-gray-700 text-gray-400 hover:text-white hover:border-chef-500 transition-all ${config.environmentMode === EnvironmentMode.REFERENCE_IMAGE ? 'bg-chef-900 border-chef-500 text-white' : ''}`}
             >
               Ou usar uma imagem de referência
             </button>
             
             {config.environmentMode === EnvironmentMode.REFERENCE_IMAGE && (
                <div className="mt-4 text-center">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-600 rounded-xl p-6 hover:bg-chef-800 cursor-pointer transition-colors"
                  >
                    {config.environmentRefImage ? (
                      <img 
                        src={config.environmentRefImage} 
                        alt="Reference" 
                        className="max-h-40 mx-auto rounded-lg object-cover"
                      />
                    ) : (
                      <div className="py-4">
                        <p className="text-gray-300 font-medium">Carregar Referência</p>
                      </div>
                    )}
                  </div>
                </div>
             )}
           </div>

        </div>
      </div>
    );
  }

  // --- LIFESTYLE MODE UI ---
  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Ambiente Lifestyle</h2>
        <p className="text-gray-400 text-sm">Escolha o cenário ideal para contar a história do prato.</p>
      </div>

      {/* Mode Selector */}
      <div className="flex bg-chef-800 p-1 rounded-xl">
        <button
          onClick={() => updateConfig('environmentMode', EnvironmentMode.PRESET)}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${config.environmentMode === EnvironmentMode.PRESET ? 'bg-chef-500 text-black shadow-lg' : 'text-gray-400'}`}
        >
          Cenários
        </button>
        <button
          onClick={() => updateConfig('environmentMode', EnvironmentMode.CUSTOM_TEXT)}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${config.environmentMode === EnvironmentMode.CUSTOM_TEXT ? 'bg-chef-500 text-black shadow-lg' : 'text-gray-400'}`}
        >
          Texto
        </button>
        <button
          onClick={() => updateConfig('environmentMode', EnvironmentMode.REFERENCE_IMAGE)}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${config.environmentMode === EnvironmentMode.REFERENCE_IMAGE ? 'bg-chef-500 text-black shadow-lg' : 'text-gray-400'}`}
        >
          Foto Ref
        </button>
      </div>

      <div className="min-h-[300px]">
        {config.environmentMode === EnvironmentMode.PRESET && (
          <div className="grid grid-cols-2 gap-4">
            {ENV_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => updateConfig('environmentPreset', preset.id)}
                className={`
                  p-4 rounded-xl border text-left transition-all relative overflow-hidden group
                  ${config.environmentPreset === preset.id 
                    ? 'bg-chef-900 border-chef-500 ring-1 ring-chef-500' 
                    : 'bg-chef-800 border-transparent hover:border-gray-600'}
                `}
              >
                <div className="relative z-10">
                  <div className="font-bold text-white mb-1 group-hover:text-chef-500 transition-colors">{preset.label}</div>
                  <div className="text-xs text-gray-500 line-clamp-2">{preset.prompt}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {config.environmentMode === EnvironmentMode.CUSTOM_TEXT && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">Prompt Criativo</label>
            <textarea
              className="w-full bg-chef-900 border border-gray-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-chef-500 focus:border-transparent outline-none h-40 resize-none"
              placeholder="Ex: Uma mesa de madeira rústica em um bistrô parisiense, iluminação quente, taça de vinho ao fundo..."
              value={config.environmentPrompt || ''}
              onChange={(e) => updateConfig('environmentPrompt', e.target.value)}
            />
          </div>
        )}

        {config.environmentMode === EnvironmentMode.REFERENCE_IMAGE && (
          <div className="space-y-4 text-center">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-600 rounded-xl p-8 hover:bg-chef-800 cursor-pointer transition-colors"
            >
              {config.environmentRefImage ? (
                <img 
                  src={config.environmentRefImage} 
                  alt="Reference" 
                  className="max-h-60 mx-auto rounded-lg object-cover"
                />
              ) : (
                <div className="py-8">
                  <p className="text-gray-300 font-medium">Envie uma Imagem de Referência</p>
                  <p className="text-xs text-gray-500 mt-2">A IA imitará a vibe, cores e iluminação.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Hidden Input for both modes */}
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleRefImageUpload}
        />
      </div>
    </div>
  );
};