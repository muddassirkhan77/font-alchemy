import { useState, useCallback } from 'react';
import { RotateCcw, Check, Copy } from 'lucide-react';
import { getStylesByCategory, type FontStyle } from '@/lib/unicodeFonts';

const MAX_CHARS = 200;

const FontGenerator = () => {
  const [text, setText] = useState('');
  const [tab, setTab] = useState<'calligraphy' | 'instagram'>('calligraphy');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const styles = getStylesByCategory(tab);

  const handleCopy = useCallback(async (transformed: string, key: string) => {
    try {
      await navigator.clipboard.writeText(transformed);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = transformed;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    }
  }, []);

  return (
    <section id="tool" className="section-container pb-16">
      <div className="card-premium mx-auto max-w-4xl p-6 md:p-10">
        {/* Tabs */}
        <div className="flex gap-3 mb-6">
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
            maxLength={MAX_CHARS}
            value={text}
            onChange={e => setText(e.target.value.slice(0, MAX_CHARS))}
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {text.length}/{MAX_CHARS}
            </span>
            <button
              onClick={() => setText('')}
              className="btn-navy gap-2 text-xs px-4 py-2"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Results grid */}
        {text.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {styles.map((style: FontStyle) => {
              const transformed = style.transformFn(text);
              const isCopied = copiedKey === style.key;
              return (
                <div
                  key={style.key}
                  className="group rounded-xl border border-border bg-secondary/40 p-5 transition-all duration-200 hover:border-accent/40"
                >
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                    {style.name}
                  </p>
                  <p className="text-lg leading-relaxed break-all mb-4 min-h-[2.5rem] text-foreground">
                    {transformed}
                  </p>
                  <button
                    onClick={() => handleCopy(transformed, style.key)}
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                      isCopied ? 'btn-copy-success' : 'btn-navy'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied ✓
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {text.length === 0 && (
          <div className="mt-8 text-center py-12 text-muted-foreground">
            <p className="text-sm">Start typing above to see your text transformed into {tab === 'calligraphy' ? '30+' : '20+'} unique styles</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FontGenerator;
