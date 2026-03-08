import { useState, useMemo } from 'react';
import { fontStyles, type FontStyle } from '@/lib/unicodeFonts';

const CompareFonts = () => {
  const [selections, setSelections] = useState<[string, string, string]>([
    'boldScript', 'fraktur', 'doubleStruck'
  ]);
  const [text, setText] = useState('Compare Me');

  const allStyles = fontStyles;

  const previews = useMemo(() => {
    return selections.map(key => {
      const style = allStyles.find(s => s.key === key);
      return style ? style.transformFn(text) : text;
    });
  }, [selections, text, allStyles]);

  const updateSelection = (index: number, key: string) => {
    const next = [...selections] as [string, string, string];
    next[index] = key;
    setSelections(next);
  };

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

      <div className="mx-auto max-w-4xl grid grid-cols-1 gap-4 md:grid-cols-3">
        {[0, 1, 2].map(i => (
          <div key={i} className="card-premium p-5">
            <select
              value={selections[i]}
              onChange={e => updateSelection(i, e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              {allStyles.map((s: FontStyle) => (
                <option key={s.key} value={s.key}>{s.name}</option>
              ))}
            </select>
            <div className="min-h-[60px] rounded-lg bg-secondary/50 p-4 text-center text-lg break-all text-foreground">
              {previews[i]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompareFonts;
