import React, { useEffect } from 'react';
import { ChefConfig, PhotoType, ProductType } from '../types';
import { CATEGORY_CONTAINERS, PHOTO_TYPE_DETAILS, PRODUCT_TYPE_LABELS } from '../constants';

interface Props {
  config: ChefConfig;
  updateConfig: (key: keyof ChefConfig, value: any) => void;
}

export const StepConcept: React.FC<Props> = ({ config, updateConfig }) => {
  
  // When product type changes, reset container to "ORIGINAL" or the first option
  useEffect(() => {
    const availableContainers = CATEGORY_CONTAINERS[config.productType];
    const currentIsValid = availableContainers.some(c => c.id === config.containerType);
    
    if (!currentIsValid) {
      updateConfig('containerType', 'ORIGINAL');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.productType]);

  const availableContainers = CATEGORY_CONTAINERS[config.productType] || [];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Definir Conceito</h2>
        <p className="text-gray-400 text-sm">Como devemos apresentar sua comida?</p>
      </div>

      {/* Photo Type */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-chef-500 uppercase tracking-wider">Estilo de Fotografia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(PhotoType).map((type) => (
            <button
              key={type}
              onClick={() => updateConfig('photoType', type)}
              className={`
                p-5 rounded-xl text-left border transition-all flex flex-col gap-2
                ${config.photoType === type 
                  ? 'bg-chef-900 border-chef-500 ring-1 ring-chef-500 shadow-lg' 
                  : 'bg-chef-800 border-transparent hover:bg-chef-900'}
              `}
            >
              <div className="font-bold text-white text-lg">{PHOTO_TYPE_DETAILS[type].label}</div>
              <div className="text-sm text-gray-400 leading-relaxed">{PHOTO_TYPE_DETAILS[type].desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Product Type - Categories Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-chef-500 uppercase tracking-wider">Categoria do Produto</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(PRODUCT_TYPE_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => updateConfig('productType', key as ProductType)}
              className={`
                px-3 py-3 rounded-lg text-sm font-medium transition-all text-left truncate
                ${config.productType === key 
                  ? 'bg-chef-500 text-black shadow-lg' 
                  : 'bg-chef-800 text-gray-300 hover:bg-gray-700'}
              `}
              title={label}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Container Type - Dynamic Grid */}
      <div className="space-y-3 animate-fade-in">
        <h3 className="text-sm font-semibold text-chef-500 uppercase tracking-wider">
           Empratamento para {PRODUCT_TYPE_LABELS[config.productType]}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {availableContainers.map((container) => {
            const isOriginal = container.id === 'ORIGINAL';
            return (
              <button
                key={container.id}
                onClick={() => updateConfig('containerType', container.id)}
                className={`
                  p-3 rounded-lg text-sm font-medium border transition-all text-center flex items-center justify-center
                  ${config.containerType === container.id 
                    ? 'bg-chef-900 border-chef-500 text-white' 
                    : isOriginal ? 'bg-chef-800/50 border-gray-700 text-yellow-100 hover:bg-chef-800' : 'bg-chef-800 border-transparent text-gray-400 hover:bg-gray-700'}
                  ${isOriginal ? 'col-span-2 border-dashed' : ''}
                `}
              >
                {container.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};