// Unicode Font Transformation Engine
// Maps A-Z, a-z, 0-9 to various Unicode Mathematical Alphanumeric blocks

export interface FontStyle {
  key: string;
  name: string;
  category: 'instagram' | 'calligraphy';
  supportsDigits: boolean;
  transformFn: (text: string) => string;
}

// Helper: create a mapper from offset-based Unicode blocks
function offsetMapper(
  upperStart: number,
  lowerStart: number,
  digitStart?: number,
  exceptions?: Record<string, string>
): (text: string) => string {
  return (text: string) => {
    let result = '';
    for (const char of text) {
      const code = char.codePointAt(0)!;
      const exChar = exceptions?.[char];
      if (exChar) {
        result += exChar;
      } else if (code >= 65 && code <= 90) {
        result += String.fromCodePoint(upperStart + (code - 65));
      } else if (code >= 97 && code <= 122) {
        result += String.fromCodePoint(lowerStart + (code - 97));
      } else if (digitStart !== undefined && code >= 48 && code <= 57) {
        result += String.fromCodePoint(digitStart + (code - 48));
      } else {
        result += char;
      }
    }
    return result;
  };
}

// Circled letters: Ⓐ=U+24B6 (uppercase), ⓐ=U+24D0 (lowercase), ①=U+2460 (digits 1-9), ⓪=U+24EA (0)
function circledMapper(text: string): string {
  let result = '';
  for (const char of text) {
    const code = char.codePointAt(0)!;
    if (code >= 65 && code <= 90) result += String.fromCodePoint(0x24B6 + (code - 65));
    else if (code >= 97 && code <= 122) result += String.fromCodePoint(0x24D0 + (code - 97));
    else if (code === 48) result += '\u24EA';
    else if (code >= 49 && code <= 57) result += String.fromCodePoint(0x2460 + (code - 49));
    else result += char;
  }
  return result;
}

// Fullwidth: Ａ=U+FF21, ａ=U+FF41, ０=U+FF10
function fullwidthMapper(text: string): string {
  let result = '';
  for (const char of text) {
    const code = char.codePointAt(0)!;
    if (code >= 65 && code <= 90) result += String.fromCodePoint(0xFF21 + (code - 65));
    else if (code >= 97 && code <= 122) result += String.fromCodePoint(0xFF41 + (code - 97));
    else if (code >= 48 && code <= 57) result += String.fromCodePoint(0xFF10 + (code - 48));
    else if (code === 32) result += '\u3000';
    else result += char;
  }
  return result;
}

// Small caps approximation
const smallCapsMap: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ',
  i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ',
  q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x',
  y: 'ʏ', z: 'ᴢ'
};
function smallCapsMapper(text: string): string {
  return [...text].map(c => smallCapsMap[c] || c).join('');
}

// Superscript (partial)
const superMap: Record<string, string> = {
  a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ',
  i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ',
  r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ',
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  A: 'ᴬ', B: 'ᴮ', D: 'ᴰ', E: 'ᴱ', G: 'ᴳ', H: 'ᴴ', I: 'ᴵ', J: 'ᴶ',
  K: 'ᴷ', L: 'ᴸ', M: 'ᴹ', N: 'ᴺ', O: 'ᴼ', P: 'ᴾ', R: 'ᴿ', T: 'ᵀ',
  U: 'ᵁ', V: 'ⱽ', W: 'ᵂ',
};
function superscriptMapper(text: string): string {
  return [...text].map(c => superMap[c] || c).join('');
}

// Subscript (partial)
const subMap: Record<string, string> = {
  a: 'ₐ', e: 'ₑ', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ',
  n: 'ₙ', o: 'ₒ', p: 'ₚ', r: 'ᵣ', s: 'ₛ', t: 'ₜ', u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
};
function subscriptMapper(text: string): string {
  return [...text].map(c => subMap[c] || c).join('');
}

// Squared letters Ⓐ → 🄰 (regional / squared)
function squaredMapper(text: string): string {
  let result = '';
  for (const char of text) {
    const code = char.codePointAt(0)!;
    if (code >= 65 && code <= 90) result += String.fromCodePoint(0x1F130 + (code - 65));
    else if (code >= 97 && code <= 122) result += String.fromCodePoint(0x1F130 + (code - 97));
    else result += char;
  }
  return result;
}

// Negative squared
function negSquaredMapper(text: string): string {
  let result = '';
  for (const char of text) {
    const code = char.codePointAt(0)!;
    if (code >= 65 && code <= 90) result += String.fromCodePoint(0x1F170 + (code - 65));
    else if (code >= 97 && code <= 122) result += String.fromCodePoint(0x1F170 + (code - 97));
    else result += char;
  }
  return result;
}

// Parenthesized: ⒜=U+249C (lowercase), ⑴=U+2474 (digits 1-9)
function parenthesizedMapper(text: string): string {
  let result = '';
  for (const char of text) {
    const code = char.codePointAt(0)!;
    if (code >= 97 && code <= 122) result += String.fromCodePoint(0x249C + (code - 97));
    else if (code >= 65 && code <= 90) result += String.fromCodePoint(0x249C + (code - 65));
    else if (code >= 49 && code <= 57) result += String.fromCodePoint(0x2474 + (code - 49));
    else if (code === 48) result += '⒪';
    else result += char;
  }
  return result;
}

// Decorative mappers using combining characters
function withCombining(text: string, combiner: string): string {
  return [...text].map(c => c === ' ' ? ' ' : c + combiner).join('');
}

function strikethroughMapper(text: string): string {
  return withCombining(text, '\u0336');
}

function underlineMapper(text: string): string {
  return withCombining(text, '\u0332');
}

function doubleUnderlineMapper(text: string): string {
  return withCombining(text, '\u0333');
}

function overlineMapper(text: string): string {
  return withCombining(text, '\u0305');
}

// Upside down
const flipMap: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ',
  i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd',
  q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x',
  y: 'ʎ', z: 'z',
  A: '∀', B: 'q', C: 'Ɔ', D: 'p', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H',
  I: 'I', J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ',
  Q: 'Q', R: 'ɹ', S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X',
  Y: '⅄', Z: 'Z',
  '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
  '8': '8', '9': '6', '0': '0',
  '.': '˙', ',': '\'', '?': '¿', '!': '¡', '\'': ',', '"': '„',
  '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{',
  '<': '>', '>': '<', '&': '⅋', '_': '‾',
};
function upsideDownMapper(text: string): string {
  return [...text].reverse().map(c => flipMap[c] || c).join('');
}

// Mirror text using reversed characters
function mirrorMapper(text: string): string {
  const mirrorMap: Record<string, string> = {
    a: 'ɒ', b: 'd', c: 'ɔ', d: 'b', e: 'ɘ', f: 'ꟻ', g: 'ǫ', h: 'ʜ',
    i: 'i', j: 'ꞁ', k: 'ʞ', l: 'l', m: 'm', n: 'ᴎ', o: 'o', p: 'q',
    q: 'p', r: 'ɿ', s: 'ꙅ', t: 'ƚ', u: 'u', v: 'v', w: 'w', x: 'x',
    y: 'ʏ', z: 'z',
    A: 'A', B: 'ꓭ', C: 'Ↄ', D: 'ꓷ', E: 'Ǝ', F: 'ꟻ', G: 'Ꭾ', H: 'H',
    I: 'I', J: 'Ⴑ', K: 'ꓘ', L: 'Ⴈ', M: 'M', N: 'Ͷ', O: 'O', P: 'ꓑ',
    Q: 'Ꝗ', R: 'Я', S: 'Ꙅ', T: 'T', U: 'U', V: 'V', W: 'W', X: 'X',
    Y: 'Y', Z: 'Z',
  };
  return [...text].reverse().map(c => mirrorMap[c] || c).join('');
}

// Aesthetic (vaporwave) - fullwidth + spaces
function aestheticMapper(text: string): string {
  return [...fullwidthMapper(text)].join(' ');
}

// Script exceptions (some chars have dedicated codepoints not in the block)
const scriptExceptions: Record<string, string> = {
  B: '\u212C', E: '\u2130', F: '\u2131', H: '\u210B', I: '\u2110',
  L: '\u2112', M: '\u2133', R: '\u211B', e: '\u212F', g: '\u210A', o: '\u2134',
};

const frakturExceptions: Record<string, string> = {
  C: '\u212D', H: '\u210C', I: '\u2111', R: '\u211C', Z: '\u2128',
};

const doubleStruckExceptions: Record<string, string> = {
  C: '\u2102', H: '\u210D', N: '\u2115', P: '\u2119', Q: '\u211A',
  R: '\u211D', Z: '\u2124',
};

// ===== STYLE REGISTRY =====

export const fontStyles: FontStyle[] = [
  // ---- INSTAGRAM STYLES ----
  { key: 'bold', name: 'Bold', category: 'instagram', supportsDigits: true,
    transformFn: offsetMapper(0x1D400, 0x1D41A, 0x1D7CE) },
  { key: 'italic', name: 'Italic', category: 'instagram', supportsDigits: false,
    transformFn: offsetMapper(0x1D434, 0x1D44E, undefined, { h: '\u210E' }) },
  { key: 'boldItalic', name: 'Bold Italic', category: 'instagram', supportsDigits: false,
    transformFn: offsetMapper(0x1D468, 0x1D482) },
  { key: 'sans', name: 'Sans Serif', category: 'instagram', supportsDigits: true,
    transformFn: offsetMapper(0x1D5A0, 0x1D5BA, 0x1D7E2) },
  { key: 'sansBold', name: 'Sans Bold', category: 'instagram', supportsDigits: true,
    transformFn: offsetMapper(0x1D5D4, 0x1D5EE, 0x1D7EC) },
  { key: 'sansItalic', name: 'Sans Italic', category: 'instagram', supportsDigits: false,
    transformFn: offsetMapper(0x1D608, 0x1D622) },
  { key: 'sansBoldItalic', name: 'Sans Bold Italic', category: 'instagram', supportsDigits: false,
    transformFn: offsetMapper(0x1D63C, 0x1D656) },
  { key: 'monospace', name: 'Monospace', category: 'instagram', supportsDigits: true,
    transformFn: offsetMapper(0x1D670, 0x1D68A, 0x1D7F6) },
  { key: 'doubleStruck', name: 'Double Struck', category: 'instagram', supportsDigits: true,
    transformFn: offsetMapper(0x1D538, 0x1D552, 0x1D7D8, doubleStruckExceptions) },
  { key: 'circled', name: 'Bubble / Circled', category: 'instagram', supportsDigits: true,
    transformFn: circledMapper },
  { key: 'fullwidth', name: 'Fullwidth', category: 'instagram', supportsDigits: true,
    transformFn: fullwidthMapper },
  { key: 'smallCaps', name: 'Small Caps', category: 'instagram', supportsDigits: false,
    transformFn: smallCapsMapper },
  { key: 'superscript', name: 'Superscript', category: 'instagram', supportsDigits: true,
    transformFn: superscriptMapper },
  { key: 'subscript', name: 'Subscript (partial)', category: 'instagram', supportsDigits: true,
    transformFn: subscriptMapper },
  { key: 'squared', name: 'Squared', category: 'instagram', supportsDigits: false,
    transformFn: squaredMapper },
  { key: 'negSquared', name: 'Negative Squared', category: 'instagram', supportsDigits: false,
    transformFn: negSquaredMapper },
  { key: 'parenthesized', name: 'Parenthesized', category: 'instagram', supportsDigits: true,
    transformFn: parenthesizedMapper },
  { key: 'strikethrough', name: 'Strikethrough', category: 'instagram', supportsDigits: false,
    transformFn: strikethroughMapper },
  { key: 'underline', name: 'Underline', category: 'instagram', supportsDigits: false,
    transformFn: underlineMapper },
  { key: 'upsideDown', name: 'Upside Down', category: 'instagram', supportsDigits: true,
    transformFn: upsideDownMapper },
  { key: 'aesthetic', name: 'Aesthetic / Vaporwave', category: 'instagram', supportsDigits: true,
    transformFn: aestheticMapper },
  { key: 'mirror', name: 'Mirror', category: 'instagram', supportsDigits: false,
    transformFn: mirrorMapper },

  // ---- CALLIGRAPHY STYLES ----
  { key: 'script', name: 'Script', category: 'calligraphy', supportsDigits: false,
    transformFn: offsetMapper(0x1D49C, 0x1D4B6, undefined, scriptExceptions) },
  { key: 'boldScript', name: 'Bold Script', category: 'calligraphy', supportsDigits: false,
    transformFn: offsetMapper(0x1D4D0, 0x1D4EA) },
  { key: 'fraktur', name: 'Fraktur', category: 'calligraphy', supportsDigits: false,
    transformFn: offsetMapper(0x1D504, 0x1D51E, undefined, frakturExceptions) },
  { key: 'boldFraktur', name: 'Bold Fraktur', category: 'calligraphy', supportsDigits: false,
    transformFn: offsetMapper(0x1D56C, 0x1D586) },
  { key: 'calliDoubleStruck', name: 'Ornamental Double Struck', category: 'calligraphy', supportsDigits: true,
    transformFn: offsetMapper(0x1D538, 0x1D552, 0x1D7D8, doubleStruckExceptions) },
  { key: 'calliItalic', name: 'Italic Calligraphy', category: 'calligraphy', supportsDigits: false,
    transformFn: offsetMapper(0x1D434, 0x1D44E, undefined, { h: '\u210E' }) },
  { key: 'calliBoldItalic', name: 'Bold Italic Calligraphy', category: 'calligraphy', supportsDigits: false,
    transformFn: offsetMapper(0x1D468, 0x1D482) },
  // Decorated calligraphy combos
  { key: 'scriptUnderline', name: 'Script Underline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => underlineMapper(offsetMapper(0x1D49C, 0x1D4B6, undefined, scriptExceptions)(t)) },
  { key: 'boldScriptUnderline', name: 'Bold Script Underline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => underlineMapper(offsetMapper(0x1D4D0, 0x1D4EA)(t)) },
  { key: 'frakturStrike', name: 'Fraktur Strikethrough', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => strikethroughMapper(offsetMapper(0x1D504, 0x1D51E, undefined, frakturExceptions)(t)) },
  { key: 'boldFrakturStrike', name: 'Bold Fraktur Strikethrough', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => strikethroughMapper(offsetMapper(0x1D56C, 0x1D586)(t)) },
  { key: 'scriptOverline', name: 'Script Overline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => overlineMapper(offsetMapper(0x1D49C, 0x1D4B6, undefined, scriptExceptions)(t)) },
  { key: 'boldScriptOverline', name: 'Bold Script Overline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => overlineMapper(offsetMapper(0x1D4D0, 0x1D4EA)(t)) },
  { key: 'frakturUnderline', name: 'Fraktur Underline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => underlineMapper(offsetMapper(0x1D504, 0x1D51E, undefined, frakturExceptions)(t)) },
  { key: 'boldFrakturUnderline', name: 'Bold Fraktur Underline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => underlineMapper(offsetMapper(0x1D56C, 0x1D586)(t)) },
  { key: 'scriptDoubleUnder', name: 'Script Double Underline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => doubleUnderlineMapper(offsetMapper(0x1D49C, 0x1D4B6, undefined, scriptExceptions)(t)) },
  { key: 'boldScriptDoubleUnder', name: 'Bold Script Double Underline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => doubleUnderlineMapper(offsetMapper(0x1D4D0, 0x1D4EA)(t)) },
  { key: 'italicOverline', name: 'Italic Overline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => overlineMapper(offsetMapper(0x1D434, 0x1D44E, undefined, { h: '\u210E' })(t)) },
  { key: 'boldItalicUnderline', name: 'Bold Italic Underline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => underlineMapper(offsetMapper(0x1D468, 0x1D482)(t)) },
  { key: 'doubleStruckOverline', name: 'Double Struck Overline', category: 'calligraphy', supportsDigits: true,
    transformFn: (t) => overlineMapper(offsetMapper(0x1D538, 0x1D552, 0x1D7D8, doubleStruckExceptions)(t)) },
  { key: 'frakturOverline', name: 'Fraktur Overline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => overlineMapper(offsetMapper(0x1D504, 0x1D51E, undefined, frakturExceptions)(t)) },
  { key: 'boldFrakturOverline', name: 'Bold Fraktur Overline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => overlineMapper(offsetMapper(0x1D56C, 0x1D586)(t)) },
  { key: 'scriptStrike', name: 'Script Strikethrough', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => strikethroughMapper(offsetMapper(0x1D49C, 0x1D4B6, undefined, scriptExceptions)(t)) },
  { key: 'boldScriptStrike', name: 'Bold Script Strikethrough', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => strikethroughMapper(offsetMapper(0x1D4D0, 0x1D4EA)(t)) },
  { key: 'italicUnderline', name: 'Italic Underline', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => underlineMapper(offsetMapper(0x1D434, 0x1D44E, undefined, { h: '\u210E' })(t)) },
  { key: 'italicStrike', name: 'Italic Strikethrough', category: 'calligraphy', supportsDigits: false,
    transformFn: (t) => strikethroughMapper(offsetMapper(0x1D434, 0x1D44E, undefined, { h: '\u210E' })(t)) },
  { key: 'doubleStruckUnderline', name: 'Double Struck Underline', category: 'calligraphy', supportsDigits: true,
    transformFn: (t) => underlineMapper(offsetMapper(0x1D538, 0x1D552, 0x1D7D8, doubleStruckExceptions)(t)) },
  { key: 'doubleStruckStrike', name: 'Double Struck Strikethrough', category: 'calligraphy', supportsDigits: true,
    transformFn: (t) => strikethroughMapper(offsetMapper(0x1D538, 0x1D552, 0x1D7D8, doubleStruckExceptions)(t)) },
];

export function transformText(text: string, styleKey: string): string {
  const style = fontStyles.find(s => s.key === styleKey);
  if (!style) return text;
  return style.transformFn(text);
}

export function getStylesByCategory(category: 'instagram' | 'calligraphy'): FontStyle[] {
  return fontStyles.filter(s => s.category === category);
}
