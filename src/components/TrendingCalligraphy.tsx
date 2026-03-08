import { useState, useCallback } from 'react';
import { Check, Copy, Flame } from 'lucide-react';
import { getTrendingCalligraphy } from '@/lib/calligraphyFonts';

const SAMPLE = 'The Art of Writing';

const TrendingCalligraphy = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const styles = getTrendingCalligraphy();

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
      <div className="flex items-center justify-center gap-2 mb-2">
        <Flame className="h-5 w-5 text-accent" />
        <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Trending <span className="gold-gradient-text">Calligraphy</span> Fonts
        </h2>
      </div>
      <p className="text-center text-sm text-muted-foreground mb-8">
        Most popular calligraphy styles this week
      </p>

      <div className="mx-auto max-w-4xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {styles.map(style => {
          const transformed = style.transformFn(SAMPLE);
          const isCopied = copiedKey === `trending-${style.key}`;
          return (
            <div key={style.key} className="card-premium p-5 text-center">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                {style.name}
              </p>
              <p className="text-xl mb-4 break-all text-foreground">{transformed}</p>
              <button
                onClick={() => handleCopy(transformed, `trending-${style.key}`)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isCopied ? 'btn-copy-success' : 'btn-navy'
                }`}
              >
                {isCopied ? <><Check className="h-3.5 w-3.5" /> Copied ✓</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingCalligraphy;
