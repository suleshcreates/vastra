import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sizeData = [
  { size: 'S', chest: '34–36', waist: '28–30', length: '38' },
  { size: 'M', chest: '38–40', waist: '32–34', length: '40' },
  { size: 'L', chest: '42–44', waist: '36–38', length: '42' },
  { size: 'XL', chest: '46–48', waist: '40–42', length: '44' },
];

export const SizeGuideModal = ({ isOpen, onClose }: SizeGuideModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-4 right-4 top-[10%] md:left-1/2 md:right-auto md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg rounded-[2rem] bg-[var(--color-sand)] p-8 z-[111] shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-[var(--color-gold)] font-bold">
                  Measurements
                </p>
                <h3 className="font-serif text-2xl mt-1">Size Guide</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[var(--color-clay)] rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--color-clay)]">
                    <th className="py-3 px-4 text-left text-[9px] uppercase tracking-widest text-[var(--color-muted)] font-bold">
                      Size
                    </th>
                    <th className="py-3 px-4 text-center text-[9px] uppercase tracking-widest text-[var(--color-muted)] font-bold">
                      Chest
                    </th>
                    <th className="py-3 px-4 text-center text-[9px] uppercase tracking-widest text-[var(--color-muted)] font-bold">
                      Waist
                    </th>
                    <th className="py-3 px-4 text-center text-[9px] uppercase tracking-widest text-[var(--color-muted)] font-bold">
                      Length
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row, i) => (
                    <tr
                      key={row.size}
                      className={`border-t border-[var(--color-border)] ${
                        i % 2 === 0 ? 'bg-white/30' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-serif text-lg font-bold">{row.size}</td>
                      <td className="py-3.5 px-4 text-center text-[var(--color-muted)]">
                        {row.chest}"
                      </td>
                      <td className="py-3.5 px-4 text-center text-[var(--color-muted)]">
                        {row.waist}"
                      </td>
                      <td className="py-3.5 px-4 text-center text-[var(--color-muted)]">
                        {row.length}"
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-xl bg-[var(--color-clay)] p-4">
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-burgundy)] font-bold">
                Styling Tip
              </p>
              <p className="mt-1.5 text-sm text-[var(--color-muted)] leading-relaxed">
                For the best fit, measure yourself and compare with the chart. If between sizes, we
                recommend going one size up for a relaxed silhouette.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
