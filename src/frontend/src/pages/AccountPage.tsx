import { Badge } from "@/components/ui/badge";
import { type Order, formatPrice, getOrders } from "@/data/store";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { LogOut, Package, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-500/20 text-amber-400 border-0",
  processing: "bg-blue-500/20 text-blue-400 border-0",
  shipped: "bg-purple-500/20 text-purple-400 border-0",
  delivered: "bg-green-500/20 text-green-400 border-0",
  cancelled: "bg-red-500/20 text-red-400 border-0",
};

export default function AccountPage() {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (identity) {
      setOrders(getOrders());
    }
  }, [identity]);

  if (!identity) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 border border-border flex items-center justify-center mb-6">
          <User className="w-7 h-7 text-muted-foreground" />
        </div>
        <h1 className="font-display text-3xl mb-3">My Account</h1>
        <p className="text-muted-foreground text-sm mb-8 max-w-xs">
          Sign in to view your order history and manage your account.
        </p>
        <button
          type="button"
          onClick={login}
          disabled={isLoggingIn}
          data-ocid="account.login_button"
          className="gold-gradient text-background px-8 py-3.5 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {isLoggingIn ? "Signing in..." : "Sign In"}
        </button>
      </div>
    );
  }

  const principal = identity.getPrincipal().toString();
  const shortPrincipal = `${principal.slice(0, 12)}...${principal.slice(-6)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Account Header */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-2">
              Welcome Back
            </p>
            <h1 className="font-display text-3xl lg:text-4xl font-medium">
              My Account
            </h1>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              ID: {shortPrincipal}
            </p>
          </div>
          <button
            type="button"
            onClick={clear}
            data-ocid="account.logout_button"
            className="flex items-center gap-2 border border-border px-4 py-2.5 text-sm hover:border-destructive hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Order History */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-4 h-4 text-gold" />
            <h2 className="font-display text-xl font-medium">Order History</h2>
          </div>

          {orders.length === 0 ? (
            <div
              data-ocid="account.empty_state"
              className="border border-border p-12 text-center"
            >
              <p className="font-display text-xl text-muted-foreground mb-3">
                No orders yet
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Your orders will appear here once you've made a purchase.
              </p>
              <Link
                to="/shop"
                className="text-xs tracking-widest uppercase text-gold border-b border-gold/40 pb-0.5"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  data-ocid={`account.order.item.${idx + 1}`}
                  className="border border-border p-5 hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <p className="text-sm font-medium tracking-wider">
                        {order.id}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`rounded-full text-[10px] capitalize ${STATUS_COLORS[order.status] || ""}`}
                      >
                        {order.status}
                      </Badge>
                      <span className="text-sm font-medium text-gold">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    {order.items.map((item) => (
                      <div
                        key={item.product.id}
                        className="w-10 h-10 bg-muted overflow-hidden"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
