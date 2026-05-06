import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';

const categoryHighlights = [
  {
    key: 'Women',
    slug: 'women',
    title: 'Women',
    subtitle: 'Festive sets, soft drape, and statement color stories.',
    image: 'https://images.pexels.com/photos/30435954/pexels-photo-30435954.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    key: 'Men',
    slug: 'men',
    title: 'Men',
    subtitle: 'Tailored occasionwear with richer depth and cleaner structure.',
    image: 'https://images.pexels.com/photos/15619559/pexels-photo-15619559.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    key: 'Accessories',
    slug: 'accessories',
    title: 'Accessories',
    subtitle: 'Finishing pieces that make the showcase feel merchandised.',
    image: 'https://images.pexels.com/photos/18116160/pexels-photo-18116160.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
] as const;

export const ShopSection = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <section id="shop" className="relative bg-[var(--color-sand)] px-4 pt-20 pb-10 md:px-6 md:pt-28 md:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-burgundy)]">The Collection</p>
            <h2 className="max-w-[13ch] font-serif text-[2.55rem] leading-[1.02] text-[var(--color-ink)] md:max-w-none md:text-6xl">
              Explore signature styles for every occasion.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="max-w-xl justify-self-end text-sm leading-7 text-[var(--color-muted)] md:max-w-2xl md:text-base md:leading-8"
          >
            From festive sets to finishing accessories, browse every category and discover pieces designed for celebrations, gatherings, and statement dressing.
          </motion.p>
        </div>

        <div className="mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center justify-between gap-4"
          >
            <h3 className="font-serif text-[1.7rem] text-[var(--color-ink)] md:text-4xl">Shop by Category</h3>
            <Link
              to="/category/women"
              className="rounded-full border border-[var(--color-border-strong)] px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] md:px-5 md:py-3 md:text-[11px] md:tracking-[0.28em]"
            >
              View Collections
            </Link>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {categoryHighlights.map((category, index) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="group text-center md:relative md:overflow-hidden md:rounded-[2rem] md:text-left block"
                >
                  <div className="rounded-t-[999px] rounded-b-[1rem] bg-[#f1dfc4] p-1.5 shadow-[0_16px_30px_-24px_rgba(17,13,13,0.35)] md:hidden">
                    <div className="overflow-hidden rounded-t-[999px] rounded-b-[0.85rem]">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="h-28 w-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <p className="mt-2 font-serif text-sm text-[var(--color-ink)] md:hidden">{category.title}</p>

                  <div className="hidden md:block">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-[26rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,12,12,0.82)] via-[rgba(15,12,12,0.18)] to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                      <p className="text-[10px] uppercase tracking-[0.36em] text-[var(--color-gold)]">Shop Now</p>
                      <div className="mt-3 flex items-end justify-between gap-4">
                        <div>
                          <h4 className="font-serif text-4xl">{category.title}</h4>
                          <p className="mt-2 max-w-xs text-sm leading-6 text-white/75">{category.subtitle}</p>
                        </div>
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-8 flex items-end justify-between gap-6"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-burgundy)]">Featured Picks</p>
              <h3 className="mt-3 max-w-[12ch] font-serif text-[2.2rem] leading-[1.05] text-[var(--color-ink)] md:max-w-none md:text-5xl">Customer favorites from our latest edit.</h3>
            </div>
            <a
              href="/#about"
              className="hidden rounded-full border border-[var(--color-border-strong)] px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] md:inline-flex"
            >
              Discover Craftsmanship
            </a>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
