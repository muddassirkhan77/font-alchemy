import { BookOpen, ArrowRight } from 'lucide-react';

const tips = [
  {
    title: 'Choosing the Right Calligraphy Style',
    excerpt: 'Learn how to pick the perfect font style for your brand, social media bio, or creative project.',
  },
  {
    title: 'Instagram Bio Typography Tricks',
    excerpt: 'Discover how top influencers use fancy text to make their profiles stand out in the feed.',
  },
  {
    title: 'Unicode Fonts: How They Work',
    excerpt: 'Understand the technology behind copy-paste fonts and why they work across all platforms.',
  },
];

const CalligraphyTips = () => {
  return (
    <section id="tips" className="section-container py-16">
      <div className="flex items-center justify-center gap-2 mb-2">
        <BookOpen className="h-5 w-5 text-accent" />
        <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Calligraphy <span className="gold-gradient-text">Tips & Guides</span>
        </h2>
      </div>
      <p className="text-center text-sm text-muted-foreground mb-8">
        Expert advice on making the most of fancy fonts
      </p>

      <div className="mx-auto max-w-4xl grid grid-cols-1 gap-4 md:grid-cols-3">
        {tips.map(tip => (
          <div key={tip.title} className="card-premium p-6">
            <h3 className="font-heading text-base font-bold mb-2 text-foreground">{tip.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tip.excerpt}</p>
            <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition-colors hover:text-accent/80">
              Read More <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CalligraphyTips;
