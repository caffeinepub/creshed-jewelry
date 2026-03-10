import { formatPrice, useCart } from "@/data/store";
import { ArrowRight, Minus, Plus, ShoppingBag, Truck, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal >= 50000 ? 0 : 1500; // free shipping over $500
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"
        data-ocid="cart.empty_state"
      >
        <div className="w-16 h-16 border border-border flex items-center justify-center mb-6">
          <ShoppingBag className="w-6 h-6 text-muted-foreground" />
        </div>
        <h1 className="font-display text-3xl mb-3">Your bag is empty</h1>
        <p className="text-muted-foreground text-sm mb-8 max-w-xs">
          Discover our exquisite collection of fine jewellery and find your
          perfect piece.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 gold-gradient text-background px-8 py-3.5 text-sm tracking-widest uppercase"
        >
          Explore Collection
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl lg:text-5xl font-medium mb-2"
      >
        Shopping Bag
      </motion.h1>
      <p className="text-muted-foreground text-sm mb-10">
        {items.length} item{items.length !== 1 ? "s" : ""}
      </p>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="border-t border-border">
            <AnimatePresence>
              {items.map((item, idx) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  data-ocid={`cart.item.${idx + 1}`}
                  className="flex gap-5 py-6 border-b border-border"
                >
                  {/* Image */}
                  <Link
                    to={`/shop/${item.product.id}`}
                    className="flex-shrink-0"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-card overflow-hidden">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-gold mb-0.5">
                          {item.product.category}
                        </p>
                        <Link
                          to={`/shop/${item.product.id}`}
                          className="font-display text-lg font-medium hover:text-gold transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.product.material}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          removeItem(item.product.id);
                          toast.success("Item removed");
                        }}
                        data-ocid={`cart.delete_button.${idx + 1}`}
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 ml-2"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <p className="text-sm font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <div className="bg-card border border-border p-6 sticky top-24">
            <h2 className="font-display text-xl font-medium mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className={shipping === 0 ? "text-green-400" : ""}>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-medium text-base">
                <span>Total</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>
            </div>

            {shipping > 0 && (
              <div className="flex items-start gap-2 bg-muted/50 p-3 mb-5 text-xs text-muted-foreground">
                <Truck className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  Add {formatPrice(50000 - subtotal)} more for free shipping
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => navigate("/checkout")}
              data-ocid="cart.checkout_button"
              className="w-full gold-gradient text-background py-4 text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/shop"
              className="block text-center text-xs tracking-wider uppercase text-muted-foreground hover:text-gold transition-colors mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
