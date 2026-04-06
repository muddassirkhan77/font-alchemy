import { useState, useCallback, useRef, useEffect } from 'react';
import { Menu, X, Crown, ChevronDown, ChevronUp } from 'lucide-react';
import { instagramCategories } from '@/lib/instagramFonts';
import logo from '@/assets/logo.png';

const navLinks = [
{ label: 'Home', href: '#hero' },
{ label: 'Calligraphy', href: '#calligraphy' },
{ label: 'Tips', href: '#tips' },
{ label: 'Premium', href: '#premium' },
{ label: 'Contact', href: '#footer' }];


const categoryNames = instagramCategories.map((c) => c.name);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [instaOpen, setInstaOpen] = useState(false);
  const [mobileInstaOpen, setMobileInstaOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setIsOpen((p) => !p), []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setInstaOpen(false);
        setFocusIdx(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Scroll focused item into view
  useEffect(() => {
    if (focusIdx >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="menuitem"]');
      items[focusIdx]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusIdx]);

  const navigateToCategory = (catName: string) => {
    window.dispatchEvent(new CustomEvent('fontify-tab', { detail: 'instagram' }));
    setInstaOpen(false);
    setMobileInstaOpen(false);
    setIsOpen(false);
    setFocusIdx(-1);
    // Scroll to category after tab switch
    setTimeout(() => {
      const id = `insta-cat-${catName.replace(/\s+/g, '-').toLowerCase()}`;
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const navigateToInstagram = () => {
    window.dispatchEvent(new CustomEvent('fontify-tab', { detail: 'instagram' }));
    setInstaOpen(false);
    setIsOpen(false);
    setFocusIdx(-1);
    document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!instaOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setInstaOpen(true);
        setFocusIdx(0);
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusIdx((p) => Math.min(p + 1, categoryNames.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusIdx((p) => Math.max(p - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusIdx >= 0) navigateToCategory(categoryNames[focusIdx]);
        break;
      case 'Escape':
        e.preventDefault();
        setInstaOpen(false);
        setFocusIdx(-1);
        triggerRef.current?.focus();
        break;
      case 'Home':
        e.preventDefault();
        setFocusIdx(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusIdx(categoryNames.length - 1);
        break;
    }
  };

  const scrollList = (dir: 'up' | 'down') => {
    if (listRef.current) {
      listRef.current.scrollBy({ top: dir === 'up' ? -120 : 120, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="section-container flex items-center justify-between py-1.5">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-0.5">
          <img src={logo} alt="FontiFy Logo" className="h-14 w-auto" style={{ filter: 'contrast(1.3)' }} />
          <span className="font-extrabold gold-gradient-text tracking-tight -ml-1 mx-0 text-3xl font-serif text-left">FontiFy</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 md:flex" aria-label="Main navigation">
          <a href="#hero" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Home</a>
          <a
            href="#calligraphy"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Calligraphy
          </a>

          {/* Instagram dropdown - right next to Calligraphy */}
          <div ref={dropdownRef} className="relative">
            <button
              ref={triggerRef}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onMouseEnter={() => setInstaOpen(true)}
              onClick={navigateToInstagram}
              onKeyDown={handleKeyDown}
              aria-haspopup="true"
              aria-expanded={instaOpen}>
              
              Instagram
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${instaOpen ? 'rotate-180' : ''}`} />
            </button>

            {instaOpen &&
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 rounded-xl border border-border bg-card shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150"
              role="menu"
              aria-label="Instagram font categories"
              onMouseLeave={() => {setInstaOpen(false);setFocusIdx(-1);}}
              onKeyDown={handleKeyDown}>
              
                {/* Scroll up arrow */}
                <button
                className="flex w-full items-center justify-center py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                onClick={() => scrollList('up')}
                aria-label="Scroll up"
                tabIndex={-1}>
                
                  <ChevronUp className="h-4 w-4" />
                </button>

                <div ref={listRef} className="max-h-72 overflow-y-auto scrollbar-thin px-1 py-1">
                  {/* "All Instagram Fonts" link */}
                  <button
                  role="menuitem"
                  className={`w-full text-left rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  focusIdx === -1 ? '' : ''} text-accent hover:bg-accent/10`
                  }
                  onClick={navigateToInstagram}>
                  
                    📸 All Instagram Fonts
                  </button>
                  <div className="mx-2 my-1 h-px bg-border" />
                  {categoryNames.map((name, i) =>
                <button
                  key={name}
                  role="menuitem"
                  tabIndex={-1}
                  className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                  focusIdx === i ?
                  'bg-accent/15 text-foreground' :
                  'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'}`
                  }
                  onClick={() => navigateToCategory(name)}
                  onMouseEnter={() => setFocusIdx(i)}>
                  
                      {name}
                    </button>
                )}
                </div>

                {/* Scroll down arrow */}
                <button
                className="flex w-full items-center justify-center py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                onClick={() => scrollList('down')}
                aria-label="Scroll down"
                tabIndex={-1}>
                
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            }
          </div>
          <a href="#tips" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Tips</a>
          <a href="#premium" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Premium</a>
          <a href="#footer" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Contact</a>
          <a href="#premium" className="btn-gold gap-1 text-[11px] px-2.5 py-1">
            <Crown className="h-3 w-3" /> Unlock Premium
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle menu">
          
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-[80vh] border-t border-border' : 'max-h-0'}`
        }>
        
        <nav className="section-container flex flex-col gap-3 py-4" aria-label="Mobile navigation">
          {navLinks.map((link) =>
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-1"
            onClick={() => {
              setIsOpen(false);
            }}>
            
              {link.label}
            </a>
          )}

          {/* Mobile Instagram with expandable categories */}
          <div>
            <button
              className="flex w-full items-center justify-between text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-1"
              onClick={() => setMobileInstaOpen((p) => !p)}
              aria-expanded={mobileInstaOpen}>
              
              <span>📸 Instagram Fonts</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileInstaOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${mobileInstaOpen ? 'max-h-[60vh]' : 'max-h-0'}`}>
              <div className="mt-1 ml-3 border-l-2 border-accent/20 overflow-y-auto max-h-[50vh] scrollbar-thin">
                <button
                  className="block w-full text-left pl-3 py-1.5 text-sm font-semibold text-accent"
                  onClick={navigateToInstagram}>
                  
                  All Instagram Fonts →
                </button>
                {categoryNames.map((name) =>
                <button
                  key={name}
                  className="block w-full text-left pl-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => navigateToCategory(name)}>
                  
                    {name}
                  </button>
                )}
              </div>

              {/* Mobile scroll arrows */}
              <div className="flex items-center justify-center gap-4 py-1">
                <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">scroll for more</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <a href="#premium" className="btn-gold mt-2 w-fit gap-2 text-sm" onClick={() => setIsOpen(false)}>
            <Crown className="h-4 w-4" /> Unlock Premium
          </a>
        </nav>
      </div>
    </header>);

};

export default Header;