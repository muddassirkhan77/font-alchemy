// Signature Generator - Google Fonts that look like real pen signatures

export interface SignatureFont {
  id: string;
  name: string;
  family: string;
  category: 'elegant' | 'stylish' | 'natural' | 'bold' | 'minimal';
  weight?: number;
}

export const signatureFonts: SignatureFont[] = [
  // ── Elegant Signatures ──
  { id: 'sig-great-vibes', name: 'Great Vibes', family: "'Great Vibes', cursive", category: 'elegant' },
  { id: 'sig-alex-brush', name: 'Alex Brush', family: "'Alex Brush', cursive", category: 'elegant' },
  { id: 'sig-allura', name: 'Allura', family: "'Allura', cursive", category: 'elegant' },
  { id: 'sig-pinyon-script', name: 'Pinyon Script', family: "'Pinyon Script', cursive", category: 'elegant' },
  { id: 'sig-tangerine', name: 'Tangerine', family: "'Tangerine', cursive", category: 'elegant', weight: 700 },
  { id: 'sig-rouge-script', name: 'Rouge Script', family: "'Rouge Script', cursive", category: 'elegant' },
  { id: 'sig-mr-de-haviland', name: 'Mr De Haviland', family: "'Mr De Haviland', cursive", category: 'elegant' },
  { id: 'sig-herr-von', name: 'Herr Von Muellerhoff', family: "'Herr Von Muellerhoff', cursive", category: 'elegant' },

  // ── Stylish Signatures ──
  { id: 'sig-sacramento', name: 'Sacramento', family: "'Sacramento', cursive", category: 'stylish' },
  { id: 'sig-dancing-script', name: 'Dancing Script', family: "'Dancing Script', cursive", category: 'stylish', weight: 700 },
  { id: 'sig-parisienne', name: 'Parisienne', family: "'Parisienne', cursive", category: 'stylish' },
  { id: 'sig-satisfy', name: 'Satisfy', family: "'Satisfy', cursive", category: 'stylish' },
  { id: 'sig-marck-script', name: 'Marck Script', family: "'Marck Script', cursive", category: 'stylish' },
  { id: 'sig-cookie', name: 'Cookie', family: "'Cookie', cursive", category: 'stylish' },
  { id: 'sig-berkshire', name: 'Berkshire Swash', family: "'Berkshire Swash', cursive", category: 'stylish' },
  { id: 'sig-petit-formal', name: 'Petit Formal Script', family: "'Petit Formal Script', cursive", category: 'stylish' },
  { id: 'sig-ms-madi', name: 'Ms Madi', family: "'Ms Madi', cursive", category: 'stylish' },
  { id: 'sig-mr-dafoe', name: 'Mr Dafoe', family: "'Mr Dafoe', cursive", category: 'stylish' },

  // ── Natural / Messy Signatures ──
  { id: 'sig-caveat', name: 'Caveat', family: "'Caveat', cursive", category: 'natural', weight: 700 },
  { id: 'sig-nothing-you', name: 'Nothing You Could Do', family: "'Nothing You Could Do', cursive", category: 'natural' },
  { id: 'sig-rock-salt', name: 'Rock Salt', family: "'Rock Salt', cursive", category: 'natural' },
  { id: 'sig-permanent-marker', name: 'Permanent Marker', family: "'Permanent Marker', cursive", category: 'natural' },
  { id: 'sig-homemade-apple', name: 'Homemade Apple', family: "'Homemade Apple', cursive", category: 'natural' },
  { id: 'sig-calligraffitti', name: 'Calligraffitti', family: "'Calligraffitti', cursive", category: 'natural' },
  { id: 'sig-reenie-beanie', name: 'Reenie Beanie', family: "'Reenie Beanie', cursive", category: 'natural' },
  { id: 'sig-covered-by', name: 'Covered By Your Grace', family: "'Covered By Your Grace', cursive", category: 'natural' },
  { id: 'sig-just-me-again', name: 'Just Me Again Down Here', family: "'Just Me Again Down Here', cursive", category: 'natural' },
  { id: 'sig-la-belle', name: 'La Belle Aurore', family: "'La Belle Aurore', cursive", category: 'natural' },

  // ── Bold Signatures ──
  { id: 'sig-lobster', name: 'Lobster', family: "'Lobster', cursive", category: 'bold' },
  { id: 'sig-pacifico', name: 'Pacifico', family: "'Pacifico', cursive", category: 'bold' },
  { id: 'sig-yellowtail', name: 'Yellowtail', family: "'Yellowtail', cursive", category: 'bold' },
  { id: 'sig-kaushan', name: 'Kaushan Script', family: "'Kaushan Script', cursive", category: 'bold' },
  { id: 'sig-damion', name: 'Damion', family: "'Damion', cursive", category: 'bold' },
  { id: 'sig-courgette', name: 'Courgette', family: "'Courgette', cursive", category: 'bold' },
  { id: 'sig-engagement', name: 'Engagement', family: "'Engagement', cursive", category: 'bold' },

  // ── Minimal / Clean Signatures ──
  { id: 'sig-whisper', name: 'Whisper', family: "'Whisper', cursive", category: 'minimal' },
  { id: 'sig-monsieur', name: 'Monsieur La Doulaise', family: "'Monsieur La Doulaise', cursive", category: 'minimal' },
  { id: 'sig-montez', name: 'Montez', family: "'Montez', cursive", category: 'minimal' },
  { id: 'sig-league-script', name: 'League Script', family: "'League Script', cursive", category: 'minimal' },
  { id: 'sig-dawning', name: 'Dawning of a New Day', family: "'Dawning of a New Day', cursive", category: 'minimal' },
  { id: 'sig-give-you-glory', name: 'Give You Glory', family: "'Give You Glory', cursive", category: 'minimal' },
  { id: 'sig-cedarville', name: 'Cedarville Cursive', family: "'Cedarville Cursive', cursive", category: 'minimal' },
  { id: 'sig-over-the-rainbow', name: 'Over the Rainbow', family: "'Over the Rainbow', cursive", category: 'minimal' },
];

export interface SignatureCategory {
  id: string;
  label: string;
  fonts: SignatureFont[];
}

export const signatureCategories: SignatureCategory[] = [
  { id: 'elegant', label: '✒️ Elegant Signatures', fonts: signatureFonts.filter(f => f.category === 'elegant') },
  { id: 'stylish', label: '✨ Stylish Signatures', fonts: signatureFonts.filter(f => f.category === 'stylish') },
  { id: 'natural', label: '🖊️ Natural / Handwritten', fonts: signatureFonts.filter(f => f.category === 'natural') },
  { id: 'bold', label: '🖋️ Bold Signatures', fonts: signatureFonts.filter(f => f.category === 'bold') },
  { id: 'minimal', label: '〰️ Minimal / Clean', fonts: signatureFonts.filter(f => f.category === 'minimal') },
];

// Build Google Fonts URL for all signature fonts
const fontFamilies = signatureFonts.map(f => {
  const name = f.family.split("'")[1];
  const weight = f.weight ? `:wght@${f.weight}` : '';
  return `family=${name.replace(/\s+/g, '+')}${weight}`;
});
export const signatureGoogleFontsUrl = `https://fonts.googleapis.com/css2?${fontFamilies.join('&')}&display=swap`;
