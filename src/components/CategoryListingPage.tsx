import { useMemo, useState } from 'react';
import { ArrowLeft, ChevronRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { cn } from '../utils/cn';

type Category = 'All' | 'Men' | 'Women' | 'Accessories';

const slugToCategory: Record<string, Exclude<Category, 'All'>> = {
  women: 'Women',
  men: 'Men',
  accessories: 'Accessories',
};

const categoryMeta = {
  Women: {
    title: 'Women',
    subtitle: 'Festive suit sets, softer silhouettes, and statement color stories.',
  },
  Men: {
    title: 'Men',
    subtitle: 'Tailored occasionwear with stronger structure and understated luxury.',
  },
  Accessories: {
    title: 'Accessories',
    subtitle: 'Finishing pieces that make the collection feel complete and merchandised.',
  },
} as const;

export const CategoryListingPage = () => {
  const { category } = useParams();
  const initialCategory = slugToCategory[category ?? ''] ?? 'Women';
  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePriceBand, setActivePriceBand] = useState<'All' | 'Below 3000' | '3000 - 5000' | 'Above 5000'>('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        searchQuery.trim().length === 0 ||
        `${product.name} ${product.story} ${product.fabric}`.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        activePriceBand === 'All' ||
        (activePriceBand === 'Below 3000' && product.price < 3000) ||
        (activePriceBand === '3000 - 5000' && product.price >= 3000 && product.price <= 5000) ||
        (activePriceBand === 'Above 5000' && product.price > 5000);

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [activeCategory, searchQuery, activePriceBand]);

  const currentMeta = activeCategory === 'All' ? { title: 'All Collections', subtitle: 'Browse the full catalog.' } : categoryMeta[activeCategory];

  const resetFilters = () => {
    setActiveCategory(initialCategory);
    setSearchQuery('');
    setActivePriceBand('All');
  };

  return (
    <section className="bg-[var(--color-sand)] px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 space-y-4 md:mb-10 md:space-y-5">
          <Link
            to="/#shop"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-[var(--color-burgundy)] md:text-[11px] md:tracking-[0.3em]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="font-serif text-4xl text-[var(--color-ink)] md:text-6xl">{currentMeta.title}</h1>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)] md:text-base md:leading-8">{currentMeta.subtitle}</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-8">
          <aside className="hidden rounded-[2.2rem] bg-[var(--color-chocolate)] p-6 text-[var(--color-sand)] shadow-[0_40px_80px_-50px_rgba(0,0,0,0.6)] xl:block">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <SlidersHorizontal className="h-5 w-5" />
              </div>
              <button
                onClick={resetFilters}
                className="rounded-full bg-[var(--color-gold)]/16 px-4 py-2 text-sm text-[var(--color-gold)]"
              >
                Clear
              </button>
            </div>

            <div className="mt-10">
              <h3 className="font-serif text-4xl">Filters</h3>
              <p className="mt-2 text-lg text-white/68">Refine your selection</p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="rounded-[1.4rem] bg-[#f3e9dc] p-5 text-[var(--color-ink)]">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl">Categories</span>
                  <ChevronRight className="h-5 w-5" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(['All', 'Women', 'Men', 'Accessories'] as Category[]).map((entry) => (
                    <button
                      key={entry}
                      onClick={() => setActiveCategory(entry)}
                      className={cn(
                        'rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition-colors',
                        activeCategory === entry ? 'bg-[var(--color-ink)] text-white' : 'bg-[var(--color-ink)]/6 text-[var(--color-muted)]'
                      )}
                    >
                      {entry}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.4rem] bg-[#f3e9dc] p-5 text-[var(--color-ink)]">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl">Price Range</span>
                  <ChevronRight className="h-5 w-5" />
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  {(['All', 'Below 3000', '3000 - 5000', 'Above 5000'] as const).map((band) => (
                    <button
                      key={band}
                      onClick={() => setActivePriceBand(band)}
                      className={cn(
                        'rounded-full border px-4 py-3 text-left text-xs uppercase tracking-[0.24em] transition-colors',
                        activePriceBand === band
                          ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
                          : 'border-[var(--color-border-strong)] text-[var(--color-muted)]'
                      )}
                    >
                      {band}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.4rem] bg-[#f3e9dc] p-5 text-[var(--color-ink)]">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl">Fabric</span>
                  <ChevronRight className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  Chanderi blend, cotton silk, heritage cotton, and embellished occasion details.
                </p>
              </div>
            </div>
          </aside>

          <div className="space-y-5 md:space-y-8">
            <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[#f7eedc] p-4 shadow-[0_30px_60px_-45px_rgba(17,13,13,0.35)] md:rounded-[2rem] md:p-5">
              <div className="flex flex-col gap-3 md:gap-4 xl:flex-row xl:items-center">
                <div className="flex items-center gap-3 md:gap-4">
                  <Link
                    to="/#shop"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white text-[var(--color-muted)] md:h-12 md:w-12"
                  >
                    <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                  </Link>

                  <div className="relative min-w-0 flex-1 xl:min-w-[500px]">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]/60 md:left-5 md:h-5 md:w-5" />
                    <input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search products..."
                      className="h-12 w-full rounded-full border border-transparent bg-white pl-12 pr-4 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-gold)] md:h-14 md:pl-14 md:pr-5 md:text-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 xl:ml-auto xl:justify-end">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[var(--color-ink)] xl:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </button>
                  <div className="text-right">
                    <p className="font-serif text-2xl text-[var(--color-ink)] md:text-3xl">{filteredProducts.length} results</p>
                    <p className="text-xs text-[var(--color-muted)] md:text-sm">
                      {activeCategory === 'All' ? 'All categories' : activeCategory}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 xl:hidden">
              {(['All', 'Women', 'Men', 'Accessories'] as Category[]).map((entry) => (
                <button
                  key={entry}
                  onClick={() => setActiveCategory(entry)}
                  className={cn(
                    'whitespace-nowrap rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.24em]',
                    activeCategory === entry ? 'bg-[var(--color-ink)] text-white' : 'border border-[var(--color-border-strong)] bg-white text-[var(--color-muted)]'
                  )}
                >
                  {entry}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-8 2xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="rounded-[2rem] border border-dashed border-[var(--color-border-strong)] bg-white/70 p-12 text-center">
                <h4 className="font-serif text-4xl text-[var(--color-ink)]">No products found</h4>
                <p className="mt-3 text-base text-[var(--color-muted)]">
                  Try changing the category or clearing the search to see more pieces.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-[80] bg-black/40 px-4 py-24 xl:hidden">
          <div className="mx-auto max-h-[78vh] max-w-lg overflow-y-auto rounded-[2rem] bg-[var(--color-chocolate)] p-5 text-[var(--color-sand)] shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-serif text-3xl">Filters</h3>
                  <p className="text-sm text-white/65">Refine your selection</p>
                </div>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-[1.4rem] bg-[#f3e9dc] p-5 text-[var(--color-ink)]">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl">Categories</span>
                  <ChevronRight className="h-5 w-5" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(['All', 'Women', 'Men', 'Accessories'] as Category[]).map((entry) => (
                    <button
                      key={entry}
                      onClick={() => setActiveCategory(entry)}
                      className={cn(
                        'rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition-colors',
                        activeCategory === entry ? 'bg-[var(--color-ink)] text-white' : 'bg-[var(--color-ink)]/6 text-[var(--color-muted)]'
                      )}
                    >
                      {entry}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.4rem] bg-[#f3e9dc] p-5 text-[var(--color-ink)]">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl">Price Range</span>
                  <ChevronRight className="h-5 w-5" />
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  {(['All', 'Below 3000', '3000 - 5000', 'Above 5000'] as const).map((band) => (
                    <button
                      key={band}
                      onClick={() => setActivePriceBand(band)}
                      className={cn(
                        'rounded-full border px-4 py-3 text-left text-xs uppercase tracking-[0.24em] transition-colors',
                        activePriceBand === band
                          ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
                          : 'border-[var(--color-border-strong)] text-[var(--color-muted)]'
                      )}
                    >
                      {band}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.4rem] bg-[#f3e9dc] p-5 text-[var(--color-ink)]">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl">Fabric</span>
                  <ChevronRight className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  Chanderi blend, cotton silk, heritage cotton, and embellished occasion details.
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 rounded-full border border-white/14 px-4 py-3 text-sm uppercase tracking-[0.22em]"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 rounded-full bg-[var(--color-gold)] px-4 py-3 text-sm uppercase tracking-[0.22em] text-[var(--color-ink)]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
