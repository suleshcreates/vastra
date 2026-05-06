import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] px-6 py-24 md:py-32">
      {/* Ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(122,47,45,0.25),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(214,188,150,0.15),transparent_50%)]" />

      {/* Subtle cross-hatch pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23d6bc96' stroke-width='0.5'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <Sparkles size={12} className="text-[var(--color-gold)]" />
            <span className="text-[9px] uppercase tracking-[0.35em] text-white/60">
              Exclusive Access
            </span>
          </div>

          <h2 className="font-serif text-4xl leading-[1.1] text-[var(--color-sand)] md:text-6xl">
            Be the first to{' '}
            <span className="italic font-light text-[var(--color-gold)]">discover</span>
          </h2>

          <p className="mx-auto max-w-lg text-base leading-relaxed text-white/55">
            Join our inner circle for early access to new collections, exclusive styling tips, and
            members-only festive previews.
          </p>

          {!isSubscribed ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 rounded-full border border-white/12 bg-white/6 px-6 py-4 text-sm text-white placeholder:text-white/30 backdrop-blur-md outline-none transition-colors focus:border-[var(--color-gold)]/40 focus:bg-white/10"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-ink)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-12px_rgba(214,188,150,0.5)]"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-md rounded-2xl border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/10 p-6 backdrop-blur-sm"
            >
              <p className="font-serif text-xl text-[var(--color-gold)]">
                Welcome to the inner circle ✨
              </p>
              <p className="mt-2 text-sm text-white/50">
                You'll hear from us soon with exclusive previews.
              </p>
            </motion.div>
          )}

          <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
            No spam · Unsubscribe anytime · Privacy first
          </p>
        </motion.div>
      </div>
    </section>
  );
};
