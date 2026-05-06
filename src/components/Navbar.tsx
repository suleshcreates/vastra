import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { cn } from '../utils/cn';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleDrawer, getTotalItems } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed left-0 top-0 z-50 w-full px-6 py-5 transition-all duration-500',
        isScrolled 
          ? 'bg-[rgba(244,237,227,0.92)] py-3 shadow-[0_10px_50px_-30px_rgba(0,0,0,0.3)] backdrop-blur-xl' 
          : 'bg-[linear-gradient(180deg,rgba(18,17,17,0.78),rgba(18,17,17,0.18),transparent)]'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <motion.div
          layoutId="vastra-logo"
          className={cn(
            'justify-self-start font-serif text-[1.8rem] tracking-[0.2em] transition-colors duration-500 md:text-3xl md:tracking-[0.24em]',
            isScrolled ? 'text-[var(--color-ink)]' : 'text-[var(--color-sand)]'
          )}
        >
          <Link to="/">VASTRA</Link>
        </motion.div>

        <div className="hidden items-center justify-center gap-10 rounded-full border border-white/10 bg-white/5 px-8 py-3 backdrop-blur-md md:flex">
          {['Home', 'Shop', 'About'].map((link) => (
            <a
              key={link}
              href={`/#${link.toLowerCase()}`}
              className={cn(
                'group relative text-[10px] font-semibold uppercase tracking-[0.38em] transition-colors duration-500',
                isScrolled 
                  ? 'text-[var(--color-ink)]/68 hover:text-[var(--color-burgundy)]' 
                  : 'text-[var(--color-sand)]/88 hover:text-[var(--color-gold)]'
              )}
            >
              {link}
              <span className={cn(
                "absolute -bottom-1.5 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full",
                isScrolled ? "bg-[var(--color-burgundy)]" : "bg-[var(--color-gold)]"
              )} />
            </a>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 md:gap-4">
          <button
            onClick={() => toggleDrawer(true)}
            className={cn(
              'relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 hover:scale-105 hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] hover:border-[var(--color-gold)] md:h-auto md:w-auto md:p-3',
              isScrolled
                ? 'border-[var(--color-border-strong)] bg-white/50 text-[var(--color-ink)]'
                : 'border-white/12 bg-white/6 text-[var(--color-sand)] backdrop-blur-md'
            )}
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
            {getTotalItems() > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-burgundy)] text-[10px] font-bold text-white shadow-lg">
                {getTotalItems()}
              </span>
            )}
          </button>

          <button
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:hidden',
              isScrolled 
                ? 'border-[var(--color-border-strong)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white' 
                : 'border-white/12 text-[var(--color-sand)] hover:bg-white/10'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-[60] flex flex-col items-center justify-center gap-10 bg-[var(--color-ink)] px-6 text-[var(--color-sand)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden',
          isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        )}
      >
        <button 
          className="absolute right-6 top-6 rounded-full border border-white/10 p-4 transition-transform hover:rotate-90" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center gap-8">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--color-gold)]">Menu</p>
          {['Home', 'Shop', 'About'].map((link, i) => (
            <motion.a
              key={link}
              initial={{ y: 20, opacity: 0 }}
              animate={isMobileMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              href={`/#${link.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-5xl tracking-[0.1em] hover:text-[var(--color-gold)] transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </div>
        <div className="absolute bottom-12 text-[10px] uppercase tracking-[0.4em] text-white/40">
          Vastra Heritage Collection
        </div>
      </div>
    </nav>
  );
};
