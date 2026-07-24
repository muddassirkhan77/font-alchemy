import HeroSection from '@/components/HeroSection';

import CompareFonts from '@/components/CompareFonts';
import TrendingCalligraphy from '@/components/TrendingCalligraphy';
import WebFontPreview from '@/components/WebFontPreview';

import CalligraphyTips from '@/components/CalligraphyTips';
import CalligraphySEOContent from '@/components/CalligraphySEOContent';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <WebFontPreview />
        <CompareFonts />
        <TrendingCalligraphy />
        
        <CalligraphyTips />
        <CalligraphySEOContent />
      </main>
    </div>
  );
};

export default Index;
