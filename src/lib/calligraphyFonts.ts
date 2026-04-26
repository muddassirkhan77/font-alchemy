// Calligraphy Font Registry - Stunning Unicode Calligraphy Styles
// All outputs are pure Unicode text, copy-pasteable everywhere.

export interface CalliStyle {
  key: string;
  name: string;
  category: 'signature' | 'wedding' | 'luxury' | 'classic-ink';
  transformFn: (text: string) => string;
}

export interface CalliCategory {
  id: string;
  label: string;
  styles: CalliStyle[];
}

// ─── Base Unicode Mappers ───

function offsetMapper(uS: number, lS: number, dS?: number, exc?: Record<string, string>) {
  return (text: string) => {
    let r = '';
    for (const c of text) {
      const p = c.codePointAt(0)!;
      if (exc?.[c]) r += exc[c];
      else if (p >= 65 && p <= 90) r += String.fromCodePoint(uS + (p - 65));
      else if (p >= 97 && p <= 122) r += String.fromCodePoint(lS + (p - 97));
      else if (dS !== undefined && p >= 48 && p <= 57) r += String.fromCodePoint(dS + (p - 48));
      else r += c;
    }
    return r;
  };
}

function comb(text: string, combiner: string): string {
  return [...text].map(c => c === ' ' ? ' ' : c + combiner).join('');
}

// ─── Base Transforms ───

const scriptExc: Record<string, string> = {
  B: '\u212C', E: '\u2130', F: '\u2131', H: '\u210B', I: '\u2110',
  L: '\u2112', M: '\u2133', R: '\u211B', e: '\u212F', g: '\u210A', o: '\u2134',
};
const frakturExc: Record<string, string> = {
  C: '\u212D', H: '\u210C', I: '\u2111', R: '\u211C', Z: '\u2128',
};
const dsExc: Record<string, string> = {
  C: '\u2102', H: '\u210D', N: '\u2115', P: '\u2119', Q: '\u211A', R: '\u211D', Z: '\u2124',
};

const script = offsetMapper(0x1D49C, 0x1D4B6, undefined, scriptExc);
const boldScript = offsetMapper(0x1D4D0, 0x1D4EA);
const mathItalic = offsetMapper(0x1D434, 0x1D44E, undefined, { h: '\u210E' });
const boldItalic = offsetMapper(0x1D468, 0x1D482);
const fraktur = offsetMapper(0x1D504, 0x1D51E, undefined, frakturExc);
const boldFraktur = offsetMapper(0x1D56C, 0x1D586);
const doubleStruck = offsetMapper(0x1D538, 0x1D552, 0x1D7D8, dsExc);
const mathBold = offsetMapper(0x1D400, 0x1D41A, 0x1D7CE);

// ─── Decorators ───

function deco(prefix: string, suffix: string, fn: (t: string) => string) {
  return (t: string) => prefix + fn(t) + suffix;
}

// ─── Style Definitions ───

const allStyles: CalliStyle[] = [
  // ════════ SIGNATURE CALLIGRAPHY ════════
  { key: 'sig_golden', name: 'Golden Signature', category: 'signature',
    transformFn: deco('✦ ', ' ✦', script) },
  { key: 'sig_pure', name: 'Pure Script', category: 'signature',
    transformFn: script },
  { key: 'sig_elegant', name: 'Elegant Pen', category: 'signature',
    transformFn: deco('〰 ', ' 〰', boldScript) },
  { key: 'sig_flowing', name: 'Flowing Ink', category: 'signature',
    transformFn: (t) => comb(script(t), '\u0307') },
  { key: 'sig_royal', name: 'Royal Quill', category: 'signature',
    transformFn: deco('⚜ ', ' ⚜', script) },
  { key: 'sig_minimal', name: 'Minimal Script', category: 'signature',
    transformFn: deco('— ', ' —', mathItalic) },
  { key: 'sig_dotted', name: 'Dotted Signature', category: 'signature',
    transformFn: (t) => comb(script(t), '\u0323') },
  { key: 'sig_prestige', name: 'Prestige', category: 'signature',
    transformFn: deco('『 ', ' 』', boldScript) },

  // ════════ WEDDING CALLIGRAPHY ════════
  { key: 'wed_classic', name: 'Wedding Classic', category: 'wedding',
    transformFn: deco('𝒲 ♡ ', ' ♡', boldScript) },
  { key: 'wed_romantic', name: 'Romantic Flow', category: 'wedding',
    transformFn: deco('❦ ', ' ❦', script) },
  { key: 'wed_blossom', name: 'Blossom Script', category: 'wedding',
    transformFn: deco('✿ ', ' ✿', boldScript) },
  { key: 'wed_eternal', name: 'Eternal Vows', category: 'wedding',
    transformFn: deco('⊱ ', ' ⊰', script) },
  { key: 'wed_garden', name: 'Garden Party', category: 'wedding',
    transformFn: deco('🌿 ', ' 🌿', mathItalic) },
  { key: 'wed_heartfelt', name: 'Heartfelt', category: 'wedding',
    transformFn: deco('♥ ', ' ♥', boldScript) },
  { key: 'wed_grace', name: 'Grace', category: 'wedding',
    transformFn: (t) => '~ ' + comb(boldScript(t), '\u0308') + ' ~' },
  { key: 'wed_regal', name: 'Regal Invitation', category: 'wedding',
    transformFn: deco('〔 ', ' 〕', script) },

  // ════════ LUXURY SCRIPT ════════
  { key: 'lux_diamond', name: 'Diamond Luxury', category: 'luxury',
    transformFn: deco('◆ ', ' ◆', boldItalic) },
  { key: 'lux_bold', name: 'Bold Luxe', category: 'luxury',
    transformFn: boldItalic },
  { key: 'lux_crown', name: 'Crown Script', category: 'luxury',
    transformFn: deco('👑 ', ' 👑', boldScript) },
  { key: 'lux_noir', name: 'Noir Elegance', category: 'luxury',
    transformFn: deco('▪ ', ' ▪', mathBold) },
  { key: 'lux_platinum', name: 'Platinum', category: 'luxury',
    transformFn: (t) => comb(boldItalic(t), '\u0305') },
  { key: 'lux_velvet', name: 'Velvet', category: 'luxury',
    transformFn: deco('꧁ ', ' ꧂', boldScript) },
  { key: 'lux_premium', name: 'Premium Badge', category: 'luxury',
    transformFn: deco('【 ', ' 】', doubleStruck) },
  { key: 'lux_golden_gate', name: 'Golden Gate', category: 'luxury',
    transformFn: deco('≺ ', ' ≻', boldItalic) },

  // ════════ CLASSIC INK ════════
  { key: 'ink_gothic', name: 'Gothic Ink', category: 'classic-ink',
    transformFn: fraktur },
  { key: 'ink_bold_gothic', name: 'Bold Gothic', category: 'classic-ink',
    transformFn: boldFraktur },
  { key: 'ink_medieval', name: 'Medieval Script', category: 'classic-ink',
    transformFn: deco('⸎ ', ' ⸎', fraktur) },
  { key: 'ink_blackletter', name: 'Blackletter Deco', category: 'classic-ink',
    transformFn: deco('✠ ', ' ✠', boldFraktur) },
  { key: 'ink_manuscript', name: 'Old Manuscript', category: 'classic-ink',
    transformFn: (t) => comb(fraktur(t), '\u0332') },
  { key: 'ink_double', name: 'Double Struck Ink', category: 'classic-ink',
    transformFn: doubleStruck },
  { key: 'ink_ornate', name: 'Ornate Fraktur', category: 'classic-ink',
    transformFn: deco('꧁ ', ' ꧂', fraktur) },
  { key: 'ink_vintage', name: 'Vintage Press', category: 'classic-ink',
    transformFn: (t) => comb(boldFraktur(t), '\u0307') },
  { key: 'ink_runic', name: 'Runic Frame', category: 'classic-ink',
    transformFn: deco('᛭ ', ' ᛭', boldFraktur) },
  { key: 'ink_cathedral', name: 'Cathedral', category: 'classic-ink',
    transformFn: deco('⛪ ', ' ⛪', fraktur) },
  { key: 'ink_scroll', name: 'Ancient Scroll', category: 'classic-ink',
    transformFn: deco('📜 ', ' 📜', fraktur) },
  { key: 'ink_cross', name: 'Cross Ink', category: 'classic-ink',
    transformFn: deco('✝ ', ' ✝', boldFraktur) },

  // ════════ EXTRA SIGNATURE ════════
  { key: 'sig_wings', name: 'Winged Script', category: 'signature',
    transformFn: deco('𓆩 ', ' 𓆪', script) },
  { key: 'sig_sparkle', name: 'Sparkle Sign', category: 'signature',
    transformFn: deco('✨ ', ' ✨', boldScript) },
  { key: 'sig_star', name: 'Starlit Script', category: 'signature',
    transformFn: deco('★ ', ' ★', mathItalic) },
  { key: 'sig_leaf', name: 'Leaf Signature', category: 'signature',
    transformFn: deco('🍃 ', ' 🍃', script) },

  // ════════ EXTRA WEDDING ════════
  { key: 'wed_butterfly', name: 'Butterfly Script', category: 'wedding',
    transformFn: deco('🦋 ', ' 🦋', boldScript) },
  { key: 'wed_dove', name: 'Dove Love', category: 'wedding',
    transformFn: deco('🕊 ', ' 🕊', script) },
  { key: 'wed_ring', name: 'Ring Script', category: 'wedding',
    transformFn: deco('💍 ', ' 💍', boldScript) },
  { key: 'wed_rose', name: 'Rose Cursive', category: 'wedding',
    transformFn: deco('🌹 ', ' 🌹', script) },

  // ════════ EXTRA LUXURY ════════
  { key: 'lux_fire', name: 'Fire Luxe', category: 'luxury',
    transformFn: deco('🔥 ', ' 🔥', boldItalic) },
  { key: 'lux_gem', name: 'Gemstone', category: 'luxury',
    transformFn: deco('💎 ', ' 💎', boldScript) },
  { key: 'lux_star_gate', name: 'Star Gate', category: 'luxury',
    transformFn: deco('✯ ', ' ✯', mathBold) },
  { key: 'lux_chain', name: 'Chain Link', category: 'luxury',
    transformFn: deco('⛓ ', ' ⛓', doubleStruck) },

  // ════════ MODERN SIGNATURE (NEW) ════════
  { key: 'sig_modern_line', name: 'Modern Line', category: 'signature',
    transformFn: (t) => '— ' + script(t) + ' ⌁' },
  { key: 'sig_arrow_flow', name: 'Arrow Flow', category: 'signature',
    transformFn: deco('↬ ', ' ↫', boldScript) },
  { key: 'sig_quill_bar', name: 'Quill Bar', category: 'signature',
    transformFn: (t) => comb(boldScript(t), '\u0304') },
  { key: 'sig_smooth_dot', name: 'Smooth Dot', category: 'signature',
    transformFn: deco('· ', ' ·', boldScript) },

  // ════════ MODERN WEDDING (NEW) ════════
  { key: 'wed_lace', name: 'Lace Border', category: 'wedding',
    transformFn: deco('⊰❀ ', ' ❀⊱', boldScript) },
  { key: 'wed_pearl', name: 'Pearl Script', category: 'wedding',
    transformFn: deco('○ ', ' ○', script) },
  { key: 'wed_crown_heart', name: 'Crown of Hearts', category: 'wedding',
    transformFn: deco('♛♡ ', ' ♡♛', boldScript) },
  { key: 'wed_vine', name: 'Vine Script', category: 'wedding',
    transformFn: deco('๑ ', ' ๑', script) },

  // ════════ MODERN LUXURY (NEW) ════════
  { key: 'lux_black_card', name: 'Black Card', category: 'luxury',
    transformFn: deco('▰ ', ' ▰', boldItalic) },
  { key: 'lux_marble', name: 'Marble Frame', category: 'luxury',
    transformFn: deco('❮ ', ' ❯', boldScript) },
  { key: 'lux_eclipse', name: 'Eclipse Luxe', category: 'luxury',
    transformFn: deco('◐ ', ' ◑', boldItalic) },
  { key: 'lux_underline_gold', name: 'Underline Gold', category: 'luxury',
    transformFn: (t) => comb(boldItalic(t), '\u0332') },

  // ════════ MODERN INK (NEW) ════════
  { key: 'ink_quill_dash', name: 'Quill Dash', category: 'classic-ink',
    transformFn: deco('— ', ' —', fraktur) },
  { key: 'ink_arcane', name: 'Arcane Mark', category: 'classic-ink',
    transformFn: deco('☩ ', ' ☩', boldFraktur) },
  { key: 'ink_parchment', name: 'Parchment', category: 'classic-ink',
    transformFn: (t) => comb(fraktur(t), '\u0331') },
  { key: 'ink_wax_seal', name: 'Wax Seal', category: 'classic-ink',
    transformFn: deco('⊛ ', ' ⊛', boldFraktur) },
];

// ─── Grouped Export ───

export const calligraphyCategories: CalliCategory[] = [
  { id: 'signature', label: '✒️ Signature Calligraphy', styles: allStyles.filter(s => s.category === 'signature') },
  { id: 'wedding', label: '💒 Wedding Calligraphy', styles: allStyles.filter(s => s.category === 'wedding') },
  { id: 'luxury', label: '💎 Luxury Script', styles: allStyles.filter(s => s.category === 'luxury') },
  { id: 'classic-ink', label: '🖋️ Classic Ink', styles: allStyles.filter(s => s.category === 'classic-ink') },
];

export const allCalligraphyStyles = allStyles;

// Best 6 for trending section
export const trendingCalligraphyKeys = [
  'sig_golden', 'wed_classic', 'lux_crown', 'ink_gothic', 'sig_prestige', 'wed_romantic',
];

export function getTrendingCalligraphy(): CalliStyle[] {
  return trendingCalligraphyKeys.map(k => allStyles.find(s => s.key === k)!).filter(Boolean);
}
