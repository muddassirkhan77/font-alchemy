import { useState, useCallback, useEffect } from 'react';
import { RotateCcw, Check, Copy, ArrowLeft, Sun, Moon, Palette } from 'lucide-react';
import { instagramCategories } from '@/lib/instagramFonts';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import { Slider } from '@/components/ui/slider';

const DEFAULT_PREVIEW = 'FontiFy Preview';

const COLOR_PRESETS = [
  { label: 'White', value: '#EBEBEB' },
  { label: 'Gold', value: '#D4A843' },
  { label: 'Cyan', value: '#00D4FF' },
  { label: 'Lime', value: '#A3E635' },
  { label: 'Pink', value: '#F472B6' },
  { label: 'Orange', value: '#FB923C' },
  { label: 'Red', value: '#EF4444' },
  { label: 'Violet', value: '#A78BFA' },
];

type BgMode = 'dark' | 'light';

const InstagramFonts = () => {
  const [text, setText] = useState('');
  const location = useLocation();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [textColor, setTextColor] = useState('#EBEBEB');
  const [fontSize, setFontSize] = useState(24);
  const [bgMode, setBgMode] = useState<BgMode>('dark');

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location.hash]);

  const displayText = text.length > 0 ? text : DEFAULT_PREVIEW;

  const previewBg = bgMode === 'dark' ? '#1A1A2E' : '#F5F5F5';

  const handleCopy = useCallback(async (transformed: string, key: string) => {
    try {
      await navigator.clipboard.writeText(transformed);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = transformed;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  }, []);

  const renderStyleCard = (key: string, name: string, transformed: string) => {
    const isCopied = copiedKey === key;
    return (
      <div
        key={key}
        className="card-premium rounded-2xl overflow-hidden transition-all duration-400">
        <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1D2F46' }}>
          <p className="text-sm font-bold uppercase tracking-wider text-white">
            {name}
          </p>
          <button
            onClick={() => handleCopy(transformed, key)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              isCopied ? 'btn-copy-success' : 'btn-navy'
            }`}>
            {isCopied ?
              <><Check className="h-3.5 w-3.5" /> Copied</> :
              <><Copy className="h-3.5 w-3.5" /> Copy</>
            }
          </button>
        </div>
        <div
          className="rounded-b-xl h-28 flex items-center justify-center overflow-hidden px-5 transition-colors duration-300"
          style={{ background: previewBg }}
        >
          <p
            className="leading-relaxed break-all text-center line-clamp-2 w-full"
            style={{ color: textColor, fontSize: `${fontSize}px` }}
          >
            {transformed}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="section-container pt-6 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/" className="btn-navy gap-2 text-xs px-3 py-2">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Link>
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl text-center mb-6">
            <span className="gold-gradient-text">Instagram</span> Fonts
          </h1>
          <div className="card-premium max-w-6xl p-4 md:p-8 py-[15px] px-[15px] rounded-md mx-auto border-2">
            <div className="relative">
              <textarea
                className="input-premium min-h-[120px]"
                placeholder="Type your text here..."
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 500))}
                maxLength={500}
              />
              <div className="mt-2 flex items-center justify-end">
                <button
                  onClick={() => setText('')}
                  className="btn-navy gap-2 text-xs px-4 py-2">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>
            </div>

            {/* Customization Controls */}
            <div className="mt-6 rounded-xl p-3 w-20 space-y-3" style={{ background: '#1D2F46' }}>
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/70 flex items-center gap-1">
                <Palette className="h-3 w-3 text-accent" /> Style
              </p>

              {/* Color swatches */}
              <div className="grid grid-cols-2 gap-1">
                {COLOR_PRESETS.slice(0, 8).map(c => (
                  <button
                    key={c.value}
                    onClick={() => setTextColor(c.value)}
                    className={`h-5 w-5 rounded-full border-2 transition-all duration-200 mx-auto ${
                      textColor === c.value ? 'border-accent scale-110' : 'border-white/20'
                    }`}
                    style={{ background: c.value }}
                    title={c.label}
                  />
                ))}
              </div>
              <input
                type="color"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                className="h-5 w-full rounded cursor-pointer border border-white/20 bg-transparent"
                title="Custom color"
              />

              {/* Font Size */}
              <div>
                <p className="text-[9px] text-white/50 mb-1">{fontSize}px</p>
                <Slider
                  value={[fontSize]}
                  onValueChange={v => setFontSize(v[0])}
                  min={14}
                  max={48}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Bg toggle */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setBgMode('dark')}
                  className={`rounded p-1 transition-all ${bgMode === 'dark' ? 'bg-accent' : 'bg-white/10'}`}
                  title="Dark background"
                >
                  <Moon className="h-3 w-3 text-white mx-auto" />
                </button>
                <button
                  onClick={() => setBgMode('light')}
                  className={`rounded p-1 transition-all ${bgMode === 'light' ? 'bg-accent' : 'bg-white/10'}`}
                  title="Light background"
                >
                  <Sun className="h-3 w-3 text-white mx-auto" />
                </button>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {instagramCategories.map((cat) => (
                <div key={cat.name} id={`insta-cat-${cat.name.replace(/\s+/g, '-').toLowerCase()}`}>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4 border-b border-accent/20 pb-2">
                    {cat.name}
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {cat.styles.map((style) => {
                      const transformed = style.transformFn(displayText);
                      return renderStyleCard(style.key, style.name, transformed);
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default InstagramFonts;
