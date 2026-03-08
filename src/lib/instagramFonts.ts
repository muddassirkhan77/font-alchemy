// Instagram Font Styles - Full Categorized Registry
// ~150+ styles organized into 22 categories with Unicode transformations + decorations

export interface InstaStyle {
  key: string;
  name: string;
  transformFn: (text: string) => string;
}

export interface InstaCategory {
  name: string;
  styles: InstaStyle[];
}

// ═══════════════════════════════════════════
// BASE UNICODE MAPPERS
// ═══════════════════════════════════════════

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

function charMapper(map: Record<string, string>) {
  return (text: string) => [...text].map(c => map[c] ?? map[c.toLowerCase()] ?? c).join('');
}

function wrapEach(text: string, before: string, after: string): string {
  return [...text].map(c => c === ' ' ? ' ' : before + c + after).join('');
}

function joinWith(text: string, joiner: string): string {
  return [...text].filter(c => c !== '').join(joiner);
}

function deco(prefix: string, suffix: string, baseFn: (t: string) => string) {
  return (text: string) => prefix + baseFn(text) + suffix;
}

// ═══════════════════════════════════════════
// STANDARD TRANSFORMS (reused across styles)
// ═══════════════════════════════════════════

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

const boldScript = offsetMapper(0x1D4D0, 0x1D4EA);
const mathBold = offsetMapper(0x1D400, 0x1D41A, 0x1D7CE);
const script = offsetMapper(0x1D49C, 0x1D4B6, undefined, scriptExc);
const boldItalic = offsetMapper(0x1D468, 0x1D482);
const mathItalic = offsetMapper(0x1D434, 0x1D44E, undefined, { h: '\u210E' });
const boldFraktur = offsetMapper(0x1D56C, 0x1D586);
const doubleStruck = offsetMapper(0x1D538, 0x1D552, 0x1D7D8, dsExc);
const fraktur = offsetMapper(0x1D504, 0x1D51E, undefined, frakturExc);
const sansItalic = offsetMapper(0x1D608, 0x1D622);
const sansBoldItalic = offsetMapper(0x1D63C, 0x1D656);
const monospace = offsetMapper(0x1D670, 0x1D68A, 0x1D7F6);
const sansBold = offsetMapper(0x1D5D4, 0x1D5EE, 0x1D7EC);
const mathBoldItalic = offsetMapper(0x1D468, 0x1D482);
const sans = offsetMapper(0x1D5A0, 0x1D5BA, 0x1D7E2);

const smallCaps = charMapper({
  a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',
  n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'ꜱ',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ',
});

function circled(text: string): string {
  let r = '';
  for (const c of text) {
    const p = c.codePointAt(0)!;
    if (p >= 65 && p <= 90) r += String.fromCodePoint(0x24B6 + (p - 65));
    else if (p >= 97 && p <= 122) r += String.fromCodePoint(0x24D0 + (p - 97));
    else if (p === 48) r += '\u24EA';
    else if (p >= 49 && p <= 57) r += String.fromCodePoint(0x2460 + (p - 49));
    else r += c;
  }
  return r;
}

function negSquared(text: string): string {
  let r = '';
  for (const c of text) {
    const p = c.codePointAt(0)!;
    if (p >= 65 && p <= 90) r += String.fromCodePoint(0x1F170 + (p - 65));
    else if (p >= 97 && p <= 122) r += String.fromCodePoint(0x1F170 + (p - 97));
    else r += c;
  }
  return r;
}

function squared(text: string): string {
  let r = '';
  for (const c of text) {
    const p = c.codePointAt(0)!;
    if (p >= 65 && p <= 90) r += String.fromCodePoint(0x1F130 + (p - 65));
    else if (p >= 97 && p <= 122) r += String.fromCodePoint(0x1F130 + (p - 97));
    else r += c;
  }
  return r;
}

function negCircled(text: string): string {
  let r = '';
  for (const c of text) {
    const p = c.codePointAt(0)!;
    if (p >= 65 && p <= 90) r += String.fromCodePoint(0x1F150 + (p - 65));
    else if (p >= 97 && p <= 122) r += String.fromCodePoint(0x1F150 + (p - 97));
    else r += c;
  }
  return r;
}

function regionalSpaced(text: string): string {
  const chars: string[] = [];
  for (const c of text) {
    const p = c.codePointAt(0)!;
    if (p >= 65 && p <= 90) chars.push(String.fromCodePoint(0x1F1E6 + (p - 65)));
    else if (p >= 97 && p <= 122) chars.push(String.fromCodePoint(0x1F1E6 + (p - 97)));
    else chars.push(c);
  }
  return chars.join(' ');
}

function fullwidth(text: string): string {
  let r = '';
  for (const c of text) {
    const p = c.codePointAt(0)!;
    if (p >= 65 && p <= 90) r += String.fromCodePoint(0xFF21 + (p - 65));
    else if (p >= 97 && p <= 122) r += String.fromCodePoint(0xFF41 + (p - 97));
    else if (p >= 48 && p <= 57) r += String.fromCodePoint(0xFF10 + (p - 48));
    else if (p === 32) r += '\u3000';
    else r += c;
  }
  return r;
}

const flipMap: Record<string, string> = {
  a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',
  n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z',
  A:'∀',B:'q',C:'Ɔ',D:'p',E:'Ǝ',F:'Ⅎ',G:'⅁',H:'H',I:'I',J:'ſ',K:'ʞ',L:'˥',M:'W',
  N:'N',O:'O',P:'Ԁ',Q:'Q',R:'ɹ',S:'S',T:'⊥',U:'∩',V:'Λ',W:'M',X:'X',Y:'⅄',Z:'Z',
};
function upsideDown(text: string): string {
  return [...text].reverse().map(c => flipMap[c] || c).join('');
}

// identity
const id = (t: string) => t;

// ═══════════════════════════════════════════
// CUSTOM CHARACTER MAPS
// ═══════════════════════════════════════════

const cherokee = charMapper({
  A:'Ꭿ',B:'Ᏸ',C:'Ꮳ',D:'Ꮄ',E:'Ꮛ',F:'Ꮁ',G:'Ꮆ',H:'Ꮋ',I:'Ꭵ',J:'Ꮰ',K:'Ꮶ',L:'Ꮮ',M:'Ꮇ',
  N:'Ꮑ',O:'Ꮎ',P:'Ꭾ',Q:'Ꭴ',R:'Ꮢ',S:'Ꮥ',T:'Ꮏ',U:'Ꮼ',V:'Ꮙ',W:'Ꮗ',X:'✕',Y:'Ꮍ',Z:'Ꮓ',
  a:'ꭿ',b:'Ᏸ',c:'ꮳ',d:'ꮄ',e:'ꮛ',f:'ꮁ',g:'ꮆ',h:'ꮋ',i:'ꭵ',j:'ꮰ',k:'ꮶ',l:'ꮮ',m:'ꮇ',
  n:'ꮑ',o:'ꮎ',p:'ꭾ',q:'ꭴ',r:'ꮢ',s:'ꮥ',t:'ꮏ',u:'ꮼ',v:'ꮙ',w:'ꮗ',x:'✕',y:'ꮍ',z:'ꮓ',
});

const japanFlip = charMapper({
  A:'丹',B:'乃',C:'匚',D:'刀',E:'乇',F:'下',G:'ム',H:'卄',I:'丨',J:'ﾌ',K:'Ҝ',L:'ㄥ',M:'爪',
  N:'几',O:'口',P:'卩',Q:'㔿',R:'尺',S:'丂',T:'丅',U:'凵',V:'ᐯ',W:'山',X:'乂',Y:'ㄚ',Z:'乙',
  a:'丹',b:'乃',c:'匚',d:'刀',e:'乇',f:'下',g:'ム',h:'卄',i:'丨',j:'ﾌ',k:'Ҝ',l:'ㄥ',m:'爪',
  n:'几',o:'口',p:'卩',q:'㔿',r:'尺',s:'丂',t:'丅',u:'凵',v:'ᐯ',w:'山',x:'乂',y:'ㄚ',z:'乙',
});

const canadian = charMapper({
  A:'ᗩ',B:'ᗷ',C:'ᑕ',D:'ᗪ',E:'ᗴ',F:'ᖴ',G:'Ꮆ',H:'ᕼ',I:'Ꮖ',J:'ᒍ',K:'ᖽ',L:'ᒪ',M:'ᗰ',
  N:'ᑎ',O:'ᗝ',P:'ᑭ',Q:'ᑫ',R:'ᖇ',S:'Ꮥ',T:'ᑦ',U:'ᑌ',V:'ᐯ',W:'ᗯ',X:'᙭',Y:'Ꭹ',Z:'ᘔ',
  a:'ᗩ',b:'ᗷ',c:'ᑕ',d:'ᗪ',e:'ᗴ',f:'ᖴ',g:'Ꮆ',h:'ᕼ',i:'Ꮖ',j:'ᒍ',k:'ᖽ',l:'ᒪ',m:'ᗰ',
  n:'ᑎ',o:'ᗝ',p:'ᑭ',q:'ᑫ',r:'ᖇ',s:'Ꮥ',t:'ᑦ',u:'ᑌ',v:'ᐯ',w:'ᗯ',x:'᙭',y:'Ꭹ',z:'ᘔ',
});

const greekUpper = charMapper({
  A:'Δ',B:'β',C:'Ↄ',D:'Ð',E:'Σ',F:'F',G:'G',H:'Ħ',I:'I',J:'J',K:'Ҝ',L:'L',M:'M',
  N:'И',O:'Ø',P:'P',Q:'Q',R:'Я',S:'Ƨ',T:'Ŧ',U:'U',V:'V',W:'Щ',X:'Ж',Y:'¥',Z:'Z',
  a:'Δ',b:'β',c:'Ↄ',d:'Ð',e:'Σ',f:'F',g:'G',h:'Ħ',i:'I',j:'J',k:'Ҝ',l:'L',m:'M',
  n:'И',o:'Ø',p:'P',q:'Q',r:'Я',s:'Ƨ',t:'Ŧ',u:'U',v:'V',w:'Щ',x:'Ж',y:'¥',z:'Z',
});

const greekLower = charMapper({
  a:'α',b:'в',c:'¢',d:'∂',e:'є',f:'ƒ',g:'g',h:'н',i:'ι',j:'נ',k:'к',l:'ℓ',m:'м',
  n:'η',o:'σ',p:'ρ',q:'q',r:'я',s:'ѕ',t:'т',u:'υ',v:'ν',w:'ω',x:'χ',y:'у',z:'z',
  A:'α',B:'в',C:'¢',D:'∂',E:'є',F:'ƒ',G:'g',H:'н',I:'ι',J:'נ',K:'к',L:'ℓ',M:'м',
  N:'η',O:'σ',P:'ρ',Q:'q',R:'я',S:'ѕ',T:'т',U:'υ',V:'ν',W:'ω',X:'χ',Y:'у',Z:'z',
});

const currency = charMapper({
  A:'₳',B:'฿',C:'₵',D:'Đ',E:'Ɇ',F:'₣',G:'₲',H:'Ⱨ',I:'ł',J:'J',K:'₭',L:'Ⱡ',M:'₥',
  N:'₦',O:'Ø',P:'₱',Q:'Q',R:'Ɽ',S:'₴',T:'₮',U:'Ʉ',V:'V',W:'₩',X:'Ӿ',Y:'Ɏ',Z:'Ⱬ',
  a:'₳',b:'฿',c:'₵',d:'Đ',e:'Ɇ',f:'₣',g:'₲',h:'Ⱨ',i:'ł',j:'J',k:'₭',l:'Ⱡ',m:'₥',
  n:'₦',o:'Ø',p:'₱',q:'Q',r:'Ɽ',s:'₴',t:'₮',u:'Ʉ',v:'V',w:'₩',x:'Ӿ',y:'Ɏ',z:'Ⱬ',
});

const rusify = charMapper({
  a:'а',b:'в',c:'с',d:'ԁ',e:'ё',f:'ф',g:'ԍ',h:'н',i:'ї',j:'ј',k:'к',l:'л',m:'м',
  n:'п',o:'о',p:'р',q:'q',r:'я',s:'ѕ',t:'т',u:'ц',v:'ѵ',w:'щ',x:'х',y:'у',z:'з',
  A:'А',B:'В',C:'С',D:'Ԁ',E:'Ё',F:'Ф',G:'Ԍ',H:'Н',I:'Ї',J:'Ј',K:'К',L:'Л',M:'М',
  N:'П',O:'О',P:'Р',Q:'Q',R:'Я',S:'Ѕ',T:'Т',U:'Ц',V:'Ѵ',W:'Щ',X:'Х',Y:'У',Z:'З',
});

const squiggle1 = charMapper({
  a:'α',b:'Ⴆ',c:'ƈ',d:'ԃ',e:'ҽ',f:'ϝ',g:'ɠ',h:'ԋ',i:'ι',j:'ʝ',k:'ƙ',l:'ʅ',m:'ɱ',
  n:'ɳ',o:'σ',p:'ρ',q:'ϙ',r:'ɾ',s:'ʂ',t:'ƚ',u:'υ',v:'ʋ',w:'ɯ',x:'x',y:'ყ',z:'ȥ',
  A:'A',B:'B',C:'C',D:'D',E:'E',F:'F',G:'G',H:'H',I:'I',J:'J',K:'K',L:'L',M:'M',
  N:'N',O:'O',P:'P',Q:'Q',R:'R',S:'S',T:'T',U:'U',V:'V',W:'W',X:'X',Y:'Y',Z:'Z',
});

const squiggle2 = charMapper({
  a:'ค',b:'в',c:'¢',d:'∂',e:'є',f:'Ŧ',g:'ﻮ',h:'ђ',i:'เ',j:'ן',k:'к',l:'l',m:'м',
  n:'и',o:'๏',p:'ק',q:'q',r:'г',s:'ร',t:'t',u:'µ',v:'ש',w:'ฬ',x:'χ',y:'ψ',z:'z',
  A:'ค',B:'в',C:'¢',D:'∂',E:'є',F:'Ŧ',G:'ﻮ',H:'ђ',I:'เ',J:'ן',K:'к',L:'l',M:'м',
  N:'и',O:'๏',P:'ק',Q:'q',R:'г',S:'ร',T:'t',U:'µ',V:'ש',W:'ฬ',X:'χ',Y:'ψ',Z:'z',
});

const squiggle3 = charMapper({
  a:'ա',b:'ɮ',c:'ƈ',d:'ɖ',e:'ɛ',f:'ʄ',g:'ɢ',h:'ɦ',i:'ɨ',j:'ʝ',k:'ӄ',l:'ʟ',m:'ʍ',
  n:'ռ',o:'օ',p:'ք',q:'զ',r:'ʀ',s:'ֆ',t:'ȶ',u:'ʊ',v:'ʋ',w:'ա',x:'Ӽ',y:'ʏ',z:'ʐ',
  A:'Ա',B:'Ᏸ',C:'Ƈ',D:'Ɖ',E:'Ɛ',F:'Ք',G:'ɢ',H:'Ꮒ',I:'Ɨ',J:'Ʝ',K:'Ƙ',L:'Ꮮ',M:'Ɯ',
  N:'Ɲ',O:'Օ',P:'Ք',Q:'Ǫ',R:'Ʀ',S:'Ֆ',T:'Ƭ',U:'Ʊ',V:'Ʋ',W:'Ꮗ',X:'Ӽ',Y:'Ƴ',Z:'Ȥ',
});

const squiggle5 = charMapper({
  a:'ą',b:'ც',c:'ƈ',d:'ɖ',e:'ɛ',f:'ʄ',g:'ɠ',h:'ɧ',i:'ı',j:'ʝ',k:'ƙ',l:'Ɩ',m:'ɱ',
  n:'ŋ',o:'ơ',p:'℘',q:'զ',r:'ཞ',s:'ʂ',t:'ɬ',u:'น',v:'۷',w:'ῳ',x:'ჯ',y:'ყ',z:'ʑ',
  A:'A',B:'B',C:'C',D:'D',E:'E',F:'F',G:'G',H:'H',I:'I',J:'J',K:'K',L:'L',M:'M',
  N:'N',O:'O',P:'P',Q:'Q',R:'R',S:'S',T:'T',U:'U',V:'V',W:'W',X:'X',Y:'Y',Z:'Z',
});

const squiggle6 = charMapper({
  a:'ā',b:'b',c:'c',d:'d',e:'ē',f:'f',g:'g',h:'h',i:'ī',j:'j',k:'k',l:'l',m:'m',
  n:'ŋ',o:'ŏ',p:'p',q:'q',r:'r',s:'ง',t:'t',u:'ū',v:'v',w:'ຟ',x:'x',y:'ฯ',z:'z',
  A:'Ā',B:'B',C:'C',D:'D',E:'Ē',F:'F',G:'G',H:'H',I:'Ī',J:'J',K:'K',L:'L',M:'M',
  N:'Ŋ',O:'Ŏ',P:'P',Q:'Q',R:'R',S:'Ş',T:'T',U:'Ū',V:'V',W:'Ŵ',X:'X',Y:'Ŷ',Z:'Z',
});

const squiggle7 = charMapper({
  A:'Ƥ',B:'Ᏸ',C:'Ꮳ',D:'Ꭰ',E:'€',F:'Ꮀ',G:'Ꮆ',H:'Ꮒ',I:'Ɨ',J:'Ꮰ',K:'Ꮶ',L:'Ꮮ',M:'Ꮇ',
  N:'Ꮑ',O:'Ꮎ',P:'Ƥ',Q:'Ꭴ',R:'Ř',S:'Ꮥ',T:'Ꮏ',U:'Ꮼ',V:'Ꮙ',W:'Ŵ',X:'✕',Y:'Ꮍ',Z:'Ꮓ',
  a:'ƥ',b:'Ᏸ',c:'ꮳ',d:'ꭰ',e:'€',f:'ꮀ',g:'ꮆ',h:'ꮒ',i:'ɨ',j:'ꮰ',k:'ꮶ',l:'ꮮ',m:'ꮇ',
  n:'ꮑ',o:'ꮎ',p:'ƥ',q:'ꭴ',r:'ř',s:'ꮥ',t:'ꮏ',u:'ꮼ',v:'ꮙ',w:'ŵ',x:'✕',y:'ꮍ',z:'ꮓ',
});

const symbolStyle = charMapper({
  a:'â',b:'þ',c:'ç',d:'ð',e:'ê',f:'ƒ',g:'ğ',h:'ħ',i:'ï',j:'ĵ',k:'ķ',l:'ł',m:'m',
  n:'ñ',o:'ö',p:'þ',q:'q',r:'r',s:'š',t:'ţ',u:'û',v:'v',w:'w',x:'×',y:'ý',z:'ž',
  A:'Â',B:'Þ',C:'Ç',D:'Ð',E:'Ê',F:'Ƒ',G:'Ğ',H:'Ħ',I:'Ï',J:'Ĵ',K:'Ķ',L:'Ł',M:'M',
  N:'Ñ',O:'Ö',P:'Þ',Q:'Q',R:'R',S:'Š',T:'Ţ',U:'Û',V:'V',W:'W',X:'×',Y:'Ý',Z:'Ž',
});

// Crazy mixed - cycles through different transforms per char
function crazyMix(transforms: ((t: string) => string)[]) {
  return (text: string) => {
    return [...text].map((c, i) => {
      if (c === ' ') return ' ';
      const fn = transforms[i % transforms.length];
      return fn(c);
    }).join('');
  };
}

const crazy3 = crazyMix([greekLower, (t) => fullwidth(t), mathBold, (t) => mathBold(t), fraktur, circled, boldScript]);
const crazy4 = crazyMix([(t) => fullwidth(t), fraktur, mathBold, greekLower, doubleStruck, mathBold, greekLower]);
const crazy5 = crazyMix([greekLower, circled, greekLower, squiggle2, squiggle2, fraktur, squiggle7]);
const crazy6 = crazyMix([doubleStruck, canadian, circled, (t) => comb(t, '\u0367'), boldScript, (t) => comb(t, '\u0367'), squiggle2]);
const crazy8 = crazyMix([greekLower, (t) => negCircled(t[0] ?? ''), greekLower, (t) => fullwidth(t), script, script, circled]);
const crazy9 = crazyMix([(t) => fullwidth(t), circled, (t) => comb(t, '\u0367'), (t) => comb(t, '\u0367'), boldScript, circled, (t) => fullwidth(t)]);

// ═══════════════════════════════════════════
// CATEGORY REGISTRY
// ═══════════════════════════════════════════

export const instagramCategories: InstaCategory[] = [
  // ─── 1. Top Instagram Fonts ───
  {
    name: 'Top Instagram Fonts',
    styles: [
      { key: 'top_rainbow', name: 'Rainbow', transformFn: (t) => '▄︻デ' + comb(t, '\u0337') + '══━一' },
      { key: 'top_textgun', name: 'TextGun', transformFn: deco('•♬•♫', '•♬•♫•', doubleStruck) },
      { key: 'top_doublestrikedeco', name: 'DoubleStrikeDeco', transformFn: deco('꧁𓊈𒆜', '𒆜𓊉꧂', negSquared) },
      { key: 'top_blacksquaredd', name: 'BlackSquaredD', transformFn: cherokee },
      { key: 'top_classic', name: 'Classic', transformFn: deco('乂 ', ' 乂', fullwidth) },
      { key: 'top_crossed', name: 'Crossed', transformFn: deco('𝄟✮͢🦋⃟≛⃝𝄟✮⃝ ', '🍁⃝', (t) => '🇵' + greekLower(t.slice(1))) },
    ],
  },

  // ─── 2. Common Instagram Fonts ───
  {
    name: 'Common Instagram Fonts',
    styles: [
      { key: 'c_italic1', name: 'Italic', transformFn: mathBoldItalic },
      { key: 'c_italic2', name: 'Italic Cursive', transformFn: boldScript },
      { key: 'c_cursivebold', name: 'Cursive Bold', transformFn: mathBold },
      { key: 'c_bold', name: 'Bold Script', transformFn: script },
      { key: 'c_cursive', name: 'Small Caps', transformFn: smallCaps },
      { key: 'c_tiny', name: 'Bold Fraktur', transformFn: boldFraktur },
      { key: 'c_doublestruck', name: 'Double Struck', transformFn: doubleStruck },
      { key: 'c_greekstyle', name: 'Greek Style', transformFn: greekLower },
      { key: 'c_blackbubble', name: 'Black Bubble', transformFn: negCircled },
      { key: 'c_bluefont', name: 'Regional Indicator', transformFn: regionalSpaced },
      { key: 'c_fraktur', name: 'Fraktur', transformFn: fraktur },
      { key: 'c_sansitalic', name: 'Sans Italic', transformFn: sansItalic },
      { key: 'c_bolditalic', name: 'Sans Bold Italic', transformFn: sansBoldItalic },
      { key: 'c_monospace', name: 'Monospace', transformFn: monospace },
      { key: 'c_bubblefont', name: 'Bubble / Circled', transformFn: circled },
      { key: 'c_blacksquare', name: 'Black Squared', transformFn: negSquared },
      { key: 'c_whitesquare', name: 'White Squared', transformFn: squared },
      { key: 'c_currencystyle', name: 'Currency Style', transformFn: currency },
      { key: 'c_inkstyle', name: 'Ink Style', transformFn: (t) => comb(t, '\u0489') },
      { key: 'c_rusify', name: 'Rusify Font', transformFn: rusify },
      { key: 'c_japanflip', name: 'Japan Flip', transformFn: japanFlip },
      { key: 'c_flippedcaps', name: 'Flipped / Upside Down', transformFn: upsideDown },
      { key: 'c_neonglow', name: 'Neon Glow', transformFn: canadian },
      { key: 'c_greekupper', name: 'Greek Upper', transformFn: greekUpper },
      { key: 'c_uppercase', name: 'UpperCase', transformFn: (t) => t.toUpperCase() },
    ],
  },

  // ─── 3. Most Popular Instagram Name Fonts ───
  {
    name: 'Most Popular Name Fonts',
    styles: [
      { key: 'pop_butterfly', name: 'Butterfly Cursive', transformFn: deco('🦋', '🦋', boldScript) },
      { key: 'pop_cursiveboldd', name: 'Cursive Bold Deco', transformFn: deco('ıllıllı', 'ıllıllı', id) },
      { key: 'pop_venom', name: 'Venom Style', transformFn: deco('╚»★«╝', '╚»★«╝', id) },
      { key: 'pop_apple', name: 'Apple Style', transformFn: deco('꧁༺', '༻꧂', squiggle3) },
      { key: 'pop_stylish1', name: 'Stylish Names', transformFn: deco('꧁ঔৣ☬', '☬ঔৣ꧂', boldScript) },
      { key: 'pop_om', name: 'Om Style', transformFn: deco('꧁𓊈𒆜', '𒆜𓊉꧂', boldScript) },
      { key: 'pop_cursivedecor', name: 'Cursive Decor', transformFn: deco('꧁💖 ', ' 💖꧂', japanFlip) },
      { key: 'pop_japandeco', name: 'Japan Deco', transformFn: deco('♥️꯭ ⃝𝆺𝅥⃝꯭🫧꯭𓋥꯭⟬꯭', '⟭𓋥꯭♥️꯭ ⃝꯭𝆺𝅥⃝꯭🫧', squiggle3) },
      { key: 'pop_japandeco1', name: 'Japan Deco Alt', transformFn: deco('꧁༒☬', '☬༒꧂', boldScript) },
      { key: 'pop_stylishboxed', name: 'Stylish Boxed', transformFn: deco('★彡[', ']彡★', smallCaps) },
      { key: 'pop_bricksfont3', name: 'Music Panda', transformFn: deco('𝄟≛⃝ ', '𝄟≛⃝🐼', (t) => smallCaps(t.slice(0, -1)) + '𝕨') },
      { key: 'pop_musicpanda', name: 'Greek Decor Crown', transformFn: deco('👑⃟≛⃝ ', '🕊️⃟⋆≛⃝', greekLower) },
      { key: 'pop_greekdecor', name: 'Black Bubble', transformFn: negCircled },
      { key: 'pop_stylishbubble', name: 'Stylish Bubble', transformFn: negSquared },
      { key: 'pop_decorateddoublestruck', name: 'Decorated Double Struck', transformFn: deco('꧁𓊈𒆜', '𒆜𓊉꧂', negSquared) },
      { key: 'pop_wingssparkle', name: 'Wings Sparkle', transformFn: deco('🦋✨', '🕊✩⍣', id) },
      { key: 'pop_crazy', name: 'Crazy Style', transformFn: id },
    ],
  },

  // ─── 4. Attitude Instagram Name Fonts ───
  {
    name: 'Attitude Name Fonts',
    styles: [
      { key: 'att_decorshadow', name: 'Decor Shadow', transformFn: deco('◥꧁ད', 'ཌ꧂◤', boldFraktur) },
      { key: 'att_attitude1', name: 'Attitude Style', transformFn: deco('👑⃝🕊⃝❂͜͡ ', '⍣⃟❂͜͡࿐', boldScript) },
      { key: 'att_officialvibe', name: 'Official Vibe', transformFn: deco('◈➻❥≛⃝ ❍͜ғͥғɪᴄͣɪͫ͢͢͢ʟ', '❤⃟', id) },
      { key: 'att_vipattitude', name: 'VIP Attitude', transformFn: deco('🦋⃟ᴠͥɪͣᴘͫ✮⃝ ', '𝄟⃝', (t) => smallCaps(t.slice(0, -1)) + '𝕨') },
      { key: 'att_attitudesquare', name: 'Attitude Square', transformFn: deco('꧁༺', '༻꧂', currency) },
      { key: 'att_instaboy', name: 'Insta Boy Style', transformFn: deco('★彡[ ', ']彡★', regionalSpaced) },
    ],
  },

  // ─── 5. Instagram Name Fonts for Girls ───
  {
    name: 'Fonts for Girls',
    styles: [
      { key: 'girl_floral', name: 'Floral Cursive', transformFn: deco('🌸💕', '💕🌸', boldScript) },
      { key: 'girl_1', name: 'Girl Style 1', transformFn: deco('༒͢🦋⃟ ', '🦋⃟‌💙࿐', boldScript) },
      { key: 'girl_2', name: 'Girl Style 2', transformFn: deco('༒͢🦋⃟ ', '🦋⃟‌💙࿐', negSquared) },
      { key: 'girl_3', name: 'Girl Style 3', transformFn: deco('༒🦋✨', '✨🦋', squiggle3) },
      { key: 'girl_4', name: 'Girl Style 4', transformFn: deco('👑⃟≛⃝ 🕊⃟⋆≛⃝ ', '', (t) => '🇵' + greekLower(t.slice(1))) },
      { key: 'girl_5', name: 'Girl Style 5', transformFn: deco('𝄟✮͢🦋⃟≛⃝ ', '🍁⃝', (t) => smallCaps(t.slice(0, -1)) + '𝕨') },
      { key: 'girl_6', name: 'Girl Style 6', transformFn: deco('⏤͟͟͞➼⃟❦❤⃞ ', '🤍⃟💛❥⃟࿐', (t) => smallCaps(t.slice(0, -1)) + '𝕨') },
      { key: 'girl_7', name: 'Girl Style 7', transformFn: deco('꧁༺༒͢❥🦋⃟', '♥⃟🕊༻꧂', squiggle7) },
      { key: 'girl_8', name: 'Girl Style 8', transformFn: deco('❦✿⍣✡ღ', '✡⍣✿❦☠︎ঔৣ', boldFraktur) },
      { key: 'girl_9', name: 'Girl Style 9', transformFn: deco('🦋⃟ ', '💙࿐★', boldFraktur) },
      { key: 'girl_10', name: 'Girl Style 10', transformFn: deco('⁣♛꧁💖💞༒𓆩', '𓆪༒💕💖꧂⁣♛•°', boldFraktur) },
      { key: 'girl_11', name: 'Girl Style 11', transformFn: deco('༒✮͢🦋⃟≛⃝ ', '=✰ ❤️', squiggle3) },
      { key: 'girl_12', name: 'Girl Style 12', transformFn: deco('𝄟✮͢🦋⃟≛⃝𝄟✮⃝ ', '🍁⃝', (t) => '🇵' + greekLower(t.slice(1))) },
    ],
  },

  // ─── 6. Strikes Instagram Name Fonts ───
  {
    name: 'Strikes Fonts',
    styles: [
      { key: 'strike_strike', name: 'Strike', transformFn: (t) => comb(t, '\u0336') },
      { key: 'strike_tilde', name: 'Tilde StrikeThrough', transformFn: (t) => comb(t, '\u0334') },
      { key: 'strike_monoslash', name: 'Monospace Slash', transformFn: deco('👑__', '__👑', monospace) },
      { key: 'strike_slashthrough', name: 'Slash Through', transformFn: (t) => comb(t, '\u0337') },
      { key: 'strike_underline', name: 'Underline', transformFn: (t) => comb(t, '\u0332') },
    ],
  },

  // ─── 7. Floral Instagram Name Fonts ───
  {
    name: 'Floral Fonts',
    styles: [
      { key: 'floral_1', name: 'Floral Classic', transformFn: deco('˙·٠•●★[ ', ' ]★●•٠·˙', id) },
      { key: 'floral_2', name: 'Floral Star', transformFn: deco('✿⁂★ ', ' ★⁂✿', id) },
      { key: 'floral_3', name: 'Floral Bloom', transformFn: deco('◦•●◉✿⚘ ', ' ⚘✿◉●•◦', id) },
      { key: 'floral_4', name: 'Floral Bracket', transformFn: deco('꧁✿[ ', ' ]✿꧂', id) },
      { key: 'floral_5', name: 'Floral Black Bubble', transformFn: deco('◦•●◉✿[ ', ' ]✿◉●•◦', negCircled) },
      { key: 'floral_loved', name: 'Loved', transformFn: deco('ıllıllı', 'ıllıllı', id) },
    ],
  },

  // ─── 8. Gaming Instagram Name Fonts ───
  {
    name: 'Gaming Fonts',
    styles: [
      { key: 'game_ind', name: 'Ind', transformFn: deco('༄ᶦᶰᵈ᭄✿', '࿐', smallCaps) },
      { key: 'game_bolditalic', name: 'Bold Italic Box', transformFn: deco('◤ ', ' ◢', sansBoldItalic) },
      { key: 'game_ak', name: 'Ak', transformFn: deco('ᴀᴋ᭄', '✿࿐', smallCaps) },
      { key: 'game_op', name: 'Op', transformFn: deco('༄ᴼᴾ✿', '࿐', id) },
      { key: 'game_sword1', name: 'Sword 1', transformFn: deco('o==[]::::', '::::::>', id) },
      { key: 'game_sword2', name: 'Sword 2', transformFn: deco('¤==[]>>>>', '>>>>>', id) },
      { key: 'game_scar', name: 'Scar', transformFn: deco('︻╦╤─ ', ' ─╤╦︻', id) },
      { key: 'game_gun', name: 'Gun', transformFn: deco('▄︻┻═┳一•', '✿࿐', negCircled) },
    ],
  },

  // ─── 9. Fancy Instagram Name Fonts ───
  {
    name: 'Fancy Fonts',
    styles: [
      { key: 'fancy_sparkles', name: 'Sparkles', transformFn: deco('˜"°•.˜"°• ', ' •°"˜.•°"˜', id) },
      { key: 'fancy_musical', name: 'Musical', transformFn: deco('♫♪♩·.¸¸.·♩♪♫ ', ' ♫♪♩·.¸¸.·♩♪♫', id) },
      { key: 'fancy_barcode', name: 'Barcode', transformFn: deco('▌│█║▌║▌║ ', ' ║▌║▌║█│▌', id) },
      { key: 'fancy_equalizer', name: 'Equalizer', transformFn: deco('▁ ▂ ▄ ▅ ▆ ▇ █ ', ' █ ▇ ▆ ▅ ▄ ▂ ▁', id) },
    ],
  },

  // ─── 10. Bricks Instagram Name Fonts ───
  {
    name: 'Bricks Fonts',
    styles: [
      { key: 'brick_1', name: 'Bricks Small Caps', transformFn: deco('█⃞▓⃞▒⃞[', '▒⃞▓⃞█⃞', smallCaps) },
      { key: 'brick_2', name: 'Bricks White Square', transformFn: deco('█▓▒░', '░▒▓█', squared) },
      { key: 'brick_3', name: 'Bricks Black Square', transformFn: deco('█▓▒░', '░▒▓█', negSquared) },
      { key: 'brick_4', name: 'Bricks Greek Upper', transformFn: deco('█▓▒░⡷', '⢾░▒▓█', greekUpper) },
      { key: 'brick_5', name: 'Bricks Wave Greek', transformFn: deco('▀▄▀▄▀▄', '▀▄▀▄▀▄', greekUpper) },
      { key: 'brick_6', name: 'Bricks Wave White', transformFn: deco('▀▄▀▄▀▄', '▀▄▀▄▀▄', squared) },
      { key: 'brick_7', name: 'Bricks Wave Black', transformFn: deco('▀▄▀▄▀▄', '▀▄▀▄▀▄', negSquared) },
    ],
  },

  // ─── 11. Squiggle Instagram Name Fonts ───
  {
    name: 'Squiggle Fonts',
    styles: [
      { key: 'sq_1', name: 'Squiggle 1', transformFn: squiggle1 },
      { key: 'sq_2', name: 'Squiggle 2', transformFn: squiggle2 },
      { key: 'sq_3', name: 'Squiggle 3', transformFn: squiggle3 },
      { key: 'sq_4', name: 'Cherokee', transformFn: cherokee },
      { key: 'sq_5', name: 'Squiggle 5', transformFn: squiggle5 },
      { key: 'sq_6', name: 'Squiggle 6', transformFn: squiggle6 },
      { key: 'sq_7', name: 'Currency Squiggle', transformFn: squiggle7 },
      { key: 'sq_wide', name: 'Wide', transformFn: fullwidth },
      { key: 'sq_doublestruck2', name: 'Double Struck Decor', transformFn: deco('⫷【⪩', '⪨】⫸', doubleStruck) },
      { key: 'sq_doubleunderline', name: 'Double Underline', transformFn: (t) => comb(t, '\u0333') },
    ],
  },

  // ─── 12. Weird Instagram Name Fonts ───
  {
    name: 'Weird Fonts',
    styles: [
      { key: 'weird_bridge_above', name: 'Bridge Above', transformFn: (t) => comb(t, '\u0346') },
      { key: 'weird_bridge_below', name: 'Bridge Below', transformFn: (t) => comb(t, '\u033A') },
      { key: 'weird_cross', name: 'Cross Above & Below', transformFn: (t) => comb(comb(t, '\u0353'), '\u033D') },
      { key: 'weird_candrabindu', name: 'Candrabindu', transformFn: (t) => comb(t, '\u0310') },
      { key: 'weird_zigzag', name: 'Zigzag Above', transformFn: (t) => comb(t, '\u035B') },
      { key: 'weird_sunflower', name: 'Sunflower', transformFn: deco('🌻 ( ', ' ) 🌻', monospace) },
    ],
  },

  // ─── 13. Crazy Instagram Name Fonts ───
  {
    name: 'Crazy Fonts',
    styles: [
      { key: 'crazy_stinky', name: 'Stinky', transformFn: (t) => comb(t, '\u033E') },
      { key: 'crazy_arrowbelow', name: 'Arrow Below', transformFn: (t) => comb(t, '\u034E') },
      { key: 'crazy_symbol', name: 'Symbol', transformFn: symbolStyle },
    ],
  },

  // ─── 14. Boxed Instagram Name Fonts ───
  {
    name: 'Boxed Fonts',
    styles: [
      { key: 'box_weird', name: 'Weirdbox', transformFn: (t) => wrapEach(t, '[', ']') },
      { key: 'box_thick', name: 'Thickblock', transformFn: (t) => wrapEach(t, '⟦', '⟧') },
      { key: 'box_diametric', name: 'Diametricblock', transformFn: (t) => wrapEach(t, '⦑', '⦒') },
      { key: 'box_dot', name: 'Dotbox', transformFn: (t) => wrapEach(t, '꜍', '꜉') },
      { key: 'box_rounddot', name: 'Rounddot', transformFn: (t) => wrapEach(comb(t, '\u0324\u0308'), '﴾', '﴿') },
      { key: 'box_angular', name: 'Angular', transformFn: (t) => wrapEach(comb(t, '\u033C'), '⧼', '⧽') },
      { key: 'box_arrow', name: 'Arrowblock', transformFn: (t) => wrapEach(comb(t, '\u0302'), '⦏', '⦎') },
      { key: 'box_bbracket', name: 'BBracket', transformFn: (t) => wrapEach(t, '【', '】') },
      { key: 'box_wbracket', name: 'WBracket', transformFn: (t) => wrapEach(t, '〖', '〗') },
    ],
  },

  // ─── 15. Joiner Instagram Name Fonts ───
  {
    name: 'Joiner Fonts',
    styles: [
      { key: 'join_hearts', name: 'Hearts Between', transformFn: (t) => '♥' + joinWith(t, '♥') + '♥' },
      { key: 'join_wavy', name: 'Wavy Joiner', transformFn: (t) => '≋' + joinWith(t, '≋') + '≋' },
      { key: 'join_dotty', name: 'Dotty Joiner', transformFn: (t) => '░' + joinWith(t, '░') + '░' },
      { key: 'join_dottyg', name: 'Dotty Joiner Gold', transformFn: deco('༄✿', '✿࿐', (t) => '░' + joinWith(smallCaps(t), '░')) },
      { key: 'join_widedotty', name: 'Wide Dotty Joiner', transformFn: fullwidth },
      { key: 'join_widedotty2', name: 'Wide Dotty Bracket', transformFn: deco('【', '】', (t) => joinWith(t, '░')) },
    ],
  },

  // ─── 16. Cursive Instagram Name Fonts ───
  {
    name: 'Cursive Name Fonts',
    styles: [
      { key: 'cursive_0', name: 'Cursive Deco', transformFn: deco('༒✮͢🦋⃟≛⃝ ', '=✰ ❤️', boldScript) },
      { key: 'cursive_1', name: 'Cursive Floral', transformFn: deco('◦•●◉✿', '✿◉●•◦', boldScript) },
      { key: 'cursive_2', name: 'Cursive Bracket', transformFn: deco('꧁', '꧂', boldScript) },
      { key: 'cursive_3', name: 'Cursive Butterfly', transformFn: deco('🦋⁂༄', '༄⁂🦋', boldScript) },
      { key: 'cursive_4', name: 'Cursive Purple', transformFn: deco('𓆩💜𓆪', '𓆩💜𓆪', boldScript) },
      { key: 'cursive_5', name: 'Cursive Blue', transformFn: deco('💙', '💙', boldScript) },
    ],
  },

  // ─── 17. Bubble Instagram Name Fonts ───
  {
    name: 'Bubble Name Fonts',
    styles: [
      { key: 'bubble_0', name: 'Bubble Crown', transformFn: deco('💎⟭⟬👑✨', '⟭⟬✨💜💎', negCircled) },
      { key: 'bubble_1', name: 'Bubble Floral', transformFn: deco('◦•●◉', '◉●•◦', negCircled) },
      { key: 'bubble_2', name: 'Bubble Star', transformFn: deco('꧁★', '★꧂', negCircled) },
      { key: 'bubble_3', name: 'Bubble Arrow', transformFn: deco('⏤͟͟͞➼⃟❦❤⃞ ', '🤍⃟💜❥⃟࿐', negCircled) },
      { key: 'bubble_4', name: 'Bubble Lines', transformFn: deco('ıllıllı', 'ıllıllı', negCircled) },
      { key: 'bubble_5', name: 'Bubble Sacred', transformFn: deco('꧁ঔৣ☬✞', '✞☬ঔৣ꧂', negCircled) },
      { key: 'box_0', name: 'Box Ornate', transformFn: deco('◥꧁ད', 'ཌ꧂◤', negSquared) },
      { key: 'box_1', name: 'Box Bar', transformFn: deco('❚█══', '══█❚', negSquared) },
      { key: 'box_2', name: 'Box Arrow', transformFn: deco('⏤͟͟͞➼⃟❦❤⃞', '🤍⃟💜❥⃟࿐', negSquared) },
    ],
  },

  // ─── 18. Emoticons Fancy Text ───
  {
    name: 'Emoticons Fancy Text',
    styles: [
      { key: 'emo_happy', name: 'Happy Face', transformFn: (t) => t + ' (ㆆᴗㆆ)' },
      { key: 'emo_flower', name: 'Send Flower', transformFn: (t) => t + ' (ʘ‿ʘ)ノ✿' },
      { key: 'emo_shrug', name: 'Shrug Lenny Face', transformFn: (t) => '¯\\_(ツ)_/¯ ' + monospace(t) + ' ¯\\_(ツ)_/¯' },
      { key: 'emo_happytext', name: 'Happy Text', transformFn: (t) => '(◉‿◉) ' + t + ' (◉‿◉)❥⃟' },
      { key: 'emo_hearteye', name: 'Heart Eye', transformFn: (t) => '(｡♥‿♥｡) ' + t + ' (｡♥‿♥｡)' },
      { key: 'emo_heartface', name: 'Heart Face', transformFn: (t) => '(😍‿😍) ' + t + ' (😍‿😍)' },
      { key: 'emo_catface', name: 'Cat Face', transformFn: (t) => '(=◍․̫◍=) ♥ ' + t + ' (=◍․̫◍=)' },
      { key: 'emo_hidden', name: 'Hidden Face', transformFn: (t) => '-(-(-_( ' + t + ' )_-)-)' },
    ],
  },

  // ─── 19. Cute Fancy Text ───
  {
    name: 'Cute Fancy Text',
    styles: [
      { key: 'cute_1', name: 'Cute Style 1', transformFn: deco('♥ ', ' ♥ ▀▄▀▄▀▄', script) },
      { key: 'cute_2', name: 'Cute Style 2', transformFn: deco('🎀 ', ' 🎀 🍩 ⋆ 🍦 ⋆ 🍩', script) },
      { key: 'cute_3', name: 'Cute Style 3', transformFn: deco('♫♪ ', ' ♫♪ ๑۞๑,¸¸,ø¤º°`°๑۩', script) },
      { key: 'cute_4', name: 'Cute Style 4', transformFn: deco('ꕥ ', ' ꕥ 🐑 ⋆ 🐨', script) },
      { key: 'cute_5', name: 'Cute Style 5', transformFn: deco('🌀 ', ' 🌀 🐚 ⋆ 🐯 ⋆ 🐧', script) },
      { key: 'cute_6', name: 'Cute Style 6', transformFn: deco('Ƹ̵̡Ӝ̵̨̄Ʒ ', ' Ƹ̵̡Ӝ̵̨̄Ʒ 🍌 ⋆ 🍰 ⋆ 🍰', script) },
      { key: 'cute_7', name: 'Cute Style 7', transformFn: deco('⚜ ', ' ⚜ •°¯`••', script) },
      { key: 'cute_8', name: 'Cute Style 8', transformFn: deco('🌸 ', ' 🌸 •´¯`•»', script) },
      { key: 'cute_9', name: 'Cute Style 9', transformFn: deco('🌸 ', ' 🌸 🍬 ⋆ 🍪 ⋆ 🎂', script) },
    ],
  },

  // ─── 20. Christmas Fancy Font ───
  {
    name: 'Christmas Fonts',
    styles: [
      { key: 'xmas_1', name: 'Christmas Santa', transformFn: deco('🎅 ', ' 🎅', cherokee) },
      { key: 'xmas_2', name: 'Santa Claus', transformFn: deco('☃️ ', ' ☃️', japanFlip) },
      { key: 'xmas_3', name: 'Snowman', transformFn: deco('❄️ ', ' ❄️', squiggle2) },
      { key: 'xmas_4', name: 'Snowflake Cherokee', transformFn: deco('❄️ ', ' ❄️', cherokee) },
      { key: 'xmas_5', name: 'Christmas Stars', transformFn: deco('¸.·✩·.¸¸.·¯⍣✩ ', ' ✩⍣¯·.¸¸.·✩·.¸', squiggle1) },
      { key: 'xmas_6', name: 'Christmas Full', transformFn: deco('🎅🏮🌟🏮❄️ ', ' ❄️🏮🌟🏮🎅', squiggle3) },
    ],
  },

  // ─── 21. Cute Fancy Text (Decorated Base) ───
  {
    name: 'Cute Decorated Text',
    styles: [
      { key: 'cutedeco_italic1', name: 'Italic Paw', transformFn: deco('', '🐾 ⋆ 🐥', mathBoldItalic) },
      { key: 'cutedeco_italic2', name: 'Italic Bloom', transformFn: deco('🌸 ', '🌸 ✴❈', boldScript) },
      { key: 'cutedeco_cursivebold', name: 'Cursive Bold Deco', transformFn: deco('ꕥ  ', ' ꕥ •´¯`•»', mathBold) },
      { key: 'cutedeco_bold', name: 'Bold Script Deco', transformFn: deco('꧁꫱꧂ ', ' ꧁꫱꧂ §.•´¨\'°÷•..×', script) },
      { key: 'cutedeco_cursive', name: 'Cursive Music', transformFn: deco('♫♪ ', ' ♫♪ ･ﾟ⋆', smallCaps) },
      { key: 'cutedeco_tiny', name: 'Fraktur Star', transformFn: deco('⚜ ', ' ⚜ ✧🌠⋆', boldFraktur) },
      { key: 'cutedeco_frakturbold', name: 'Double Struck Camel', transformFn: deco('᯽ ', ' ᯽ 🐫 ⋆ 🐥', doubleStruck) },
      { key: 'cutedeco_doublestruck', name: 'Greek Clover', transformFn: deco('☘ ', '  ☘ 🍰 ⋆ 🍑', greekLower) },
      { key: 'cutedeco_greekstyle', name: 'Black Bubble Bloom', transformFn: deco('🌸 ', ' 🌸 🍎 ⋆ 🍒 ⋆ 🍪', negCircled) },
      { key: 'cutedeco_blackbubble', name: 'Regional Floral', transformFn: deco('◦•●◉✿ ', ' ✿◉●•◦', regionalSpaced) },
      { key: 'cutedeco_bluefont', name: 'Fraktur Animal', transformFn: deco('🐝♧ ', ' 🐳🐯', fraktur) },
      { key: 'cutedeco_fraktur', name: 'Sans Italic Deco', transformFn: deco('`•.¸¸.•´´¯`••._.•  ', '  •._.••`¯´´•.¸¸.•`', sansItalic) },
      { key: 'cutedeco_italicbold', name: 'Bold Italic Fun', transformFn: deco('✊🐟 ', ' 🍩☢', sansBoldItalic) },
    ],
  },

  // ─── 22. Full Crazy Fancy Text ───
  {
    name: 'Full Crazy Text',
    styles: [
      { key: 'fullcrazy_1', name: 'Crazy Style 1', transformFn: deco('👣💀 ', '  ✊', monospace) },
      { key: 'fullcrazy_2', name: 'Crazy Style 2', transformFn: deco('🍭🍔  ', ' ♧♙ඏ👤', circled) },
      { key: 'fullcrazy_3', name: 'Crazy Style 3', transformFn: deco('✊🎈  ', '  🐣☮🐍', crazy3) },
      { key: 'fullcrazy_4', name: 'Crazy Style 4', transformFn: deco('♙💜  ', '  👑👤', crazy4) },
      { key: 'fullcrazy_5', name: 'Crazy Style 5', transformFn: deco('😺💢💘🍬  ', '  🍓💲', crazy5) },
      { key: 'fullcrazy_6', name: 'Crazy Style 6', transformFn: deco('♨♬👹  ', '  ☠😡🎀', crazy6) },
      { key: 'fullcrazy_7', name: 'Crazy Style 7', transformFn: deco('🌀 ', ' 🌀 🐚 ⋆ 🐯 ⋆ 🐧', script) },
      { key: 'fullcrazy_8', name: 'Crazy Style 8', transformFn: deco('♢🍩  ', '  💔🐚', crazy8) },
      { key: 'fullcrazy_9', name: 'Crazy Style 9', transformFn: deco('💢♜  ', '  🐟🎁🍩😎', crazy9) },
    ],
  },
];

// Flat list helper
export function getAllInstaStyles(): InstaStyle[] {
  return instagramCategories.flatMap(c => c.styles);
}
