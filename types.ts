export enum PhotoType {
  STUDIO = 'STUDIO',
  LIFESTYLE = 'LIFESTYLE'
}

export enum ProductType {
  TRADITIONAL_DISH = 'TRADITIONAL_DISH', // Carne / Quente
  FAST_FOOD = 'FAST_FOOD',
  SNACK = 'SNACK',
  SALAD = 'SALAD',
  PIZZA = 'PIZZA',
  MEXICAN = 'MEXICAN',
  ORIENTAL = 'ORIENTAL',
  PASTA = 'PASTA',
  DESSERT = 'DESSERT',
  BAKERY = 'BAKERY',
  BOARD = 'BOARD', // Tabuas
  DRINK = 'DRINK',
  SOUP = 'SOUP',
  BENTO = 'BENTO' // Marmitas
}

// Environment Modes
export enum EnvironmentMode {
  PRESET = 'PRESET',
  CUSTOM_TEXT = 'CUSTOM_TEXT',
  REFERENCE_IMAGE = 'REFERENCE_IMAGE',
  STUDIO_SOLID = 'STUDIO_SOLID'
}

export type AspectRatio = '1:1' | '4:3' | '3:4' | '16:9' | '9:16';

export enum CameraAngle {
  TOP_DOWN = 'TOP_DOWN',
  FORTY_FIVE = 'FORTY_FIVE',
  EYE_LEVEL = 'EYE_LEVEL'
}

export enum Framing {
  MACRO = 'MACRO',
  MEDIUM = 'MEDIUM',
  WIDE = 'WIDE'
}

export enum LightingStyle {
  NATURAL = 'NATURAL',
  WARM_GOLDEN = 'WARM_GOLDEN',
  COOL_FRESH = 'COOL_FRESH',
  DRAMATIC = 'DRAMATIC',
  STUDIO_BRIGHT = 'STUDIO_BRIGHT'
}

export interface ChefConfig {
  photoType: PhotoType;
  productType: ProductType;
  containerType: string; // Changed from Enum to string to support dynamic lists
  environmentMode: EnvironmentMode;
  environmentPreset?: string;
  environmentColor?: string;
  environmentTexture?: string;
  environmentPrompt?: string;
  environmentRefImage?: string;
  cameraAngle: CameraAngle;
  framing: Framing;
  lighting: LightingStyle;
  aspectRatio: AspectRatio;
}

export interface AppState {
  step: number;
  originalImage: string | null;
  processedImage: string | null;
  generatedImage: string | null;
  isGenerating: boolean;
  config: ChefConfig;
  error: string | null;
}