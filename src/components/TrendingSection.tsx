import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

// Use actual product images from the store
const imgBack = products[0].image;   // Mehr Ivory Suit Set (Women)
const imgFront = products[1].image;  // Noor Amber Kurta Set (Women)

export const TrendingSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [20, -30]);

  return (
    <section ref={ref} className="bg-[var(--color-sand)] overflow-hidden px-5 pt-4 pb-14 md:pb-20">
      <div className="mx-auto max-w-7xl">

        {/* ── Header row ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="block text-[10px] font-bold uppercase tracking-[.35em] text-[var(--color-gold)] mb-1.5"
            >
              New Arrivals · SS'26
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }} viewport={{ once: true }}
              className="font-serif text-3xl md:text-5xl leading-[1.05] text-[var(--color-ink)]"
            >
              Trending Now
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15 }} viewport={{ once: true }}
            className="max-w-xs text-[13px] leading-relaxed text-[var(--color-muted)] border-l-2 border-[var(--color-gold)]/30 pl-4 italic"
          >
            Where traditional craftsmanship meets contemporary vision — our most coveted silhouettes this season.
          </motion.p>
        </div>

        {/* ── Main grid: card + images ── */}
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">

          {/* Left — Content card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }} viewport={{ once: true }}
            className="relative rounded-[2rem] bg-gradient-to-br from-[var(--color-clay)] via-white/50 to-white p-8 md:p-10 border border-white/60 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4 relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--color-burgundy)]">
                The Editorial Edit
              </p>

              <h3 className="font-serif text-2xl md:text-4xl leading-[1.1] text-[var(--color-ink)]">
                Discover What's{' '}
                <span className="italic font-light text-[var(--color-gold)]">Shaping The Future</span>
              </h3>

              <div className="h-[2px] w-14 bg-[var(--color-gold)]/40 rounded-full" />

              <p className="max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
                Hand-embroidered silhouettes and modern heritage textures — the pieces everyone's adding to their wardrobes.
              </p>
            </div>

            <button
              onClick={() => navigate('/category/Women')}
              className="mt-5 self-start inline-flex items-center gap-3 bg-[var(--color-ink)] text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[.2em] hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] transition-all duration-500 shadow-lg group"
            >
              Shop Now
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* watermark */}
            <span className="absolute bottom-4 right-6 text-[7rem] font-serif leading-none text-[var(--color-gold)]/[0.04] select-none pointer-events-none">
              V
            </span>
          </motion.div>

          {/* Right — overlapping product images */}
          <div className="relative h-[360px] md:h-[420px]">
            {/* Back image — larger */}
            <motion.div
              initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: .9 }} viewport={{ once: true }}
              className="absolute top-0 right-0 w-[75%] h-[88%] rounded-[2rem] overflow-hidden shadow-2xl border border-white/30"
            >
              <img
                src={imgBack} alt={products[0].name}
                className="w-full h-full object-cover object-top transition-transform duration-[2s] hover:scale-105"
              />
            </motion.div>

            {/* Front floating image — overlapping */}
            <motion.div
              style={{ y: imgY }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: .2, duration: .7 }} viewport={{ once: true }}
              className="absolute bottom-0 left-0 w-[50%] h-[60%] rounded-2xl overflow-hidden border-[6px] border-white shadow-2xl z-10"
            >
              <img
                src={imgFront} alt={products[1].name}
                className="w-full h-full object-cover object-top transition-transform duration-[2s] hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
