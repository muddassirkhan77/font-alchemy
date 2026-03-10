import { useState, useCallback, useEffect } from 'react';
import { Check, Copy, Eye, Flame } from 'lucide-react';
import { webFontCategories, googleFontsUrl, type WebFont } from '@/lib/webFonts';
import { toast } from 'sonner';

const DEFAULT_TEXT = 'Beautiful Calligraphy';
const ARABIC_TEXT = 'خطاطة جميلة';

const WebFontPreview = () => {
  const [text, setText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'en' | 'ar'>('all');

  // Load Google Fonts
  useEffect(() => {
    if (!document.querySelector(`link[href*="Great+Vibes"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = googleFontsUrl;
      document.head.appendChild(link);
    }
  }, []);

  const handleCopy = useCallback(async (displayText: string, fontName: string, id: string) => {
    try {
      await navigator.clipboard.writeText(displayText);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = displayText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedId(id);
    toast.info(`Text copied! Note: "${fontName}" styling is visual only — pasted text will appear in the receiver's default font.`);
    setTimeout(() => setCopiedId(null), 1500);
  }, []);

  const filteredCategories = filter === 'all'
    ? webFontCategories
    : webFontCategories.filter(c => c.id === filter);

  const renderFontCard = (font: WebFont) => {
    const isArabic = font.language === 'ar';
    const displayText = text.length > 0 ? text : (isArabic ? ARABIC_TEXT : DEFAULT_TEXT);
    const isCopied = copiedId === font.id;

    return (
      <div key={font.id} className="card-premium p-6">
        <div className="flex items-center justify-between mb-3 rounded-t-xl px-4 py-3" style={{ background: '#1D2F46' }}>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold uppercase tracking-wider text-white">
              {font.name}
            </p>
            {font.trending && (
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: 'hsl(43 56% 52% / 0.2)', color: 'hsl(43 56% 52%)' }}>
                <Flame className="h-2.5 w-2.5" /> Trending
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium" style={{ background: 'hsl(218 40% 24%)', color: 'hsl(220 20% 70%)' }}>
              <Eye className="h-2.5 w-2.5" /> Preview Only
            </span>
            <button
              onClick={() => handleCopy(displayText, font.name, font.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                isCopied ? 'btn-copy-success' : 'btn-navy'
              }`}
            >
              {isCopied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
            </button>
          </div>
        </div>
        <div
          className="rounded-xl h-28 flex items-center justify-center overflow-hidden px-5"
          style={{ background: '#1A1A2E' }}
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <p
            className="text-2xl leading-relaxed break-all text-center line-clamp-2 w-full"
            style={{ fontFamily: font.family, color: 'hsl(0 0% 92%)' }}
          >
            {displayText}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="section-container py-16">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Eye className="h-5 w-5 text-accent" />
        <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Web Font <span className="gold-gradient-text">Preview Gallery</span>
        </h2>
      </div>
      <p className="text-center text-sm text-muted-foreground mb-2">
        Beautiful calligraphy fonts rendered via Google Fonts — visual preview only
      </p>
      <p className="text-center text-xs text-muted-foreground/70 mb-6">
        ⚠️ These fonts are CSS-rendered. Copied text will appear in the receiver's default font.
        For universally styled text, use the <button onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })} className="text-accent underline hover:no-underline">Calligraphy Generator</button> above.
      </p>

      {/* Input */}
      <div className="mx-auto max-w-4xl mb-6">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value.slice(0, 200))}
          placeholder="Type text to preview in all fonts..."
          className="input-premium py-3"
          maxLength={200}
        />
      </div>

      {/* Filter */}
      <div className="flex justify-center gap-3 mb-8">
        {([['all', 'All Fonts'], ['en', '🇬🇧 English'], ['ar', '🇸🇦 Arabic']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              filter === key ? 'tab-active' : 'tab-inactive'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Font Grid */}
      {filteredCategories.map(cat => (
        <div key={cat.id} className="mx-auto max-w-6xl mb-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4 border-b border-accent/20 pb-2">
            {cat.label}
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cat.fonts.map(renderFontCard)}
          </div>
        </div>
      ))}
    </section>
  );
};

export default WebFontPreview;
