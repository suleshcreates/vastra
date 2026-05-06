import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Mail } from 'lucide-react';

// Pinterest SVG icon (not in lucide)
const PinterestIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 20l4-9" /><path d="M10.7 14c.437 1.263 1.43 2 2.55 2 2.071 0 3.75-1.554 3.75-4a5 5 0 1 0-9.7 1.7" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const socialLinks = [
  { icon: <Instagram size={16} />, label: 'Instagram', href: '#' },
  { icon: <PinterestIcon />, label: 'Pinterest', href: '#' },
  { icon: <Youtube size={16} />, label: 'YouTube', href: '#' },
  { icon: <Mail size={16} />, label: 'Email', href: 'mailto:hello@vastrastudio.in' },
];

const paymentMethods = ['Visa', 'Mastercard', 'UPI', 'RuPay', 'Amex'];

export const Footer = () => {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-ink)] px-6 py-16 text-[var(--color-sand)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <p className="text-[10px] uppercase tracking-[0.45em] text-white/45">Vastra Studio</p>
            <h3 className="max-w-3xl font-serif text-4xl tracking-[0.08em] md:text-5xl">
              Crafted for occasion, rooted in memory, and presented with a stronger boutique story.
            </h3>
            <p className="max-w-2xl text-base leading-8 text-white/62">
              The landing page stays clean, while dedicated category browsing makes the demo feel closer to a real storefront.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <p className="text-[10px] uppercase tracking-[0.38em] text-[var(--color-gold)]">Private Preview</p>
            <p className="mt-3 font-serif text-3xl">Book a styling conversation for festive edits, launches, and curated drops.</p>
            <a
              href="/#shop"
              className="mt-6 inline-flex rounded-full bg-[var(--color-gold)] px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink)] hover:bg-white transition-colors duration-300"
            >
              View Collection
            </a>
          </motion.div>
        </div>

        {/* As Seen In — Press Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-b border-white/10 py-8"
        >
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 text-center mb-5">
            As Featured In
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
            {['Vogue India', 'Elle', 'Grazia', 'Harper\'s Bazaar', 'Femina'].map((pub) => (
              <span
                key={pub}
                className="font-serif text-lg md:text-xl text-white/20 tracking-widest italic"
              >
                {pub}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              content: (
                <>
                  <h4 className="font-serif text-2xl">VASTRA</h4>
                  <p className="mt-4 text-sm leading-7 text-white/55">
                    Occasionwear and contemporary heritage pieces with a warmer, more editorial online presence.
                  </p>
                </>
              ),
            },
            {
              content: (
                <>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-white/45">Navigate</p>
                  <div className="mt-4 grid gap-3 text-sm text-white/72">
                    <a href="/#home" className="transition-colors hover:text-white">Home</a>
                    <a href="/#shop" className="transition-colors hover:text-white">Shop</a>
                    <a href="/#about" className="transition-colors hover:text-white">Atelier</a>
                  </div>
                </>
              ),
            },
            {
              content: (
                <>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-white/45">Collections</p>
                  <div className="mt-4 grid gap-3 text-sm text-white/72">
                    <Link to="/category/women" className="transition-colors hover:text-white">Women</Link>
                    <Link to="/category/men" className="transition-colors hover:text-white">Men</Link>
                    <Link to="/category/accessories" className="transition-colors hover:text-white">Accessories</Link>
                  </div>
                </>
              ),
            },
            {
              content: (
                <>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-white/45">Contact</p>
                  <div className="mt-4 grid gap-3 text-sm text-white/72">
                    <span>hello@vastrastudio.in</span>
                    <span>+91 98765 43210</span>
                    <span>Jaipur, India</span>
                  </div>
                </>
              ),
            },
          ].map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {col.content}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-5 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between"
        >
          <p>© 2026 Vastra Studio. Designed for presentation and pitch review.</p>

          {/* Payment method badges */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-widest text-white/30 mr-2">We Accept</span>
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] uppercase tracking-wider text-white/50"
              >
                {method}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
