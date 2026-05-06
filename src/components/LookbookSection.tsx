import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const lookbookImages = [
  {
    src: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800',
    label: 'The Festive Edit',
    tall: true,
  },
  {
    src: 'https://images.pexels.com/photos/6044820/pexels-photo-6044820.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'Artisan Details',
    tall: false,
  },
  {
    src: 'https://images.pexels.com/photos/6045083/pexels-photo-6045083.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'Modern Heritage',
    tall: false,
  },
  {
    src: 'https://images.pexels.com/photos/6045028/pexels-photo-6045028.jpeg?auto=compress&cs=tinysrgb&w=800',
    label: 'The Celebration',
    tall: true,
  },
  {
    src: 'https://images.pexels.com/photos/6045067/pexels-photo-6045067.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'Color Palette',
    tall: false,
  },
  {
    src: 'https://images.pexels.com/photos/8285167/pexels-photo-8285167.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'Statement Layers',
    tall: false,
  },
];

export const LookbookSection = () => {
  return (
    <section className="bg-[var(--color-clay)] px-6 py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-burgundy)]">
              The Edit
            </p>
            <h2 className="font-serif text-3xl leading-[1.05] md:text-5xl text-[var(--color-ink)]">
              Styled by <span className="italic font-light">Vastra</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
            className="max-w-xs text-sm leading-relaxed text-[var(--color-muted)]"
          >
            Editorial looks curated from our latest collections — styled for real celebrations and
            real moments.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {lookbookImages.map((img, index) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group relative break-inside-avoid overflow-hidden rounded-[1.5rem] md:rounded-[2rem] cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.label}
                className={`w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ${
                  img.tall ? 'h-[320px] md:h-[480px]' : 'h-[220px] md:h-[320px]'
                }`}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Label on hover */}
              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                      Shop this look
                    </p>
                    <p className="mt-1 font-serif text-xl text-white">{img.label}</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
