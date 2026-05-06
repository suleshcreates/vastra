import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../utils/format';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const { items, isDrawerOpen, toggleDrawer, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const navigate = useNavigate();

  // Suggest products not in cart
  const suggestions = products.filter((p) => !items.find((i) => i.id === p.id)).slice(0, 2);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleDrawer(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-sand)] z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif uppercase tracking-widest text-[var(--color-ink)]">
                  Your Wardrobe
                </h2>
                {items.length > 0 && (
                  <p className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mt-0.5">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </p>
                )}
              </div>
              <button
                onClick={() => toggleDrawer(false)}
                className="p-2 hover:bg-[var(--color-clay)] rounded-full transition-colors text-[var(--color-ink)]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-clay)] flex items-center justify-center">
                    <ShoppingBag size={32} strokeWidth={1} className="text-[var(--color-muted)]" />
                  </div>
                  <p className="text-[var(--color-muted)] font-light italic font-serif text-lg">
                    Your collection is empty.
                  </p>
                  <button
                    onClick={() => toggleDrawer(false)}
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-burgundy)] font-bold hover:text-[var(--color-ink)] transition-colors"
                  >
                    Start Exploring →
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4"
                  >
                    <div className="w-24 aspect-[3/4] flex-none rounded-xl overflow-hidden border border-[var(--color-border)]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs uppercase tracking-wider font-medium text-[var(--color-ink)]">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--color-muted)] hover:text-[var(--color-burgundy)] transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest mt-1">
                          {item.category}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-[var(--color-border-strong)] rounded-full px-2 bg-white/50">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-[var(--color-burgundy)] transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-[var(--color-burgundy)] transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-[var(--color-ink)]">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* You might also like */}
            {items.length > 0 && suggestions.length > 0 && (
              <div className="px-6 py-4 border-t border-[var(--color-border)]">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)] font-bold mb-3">
                  You might also like
                </p>
                <div className="flex gap-3">
                  {suggestions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        toggleDrawer(false);
                        navigate(`/product/${p.id}`);
                      }}
                      className="flex-1 flex gap-2.5 items-center rounded-xl border border-[var(--color-border)] bg-white/40 p-2 hover:bg-white/60 transition-colors text-left"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-12 rounded-lg object-cover flex-none"
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium truncate text-[var(--color-ink)]">{p.name}</p>
                        <p className="text-[10px] text-[var(--color-burgundy)] font-bold">
                          {formatCurrency(p.price)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--color-border)] space-y-4 bg-[var(--color-clay)]/50">
                <div className="flex justify-between items-center text-sm uppercase tracking-widest font-medium text-[var(--color-ink)]">
                  <span>Subtotal</span>
                  <span className="text-lg font-serif">{formatCurrency(getTotalPrice())}</span>
                </div>
                <button className="w-full magnetic-glow rounded-full bg-[var(--color-ink)] px-6 py-4 text-[11px] uppercase tracking-[0.28em] text-white transition-all duration-300 hover:bg-[var(--color-burgundy)] active:scale-[0.98]">
                  Proceed to Checkout
                </button>
                <p className="text-[10px] text-center text-[var(--color-muted)] uppercase tracking-widest">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
