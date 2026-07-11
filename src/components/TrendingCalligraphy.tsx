import { useState, useCallback } from 'react';
import { Check, Copy, Download, Flame, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getTrendingCalligraphy } from '@/lib/calligraphyFonts';
import { downloadPng } from '@/lib/downloadPng';

const SAMPLE = 'The Art of Writing';

const TrendingCalligraphy = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
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

  const handleDownload = useCallback(async (transformed: string, styleName: string, key: string) => {
    setDownloadingKey(key);
    try {
      const filename = `${styleName.replace(/\s+/g, '-').toLowerCase()}-calligraphy.png`;
      await downloadPng(transformed, filename);
      toast.success(`"${styleName}" downloaded as transparent PNG!`);
    } catch {
      toast.error('Failed to generate PNG. Please try again.');
    }
    setDownloadingKey(null);
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
          const isDownloading = downloadingKey === `trending-download-${style.key}`;
          return (
            <div key={style.key} className="card-premium">
              <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1D2F46' }}>
                <p className="text-sm font-bold uppercase tracking-wider text-white">
                  {style.name}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(transformed, `trending-${style.key}`)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                      isCopied ? 'btn-copy-success' : 'btn-navy'
                    }`}
                  >
                    {isCopied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
                  </button>
                  <button
                    onClick={() => handleDownload(transformed, style.name, `trending-download-${style.key}`)}
                    disabled={isDownloading}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 btn-navy ${isDownloading ? 'opacity-60 cursor-wait' : ''}`}
                  >
                    {isDownloading ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> PNG</> : <><Download className="h-3.5 w-3.5" /> PNG</>}
                  </button>
                </div>
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
