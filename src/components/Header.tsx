import { useState, useCallback } from 'react';
import { Menu, X, Crown } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Calligraphy', href: '#tool', tab: 'calligraphy' as const },
  { label: 'Instagram', href: '#tool', tab: 'instagram' as const },
  { label: 'Tips', href: '#tips' },
  { label: 'Premium', href: '#premium' },
  { label: 'Contact', href: '#footer' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen(p => !p), []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="section-container flex items-center justify-between py-3">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-accent" />
          <span className="font-heading text-xl font-bold gold-gradient-text">FontiFy</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a href="#premium" className="btn-gold gap-2 text-sm">
            <Crown className="h-4 w-4" /> Unlock Premium
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 border-t border-border' : 'max-h-0'
        }`}
      >
        <nav className="section-container flex flex-col gap-3 py-4" aria-label="Mobile navigation">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-1"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#premium" className="btn-gold mt-2 w-fit gap-2 text-sm" onClick={() => setIsOpen(false)}>
            <Crown className="h-4 w-4" /> Unlock Premium
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
