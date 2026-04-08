import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FontGenerator from '@/components/FontGenerator';
import CompareFonts from '@/components/CompareFonts';
import WebFontPreview from '@/components/WebFontPreview';
import SignatureGenerator from '@/components/SignatureGenerator';
import PremiumFeatures from '@/components/PremiumFeatures';
import CalligraphyTips from '@/components/CalligraphyTips';
import SiteFooter from '@/components/SiteFooter';

const Index = () => {
  return (
    <div id="hero" className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WebFontPreview />
        <CompareFonts />
        <FontGenerator />
        <PremiumFeatures />
        <CalligraphyTips />
        <SignatureGenerator />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
