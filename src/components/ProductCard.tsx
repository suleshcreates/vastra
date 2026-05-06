import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import type { Product } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../utils/format';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const savings = product.originalPrice - product.price;
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      onClick={handleCardClick}
      className="group overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[#fffaf1] shadow-[0_35px_70px_-45px_rgba(17,13,13,0.45)] md:rounded-[1.85rem] cursor-pointer"
    >
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="bg-[#f6e7cf] p-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem]">
            {!imgLoaded && <div className="skeleton absolute inset-0" />}
            <img
              src={product.image}
              alt={product.name}
              className={`h-full w-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ objectPosition: product.imagePosition ?? 'center' }}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        </div>
        <div className="space-y-1 px-3 pb-3 pt-3 text-left">
          <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--color-muted)]">{product.category}</p>
          <h3 className="font-serif text-[1rem] leading-5 text-[var(--color-ink)]">{product.name}</h3>
          <div className="flex items-center justify-between pt-1">
            <p className="text-[0.95rem] font-semibold text-[var(--color-burgundy)]">{formatCurrency(product.price)}</p>
            <button
              onClick={handleAddToCart}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white text-[var(--color-ink)]"
            >
              <ShoppingCart size={14} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="relative aspect-[4/5] overflow-hidden">
          {!imgLoaded && <div className="skeleton absolute inset-0 rounded-none" />}
          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ objectPosition: product.imagePosition ?? 'center' }}
            onLoad={() => setImgLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-85" />

          {/* Quick View overlay */}
          <div className="quick-view-overlay absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
            <button
              onClick={handleQuickView}
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-md transition-all duration-300 hover:bg-white/25 hover:border-white/50"
            >
              <Eye size={14} />
              Quick View
            </button>
          </div>

          <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-white backdrop-blur-md">
            {product.palette}
          </div>

          <button
            onClick={handleAddToCart}
            className="absolute bottom-5 right-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--color-ink)] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[var(--color-gold)] z-10"
          >
            <ShoppingCart size={18} strokeWidth={1.8} />
          </button>

          <div className="absolute bottom-5 left-5 max-w-[70%] z-10">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/68">{product.category}</p>
            <p className="mt-2 font-serif text-2xl text-white">{product.story}</p>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-[1.9rem] leading-8 text-[var(--color-ink)]">{product.name}</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.32em] text-[var(--color-muted)]">{product.fabric}</p>
              <p className="mt-2 max-w-sm text-sm leading-7 text-[var(--color-muted)]">{product.description}</p>
            </div>
          </div>

          <div className="flex items-end gap-3">
            <p className="text-lg text-[var(--color-muted)]/60 line-through">{formatCurrency(product.originalPrice)}</p>
            <p className="text-3xl font-semibold text-[var(--color-burgundy)]">{formatCurrency(product.price)}</p>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--color-ink)]">You Save</span>
              <span className="rounded-md bg-[var(--color-gold)]/45 px-3 py-1 text-sm font-semibold text-[var(--color-ink)]">
                {formatCurrency(savings)}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
