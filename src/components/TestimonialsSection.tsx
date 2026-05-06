import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Vishakha Shinde',
    role: 'Verified Buyer',
    text: 'The Mehr Ivory set exceeded my expectations. The Chanderi fabric has such a premium sheen, and the fit is absolutely perfect for festive occasions.',
    rating: 5,
  },
  {
    name: 'Shilpa R.',
    role: 'Style Enthusiast',
    text: 'Finding authentic luxury that feels comfortable is rare. Vastra has mastered the balance of traditional embroidery with modern silhouettes.',
    rating: 5,
  },
  {
    name: 'Sonia Kapoor',
    role: 'Loyal Customer',
    text: 'I have been shopping from Vastra for over a year now. Every piece tells a story and the quality of the hand-finishing is simply unmatched.',
    rating: 5,
  },
  {
    name: 'Ananya M.',
    role: 'Fashion Blogger',
    text: 'The attention to detail in the embroidery is breathtaking. It feels like wearing a piece of art.',
    rating: 5,
  },
  {
    name: 'Priyanka T.',
    role: 'Occasion Wearer',
    text: 'Elegant, timeless, and sophisticated. The Amber Kurta set is my go-to for every family celebration.',
    rating: 5,
  },
  {
    name: 'Meera Shah',
    role: 'Verified Buyer',
    text: 'Finally a brand that understands modern Indian elegance. The silhouettes are so flattering and the colors are vibrant yet tasteful.',
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  // Triple the items for a seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="bg-[var(--color-sand)] px-6 py-16 text-[var(--color-ink)] md:py-20 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl text-center space-y-4 mb-12"
      >
        <div className="flex justify-center">
           <motion.p
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             viewport={{ once: true }}
             className="inline-block rounded-full bg-[var(--color-clay)] px-4 py-1.5 text-[9px] uppercase tracking-[0.25em] font-bold text-[var(--color-burgundy)]"
           >
            Client Stories
          </motion.p>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-serif text-3xl leading-tight md:text-5xl max-w-2xl mx-auto"
        >
          Genuinely Premium. <span className="italic font-light">Uniquely Yours.</span>
        </motion.h2>
      </motion.div>

      {/* Marquee Wrapper */}
      <div className="relative flex w-full overflow-hidden">
        <motion.div 
          className="flex gap-6 whitespace-nowrap py-4"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {duplicatedTestimonials.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="inline-block w-[320px] md:w-[400px] shrink-0 whitespace-normal"
            >
              <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/40 bg-white/30 p-8 backdrop-blur-sm shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:bg-white/50 transition-colors duration-500 border-l-4 border-l-[var(--color-gold)]">
                <div className="space-y-4">
                  <div className="flex gap-1 text-[var(--color-gold)]">
                    {[...Array(t.rating)].map((_, star) => (
                      <Star key={star} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-base leading-relaxed font-serif italic text-[var(--color-ink)]/80">
                    "{t.text}"
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--color-ink)]/5">
                  <p className="font-serif text-xl font-bold">{t.name}</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-gold)] font-bold mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient Fades for the edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-sand)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--color-sand)] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};
