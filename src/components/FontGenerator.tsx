import { useState, useCallback } from 'react';
import { RotateCcw, Check, Copy, Sun, Moon, Palette } from 'lucide-react';
import { calligraphyCategories } from '@/lib/calligraphyFonts';
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

const FontGenerator = () => {
  const [text, setText] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [textColor, setTextColor] = useState('#EBEBEB');
  const [fontSize, setFontSize] = useState(24);
  const [bgMode, setBgMode] = useState<BgMode>('dark');

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
        className="card-premium rounded-2xl overflow-hidden p-6 transition-all duration-400">
        
        <div className="flex items-center justify-between mb-3 rounded-t-xl px-4 py-3" style={{ background: '#1D2F46' }}>
          <p className="text-sm font-bold uppercase tracking-wider text-white">
            {name}
          </p>
          <button
            onClick={() => handleCopy(transformed, key)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
            isCopied ? 'btn-copy-success' : 'btn-navy'}`
            }>
            {isCopied ?
            <><Check className="h-3.5 w-3.5" /> Copied</> :
            <><Copy className="h-3.5 w-3.5" /> Copy</>
            }
          </button>
        </div>
        <div className="rounded-xl h-28 flex items-center justify-center overflow-hidden px-5 transition-colors duration-300" style={{ background: previewBg }}>
          <p className="leading-relaxed break-all text-center line-clamp-2 w-full" style={{ color: textColor, fontSize: `${fontSize}px` }}>
            {transformed}
          </p>
        </div>
      </div>);
  };

  return (
    <section id="tool" className="section-container pt-2 pb-16">
      <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl text-center mb-6">
        <span className="gold-gradient-text">Calligraphy</span> Fonts
      </h2>
      <div className="card-premium max-w-6xl p-4 md:p-8 py-[15px] px-[15px] rounded-md mx-0 border-2">
        {/* Input area */}
        <div className="relative">
          <textarea
            className="input-premium min-h-[120px]"
            placeholder="Type your text here..."
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 500))}
            maxLength={500} />
          
          <div className="mt-2 flex items-center justify-end">
            <button
              onClick={() => setText('')}
              className="btn-navy gap-2 text-xs px-4 py-2">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Calligraphy Results */}
        <div className="mt-8 space-y-8">
          {calligraphyCategories.map((cat) =>
            <div key={cat.id}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4 border-b border-accent/20 pb-2">
                {cat.label}
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {cat.styles.map((style) => {
                  const transformed = style.transformFn(displayText);
                  return renderStyleCard(style.key, style.name, transformed);
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>);
};

export default FontGenerator;