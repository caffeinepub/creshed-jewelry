import { type Order, formatPrice } from "@/data/store";
import { ArrowRight, CheckCircle, Package } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("crushed_last_order");
    if (saved) {
      setOrder(JSON.parse(saved) as Order);
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="font-display text-2xl mb-4">No order found</p>
        <Link
          to="/shop"
          className="text-gold text-sm tracking-widest uppercase border-b border-gold/40 pb-0.5"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="inline-flex items-center justify-center w-20 h-20 border border-gold/40 mb-8 mx-auto"
      >
        <CheckCircle className="w-10 h-10 text-gold" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">
          Order Confirmed
        </p>
        <h1 className="font-display text-4xl lg:text-5xl font-medium mb-4">
          Thank You for Your Order
        </h1>
        <p className="text-muted-foreground mb-2">
          Your order has been received and is being processed.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Order ID:{" "}
          <span className="text-gold font-medium tracking-wider">
            {order.id}
          </span>
        </p>
      </motion.div>

      {/* Order Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card border border-border p-6 text-left mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-4 h-4 text-gold" />
          <h2 className="font-medium tracking-wide text-sm uppercase">
            Order Items
          </h2>
        </div>

        <div className="space-y-3 mb-5">
          {order.items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted flex-shrink-0 overflow-hidden">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-sm">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Shipping</span>
            <span>
              {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
            </span>
          </div>
          <div className="flex justify-between font-medium text-base pt-1.5 border-t border-border">
            <span>Total</span>
            <span className="text-gold">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mt-5 pt-5 border-t border-border">
          <p className="text-xs tracking-[0.2em] uppercase text-gold mb-2">
            Shipping To
          </p>
          <p className="text-sm text-muted-foreground">
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            <br />
            {order.shippingAddress.address}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link
          to="/shop"
          data-ocid="confirmation.shop_button"
          className="inline-flex items-center gap-2 gold-gradient text-background px-8 py-3.5 text-sm tracking-widest uppercase"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/account"
          className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors"
        >
          View My Orders
        </Link>
      </motion.div>
    </div>
  );
}
