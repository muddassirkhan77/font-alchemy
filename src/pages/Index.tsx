import HeroSection from '@/components/HeroSection';
import CompareFonts from '@/components/CompareFonts';
import TrendingCalligraphy from '@/components/TrendingCalligraphy';
import WebFontPreview from '@/components/WebFontPreview';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <WebFontPreview />
        <CompareFonts />
        <TrendingCalligraphy />
      </main>
    </div>
  );
};

export default Index;
