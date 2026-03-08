import { useState, useCallback, useEffect } from 'react';
import { RotateCcw, Check, Copy } from 'lucide-react';
import { calligraphyCategories } from '@/lib/calligraphyFonts';
import { instagramCategories, type InstaStyle } from '@/lib/instagramFonts';


const DEFAULT_PREVIEW = 'FontiFy Preview';

const FontGenerator = () => {
  const [text, setText] = useState('');
  const [tab, setTab] = useState<'calligraphy' | 'instagram'>('calligraphy');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === 'calligraphy' || detail === 'instagram') setTab(detail);
    };
    window.addEventListener('fontify-tab', handler);
    return () => window.removeEventListener('fontify-tab', handler);
  }, []);

  const displayText = text.length > 0 ? text : DEFAULT_PREVIEW;

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
        className="card-premium rounded-2xl overflow-hidden p-5 transition-all duration-400"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(0 0% 85%)' }}>
            {name}
          </p>
          <button
            onClick={() => handleCopy(transformed, key)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              isCopied ? 'btn-copy-success' : 'btn-navy'
            }`}
          >
            {isCopied ? (
              <><Check className="h-3.5 w-3.5" /> Copied</>
            ) : (
              <><Copy className="h-3.5 w-3.5" /> Copy</>
            )}
          </button>
        </div>
        <div className="rounded-xl px-4 py-5" style={{ background: 'hsl(218 55% 11%)' }}>
          <p className="text-xl leading-relaxed break-all min-h-[3rem] text-center" style={{ color: 'hsl(0 0% 92%)' }}>
            {transformed}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="tool" className="section-container pt-2 pb-16">
      <div className="card-premium mx-auto max-w-4xl p-4 md:p-8">
        {/* Tabs */}
        <div className="flex gap-3 mb-3">
          <button
            onClick={() => setTab('calligraphy')}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              tab === 'calligraphy' ? 'tab-active' : 'tab-inactive'
            }`}
          >
            ✒️ Calligraphy
          </button>
          <button
            onClick={() => setTab('instagram')}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              tab === 'instagram' ? 'tab-active' : 'tab-inactive'
            }`}
          >
            📸 Instagram
          </button>
        </div>

        {/* Input area */}
        <div className="relative">
          <textarea
            className="input-premium min-h-[120px]"
            placeholder="Type your text here..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {text.length} characters
            </span>
            <button
              onClick={() => setText('')}
              className="btn-navy gap-2 text-xs px-4 py-2"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Calligraphy Results - always visible with default or user text */}
        {tab === 'calligraphy' && (
          <div className="mt-8 space-y-8">
            {calligraphyCategories.map((cat) => (
              <div key={cat.id}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4 border-b border-accent/20 pb-2">
                  {cat.label}
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {cat.styles.map((style) => {
                    const transformed = style.transformFn(displayText);
                    return renderStyleCard(style.key, style.name, transformed);
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instagram Results - always visible with default or user text */}
        {tab === 'instagram' && (
          <div className="mt-8 space-y-8">
            {instagramCategories.map((cat) => (
              <div key={cat.name} id={`insta-cat-${cat.name.replace(/\s+/g, '-').toLowerCase()}`}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4 border-b border-accent/20 pb-2">
                  {cat.name}
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {cat.styles.map((style: InstaStyle) => {
                    const transformed = style.transformFn(displayText);
                    return renderStyleCard(style.key, style.name, transformed);
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FontGenerator;
