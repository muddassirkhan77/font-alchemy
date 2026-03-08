import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FontGenerator from '@/components/FontGenerator';
import CompareFonts from '@/components/CompareFonts';
import TrendingCalligraphy from '@/components/TrendingCalligraphy';
import PremiumFeatures from '@/components/PremiumFeatures';
import CalligraphyTips from '@/components/CalligraphyTips';
import SiteFooter from '@/components/SiteFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FontGenerator />
        <CompareFonts />
        <TrendingCalligraphy />
        <PremiumFeatures />
        <CalligraphyTips />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
