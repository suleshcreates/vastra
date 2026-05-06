import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const atelierImage =
  'https://images.pexels.com/photos/6766247/pexels-photo-6766247.jpeg?auto=compress&cs=tinysrgb&w=1200';
const detailImage =
  'https://images.pexels.com/photos/10566062/pexels-photo-10566062.jpeg?auto=compress&cs=tinysrgb&w=900';

export const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const img1Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="about" ref={containerRef} className="bg-[var(--color-clay)] px-6 py-20 text-[var(--color-ink)] md:py-28 relative overflow-hidden">
      {/* Decorative Background Text - Scaled down */}
      <div className="absolute top-10 -left-10 pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[12rem] font-serif leading-none uppercase tracking-tighter">Vastra</h2>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative">
          <motion.div 
            style={{ y: img1Y }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[2.5rem] border border-white/35 shadow-2xl"
          >
            <img src={atelierImage} alt="Tailor working" className="h-[32rem] w-full object-cover" />
          </motion.div>

          <motion.div 
            style={{ y: img2Y }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute -bottom-10 -right-8 w-[50%] overflow-hidden rounded-[2rem] border border-white/40 bg-white p-3 shadow-xl hidden md:block"
          >
            <img src={detailImage} alt="Detail" className="h-48 w-full rounded-[1.4rem] object-cover" />
          </motion.div>
        </div>

        <div className="space-y-10 lg:pl-10">
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-bold uppercase tracking-[0.4em] text-[var(--color-burgundy)]"
            >
              Heritage & Craft
            </motion.p>
            <motion.h2 
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="font-serif text-4xl leading-[1.1] md:text-5xl"
            >
              Artistry in <span className="italic font-light">every stitch</span>.
            </motion.h2>
            <motion.p 
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               viewport={{ once: true }}
               className="max-w-xl text-base leading-relaxed text-[var(--color-muted)]"
            >
              Every garment we create is a bridge between tradition and contemporary style. Our focus is on the subtle details that elevate everyday dressing into an experience of comfort and luxury.
            </motion.p>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: 'Curated Textures',
                desc: 'Handpicked fabrics chosen for their drape, feel, and longevity.',
                icon: '01'
              },
              {
                title: 'Expert Tailoring',
                desc: 'Precision in silhouettes that honor the wearer and the craft.',
                icon: '02'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start p-6 rounded-[2rem] border border-white/40 bg-white/35 backdrop-blur-sm group hover:bg-white/50 transition-colors duration-500"
              >
                <span className="font-serif text-3xl text-[var(--color-gold)] opacity-50">{item.icon}</span>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold">{item.title}</h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
