import { Crown, Heart } from 'lucide-react';

const footerLinks = ['Home', 'Calligraphy Generator', 'Instagram Fonts', 'Premium', 'Tips & Guides'];

const SiteFooter = () => {
  return (
    <footer id="footer" className="bg-primary text-primary-foreground">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Crown className="h-5 w-5" />
              <span className="font-heading text-lg font-bold">FontiFy</span>
            </div>
            <p className="text-sm leading-relaxed opacity-70 max-w-xs">
              The premium fancy text and calligraphy font generator. Transform your text with 50+ Unicode styles that work everywhere.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-sm font-bold mb-3 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm opacity-70 transition-opacity hover:opacity-100">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold mb-3 uppercase tracking-wider">Contact</h4>
            <p className="text-sm opacity-70 mb-2">hello@fontify.tools</p>
            <p className="text-sm opacity-70">Follow us on social media for tips & updates.</p>
            <div className="flex gap-3 mt-4">
              {['Twitter', 'Instagram', 'TikTok'].map(s => (
                <a key={s} href="#" className="rounded-lg border border-primary-foreground/20 px-3 py-1.5 text-xs opacity-70 transition-opacity hover:opacity-100">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 flex flex-col items-center gap-2 text-center">
          <p className="text-xs opacity-50">
            © {new Date().getFullYear()} FontiFy. All rights reserved.
          </p>
          <p className="text-xs opacity-40 flex items-center gap-1">
            Made with <Heart className="h-3 w-3" /> for typography lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
