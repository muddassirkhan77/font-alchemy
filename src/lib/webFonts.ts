// Google Web Fonts for visual preview (NOT copiable as styled text)
// These render beautifully via CSS but copy as plain text.

export interface WebFont {
  id: string;
  name: string;
  family: string; // CSS font-family value
  language: 'en' | 'ar';
  trending?: boolean;
  style?: string; // visual category hint
}

export const webFonts: WebFont[] = [
  // ── Elegant Scripts ──
  { id: 'great-vibes', name: 'Great Vibes', family: "'Great Vibes', cursive", language: 'en', trending: true, style: 'Elegant Script' },
  { id: 'alex-brush', name: 'Alex Brush', family: "'Alex Brush', cursive", language: 'en', style: 'Elegant Script' },
  { id: 'allura', name: 'Allura', family: "'Allura', cursive", language: 'en', style: 'Elegant Script' },
  { id: 'pinyon-script', name: 'Pinyon Script', family: "'Pinyon Script', cursive", language: 'en', style: 'Formal Script' },

  // ── Casual Handwriting ──
  { id: 'dancing-script', name: 'Dancing Script', family: "'Dancing Script', cursive", language: 'en', trending: true, style: 'Casual Hand' },
  { id: 'pacifico', name: 'Pacifico', family: "'Pacifico', cursive", language: 'en', style: 'Retro Hand' },
  { id: 'satisfy', name: 'Satisfy', family: "'Satisfy', cursive", language: 'en', style: 'Smooth Hand' },
  { id: 'cookie', name: 'Cookie', family: "'Cookie', cursive", language: 'en', style: 'Playful Hand' },
  { id: 'calligraffitti', name: 'Calligraffitti', family: "'Calligraffitti', cursive", language: 'en', style: 'Graffiti Hand' },

  // ── Thin / Delicate ──
  { id: 'sacramento', name: 'Sacramento', family: "'Sacramento', cursive", language: 'en', trending: true, style: 'Thin Delicate' },
  { id: 'whisper', name: 'Whisper', family: "'Whisper', cursive", language: 'en', style: 'Ultra Thin' },
  { id: 'monsieur-la-doulaise', name: 'Monsieur La Doulaise', family: "'Monsieur La Doulaise', cursive", language: 'en', style: 'Hairline Script' },
  { id: 'tangerine', name: 'Tangerine', family: "'Tangerine', cursive", language: 'en', style: 'Light Script' },

  // ── Bold Display ──
  { id: 'lobster', name: 'Lobster', family: "'Lobster', cursive", language: 'en', trending: true, style: 'Bold Display' },
  { id: 'berkshire-swash', name: 'Berkshire Swash', family: "'Berkshire Swash', cursive", language: 'en', style: 'Swash Display' },
  { id: 'norican', name: 'Norican', family: "'Norican', cursive", language: 'en', style: 'Thick Display' },

  // ── Signature / Flourish ──
  { id: 'mr-dafoe', name: 'Mr Dafoe', family: "'Mr Dafoe', cursive", language: 'en', style: 'Signature' },
  { id: 'mrs-saint-delafield', name: 'Mrs Saint Delafield', family: "'Mrs Saint Delafield', cursive", language: 'en', style: 'Signature' },
  { id: 'marck-script', name: 'Marck Script', family: "'Marck Script', cursive", language: 'en', trending: true, style: 'Quick Signature' },
  { id: 'ruthie', name: 'Ruthie', family: "'Ruthie', cursive", language: 'en', style: 'Loose Signature' },

  // ── Decorative / Ornamental ──
  { id: 'lovers-quarrel', name: 'Lovers Quarrel', family: "'Lovers Quarrel', cursive", language: 'en', style: 'Ornamental' },
  { id: 'bilbo-swash-caps', name: 'Bilbo Swash Caps', family: "'Bilbo Swash Caps', cursive", language: 'en', style: 'Swash Caps' },
  { id: 'carattere', name: 'Carattere', family: "'Carattere', cursive", language: 'en', style: 'Decorative' },

  // ── Classic / Formal ──
  { id: 'petit-formal-script', name: 'Petit Formal Script', family: "'Petit Formal Script', cursive", language: 'en', style: 'Formal Classic' },
  { id: 'niconne', name: 'Niconne', family: "'Niconne', cursive", language: 'en', style: 'Vintage' },
  { id: 'rouge-script', name: 'Rouge Script', family: "'Rouge Script', cursive", language: 'en', style: 'French Classic' },

  // ── NEW: Diverse Styles ──
  { id: 'cinzel-decorative', name: 'Cinzel Decorative', family: "'Cinzel Decorative', serif", language: 'en', trending: true, style: 'Roman Engraved' },
  { id: 'uncial-antiqua', name: 'Uncial Antiqua', family: "'Uncial Antiqua', serif", language: 'en', style: 'Celtic / Medieval' },
  { id: 'medieval-sharp', name: 'MedievalSharp', family: "'MedievalSharp', serif", language: 'en', style: 'Gothic Medieval' },
  { id: 'jim-nightshade', name: 'Jim Nightshade', family: "'Jim Nightshade', cursive", language: 'en', style: 'Dark Ornate' },
  { id: 'eagle-lake', name: 'Eagle Lake', family: "'Eagle Lake', serif", language: 'en', style: 'Celtic Serif' },
  { id: 'unifrakturmaguntia', name: 'UnifrakturMaguntia', family: "'UnifrakturMaguntia', serif", language: 'en', trending: true, style: 'Blackletter' },
  { id: 'metamorphous', name: 'Metamorphous', family: "'Metamorphous', serif", language: 'en', style: 'Art Nouveau' },
  { id: 'fascinate-inline', name: 'Fascinate Inline', family: "'Fascinate Inline', serif", language: 'en', style: 'Inline Display' },
  { id: 'fleur-de-leah', name: 'Fleur De Leah', family: "'Fleur De Leah', cursive", language: 'en', style: 'Flourish Script' },
  { id: 'luxurious-script', name: 'Luxurious Script', family: "'Luxurious Script', cursive", language: 'en', style: 'Luxury Script' },
  { id: 'ballet', name: 'Ballet', family: "'Ballet', cursive", language: 'en', style: 'Ultra Flourish' },
  { id: 'explora', name: 'Explora', family: "'Explora', cursive", language: 'en', style: 'Wild Calligraphy' },

  // ── Arabic Calligraphy ──
  { id: 'amiri', name: 'Amiri', family: "'Amiri', serif", language: 'ar', trending: true, style: 'Naskh' },
  { id: 'scheherazade', name: 'Scheherazade New', family: "'Scheherazade New', serif", language: 'ar', trending: true, style: 'Traditional Naskh' },
  { id: 'lateef', name: 'Lateef', family: "'Lateef', serif", language: 'ar', style: 'Nastaliq' },
  { id: 'aref-ruqaa', name: 'Aref Ruqaa', family: "'Aref Ruqaa', serif", language: 'ar', trending: true, style: 'Ruqaa' },
  { id: 'reem-kufi', name: 'Reem Kufi', family: "'Reem Kufi', sans-serif", language: 'ar', style: 'Kufi' },
  { id: 'el-messiri', name: 'El Messiri', family: "'El Messiri', sans-serif", language: 'ar', style: 'Modern Arabic' },
];

export const webFontCategories = [
  {
    id: 'en-elegant',
    label: 'Elegant Scripts',
    fonts: webFonts.filter(f => f.language === 'en' && ['Elegant Script', 'Formal Script'].includes(f.style || '')),
  },
  {
    id: 'en-casual',
    label: 'Casual & Handwriting',
    fonts: webFonts.filter(f => f.language === 'en' && (f.style || '').includes('Hand')),
  },
  {
    id: 'en-thin',
    label: 'Thin & Delicate',
    fonts: webFonts.filter(f => f.language === 'en' && ['Thin Delicate', 'Ultra Thin', 'Hairline Script', 'Light Script'].includes(f.style || '')),
  },
  {
    id: 'en-bold',
    label: 'Bold Display',
    fonts: webFonts.filter(f => f.language === 'en' && (f.style || '').includes('Display')),
  },
  {
    id: 'en-signature',
    label: 'Signature & Flourish',
    fonts: webFonts.filter(f => f.language === 'en' && (f.style || '').includes('Signature')),
  },
  {
    id: 'en-decorative',
    label: 'Decorative & Ornamental',
    fonts: webFonts.filter(f => f.language === 'en' && ['Ornamental', 'Swash Caps', 'Decorative', 'Dark Ornate', 'Art Nouveau', 'Inline Display', 'Flourish Script', 'Luxury Script', 'Ultra Flourish', 'Wild Calligraphy'].includes(f.style || '')),
  },
  {
    id: 'en-classic',
    label: 'Classic & Vintage',
    fonts: webFonts.filter(f => f.language === 'en' && ['Formal Classic', 'Vintage', 'French Classic'].includes(f.style || '')),
  },
  {
    id: 'en-gothic',
    label: 'Gothic & Medieval',
    fonts: webFonts.filter(f => f.language === 'en' && ['Roman Engraved', 'Celtic / Medieval', 'Gothic Medieval', 'Celtic Serif', 'Blackletter'].includes(f.style || '')),
  },
  {
    id: 'ar',
    label: '🇸🇦 Arabic Calligraphy',
    fonts: webFonts.filter(f => f.language === 'ar'),
  },
];

// Google Fonts URL for loading all web fonts
export const googleFontsUrl =
  'https://fonts.googleapis.com/css2?family=' +
  [
    'Great+Vibes', 'Dancing+Script', 'Pacifico', 'Sacramento',
    'Alex+Brush', 'Allura', 'Lobster', 'Tangerine',
    'Pinyon+Script', 'Rouge+Script', 'Satisfy', 'Berkshire+Swash',
    'Calligraffitti', 'Qwitcher+Grypen', 'Style+Script', 'Whisper', 'Cookie',
    'Petit+Formal+Script', 'Marck+Script', 'Niconne', 'Monsieur+La+Doulaise',
    'Mrs+Saint+Delafield', 'Herr+Von+Muellerhoff', 'Mr+Dafoe', 'Ruthie',
    'Norican', 'Bilbo+Swash+Caps', 'Lovers+Quarrel', 'Carattere',
    'Amiri', 'Scheherazade+New', 'Lateef', 'Aref+Ruqaa', 'Reem+Kufi', 'El+Messiri',
    // New diverse styles
    'Cinzel+Decorative', 'Uncial+Antiqua', 'MedievalSharp', 'Jim+Nightshade',
    'Eagle+Lake', 'UnifrakturMaguntia', 'Metamorphous', 'Fascinate+Inline',
    'Fleur+De+Leah', 'Luxurious+Script', 'Ballet', 'Explora',
  ].join('&family=') +
  '&display=swap';
