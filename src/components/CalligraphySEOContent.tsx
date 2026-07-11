import { useState } from 'react';
import { Check, X, ChevronDown, Zap } from 'lucide-react';

const comparisonRows = [
  { feature: 'Copy & paste calligraphy text (Unicode — works on any app or device)', other: '✓', us: '✓' },
  { feature: 'Multiple calligraphy font styles (English, Modern, Tattoo, Arabic-inspired, Chinese-inspired)', other: '✓', us: '✓' },
  { feature: '📥 Download as PNG image (High-resolution, ready-to-use image file)', other: '✗', us: '✓' },
  { feature: 'Transparent background PNG (Drop into any design without background removal)', other: '✗', us: '✓' },
  { feature: 'Always free — no hidden charges (No premium tier, no subscription)', other: 'Sometimes', us: '✓ Always' },
  { feature: 'No sign-up or account required (Open and start immediately)', other: 'Sometimes', us: '✓ Never required' },
  { feature: 'Mobile-optimized (Full functionality on Android & iPhone)', other: 'Sometimes', us: '✓' },
  { feature: 'Instant real-time preview (Calligraphy renders as you type)', other: 'Sometimes', us: '✓' },
  { feature: 'No watermarks on output (Clean text and images, fully usable)', other: 'Sometimes', us: '✓' },
  { feature: 'Privacy — text not stored (Runs entirely in browser, nothing sent to server)', other: '✗', us: '✓' },
];

const steps = [
  { n: '1', title: 'Type your text', body: 'Enter any word, name, quote, or phrase into the text box. The calligraphy generator works with letters, numbers, and symbols in real time — no submit button needed.' },
  { n: '2', title: 'Choose a calligraphy style', body: 'Browse a wide range of styles — English script, modern calligraphy, tattoo lettering, Arabic-inspired, or Chinese brush-stroke. Click any style to preview it instantly.' },
  { n: '3', title: 'Copy or download as PNG', body: 'One click to copy Unicode calligraphy text and paste it anywhere, OR download a high-resolution transparent PNG image ready for any design project.' },
];

const features = [
  { icon: '⚡', title: 'Instant real-time results', body: 'Your calligraphy text is generated the moment you start typing. Zero loading time, zero waiting.' },
  { icon: '📋', title: 'One-click copy & paste', body: 'Copy any calligraphy font with a single click. Paste directly into Instagram bios, captions, WhatsApp messages, or any text field.' },
  { icon: '📱', title: 'Fully mobile-friendly', body: 'Works perfectly on Android and iPhone browsers. Generate, copy, and download calligraphy text from your phone just as easily as on desktop.' },
  { icon: '🎨', title: 'Multiple calligraphy styles', body: 'English script, modern calligraphy, tattoo fonts, Arabic-inspired ornate lettering, and Chinese brush-stroke styles — all in one place.' },
  { icon: '🔒', title: 'Private & secure', body: 'The tool runs entirely in your browser. Your text is never sent to a server, stored in a database, or shared with anyone.' },
  { icon: '🆓', title: 'Always 100% free', body: 'No hidden charges, no premium plan, no subscription. Generate and download unlimited calligraphy at no cost — ever.' },
];

const styles = [
  { icon: '✒️', title: 'English Calligraphy', body: 'Classic, elegant penmanship-inspired scripts. Perfect for wedding stationery, invitations, certificates, and formal designs.' },
  { icon: '✨', title: 'Modern Calligraphy', body: 'Clean, contemporary lettering that blends handwritten warmth with modern design. Popular for logos, Instagram content, and personal branding.' },
  { icon: '🖤', title: 'Tattoo Fonts', body: 'Bold, detailed lettering styles used in tattoo art. Perfect for visualizing a design before committing — export as PNG to share with your artist.' },
  { icon: '🌙', title: 'Arabic-Inspired', body: 'Flowing, ornate lettering inspired by Arabic calligraphy traditions. Great for decorative quotes, wall art, and cultural projects.' },
  { icon: '🎋', title: 'Chinese-Inspired', body: 'Bold brush-stroke styles inspired by Chinese ink calligraphy. Ideal for artistic prints, stationery, and branding with an Eastern aesthetic.' },
];

const platforms = [
  { icon: '📸', name: 'Instagram', body: 'Bios, captions, stories — calligraphy text renders natively.' },
  { icon: '💬', name: 'WhatsApp', body: 'Send stylish messages and status updates to anyone.' },
  { icon: '🐦', name: 'Twitter/X', body: 'Make tweets and bios stand out from the crowd.' },
  { icon: '🎵', name: 'TikTok', body: 'Style your username, bio, and video captions.' },
  { icon: '👤', name: 'Facebook', body: 'Profiles, posts, and comments display cleanly.' },
  { icon: '📧', name: 'Emails & Messages', body: 'Add elegance to signatures, subjects, and notes.' },
];

const useCases = [
  { icon: '📱', title: 'Instagram captions & bios', body: "Stand out with calligraphy-styled text. Gives your profile a polished, professional feel that plain text simply can't match." },
  { icon: '🏷️', title: 'Logos & personal branding', body: 'Download as transparent PNG and use as the base for a logo or brand name. Fast, free starting point for boutiques and personal brands.' },
  { icon: '💉', title: 'Tattoo design ideas', body: 'Visualize exactly how a word or phrase will look as a tattoo. Export PNG and share with your artist as a clear reference image.' },
  { icon: '▶️', title: 'YouTube thumbnails', body: 'Add calligraphy text to thumbnails. Download as transparent PNG, drag it into your design, and stand out in search results.' },
  { icon: '💍', title: 'Wedding & event stationery', body: 'Design invitation text, table headers, and name cards using elegant styles. Download PNG for print designs.' },
  { icon: '🖼️', title: 'Posters & digital art', body: 'Use calligraphy PNGs in posters, greeting cards, wallpapers, and print-on-demand products. High-res, no watermark.' },
];

const faqs = [
  { q: 'Is the calligraphy font generator completely free?', a: 'Yes — it is 100% free. There are no subscriptions, no premium plans, and no hidden charges. Generate, copy, and download calligraphy text as many times as you want, at no cost.' },
  { q: 'Can I download calligraphy text as a PNG image?', a: 'Yes — and this is the tool\'s standout feature. After generating your calligraphy text, click "Download PNG" to get a high-resolution image with a transparent background. Most other free calligraphy generators do not offer this feature.' },
  { q: 'Does calligraphy copy-paste work on Instagram and WhatsApp?', a: 'Yes. The calligraphy text uses Unicode characters, natively supported on Instagram, WhatsApp, Facebook, Twitter/X, and TikTok. No special font app required — just copy and paste.' },
  { q: 'Does the calligraphy generator work on mobile phones?', a: 'Yes. Fully optimized for Android and iPhone browsers. Generate, copy, and download from your mobile device just as easily as from a desktop.' },
  { q: 'What calligraphy styles are available?', a: 'The generator includes English script, modern calligraphy, tattoo lettering, Arabic-inspired ornate styles, and Chinese brush-stroke designs. All styles support copy-paste and PNG download.' },
  { q: 'Do I need to sign up or create an account?', a: 'No. Open the tool and start immediately — no email, no password, no account needed.' },
  { q: 'Can I use the calligraphy PNG for commercial projects?', a: 'Yes. Generated PNG images can be used in personal and most commercial projects — logos, social media graphics, print-on-demand products, YouTube thumbnails, and client design work.' },
  { q: 'Is my text stored or shared when I use this tool?', a: 'No. The tool runs entirely in your browser. Your text is never sent to a server, stored, or shared with any third party.' },
];

const CellIcon = ({ value }: { value: string }) => {
  if (value === '✓') return <Check className="h-5 w-5 text-accent inline-block" />;
  if (value === '✗') return <X className="h-5 w-5 text-muted-foreground/60 inline-block" />;
  return <span className="text-sm text-muted-foreground">{value}</span>;
};

const CalligraphySEOContent = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="space-y-20 py-16">
      {/* 1. What is it */}
      <section className="section-container max-w-4xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
          What Is a <span className="gold-gradient-text">Calligraphy Font Generator?</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A calligraphy font generator is a free online tool that converts plain text into decorative, handwriting-style calligraphy fonts using Unicode characters — instantly, in your browser.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Calligraphy is the ancient art of decorative handwriting, used for centuries in wedding invitations, religious manuscripts, logos, and fine art. Today, people use calligraphy-style text for Instagram bios, social media captions, tattoo design, YouTube thumbnails, and personal branding. With this tool, you don't need to learn calligraphy by hand or hire a designer — just type, choose a style, and use it anywhere for free.
        </p>
      </section>

      {/* 2. Comparison */}
      <section className="section-container max-w-5xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-3">
          Why This <span className="gold-gradient-text">Calligraphy Generator</span> Stands Apart
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Most free calligraphy tools give you copy-paste text and nothing else. Here's what makes this one different.
        </p>
        <div className="card-premium rounded-2xl overflow-hidden border-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border" style={{ background: '#1D2F46' }}>
                  <th className="text-left p-4 font-bold uppercase tracking-wider text-xs text-white">Feature</th>
                  <th className="text-center p-4 font-bold uppercase tracking-wider text-xs text-white/70">Most Other Tools</th>
                  <th className="text-center p-4 font-bold uppercase tracking-wider text-xs text-accent bg-accent/10">⭐ Calligraphy Font Generator</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 text-foreground">{row.feature}</td>
                    <td className="p-4 text-center"><CellIcon value={row.other} /></td>
                    <td className="p-4 text-center bg-accent/5"><CellIcon value={row.us} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground italic mt-6 max-w-3xl mx-auto">
          The bottom line: other tools give you text. This tool gives you text AND a downloadable PNG image — opening a whole new range of use cases for designers and content creators.
        </p>
      </section>

      {/* 3. How it works */}
      <section className="section-container max-w-6xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-3">
          Generate Calligraphy in <span className="gold-gradient-text">3 Simple Steps</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          No design experience needed. Your first calligraphy text takes under 10 seconds.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="card-premium rounded-2xl p-6 border-2 hover:-translate-y-1 transition-transform duration-300">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center font-bold text-xl text-background mb-4" style={{ background: 'linear-gradient(135deg, #D4AF37, #B8941E)' }}>
                {s.n}
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm leading-relaxed text-[hsl(0_0%_92%)]">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PNG Spotlight */}
      <section className="section-container max-w-5xl">
        <div className="rounded-3xl p-8 md:p-12 border-2 border-accent/30" style={{ background: 'linear-gradient(135deg, #1D2F46, #162033)' }}>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            📥 Download Calligraphy as a PNG Image — <span className="gold-gradient-text">Our Standout Feature</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Most calligraphy font generators online only give you Unicode text — useful for bios and messages. This tool goes further. You can download your calligraphy text as a high-resolution PNG image with a transparent background, ready to drop directly into any design project. No Photoshop. No Canva. No background-removal tool. Just generate and download — done in seconds.
          </p>
          <div className="flex flex-wrap gap-2">
            {['High-resolution output', 'Transparent background', 'No compression or pixelation', 'No watermarks', 'Free, unlimited downloads'].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border border-accent/40 bg-accent/10 text-foreground">
                ✅ {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Tool features grid */}
      <section className="section-container max-w-5xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
          Built for <span className="gold-gradient-text">Speed, Privacy & Quality</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f) => (
            <div key={f.title} className="card-premium rounded-2xl p-6 border-2 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[hsl(0_0%_92%)]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Styles */}
      <section className="section-container max-w-6xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-3">
          Calligraphy Font Styles — <span className="gold-gradient-text">Something for Every Purpose</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Choose from a wide variety of calligraphy styles suited for different aesthetics, occasions, and projects.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {styles.map((s) => (
            <div key={s.title} className="card-premium rounded-2xl p-6 border-2 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm leading-relaxed text-[hsl(0_0%_92%)]">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Platforms */}
      <section className="section-container max-w-6xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-3">
          Calligraphy Copy & Paste — <span className="gold-gradient-text">Works Everywhere</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          The calligraphy text uses Unicode characters, which means it displays correctly on virtually every platform — no special font needed.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms.map((p) => (
            <div key={p.name} className="card-premium rounded-xl p-4 border-2 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl mb-2">{p.icon}</div>
              <h3 className="font-bold text-foreground text-sm mb-1">{p.name}</h3>
              <p className="text-xs leading-snug text-[hsl(0_0%_92%)]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Use cases */}
      <section className="section-container max-w-5xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-3">
          How People Use the <span className="gold-gradient-text">Calligraphy Font Generator</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          From Instagram bios to wedding invitations — here's how creators, designers, and everyday users put this tool to work.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {useCases.map((u) => (
            <div key={u.title} className="card-premium rounded-2xl p-6 border-2 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl mb-3">{u.icon}</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{u.title}</h3>
              <p className="text-sm leading-relaxed text-[hsl(0_0%_92%)]">{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="section-container max-w-3xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
          Frequently Asked <span className="gold-gradient-text">Questions</span>
        </h2>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={i} className="card-premium rounded-xl border-2 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-secondary/30 transition-colors"
                  aria-expanded={open}
                >
                  <span className="font-semibold text-foreground">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 text-accent shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-[hsl(0_0%_92%)]">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="section-container max-w-4xl">
        <div className="rounded-3xl p-10 md:p-14 text-center border-2 border-accent/40" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B8941E 50%, #8B6F14 100%)' }}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: '#162033' }}>
            Try the Free Calligraphy Font Generator Now
          </h2>
          <p className="mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: '#162033', opacity: 0.85 }}>
            Type your text, pick a style, then copy it or download as a PNG — no sign-up, no software, no cost. Ready in under 10 seconds.
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            style={{ background: '#162033', color: '#D4AF37' }}
          >
            <Zap className="h-5 w-5" /> Generate Calligraphy Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default CalligraphySEOContent;