import ProductCard from "@/components/shop/ProductCard";
import { PRODUCTS } from "@/data/store";
import { ArrowRight, Gem, Shield, Star } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Men's",
    href: "/shop?category=mens",
    image: "/assets/uploads/WhatsApp-Image-2026-03-08-at-4.16.15-AM-3.jpeg",
  },
  {
    name: "Rings",
    href: "/shop?category=rings",
    image: "/assets/generated/ring-solitaire.dim_600x600.jpg",
  },
  {
    name: "Necklaces",
    href: "/shop?category=necklaces",
    image: "/assets/generated/necklace-pearl.dim_600x600.jpg",
  },
  {
    name: "Bracelets",
    href: "/shop?category=bracelets",
    image: "/assets/generated/bracelet-bangle.dim_600x600.jpg",
  },
  {
    name: "Earrings",
    href: "/shop?category=earrings",
    image: "/assets/generated/earrings-emerald.dim_600x600.jpg",
  },
];

const values = [
  {
    icon: Gem,
    title: "Master Craftsmanship",
    description:
      "Every piece is handcrafted by artisans with decades of experience in the finest ateliers of Europe.",
  },
  {
    icon: Shield,
    title: "Ethically Sourced",
    description:
      "We only work with certified suppliers to ensure every gemstone is responsibly sourced and conflict-free.",
  },
  {
    icon: Star,
    title: "Timeless Design",
    description:
      "Our pieces transcend fashion cycles — designed to be treasured and handed down through generations.",
  },
];

const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 3);

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-jewelry.dim_1600x900.jpg"
            alt="Creshed Jewelry Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/90" />
        </div>

        {/* Decorative gold lines */}
        <div className="absolute left-8 top-1/3 w-px h-24 bg-gradient-to-b from-transparent via-gold to-transparent opacity-40" />
        <div className="absolute right-8 top-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold to-transparent opacity-30" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs tracking-[0.5em] uppercase text-gold mb-6 font-body"
          >
            Fine Jewellery · Est. 2018
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-display font-medium leading-[1.0] mb-8"
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight">
              Adorn Yourself
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[7rem] italic text-gold leading-[0.95] mt-1 hero-italic-gold">
              in Elegance
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-foreground/85 text-base sm:text-lg max-w-sm mx-auto mb-10 leading-relaxed tracking-wide"
          >
            Timeless pieces for those who seek the exceptional. Each jewel tells
            a story of artistry and devotion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/shop"
              data-ocid="hero.shop_button"
              className="group inline-flex items-center gap-2 gold-gradient text-background px-8 py-3.5 text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              data-ocid="hero.story_button"
              className="inline-flex items-center gap-2 border border-foreground/30 text-foreground px-8 py-3.5 text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/30">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] uppercase text-gold mb-3"
          >
            Curated Selection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl lg:text-5xl font-medium"
          >
            Featured Pieces
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            data-ocid="home.shop_link"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-gold border-b border-gold/40 hover:border-gold pb-0.5 transition-colors"
          >
            View All Collections
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.4em] uppercase text-gold mb-3"
            >
              Explore
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl lg:text-5xl font-medium"
            >
              Shop by Category
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  to={cat.href}
                  data-ocid={`home.category.item.${idx + 1}`}
                  className="group block relative overflow-hidden aspect-[3/4]"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-xl font-medium text-foreground group-hover:text-gold transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs tracking-widest uppercase text-gold/70 group-hover:text-gold transition-colors flex items-center gap-1 mt-1">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Quote */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-12 h-px gold-gradient mx-auto mb-8"
          />
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl italic font-medium leading-snug text-foreground/90"
          >
            "Jewellery is not decoration — it is a language. A silent story of
            who you are and who you wish to become."
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-sm tracking-[0.3em] uppercase text-gold"
          >
            — Amara Creshed, Founder
          </motion.p>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 bg-card/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial header — flush left */}
          <div className="flex items-end justify-between mb-14 border-b border-border pb-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl lg:text-4xl font-medium"
            >
              Our Promise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs tracking-[0.3em] uppercase text-gold hidden sm:block"
            >
              The Creshed Standard
            </motion.p>
          </div>

          <div className="space-y-0 divide-y divide-border">
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group grid grid-cols-[4rem_1fr] sm:grid-cols-[5rem_1fr_2fr] gap-6 sm:gap-12 py-8 items-start"
              >
                {/* Number */}
                <span className="font-display text-4xl sm:text-5xl font-medium text-gold/20 group-hover:text-gold/50 transition-colors duration-500 leading-none mt-1 select-none">
                  0{idx + 1}
                </span>
                {/* Title */}
                <div className="sm:border-r sm:border-border sm:pr-12">
                  <val.icon className="w-4 h-4 text-gold mb-3" />
                  <h3 className="font-display text-xl lg:text-2xl font-medium leading-snug">
                    {val.title}
                  </h3>
                </div>
                {/* Description — hidden on mobile, shown on sm+ */}
                <p className="hidden sm:block text-muted-foreground text-sm leading-relaxed self-center">
                  {val.description}
                </p>
                {/* Description — mobile only */}
                <p className="sm:hidden col-span-2 col-start-2 text-muted-foreground text-sm leading-relaxed -mt-4">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
