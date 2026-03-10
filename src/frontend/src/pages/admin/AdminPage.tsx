import { PRODUCTS, formatPrice, getOrders } from "@/data/store";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  ArrowRight,
  Lock,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function AdminPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();

  if (!identity) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 border border-border flex items-center justify-center mb-6">
          <Lock className="w-7 h-7 text-muted-foreground" />
        </div>
        <h1 className="font-display text-3xl mb-3">Admin Panel</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Sign in to access the administration panel.
        </p>
        <button
          type="button"
          onClick={login}
          disabled={isLoggingIn}
          data-ocid="admin.login_button"
          className="gold-gradient text-background px-8 py-3.5 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {isLoggingIn ? "Signing in..." : "Sign In"}
        </button>
      </div>
    );
  }

  const orders = getOrders();
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  const stats = [
    {
      label: "Total Products",
      value: PRODUCTS.length,
      icon: Package,
      change: "+2 this month",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      change: `${pendingOrders} pending`,
    },
    {
      label: "Total Revenue",
      value: formatPrice(totalRevenue),
      icon: TrendingUp,
      change: "All time",
    },
    { label: "Customers", value: "—", icon: Users, change: "Coming soon" },
  ];

  const quickLinks = [
    {
      label: "Manage Products",
      href: "/admin/products",
      desc: "Add, edit, or remove products",
    },
    {
      label: "Manage Orders",
      href: "/admin/orders",
      desc: "View and update order statuses",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-2">
          Dashboard
        </p>
        <h1 className="font-display text-4xl font-medium mb-10">Admin Panel</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-card border border-border p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs tracking-wider uppercase text-muted-foreground">
                  {stat.label}
                </p>
                <stat.icon className="w-4 h-4 text-gold" />
              </div>
              <p className="font-display text-3xl font-medium mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickLinks.map(({ label, href, desc }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <Link
                to={href}
                data-ocid={`admin.${label.toLowerCase().replace(/\s+/g, "_")}_link`}
                className="group flex items-center justify-between border border-border p-6 hover:border-gold transition-colors"
              >
                <div>
                  <h3 className="font-display text-lg font-medium mb-1 group-hover:text-gold transition-colors">
                    {label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
