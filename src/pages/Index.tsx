import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';

import CompareFonts from '@/components/CompareFonts';
import TrendingCalligraphy from '@/components/TrendingCalligraphy';
import WebFontPreview from '@/components/WebFontPreview';

import CalligraphyTips from '@/components/CalligraphyTips';
import CalligraphySEOContent from '@/components/CalligraphySEOContent';
import SiteFooter from '@/components/SiteFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WebFontPreview />
        <CompareFonts />
        <TrendingCalligraphy />
        
        <CalligraphyTips />
        <CalligraphySEOContent />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
