import { useState, useMemo, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';
import { allCalligraphyStyles } from '@/lib/calligraphyFonts';
import { fontStyles } from '@/lib/unicodeFonts';

const DEFAULT_TEXT = 'Compare Me';

const allStyles = [
  ...allCalligraphyStyles.map(s => ({ key: s.key, name: s.name, transformFn: s.transformFn })),
  ...fontStyles.map(s => ({ key: s.key, name: s.name, transformFn: s.transformFn })),
];

const CompareFonts = () => {
  const [selections, setSelections] = useState<[string, string, string]>([
    'sig_golden', 'wed_classic', 'ink_gothic'
  ]);
  const [text, setText] = useState(DEFAULT_TEXT);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const displayText = text.length > 0 ? text : DEFAULT_TEXT;

  const previews = useMemo(() => {
    return selections.map(key => {
      const style = allStyles.find(s => s.key === key);
      return style ? style.transformFn(displayText) : displayText;
    });
  }, [selections, displayText]);

  const updateSelection = (index: number, key: string) => {
    const next = [...selections] as [string, string, string];
    next[index] = key;
    setSelections(next);
  };

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

  return (
    <section className="section-container py-16">
      <h2 className="font-heading text-2xl font-bold text-center mb-2 text-foreground md:text-3xl">
        Compare Fonts <span className="gold-gradient-text">Side-by-Side</span>
      </h2>
      <p className="text-center text-sm text-muted-foreground mb-8">
        Select different styles to compare them instantly
      </p>

      <div className="mx-auto max-w-4xl mb-6">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value.slice(0, 200))}
          placeholder="Type text to compare..."
          className="input-premium py-3"
          maxLength={200}
        />
      </div>

      <div className="mx-auto max-w-4xl grid grid-cols-1 gap-6 md:grid-cols-3">
        {[0, 1, 2].map(i => {
          const isCopied = copiedKey === `compare-${i}`;
          return (
            <div key={i} className="card-premium p-6">
              <div className="flex items-center justify-between mb-3">
                <select
                value={selections[i]}
                onChange={e => updateSelection(i, e.target.value)}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                {allStyles.map(s => (
                  <option key={s.key} value={s.key}>{s.name}</option>
                ))}
              </select>
                <button
                  onClick={() => handleCopy(previews[i], `compare-${i}`)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ml-2 ${
                    isCopied ? 'btn-copy-success' : 'btn-navy'
                  }`}
                >
                  {isCopied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
                </button>
              </div>
              <div className="rounded-xl h-28 flex items-center justify-center overflow-hidden px-4" style={{ background: '#1A1A2E', color: 'hsl(0 0% 92%)' }}>
                <p className="text-lg break-all text-center line-clamp-2 w-full">{previews[i]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CompareFonts;
