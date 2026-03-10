import { Badge } from "@/components/ui/badge";
import { type Product, formatPrice, useCart } from "@/data/store";
import { Eye, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  product: Product;
  index: number;
};

export default function ProductCard({ product, index }: Props) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`, {
      description: formatPrice(product.price),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      data-ocid={`product.item.${index + 1}`}
    >
      <Link to={`/shop/${product.id}`} className="group block">
        <div
          className="relative overflow-hidden bg-card aspect-square product-img-wrap"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-gold text-background text-[10px] tracking-wider uppercase rounded-full px-2.5 py-0.5 font-medium border-0">
                {product.badge}
              </Badge>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-sm tracking-widest uppercase text-muted-foreground">
                Sold Out
              </span>
            </div>
          )}

          {/* Hover Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/20 flex items-end justify-center pb-4 gap-2"
          >
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              data-ocid={`product.add_button.${index + 1}`}
              className="flex items-center gap-2 bg-background/95 text-foreground px-4 py-2.5 text-xs tracking-widest uppercase hover:bg-gold hover:text-background transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Bag
            </button>
            <Link
              to={`/shop/${product.id}`}
              className="bg-background/95 text-foreground p-2.5 hover:bg-gold hover:text-background transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1.5">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold/80">
            {product.category}
          </p>
          {/* Name with animated underline */}
          <h3 className="font-display text-base font-medium leading-snug group-hover:text-gold transition-colors duration-300 relative">
            {product.name}
            {/* Gold underline scales in from left on hover */}
            <span
              className="absolute inset-x-0 -bottom-0.5 h-px bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"
              aria-hidden="true"
            />
          </h3>
          {/* Price — foreground weight, not muted */}
          <p className="text-sm font-medium text-foreground/90 tracking-wide">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
