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
    <section className="section-container py-8">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Flame className="h-5 w-5 text-accent" />
        <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Trending <span className="gold-gradient-text">Calligraphy</span> Fonts
        </h2>
      </div>
      <p className="text-center text-sm text-muted-foreground mb-8">
        Most popular calligraphy styles this week
      </p>

      <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2">
        {styles.map(style => {
          const transformed = style.transformFn(SAMPLE);
          const isCopied = copiedKey === `trending-${style.key}`;
          return (
            <div key={style.key} className="card-premium">
              <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1D2F46' }}>
                <p className="text-sm font-bold uppercase tracking-wider text-white">
                  {style.name}
                </p>
                <button
                  onClick={() => handleCopy(transformed, `trending-${style.key}`)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    isCopied ? 'btn-copy-success' : 'btn-navy'
                  }`}
                >
                  {isCopied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
                </button>
              </div>
              <div className="rounded-b-xl h-28 flex items-center justify-center overflow-hidden px-5" style={{ background: '#1A1A2E' }}>
                <p className="text-2xl leading-relaxed break-all text-center line-clamp-2 w-full" style={{ color: 'hsl(0 0% 92%)' }}>{transformed}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingCalligraphy;
