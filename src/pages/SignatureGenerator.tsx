import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import SignatureGenerator from '@/components/SignatureGenerator';

const SignatureGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SignatureGenerator />
      </main>
      <SiteFooter />
    </div>
  );
};

export default SignatureGeneratorPage;
