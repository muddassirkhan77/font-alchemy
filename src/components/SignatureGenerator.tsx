import { useState, useCallback, useEffect, useRef } from 'react';
import { Download, RotateCcw, Loader2, Sparkles, PackageOpen } from 'lucide-react';
import { signatureCategories, signatureGoogleFontsUrl, type SignatureFont } from '@/lib/signatureFonts';
import { toast } from 'sonner';

const DEFAULT_NAME = 'Your Name';

const SignatureGenerator = () => {
  const [name, setName] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const fontsLoaded = useRef(false);

  useEffect(() => {
    if (fontsLoaded.current) return;
    fontsLoaded.current = true;
    if (!document.querySelector(`link[href*="Caveat"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = signatureGoogleFontsUrl;
      document.head.appendChild(link);
    }
  }, []);

  const displayName = name.length > 0 ? name : DEFAULT_NAME;

  const generatePng = useCallback(async (text: string, font: SignatureFont): Promise<string> => {
    if (document.fonts) await document.fonts.ready;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const fontSize = 96;
    const padding = 80;
    const weight = font.weight || 400;

    ctx.font = `${weight} ${fontSize}px ${font.family}`;
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;

    const w = Math.max(1200, Math.ceil(textWidth + padding * 2));
    const h = Math.ceil(fontSize * 1.8 + padding * 2);

    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);
    ctx.font = `${weight} ${fontSize}px ${font.family}`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, w / 2, h / 2);

    return canvas.toDataURL('image/png');
  }, []);

  const handleDownload = useCallback(async (font: SignatureFont) => {
    setDownloadingId(font.id);
    try {
      const dataUrl = await generatePng(displayName, font);
      const link = document.createElement('a');
      link.download = `signature-${font.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`"${font.name}" signature downloaded!`);
    } catch {
      toast.error('Failed to generate signature PNG.');
    }
    setDownloadingId(null);
  }, [displayName, generatePng]);

  const handleDownloadAll = useCallback(async () => {
    setDownloadingAll(true);
    const allFonts = filteredCategories.flatMap(c => c.fonts);
    let downloaded = 0;

    for (const font of allFonts) {
      try {
        const dataUrl = await generatePng(displayName, font);
        const link = document.createElement('a');
        link.download = `signature-${font.name.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        downloaded++;
        // small delay to avoid browser blocking
        await new Promise(r => setTimeout(r, 150));
      } catch {
        // skip failed ones
      }
    }

    toast.success(`Downloaded ${downloaded} signature PNGs!`);
    setDownloadingAll(false);
  }, [displayName, generatePng]);

  const filteredCategories = filter === 'all'
    ? signatureCategories
    : signatureCategories.filter(c => c.id === filter);

  const filterTabs = [
    { key: 'all', label: 'All Styles' },
    { key: 'elegant', label: 'Elegant' },
    { key: 'stylish', label: 'Stylish' },
    { key: 'natural', label: 'Natural' },
    { key: 'bold', label: 'Bold' },
    { key: 'minimal', label: 'Minimal' },
  ];

  const renderSignatureCard = (font: SignatureFont) => {
    const isDownloading = downloadingId === font.id;

    return (
      <div
        key={font.id}
        className="card-premium rounded-2xl overflow-hidden transition-all duration-400 group"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1D2F46' }}>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold uppercase tracking-wider text-white">
              {font.name}
            </p>
            <span
              className="text-[10px] rounded-full px-2 py-0.5 font-medium"
              style={{ background: 'hsl(218 40% 24%)', color: 'hsl(220 15% 60%)' }}
            >
              {font.category}
            </span>
          </div>
          <button
            onClick={() => handleDownload(font)}
            disabled={isDownloading}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 btn-navy ${isDownloading ? 'opacity-60 cursor-wait' : ''}`}
          >
            {isDownloading
              ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating...</>
              : <><Download className="h-3.5 w-3.5" /> PNG</>
            }
          </button>
        </div>

        {/* Signature Preview */}
        <div
          className="rounded-b-xl h-28 flex items-center justify-center overflow-hidden px-5 transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ background: '#1A1A2E' }}
        >
          <p
            className="text-3xl leading-relaxed text-center w-full truncate"
            style={{
              fontFamily: font.family,
              fontWeight: font.weight || 400,
              color: 'hsl(0 0% 92%)',
            }}
          >
            {displayName}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="signature-generator" className="section-container pt-2 pb-10">
      {/* Section Heading */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-4 w-4 text-accent" />
        <h2 className="text-lg font-semibold text-foreground md:text-xl">
          Signature <span className="gold-gradient-text">Generator</span>
        </h2>
        <span
          className="text-[11px] rounded-full px-2.5 py-0.5 font-medium"
          style={{ background: 'hsl(43 56% 52% / 0.15)', color: 'hsl(43 56% 52%)' }}
        >
          40+ Styles
        </span>
      </div>

      <div className="card-premium max-w-6xl p-4 md:p-6 rounded-md mx-auto border-2">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
          {filterTabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                filter === key ? 'tab-active' : 'tab-inactive'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="relative">
          <textarea
            className="input-premium min-h-[100px]"
            placeholder="Enter your name to generate signatures..."
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 100))}
            maxLength={100}
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{name.length}/100</span>
            <div className="flex gap-2">
              <button onClick={() => setName('')} className="btn-navy gap-2 text-xs px-4 py-2">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
              <button
                onClick={handleDownloadAll}
                disabled={downloadingAll}
                className={`btn-gold gap-2 text-xs px-4 py-2 ${downloadingAll ? 'opacity-60 cursor-wait' : ''}`}
              >
                {downloadingAll
                  ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Downloading...</>
                  : <><PackageOpen className="h-3.5 w-3.5" /> Download All</>
                }
              </button>
            </div>
          </div>
        </div>

        {/* Signature Grid */}
        <div className="mt-6 space-y-6">
          {filteredCategories.map(cat => (
            <div key={cat.id}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-3 border-b border-accent/20 pb-2">
                {cat.label}
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {cat.fonts.map(renderSignatureCard)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureGenerator;
