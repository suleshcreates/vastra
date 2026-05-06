import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShopSection } from './components/ShopSection';
import { AboutSection } from './components/AboutSection';
import { CartDrawer } from './components/CartDrawer';
import { SplashScreen } from './components/SplashScreen';
import { CategoryListingPage } from './components/CategoryListingPage';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TrendingSection } from './components/TrendingSection';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { NewsletterSection } from './components/NewsletterSection';
import { LookbookSection } from './components/LookbookSection';

// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-sand)] text-[var(--color-ink)] selection:bg-[var(--color-burgundy)] selection:text-white">
      <SplashScreen onComplete={() => setShowSplash(false)} />

      {!showSplash && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
          <ScrollProgress />
          <Navbar />
          <CartDrawer />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <main className="overflow-hidden">
                      <Hero />
                      <ShopSection />
                      <TrendingSection />
                      <LookbookSection />
                      <TestimonialsSection />
                      <NewsletterSection />
                      <AboutSection />
                    </main>
                  </PageTransition>
                }
              />
              <Route
                path="/category/:category"
                element={
                  <PageTransition>
                    <CategoryListingPage />
                  </PageTransition>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <PageTransition>
                    <ProductDetailsPage />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>

          <Footer />
        </motion.div>
      )}
    </div>
  );
}

export default App;
