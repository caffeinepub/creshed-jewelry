import ProductCard from "@/components/shop/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { PRODUCTS, type ProductCategory, formatPrice } from "@/data/store";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const CATEGORIES: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Men's", value: "mens" },
  { label: "Rings", value: "rings" },
  { label: "Necklaces", value: "necklaces" },
  { label: "Bracelets", value: "bracelets" },
  { label: "Earrings", value: "earrings" },
  { label: "Pendants", value: "pendants" },
  { label: "Sets", value: "sets" },
];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

const MAX_PRICE = 800000;

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = (searchParams.get("category") ?? "all") as
    | ProductCategory
    | "all";

  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | "all"
  >(categoryParam);
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory)
        return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });

    switch (sortBy) {
      case "price_asc":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "featured":
        filtered = [...filtered].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
        );
        break;
    }

    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

  const handleCategoryChange = (cat: ProductCategory | "all") => {
    setSelectedCategory(cat);
    if (cat === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, MAX_PRICE]);
    setSortBy("featured");
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    priceRange[0] > 0 ||
    priceRange[1] < MAX_PRICE;

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="border-b border-border py-12 px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs tracking-[0.4em] uppercase text-gold mb-2"
        >
          Collections
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl lg:text-5xl font-medium"
        >
          All Jewellery
        </motion.h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div
            className="flex items-center gap-1 flex-wrap"
            data-ocid="shop.category.tab"
          >
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                data-ocid="shop.filter.tab"
                className={`px-4 py-1.5 text-xs tracking-widest uppercase transition-colors ${
                  selectedCategory === cat.value
                    ? "bg-gold text-background"
                    : "text-muted-foreground hover:text-foreground border border-border hover:border-foreground/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Filter toggle (mobile) */}
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className="flex items-center gap-2 text-xs tracking-widest uppercase border border-border px-3 py-2 hover:border-gold hover:text-gold transition-colors lg:hidden"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>

            {/* Sort */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 text-xs tracking-widest uppercase border border-border px-3 py-2 hover:border-gold hover:text-gold transition-colors"
              >
                {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-full mt-1 w-44 bg-card border border-border z-20"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs hover:bg-muted transition-colors ${
                          sortBy === opt.value ? "text-gold" : ""
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="space-y-8">
              {/* Category Filter */}
              <div>
                <h3 className="text-xs tracking-[0.2em] uppercase text-gold mb-4">
                  Category
                </h3>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat.value}
                      onClick={() => handleCategoryChange(cat.value)}
                      className={`w-full text-left text-sm py-1.5 transition-colors ${
                        selectedCategory === cat.value
                          ? "text-gold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat.label}
                      {selectedCategory === cat.value && (
                        <span className="float-right text-gold">—</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range — displays values in INR using formatPrice */}
              <div>
                <h3 className="text-xs tracking-[0.2em] uppercase text-gold mb-4">
                  Price Range
                </h3>
                <Slider
                  min={0}
                  max={MAX_PRICE}
                  step={10000}
                  value={priceRange}
                  onValueChange={(val) => setPriceRange(val)}
                  className="mb-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Panel */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden w-full overflow-hidden border-b border-border pb-6 mb-6"
              >
                <div className="pt-4">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
                    Price Range
                  </h3>
                  <Slider
                    min={0}
                    max={MAX_PRICE}
                    step={10000}
                    value={priceRange}
                    onValueChange={(val) => setPriceRange(val)}
                    className="mb-2"
                  />
                  {/* Mobile price labels in INR */}
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} piece
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
              {selectedCategory !== "all" && (
                <Badge className="rounded-full bg-gold/20 text-gold border-0 text-xs">
                  {CATEGORIES.find((c) => c.value === selectedCategory)?.label}
                </Badge>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div data-ocid="shop.empty_state" className="text-center py-24">
                <p className="font-display text-2xl text-muted-foreground mb-3">
                  No pieces found
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your filters
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs tracking-widest uppercase text-gold border-b border-gold/40 pb-0.5"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
