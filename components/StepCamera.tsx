import React from 'react';
import { AspectRatio, CameraAngle, ChefConfig, Framing, LightingStyle } from '../types';
import { ASPECT_RATIOS, CAMERA_ANGLES, FRAMING_OPTS, LIGHTING_OPTS } from '../constants';

interface Props {
  config: ChefConfig;
  updateConfig: (key: keyof ChefConfig, value: any) => void;
}

export const StepCamera: React.FC<Props> = ({ config, updateConfig }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Câmera & Formato</h2>
        <p className="text-gray-400 text-sm">Ajustes finais antes da mágica.</p>
      </div>

       {/* Aspect Ratio - NOW ACTIVE */}
       <div className="space-y-3">
        <h3 className="text-sm font-semibold text-chef-500 uppercase tracking-wider">Resolução / Proporção</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {ASPECT_RATIOS.map((ratio) => (
            <button 
              key={ratio.id}
              onClick={() => updateConfig('aspectRatio', ratio.id as AspectRatio)}
              className={`
                 py-3 px-1 rounded-lg border transition-all flex flex-col items-center justify-center gap-1
                 ${config.aspectRatio === ratio.id 
                   ? 'bg-chef-900 border-chef-500 text-white shadow-[0_0_10px_rgba(245,158,11,0.2)]' 
                   : 'bg-chef-800 border-transparent text-gray-400 hover:bg-gray-700'}
              `}
            >
              <span className="text-xs font-bold">{ratio.id}</span>
              <span className="text-[10px] opacity-70">{ratio.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lighting */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-chef-500 uppercase tracking-wider">Iluminação</h3>
        <select 
          value={config.lighting}
          onChange={(e) => updateConfig('lighting', e.target.value as LightingStyle)}
          className="w-full bg-chef-800 text-white p-4 rounded-xl border border-gray-700 focus:border-chef-500 outline-none appearance-none cursor-pointer hover:bg-chef-700 transition-colors"
        >
          {Object.entries(LIGHTING_OPTS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Angle */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-chef-500 uppercase tracking-wider">Ângulo da Câmera</h3>
        <div className="flex gap-2">
          {Object.entries(CAMERA_ANGLES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => updateConfig('cameraAngle', key as CameraAngle)}
              className={`
                flex-1 py-3 px-2 rounded-lg text-xs md:text-sm font-medium border transition-all
                ${config.cameraAngle === key 
                  ? 'bg-chef-900 border-chef-500 text-white' 
                  : 'bg-chef-800 border-transparent text-gray-400 hover:bg-gray-700'}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Framing */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-chef-500 uppercase tracking-wider">Enquadramento / Zoom</h3>
        <div className="flex gap-2">
          {Object.entries(FRAMING_OPTS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => updateConfig('framing', key as Framing)}
              className={`
                flex-1 py-3 px-2 rounded-lg text-xs md:text-sm font-medium border transition-all
                ${config.framing === key 
                  ? 'bg-chef-900 border-chef-500 text-white' 
                  : 'bg-chef-800 border-transparent text-gray-400 hover:bg-gray-700'}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};