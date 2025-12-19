import { GoogleGenAI } from "@google/genai";
import { ChefConfig, EnvironmentMode, LightingStyle, PhotoType } from "../types";
import { ENV_PRESETS, STUDIO_COLORS, STUDIO_TEXTURES } from "../constants";

const getGeminiClient = () => {
  // Use env var if available, otherwise use the hardcoded key provided by the user
  const apiKey = process.env.API_KEY || "AIzaSyCHIBAeLEgaDjQZeabzl45zIgGAZevZikI";
  
  if (!apiKey) {
    throw new Error("API Key ausente. No ambiente de produção (Vercel), você DEVE adicionar a variável de ambiente 'API_KEY' nas configurações do projeto.");
  }
  return new GoogleGenAI({ apiKey });
};

const buildPrompt = (config: ChefConfig): string => {
  const parts: string[] = [];

  // 1. Strict Task Definition
  parts.push("TASK: High-end Food Photography Compositing & Re-plating.");
  parts.push("INPUT: A photo of food (masked foreground).");
  
  const containerName = config.containerType.replace(/_/g, ' ');

  if (config.containerType === 'ORIGINAL') {
    parts.push("GOAL: Keep the food AND the original plate/container exactly as they are. Only replace the background surface/table behind it.");
  } else {
    parts.push(`GOAL: Digitally 're-plate' the food. Place the food realistically INSIDE or ON a '${containerName}'.`);
  }

  // 2. Strict Negative Constraints (Physics & Geometry)
  parts.push("STRICT PHYSICS RULES (CRITICAL):");
  parts.push("- NO CLIPPING: Food must not pass through the walls of the container (basket wires, bowl edges).");
  parts.push("- NO MERGING: The texture of the food must be distinct from the container. Do not blend gold nuggets with silver wire, for example.");
  parts.push("- SOLIDITY: The container must look solid and structurally capable of holding the food.");
  parts.push("- DO NOT change the food itself (keep texture, crispiness, and appetizing look).");
  
  if (config.containerType === 'ORIGINAL') {
     parts.push("- DO NOT MODIFY the vessel holding the food. Preserve the original plate/basket pixels.");
  }

  // 3. Environment/Background Construction
  let envPrompt = "";

  if (config.environmentMode === EnvironmentMode.PRESET && config.environmentPreset) {
    const preset = ENV_PRESETS.find(p => p.id === config.environmentPreset);
    envPrompt = preset ? preset.prompt : "clean professional background";
  } else if (config.environmentMode === EnvironmentMode.STUDIO_SOLID) {
    const colorObj = STUDIO_COLORS.find(c => c.id === config.environmentColor) || STUDIO_COLORS[0];
    const texObj = STUDIO_TEXTURES.find(t => t.id === config.environmentTexture) || STUDIO_TEXTURES[0];
    envPrompt = `Professional Studio Setting. Background: ${colorObj.prompt}. Surface/Tabletop: ${texObj.prompt}.`;
  } else if (config.environmentMode === EnvironmentMode.CUSTOM_TEXT && config.environmentPrompt) {
    envPrompt = config.environmentPrompt;
  } else if (config.environmentMode === EnvironmentMode.REFERENCE_IMAGE) {
    envPrompt = "Match the lighting and background vibes of the reference image.";
  }

  // 4. Container & Re-plating Logic (The Fix for 'Merged' issues)
  parts.push("COMPOSITION INSTRUCTIONS:");
  parts.push(`1. Analyze the perspective of the food.`);
  parts.push(`2. Generate the background: ${envPrompt}.`);

  if (config.containerType !== 'ORIGINAL') {
    parts.push(`3. GENERATE CONTAINER: Create a '${containerName}' aligned with the food's perspective.`);
    parts.push(`4. CONTAINMENT: Place the food strictly WITHIN the boundaries of the '${containerName}'.`);
    parts.push(`   - If it is a BASKET or BOWL: The food sits DEEP inside. The container walls must visually wrap around the food.`);
    parts.push(`   - If it is a FLAT BOARD/PLATE: The food sits firmly on top with realistic contact shadows.`);
    parts.push(`5. SEPARATION: Ensure a clear visual boundary between the food and the container material. Use contact shadows to define the separation.`);
  } else {
    parts.push("3. Preserve the original container visible in the source image.");
    parts.push("4. Blend the original container naturally onto the new background surface.");
  }

  // 5. Lighting & Atmosphere
  const lightMap: Record<LightingStyle, string> = {
    [LightingStyle.NATURAL]: "Soft, directional natural window light, creating depth.",
    [LightingStyle.WARM_GOLDEN]: "Golden hour sunlight, warm highlights, appetizing glow.",
    [LightingStyle.COOL_FRESH]: "Crisp, cool daylight, high clarity, fresh look.",
    [LightingStyle.STUDIO_BRIGHT]: "Multi-point commercial studio lighting, rim lights to separate food from background.",
    [LightingStyle.DRAMATIC]: "High contrast, moody lighting, strong shadows (chiaroscuro)."
  };

  parts.push(`Lighting Setup: ${lightMap[config.lighting]}`);
  
  if (config.photoType === PhotoType.STUDIO) {
    parts.push("Style: Commercial Product Photography. Sharp focus, clean composition, high-end catalog look.");
  } else {
    parts.push("Style: Lifestyle/Social Media. Shallow depth of field (bokeh), storytelling atmosphere, authentic vibe.");
  }

  parts.push("Output Quality: 8K resolution, hyper-realistic textures, accurate ray-traced reflections.");

  return parts.join("\n");
};

export const generateFoodImage = async (
  originalImageBase64: string,
  config: ChefConfig
): Promise<string> => {
  const ai = getGeminiClient();
  const prompt = buildPrompt(config);

  const parts: any[] = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: originalImageBase64.split(',')[1] || originalImageBase64 
      }
    },
    { text: prompt }
  ];

  if (config.environmentMode === EnvironmentMode.REFERENCE_IMAGE && config.environmentRefImage) {
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: config.environmentRefImage.split(',')[1] || config.environmentRefImage
      }
    });
    parts.push({ text: "Reference image for background style/colors:" });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image', 
    contents: {
      parts: parts
    },
    config: {
      temperature: 0.1, // Low temperature for adherence to prompts
      imageConfig: {
        aspectRatio: config.aspectRatio || "1:1"
      }
    }
  });

  const candidates = response.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error("No candidates returned from Gemini.");
  }

  const contentParts = candidates[0].content.parts;
  const imagePart = contentParts.find((p: any) => p.inlineData);
  
  if (imagePart && imagePart.inlineData) {
    return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
  }

  throw new Error("Gemini did not return an image. It might have refused the prompt.");
};