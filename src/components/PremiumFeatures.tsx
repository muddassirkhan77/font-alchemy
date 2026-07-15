import { Image, FileText, Maximize, Scale, ShieldCheck, Crown } from 'lucide-react';

const features = [
  { icon: Image, title: 'PNG Download', desc: 'Export your styled text as high-quality PNG images' },
  { icon: FileText, title: 'SVG Download', desc: 'Vector format for perfect scaling at any size' },
  { icon: Maximize, title: 'High Resolution', desc: 'Up to 4K resolution exports for print & digital' },
  { icon: Scale, title: 'Commercial License', desc: 'Use generated fonts in commercial projects' },
  { icon: ShieldCheck, title: 'No Watermark', desc: 'Clean exports without any branding or marks' },
];

const PremiumFeatures = () => {
  return (
    <section id="premium" className="section-container py-16">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Crown className="h-5 w-5 text-accent" />
        <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Unlock <span className="gold-gradient-text">Premium</span> Features
        </h2>
      </div>
      <p className="text-center text-sm text-muted-foreground mb-8">
        Take your font generation to the next level
      </p>

      <div className="mx-auto max-w-4xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(f => (
          <div key={f.title} className="card-premium p-6 text-center border-accent/20 hover:border-accent/50">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
              <f.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-heading text-base font-bold mb-1 text-foreground">{f.title}</h3>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumFeatures;
