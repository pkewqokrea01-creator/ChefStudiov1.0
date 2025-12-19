import { CameraAngle, Framing, LightingStyle, PhotoType, ProductType } from "./types";

export const STEP_LABELS = [
  "Upload",
  "Conceito",
  "Ambiente",
  "Câmera",
  "Gerar"
];

export const PHOTO_TYPE_DETAILS = {
  [PhotoType.STUDIO]: {
    label: "Fotografia Comercial",
    desc: "Fundo limpo, foco total no produto, ideal para cardápios, e-commerce e delivery."
  },
  [PhotoType.LIFESTYLE]: {
    label: "Fotografia Editorial",
    desc: "Ambiente real, clima humano e storytelling, ideal para redes sociais e marketing."
  }
};

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  [ProductType.TRADITIONAL_DISH]: "Prato Principal (Quente)",
  [ProductType.FAST_FOOD]: "Fast Food / Burger",
  [ProductType.SNACK]: "Petiscos / Salgadinhos",
  [ProductType.SALAD]: "Saladas & Pratos Frios",
  [ProductType.PIZZA]: "Pizzas & Focaccias",
  [ProductType.MEXICAN]: "Mexicana / Street Food",
  [ProductType.ORIENTAL]: "Oriental / Japonês",
  [ProductType.PASTA]: "Massas & Risotos",
  [ProductType.DESSERT]: "Sobremesas & Doces",
  [ProductType.BAKERY]: "Padaria & Confeitaria",
  [ProductType.BOARD]: "Tábuas & Compartilháveis",
  [ProductType.DRINK]: "Bebidas",
  [ProductType.SOUP]: "Sopas & Caldos",
  [ProductType.BENTO]: "Marmitas & Executivos"
};

// Helper for 'Original' option
const OPTION_ORIGINAL = { id: 'ORIGINAL', label: '✨ Manter Empratamento Original' };

// Mapped Containers per Product Type
export const CATEGORY_CONTAINERS: Record<ProductType, { id: string, label: string }[]> = {
  [ProductType.TRADITIONAL_DISH]: [
    OPTION_ORIGINAL,
    { id: 'classic_plate', label: 'Prato Clássico' },
    { id: 'modern_plate', label: 'Prato Moderno' },
    { id: 'deep_plate', label: 'Prato Fundo' },
    { id: 'flat_plate', label: 'Prato Raso' },
    { id: 'oval_plate', label: 'Prato Oval' },
    { id: 'matte_black_plate', label: 'Prato Preto Fosco' },
    { id: 'handmade_ceramic_plate', label: 'Prato Cerâmica Artesanal' },
    { id: 'slate_plate', label: 'Prato de Pedra / Ardósia' },
    { id: 'cast_iron_skillet', label: 'Ferro Fundido' },
    { id: 'wooden_board', label: 'Tábua de Madeira' },
    { id: 'mini_casserole', label: 'Panela Individual (Ramequim)' }
  ],
  [ProductType.FAST_FOOD]: [
    OPTION_ORIGINAL,
    { id: 'delivery_packaging', label: 'Embalagem Delivery' },
    { id: 'custom_paper', label: 'Papel Manteiga Personalizado' },
    { id: 'open_burger_box', label: 'Caixa de Burger Aberta' },
    { id: 'wire_basket', label: 'Cesto Metálico (Diner)' },
    { id: 'fast_food_tray', label: 'Bandeja de Fast Food' },
    { id: 'rustic_wood_board', label: 'Tábua Rústica' },
    { id: 'enamel_plate', label: 'Prato Esmaltado' },
    { id: 'kraft_box', label: 'Caixa Kraft' },
    { id: 'window_box', label: 'Embalagem com Janela' }
  ],
  [ProductType.SNACK]: [
    OPTION_ORIGINAL,
    { id: 'bowl', label: 'Bowl / Tigela' },
    { id: 'wire_basket', label: 'Cesto Metálico' },
    { id: 'ceramic_bowl', label: 'Cumbuca de Cerâmica' },
    { id: 'small_plate', label: 'Prato Pequeno' },
    { id: 'wooden_board', label: 'Tábua de Madeira' },
    { id: 'kraft_paper', label: 'Papel Kraft' },
    { id: 'snack_cup', label: 'Copo Snack (Batata)' },
    { id: 'mini_pot', label: 'Mini Panela' },
    { id: 'snack_box', label: 'Caixa de Petiscos' },
    { id: 'gourmet_cardboard', label: 'Suporte de Papelão Gourmet' }
  ],
  [ProductType.SALAD]: [
    OPTION_ORIGINAL,
    { id: 'bowl', label: 'Bowl / Tigela' },
    { id: 'deep_plate', label: 'Prato Fundo' },
    { id: 'glass_plate', label: 'Prato de Vidro' },
    { id: 'clear_bowl', label: 'Bowl Transparente' },
    { id: 'acrylic_pot', label: 'Pote Acrílico' },
    { id: 'clear_delivery', label: 'Delivery Transparente' },
    { id: 'kraft_pot', label: 'Pote Kraft com Tampa' },
    { id: 'minimal_white_plate', label: 'Prato Branco Minimalista' }
  ],
  [ProductType.PIZZA]: [
    OPTION_ORIGINAL,
    { id: 'open_pizza_box', label: 'Caixa de Pizza Aberta' },
    { id: 'wooden_peel', label: 'Tábua de Madeira' },
    { id: 'pizza_stone', label: 'Pedra para Pizza' },
    { id: 'large_plate', label: 'Prato Grande' },
    { id: 'kraft_box', label: 'Caixa Kraft' },
    { id: 'parchment_paper', label: 'Papel Manteiga' },
    { id: 'metal_tray', label: 'Bandeja Metálica' },
    { id: 'slice_box', label: 'Caixa Triangular (Fatia)' }
  ],
  [ProductType.MEXICAN]: [
    OPTION_ORIGINAL,
    { id: 'wooden_board', label: 'Tábua de Madeira' },
    { id: 'taco_holder', label: 'Suporte de Taco' },
    { id: 'oval_plate', label: 'Prato Oval' },
    { id: 'wire_basket', label: 'Cesto Metálico' },
    { id: 'parchment_paper', label: 'Papel Manteiga' },
    { id: 'street_tray', label: 'Bandeja de Rua' },
    { id: 'street_food_wrap', label: 'Embalagem Street Food' },
    { id: 'open_kraft_box', label: 'Caixa Kraft Aberta' }
  ],
  [ProductType.ORIENTAL]: [
    OPTION_ORIGINAL,
    { id: 'rectangular_plate', label: 'Prato Retangular' },
    { id: 'matte_black_plate', label: 'Prato Preto Fosco' },
    { id: 'wooden_board_sushi', label: 'Tábua de Madeira (Geta)' },
    { id: 'slate_plate', label: 'Prato de Ardósia' },
    { id: 'oriental_bowl', label: 'Bowl Oriental' },
    { id: 'open_sushi_box', label: 'Caixa de Sushi Aberta' },
    { id: 'lacquered_tray', label: 'Bandeja Laqueada' },
    { id: 'minimal_ceramic', label: 'Cerâmica Minimalista' }
  ],
  [ProductType.PASTA]: [
    OPTION_ORIGINAL,
    { id: 'deep_plate', label: 'Prato Fundo' },
    { id: 'ceramic_plate', label: 'Prato de Cerâmica' },
    { id: 'classic_white_plate', label: 'Prato Branco Clássico' },
    { id: 'individual_pan', label: 'Panela Individual' },
    { id: 'porcelain_bowl', label: 'Bowl de Porcelana' },
    { id: 'rustic_plate', label: 'Prato Rústico' },
    { id: 'wooden_board', label: 'Tábua (Massas Recheadas)' }
  ],
  [ProductType.DESSERT]: [
    OPTION_ORIGINAL,
    { id: 'dessert_plate', label: 'Prato de Sobremesa' },
    { id: 'glass_plate', label: 'Prato de Vidro' },
    { id: 'dessert_glass', label: 'Taça' },
    { id: 'bowl', label: 'Bowl Pequeno' },
    { id: 'dessert_cup', label: 'Copo de Sobremesa' },
    { id: 'mirrored_plate', label: 'Prato Espelhado' },
    { id: 'cake_stand', label: 'Suporte de Bolo (Bailarina)' },
    { id: 'takeaway_box', label: 'Embalagem para Viagem' },
    { id: 'window_box', label: 'Caixa com Janela' }
  ],
  [ProductType.BAKERY]: [
    OPTION_ORIGINAL,
    { id: 'bread_basket', label: 'Cesta de Pão' },
    { id: 'wooden_board', label: 'Tábua de Madeira' },
    { id: 'ceramic_plate', label: 'Prato de Cerâmica' },
    { id: 'kraft_paper', label: 'Papel Kraft' },
    { id: 'display_stand', label: 'Suporte de Vitrine' },
    { id: 'baking_tray', label: 'Bandeja de Padaria' },
    { id: 'kraft_box', label: 'Caixa Kraft' },
    { id: 'vintage_plate', label: 'Prato Vintage' }
  ],
  [ProductType.BOARD]: [
    OPTION_ORIGINAL,
    { id: 'wooden_board', label: 'Tábua de Madeira' },
    { id: 'slate_board', label: 'Tábua de Ardósia' },
    { id: 'large_plate', label: 'Prato Grande' },
    { id: 'sharing_platter', label: 'Bandeja de Compartilhar' },
    { id: 'elevated_stand', label: 'Suporte Elevado' },
    { id: 'rustic_plate', label: 'Prato Rústico' },
    { id: 'mixed_board', label: 'Tábua Mista (Madeira + Pedra)' }
  ],
  [ProductType.DRINK]: [
    OPTION_ORIGINAL,
    { id: 'glass_cup', label: 'Copo' },
    { id: 'stem_glass', label: 'Taça' },
    { id: 'mug', label: 'Caneca' },
    { id: 'travel_cup', label: 'Copo Térmico' },
    { id: 'bottle', label: 'Garrafa' },
    { id: 'long_drink', label: 'Copo Long Drink' },
    { id: 'cup_straw', label: 'Copo com Canudo' },
    { id: 'teacup', label: 'Xícara' },
    { id: 'textured_glass', label: 'Copo Texturizado' },
    { id: 'ice_cup', label: 'Copo com Gelo' }
  ],
  [ProductType.SOUP]: [
    OPTION_ORIGINAL,
    { id: 'deep_bowl', label: 'Bowl Fundo' },
    { id: 'oriental_bowl', label: 'Tigela Oriental' },
    { id: 'rustic_mug', label: 'Caneca Rústica' },
    { id: 'individual_pot', label: 'Panela Individual' },
    { id: 'insulated_cup', label: 'Copo Térmico' },
    { id: 'ceramic_bowl', label: 'Bowl de Cerâmica' },
    { id: 'lidded_bowl', label: 'Tigela com Tampa' }
  ],
  [ProductType.BENTO]: [
    OPTION_ORIGINAL,
    { id: 'traditional_bento', label: 'Marmita Tradicional' },
    { id: 'premium_bento', label: 'Marmita Premium' },
    { id: 'divided_container', label: 'Embalagem com Divisórias' },
    { id: 'clear_pot', label: 'Pote Transparente' },
    { id: 'kraft_box', label: 'Caixa Kraft' },
    { id: 'meal_tray', label: 'Bandeja Refeição' },
    { id: 'sustainable_box', label: 'Embalagem Sustentável' }
  ]
};

// --- Studio Specifics ---
export const STUDIO_COLORS = [
  { id: 'pure_white', label: 'Branco Puro', hex: '#FFFFFF', prompt: 'pure white seamless background' },
  { id: 'pitch_black', label: 'Preto Infinito', hex: '#000000', prompt: 'pitch black seamless background' },
  { id: 'neutral_grey', label: 'Cinza Neutro', hex: '#808080', prompt: 'neutral grey professional studio background' },
  { id: 'pastel_pink', label: 'Rosa Pastel', hex: '#FFD1DC', prompt: 'soft pastel pink matte background' },
  { id: 'mint_green', label: 'Verde Menta', hex: '#98FF98', prompt: 'fresh mint green matte background' },
  { id: 'warm_beige', label: 'Bege Quente', hex: '#F5F5DC', prompt: 'warm beige aesthetic background' },
];

export const STUDIO_TEXTURES = [
  { id: 'smooth', label: 'Liso (Infinito)', prompt: 'seamless matte paper texture' },
  { id: 'marble_white', label: 'Mármore Carrara', prompt: 'luxurious white marble surface' },
  { id: 'granite_black', label: 'Granito Preto', prompt: 'black polished granite surface' },
  { id: 'light_wood', label: 'Madeira Clara', prompt: 'clean light oak wood surface' },
  { id: 'concrete', label: 'Cimento Queimado', prompt: 'modern industrial concrete surface' },
];

// --- Lifestyle Specifics ---
export const ENV_PRESETS = [
  { id: 'urban_cafe', label: 'Café Urbano', prompt: 'trendy cafe table next to a window, blurred city street background, daylight' },
  { id: 'rustic_restaurant', label: 'Restaurante Rústico', prompt: 'dark textured rustic wooden table, cozy warm restaurant atmosphere, bokeh lights' },
  { id: 'picnic_outdoors', label: 'Ao Ar Livre', prompt: 'outdoor natural light, picnic setting, sunny park background with greenery' },
  { id: 'luxury_dining', label: 'Jantar de Luxo', prompt: 'fine dining white tablecloth, crystal glass reflections, elegant evening atmosphere' },
  { id: 'home_kitchen', label: 'Cozinha de Casa', prompt: 'cozy bright home kitchen counter, blurred domestic background' },
  { id: 'neon_bar', label: 'Bar Noturno', prompt: 'dark moody atmosphere with neon sign reflections, modern bar setting' },
];

export const CAMERA_ANGLES = {
  [CameraAngle.TOP_DOWN]: "De Cima (Flat Lay)",
  [CameraAngle.FORTY_FIVE]: "45° Padrão",
  [CameraAngle.EYE_LEVEL]: "Nível dos Olhos"
};

export const FRAMING_OPTS = {
  [Framing.MACRO]: "Macro (Detalhe)",
  [Framing.MEDIUM]: "Médio (Padrão)",
  [Framing.WIDE]: "Aberto (Contexto)"
};

export const LIGHTING_OPTS = {
  [LightingStyle.NATURAL]: "Luz Natural",
  [LightingStyle.WARM_GOLDEN]: "Golden Hour (Quente)",
  [LightingStyle.COOL_FRESH]: "Frio & Fresco",
  [LightingStyle.STUDIO_BRIGHT]: "Estúdio Brilhante",
  [LightingStyle.DRAMATIC]: "Dramático & Moody"
};

export const ASPECT_RATIOS = [
  { id: '1:1', label: 'Quadrado (1:1)', icon: 'square' },
  { id: '4:3', label: 'Retrato (4:3)', icon: 'portrait' },
  { id: '3:4', label: 'Instagram (3:4)', icon: 'portrait' },
  { id: '16:9', label: 'Paisagem (16:9)', icon: 'landscape' },
  { id: '9:16', label: 'Stories (9:16)', icon: 'smartphone' }
];