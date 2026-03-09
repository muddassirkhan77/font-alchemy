const HeroSection = () => {
  return (
    <section id="hero" className="section-container pt-2 pb-2 md:pt-3 md:pb-2 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl text-foreground">
          Fancy Text &{' '}
          <span className="gold-gradient-text gold-underline">Calligraphy</span>
          {' '}Font Generator
        </h1>
        <p className="mx-auto mt-3 max-w-[70ch] text-base text-muted-foreground md:text-lg leading-relaxed">
          Transform your text into stunning Unicode calligraphy and fancy fonts. Copy &amp; paste
          anywhere — Instagram, Facebook, TikTok, YouTube, WhatsApp, and more.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
