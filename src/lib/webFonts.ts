// Google Web Fonts for visual preview (NOT copiable as styled text)
// These render beautifully via CSS but copy as plain text.

export interface WebFont {
  id: string;
  name: string;
  family: string; // CSS font-family value
  language: 'en' | 'ur' | 'ar';
  trending?: boolean;
}

export const webFonts: WebFont[] = [
  // English Calligraphy
  { id: 'great-vibes', name: 'Great Vibes', family: "'Great Vibes', cursive", language: 'en', trending: true },
  { id: 'dancing-script', name: 'Dancing Script', family: "'Dancing Script', cursive", language: 'en', trending: true },
  { id: 'pacifico', name: 'Pacifico', family: "'Pacifico', cursive", language: 'en' },
  { id: 'sacramento', name: 'Sacramento', family: "'Sacramento', cursive", language: 'en', trending: true },
  { id: 'alex-brush', name: 'Alex Brush', family: "'Alex Brush', cursive", language: 'en' },
  { id: 'allura', name: 'Allura', family: "'Allura', cursive", language: 'en' },
  { id: 'lobster', name: 'Lobster', family: "'Lobster', cursive", language: 'en', trending: true },
  { id: 'tangerine', name: 'Tangerine', family: "'Tangerine', cursive", language: 'en' },
  { id: 'pinyon-script', name: 'Pinyon Script', family: "'Pinyon Script', cursive", language: 'en' },
  { id: 'rouge-script', name: 'Rouge Script', family: "'Rouge Script', cursive", language: 'en' },
  { id: 'satisfy', name: 'Satisfy', family: "'Satisfy', cursive", language: 'en' },
  { id: 'berkshire-swash', name: 'Berkshire Swash', family: "'Berkshire Swash', cursive", language: 'en' },
  { id: 'calligraffitti', name: 'Calligraffitti', family: "'Calligraffitti', cursive", language: 'en' },
  { id: 'qwitcher-grypen', name: 'Qwitcher Grypen', family: "'Qwitcher Grypen', cursive", language: 'en', trending: true },
  { id: 'style-script', name: 'Style Script', family: "'Style Script', cursive", language: 'en' },
  { id: 'whisper', name: 'Whisper', family: "'Whisper', cursive", language: 'en' },
  { id: 'cookie', name: 'Cookie', family: "'Cookie', cursive", language: 'en' },
  // Arabic Calligraphy
  { id: 'amiri', name: 'Amiri', family: "'Amiri', serif", language: 'ar', trending: true },
  { id: 'scheherazade', name: 'Scheherazade New', family: "'Scheherazade New', serif", language: 'ar', trending: true },
  { id: 'lateef', name: 'Lateef', family: "'Lateef', serif", language: 'ar' },
  { id: 'aref-ruqaa', name: 'Aref Ruqaa', family: "'Aref Ruqaa', serif", language: 'ar', trending: true },
  { id: 'reem-kufi', name: 'Reem Kufi', family: "'Reem Kufi', sans-serif", language: 'ar' },
  { id: 'el-messiri', name: 'El Messiri', family: "'El Messiri', sans-serif", language: 'ar' },
];

export const webFontCategories = [
  { id: 'en', label: '🇬🇧 English Calligraphy', fonts: webFonts.filter(f => f.language === 'en') },
  { id: 'ar', label: '🇸🇦 Arabic Calligraphy', fonts: webFonts.filter(f => f.language === 'ar') },
];

// Google Fonts URL for loading all web fonts
export const googleFontsUrl = 
  'https://fonts.googleapis.com/css2?family=' +
  [
    'Great+Vibes', 'Dancing+Script', 'Pacifico', 'Sacramento',
    'Alex+Brush', 'Allura', 'Lobster', 'Tangerine',
    'Pinyon+Script', 'Rouge+Script', 'Satisfy', 'Berkshire+Swash',
    'Calligraffitti', 'Qwitcher+Grypen', 'Style+Script', 'Whisper', 'Cookie',
    'Amiri', 'Scheherazade+New', 'Lateef', 'Aref+Ruqaa', 'Reem+Kufi', 'El+Messiri',
  ].join('&family=') +
  '&display=swap';
