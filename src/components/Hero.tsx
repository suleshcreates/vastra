import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const heroImage =
  'https://images.pexels.com/photos/35340661/pexels-photo-35340661.jpeg?auto=compress&cs=tinysrgb&w=1400';

// Animated counter component
const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-sand)]"
    >
      {/* ═══════════════════════════════════════════ */}
      {/* MOBILE + TABLET — Full-screen editorial    */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative lg:hidden" style={{ height: '100svh' }}>
        {/* Full-bleed background image — covers entire screen */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Model in an embroidered blue festive outfit"
            className="h-full w-full object-cover ken-burns"
            style={{ objectPosition: '60% 20%' }}
          />
          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[rgba(20,18,18,0.3)] to-[rgba(20,18,18,0.15)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent opacity-50" />
        </motion.div>

        {/* Content overlaid at bottom */}
        <div className="relative flex h-full flex-col justify-end px-5 pb-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold)]"
            >
              Festive Arrivals — 2025
            </motion.p>

            <h1 className="font-serif text-[2.8rem] leading-[0.9] sm:text-6xl">
              {['Timeless', 'festive wear.'].map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="max-w-[280px] text-[13px] leading-[1.7] text-white/60 sm:max-w-sm sm:text-sm"
            >
              Handcrafted elegance for weddings, celebrations & statement moments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-center gap-3 pt-1"
            >
              <a
                href="#shop"
                onClick={(e) => { e.preventDefault(); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="magnetic-glow inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-ink)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Shop Now
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-white/40 hover:text-white"
              >
                Our Story
              </a>
            </motion.div>

            {/* Minimal stats bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex items-center gap-5 border-t border-white/10 pt-4"
            >
              {[
                { value: '120+', label: 'Arrivals' },
                { value: '4.9★', label: 'Rating' },
                { value: '3', label: 'Collections' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-lg text-white">{stat.value}</p>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-white/40">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* DESKTOP HERO — Side-by-side with parallax  */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#6d4b42_0%,rgba(20,18,18,0)_38%)] opacity-80" />
        <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(120deg,rgba(214,188,150,0.08),rgba(214,188,150,0))]" />
        <div className="absolute right-[-12rem] top-24 h-80 w-80 rounded-full bg-[var(--color-burgundy)]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-[1.05fr_0.95fr] items-center gap-10 px-6 pb-16 pt-24">
          {/* Text column */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7"
          >
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-gold)]"
              >
                Festive Arrivals
              </motion.p>

              <h1 className="max-w-3xl font-serif text-[3.8rem] leading-[0.92] xl:text-[4.6rem]">
                {['Timeless festive', 'wear for every', 'celebration.'].map((line, i) => (
                  <motion.span
                    key={line}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>

              <p className="max-w-lg text-sm leading-7 text-white/65 xl:text-base xl:leading-8">
                Discover elegant silhouettes, rich textures, and handcrafted details curated for intimate gatherings,
                wedding moments, and statement occasions.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-4"
            >
              <a
                href="#shop"
                onClick={(e) => { e.preventDefault(); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="magnetic-glow inline-flex items-center justify-center gap-3 rounded-full bg-[var(--color-gold)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ink)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                View Collection
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 text-sm uppercase tracking-[0.28em] text-white/80 transition-colors duration-300 hover:border-white/35 hover:text-white"
              >
                Our Story
              </a>
            </motion.div>

            {/* Stat counters */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { target: 120, suffix: '+', label: 'New arrivals this season' },
                { target: 4.9, suffix: '★', label: 'Average customer rating', isDecimal: true },
                { target: 3, suffix: '', label: 'Curated collections' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="font-serif text-2xl text-white xl:text-3xl">
                    {stat.isDecimal ? (
                      <span>{stat.target}{stat.suffix}</span>
                    ) : (
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                    )}
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-white/58 xl:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image column — fits within viewport */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[2.35rem] border border-white/10 bg-white/5 p-3 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
              <div className="relative overflow-hidden rounded-[2rem]">
                <img
                  src={heroImage}
                  alt="Model in an embroidered blue festive outfit"
                  className="w-full object-cover object-top ken-burns"
                  style={{ height: 'calc(100vh - 14rem)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,11,11,0.58)] via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
