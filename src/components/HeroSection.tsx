const HeroSection = () => {
  return (
    <section id="hero" className="section-container pt-2 pb-1 md:pt-3 md:pb-1 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl text-foreground">
          Fancy Text &{' '}
          <span className="gold-gradient-text gold-underline">Calligraphy</span>
          {' '}Fonts
        </h1>
        <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Generate 100+ stylish Unicode fonts, elegant calligraphy, and signature styles — copy & paste anywhere or download high-resolution PNGs in one click.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
