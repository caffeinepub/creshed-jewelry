import ProductCard from "@/components/shop/ProductCard";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS, formatPrice, useCart } from "@/data/store";
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Shield,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="font-display text-3xl mb-4">Product not found</p>
        <Link
          to="/shop"
          className="text-gold text-sm tracking-widest uppercase border-b border-gold/40 pb-0.5"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  ).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`, {
      description: `${quantity} × ${formatPrice(product.price)}`,
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart"),
      },
    });
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-2 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-gold transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            to={`/shop?category=${product.category}`}
            className="hover:text-gold transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground/70 truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-square bg-card overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.badge && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-gold text-background rounded-full text-[10px] tracking-wider uppercase px-3 py-1 border-0">
                  {product.badge}
                </Badge>
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-2">
              {product.category}
            </p>
            <h1 className="font-display text-3xl lg:text-4xl xl:text-5xl font-medium mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-2xl text-foreground mb-2">
              {formatPrice(product.price)}
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Material:{" "}
              <span className="text-foreground/80">{product.material}</span>
            </p>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
              {product.description}
            </p>

            {/* Stock status */}
            {product.stock <= 3 && product.stock > 0 && (
              <p className="text-xs tracking-wider text-amber-400 mb-4">
                Only {product.stock} left in stock
              </p>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground w-20">
                Quantity
              </span>
              <div className="flex items-center border border-border">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock || 10, q + 1))
                  }
                  className="p-2.5 hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-8">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                data-ocid="product.add_button.1"
                className="flex-1 flex items-center justify-center gap-2 gold-gradient text-background py-4 text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
                {product.stock === 0 ? "Sold Out" : "Add to Bag"}
              </button>
              <button
                type="button"
                onClick={() => setWishlist((v) => !v)}
                className={`p-4 border transition-colors ${
                  wishlist
                    ? "border-gold text-gold"
                    : "border-border hover:border-gold hover:text-gold"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`w-4 h-4 ${wishlist ? "fill-current" : ""}`}
                />
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.share?.({
                    title: product.name,
                    url: window.location.href,
                  });
                  toast.success("Link copied!");
                }}
                className="p-4 border border-border hover:border-gold hover:text-gold transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Trust signals */}
            <div className="border-t border-border pt-6 space-y-3">
              {[
                {
                  icon: Shield,
                  text: "Certified authentic with proof of origin",
                },
                {
                  icon: Truck,
                  text: "Free insured shipping on orders over $500",
                },
                { icon: RotateCcw, text: "30-day returns on unworn pieces" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <Icon className="w-4 h-4 text-gold flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-2">
                You May Also Love
              </p>
              <h2 className="font-display text-3xl font-medium">
                Related Pieces
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {related.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
