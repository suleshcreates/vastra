import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronLeft, Star, ArrowRight, Truck, Shield, RotateCcw, Ruler } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useEffect, useState } from 'react';
import { SizeGuideModal } from './SizeGuideModal';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Show sticky bar after scrolling past main CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--color-sand)]">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl">Product not found</h2>
          <button onClick={() => navigate('/')} className="text-[var(--color-gold)] hover:underline font-bold tracking-widest uppercase text-[10px]">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Fake stock count for urgency (based on product id hash)
  const stockLeft = (product.id.charCodeAt(0) % 5) + 2;
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToBag = () => {
    addItem(product);
    toggleDrawer();
  };

  return (
    <div className="min-h-screen bg-[var(--color-sand)] pt-20 pb-16 selection:bg-[var(--color-gold)] selection:text-white">
      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />

      <div className="mx-auto max-w-7xl px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors mb-8 group"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to collection
        </button>

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="aspect-[4/5] max-h-[70vh] overflow-hidden rounded-[2rem] border border-white/40 shadow-xl relative">
              {!imgLoaded && <div className="skeleton absolute inset-0 rounded-[2rem]" />}
              <img
                src={product.image}
                alt={product.name}
                className={`h-full w-full object-cover object-top transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImgLoaded(true)}
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                    i === 1
                      ? 'border-[var(--color-gold)] opacity-100 ring-2 ring-[var(--color-gold)]/30'
                      : 'border-white/20 opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={product.image} className="h-full w-full object-cover" alt="" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <div className="space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--color-gold)]">
                  {product.category}
                </p>
                <h1 className="font-serif text-4xl leading-tight md:text-5xl">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-2xl font-bold text-[var(--color-ink)]">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-lg text-[var(--color-muted)] line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <div className="bg-[var(--color-burgundy)] text-white text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest font-bold">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              </div>

              {/* Stock urgency */}
              <p className="text-[11px] font-bold text-[var(--color-burgundy)]">
                🔥 Only {stockLeft} left in stock — order soon
              </p>

              <p className="text-base leading-relaxed text-[var(--color-muted)] max-w-lg">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 border-y border-[var(--color-ink)]/5">
              <div className="space-y-0.5">
                <p className="text-[9px] uppercase tracking-widest text-[var(--color-gold)] font-bold">Fabric</p>
                <p className="text-sm font-medium">{product.fabric}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] uppercase tracking-widest text-[var(--color-gold)] font-bold">Palette</p>
                <p className="text-sm font-medium">{product.palette}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] uppercase tracking-widest text-[var(--color-gold)] font-bold">Rating</p>
                <div className="flex gap-0.5 text-[var(--color-gold)]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Size selection with active state */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] uppercase tracking-widest font-bold">Select Size</p>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[var(--color-burgundy)] font-bold hover:text-[var(--color-ink)] transition-colors"
                  >
                    <Ruler size={12} />
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all font-medium text-[11px] ${
                        selectedSize === size
                          ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white scale-105 shadow-lg'
                          : 'border-[var(--color-ink)]/10 hover:border-[var(--color-ink)] text-[var(--color-ink)]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to bag CTA */}
              <button
                onClick={handleAddToBag}
                className="w-full magnetic-glow bg-[var(--color-ink)] text-white py-4 rounded-[1.5rem] flex items-center justify-center gap-3 group overflow-hidden relative shadow-lg active:scale-[0.98] transition-transform"
              >
                <div className="absolute inset-0 bg-[var(--color-gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-bold group-hover:text-[var(--color-ink)] transition-colors">
                  <ShoppingBag size={16} />
                  Add to Bag
                </span>
              </button>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Truck size={16} />, label: 'Free Shipping', sub: 'On orders above ₹2,999' },
                  { icon: <Shield size={16} />, label: 'Handcrafted', sub: 'Artisan-made with care' },
                  { icon: <RotateCcw size={16} />, label: 'Easy Returns', sub: '7-day return policy' },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex flex-col items-center text-center p-3 rounded-2xl border border-[var(--color-border)] bg-white/30"
                  >
                    <span className="text-[var(--color-gold)]">{badge.icon}</span>
                    <p className="mt-2 text-[9px] uppercase tracking-widest font-bold text-[var(--color-ink)]">
                      {badge.label}
                    </p>
                    <p className="mt-0.5 text-[8px] text-[var(--color-muted)] leading-tight">
                      {badge.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[var(--color-ink)]/5 space-y-8">
            <div className="flex justify-between items-end">
              <h2 className="font-serif text-2xl md:text-3xl">Complete the Look</h2>
              <button
                onClick={() => navigate(`/category/${product.category}`)}
                className="text-[10px] uppercase tracking-widest hover:text-[var(--color-gold)] transition-colors flex items-center gap-2 group font-bold"
              >
                View More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="group cursor-pointer space-y-3"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-white/20 shadow-md">
                    <img src={p.image} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={p.name} />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-serif text-base">{p.name}</h3>
                    <p className="text-[var(--color-gold)] font-bold tracking-widest text-[11px]">₹{p.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky add-to-bag bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-border)] bg-[var(--color-sand)]/95 backdrop-blur-xl px-6 py-3 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.15)]"
          >
            <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={product.image}
                  alt=""
                  className="w-10 h-12 rounded-lg object-cover flex-none border border-[var(--color-border)]"
                />
                <div className="min-w-0">
                  <p className="text-sm font-serif font-bold truncate">{product.name}</p>
                  <p className="text-sm text-[var(--color-burgundy)] font-semibold">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={handleAddToBag}
                className="flex-none rounded-full bg-[var(--color-ink)] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-[var(--color-burgundy)] transition-colors active:scale-[0.97]"
              >
                Add to Bag
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
