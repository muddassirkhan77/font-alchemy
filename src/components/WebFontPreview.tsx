import { useState, useCallback, useEffect, useRef } from 'react';
import { Download, Eye, Flame, RotateCcw, Loader2 } from 'lucide-react';
import { webFontCategories, googleFontsUrl, type WebFont } from '@/lib/webFonts';
import { toast } from 'sonner';

const DEFAULT_TEXT = 'Beautiful Calligraphy';
const ARABIC_TEXT = 'خطاطة جميلة';

const WebFontPreview = () => {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<'all' | 'en' | 'ar'>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    if (!document.querySelector(`link[href*="Great+Vibes"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = googleFontsUrl;
      document.head.appendChild(link);
    }
  }, []);

  const handleDownloadPng = useCallback(async (displayText: string, fontFamily: string, fontName: string, id: string) => {
    setDownloadingId(id);
    try {
      // Wait a bit for font to be ready
      if (document.fonts) {
        await document.fonts.ready;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const fontSize = 80;
      const padding = 60;

      // Set font and measure text
      ctx.font = `${fontSize}px ${fontFamily}`;
      const metrics = ctx.measureText(displayText);
      const textWidth = metrics.width;
      const textHeight = fontSize * 1.4;

      canvas.width = Math.ceil(textWidth + padding * 2);
      canvas.height = Math.ceil(textHeight + padding * 2);

      // Transparent background - don't fill
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw text
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(displayText, canvas.width / 2, canvas.height / 2);

      // Download
      const link = document.createElement('a');
      link.download = `${fontName.replace(/\s+/g, '-').toLowerCase()}-calligraphy.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`"${fontName}" downloaded as transparent PNG!`);
    } catch {
      toast.error('Failed to generate PNG. Please try again.');
    }
    setDownloadingId(null);
  }, []);

  const filteredCategories = filter === 'all'
    ? webFontCategories
    : webFontCategories.filter(c => c.id === filter);

  const renderFontCard = (font: WebFont) => {
    const isArabic = font.language === 'ar';
    const displayText = text.length > 0 ? text : (isArabic ? ARABIC_TEXT : DEFAULT_TEXT);
    const isDownloading = downloadingId === font.id;

    return (
      <div key={font.id} className="card-premium rounded-2xl overflow-hidden p-6 transition-all duration-400">
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
          <button
            onClick={() => handleDownloadPng(displayText, font.family, font.name, font.id)}
            disabled={isDownloading}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 btn-navy ${isDownloading ? 'opacity-60 cursor-wait' : ''}`}
          >
            {isDownloading
              ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating...</>
              : <><Download className="h-3.5 w-3.5" /> PNG</>
            }
          </button>
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
    <section id="web-fonts" className="section-container pt-2 pb-16">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Eye className="h-5 w-5 text-accent" />
        <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Web Font <span className="gold-gradient-text">Preview Gallery</span>
        </h2>
      </div>
      <p className="text-center text-sm text-muted-foreground mb-6">
        Beautiful calligraphy fonts rendered via Google Fonts — download as transparent PNG
      </p>

      <div className="card-premium max-w-6xl p-4 md:p-8 py-[15px] px-[15px] rounded-md mx-0 border-2">
        {/* Filter Tabs */}
        <div className="flex gap-3 mb-3">
          {([['all', '🌐 All Fonts'], ['en', '🇬🇧 English'], ['ar', '🇸🇦 Arabic']] as const).map(([key, label]) => (
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

        {/* Input Area - matching FontGenerator */}
        <div className="relative">
          <textarea
            className="input-premium min-h-[120px]"
            placeholder="Type your text here to preview in all fonts..."
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 200))}
            maxLength={200}
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{text.length}/200</span>
            <button
              onClick={() => setText('')}
              className="btn-navy gap-2 text-xs px-4 py-2"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Font Grid */}
        <div className="mt-8 space-y-8">
          {filteredCategories.map(cat => (
            <div key={cat.id}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4 border-b border-accent/20 pb-2">
                {cat.label}
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {cat.fonts.map(renderFontCard)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebFontPreview;
