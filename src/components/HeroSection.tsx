const HeroSection = () => {
  return (
    <section id="hero" className="section-container pt-2 pb-1 md:pt-3 md:pb-1 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl text-foreground">
          Fancy Text &{' '}
          <span className="gold-gradient-text gold-underline">Calligraphy</span>
          {' '}Fonts
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
