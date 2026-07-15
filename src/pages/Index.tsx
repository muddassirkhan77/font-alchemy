import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1"></main>
      <SiteFooter />
    </div>
  );
};

export default Index;
