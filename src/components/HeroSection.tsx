import { Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="section-container pt-4 pb-2 md:pt-6 md:pb-3 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Free Unicode Font Generator
        </div>
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl text-foreground">
          Fancy Text &{' '}
          <span className="gold-gradient-text gold-underline">Calligraphy</span>
          {' '}Font Generator
        </h1>
        <p className="mx-auto mt-5 max-w-[70ch] text-base text-muted-foreground md:text-lg leading-relaxed">
          Transform your text into stunning Unicode calligraphy and fancy fonts. Copy &amp; paste
          anywhere — Instagram, Facebook, TikTok, YouTube, WhatsApp, and more.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
