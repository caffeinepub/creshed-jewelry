import { Button } from "@/components/ui/button";
import { useCart } from "@/data/store";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { ChevronDown, Menu, ShoppingBag, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const { totalItems } = useCart();
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const isLoggedIn = !!identity;

  return (
    // Light background header with a soft pink border at bottom
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo — pink rose colour via .text-gold utility */}
          <Link
            to="/"
            data-ocid="nav.home_link"
            className="font-display text-xl lg:text-2xl tracking-[0.25em] text-gold font-semibold hover:opacity-75 transition-opacity"
          >
            CRUSHED
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  data-ocid={`nav.${link.label.toLowerCase()}_link`}
                  className={`relative text-sm tracking-widest uppercase transition-colors hover:text-gold pb-1 ${
                    isActive ? "text-gold" : "text-foreground/60"
                  }`}
                >
                  {link.label}
                  {/* Active indicator — thin pink rule */}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px bg-gold transition-transform duration-300 origin-left ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Cart */}
            <Link
              to="/cart"
              data-ocid="nav.cart_button"
              className="relative p-2 text-foreground/70 hover:text-gold transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full gold-gradient text-[10px] font-bold text-white flex items-center justify-center"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </Link>

            {/* User */}
            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => setUserOpen((v) => !v)}
                data-ocid="nav.account_link"
                className="p-2 text-foreground/70 hover:text-gold transition-colors flex items-center gap-1"
              >
                <User className="w-5 h-5" />
                {isLoggedIn && <ChevronDown className="w-3 h-3 opacity-60" />}
              </button>

              <AnimatePresence>
                {userOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-card border border-border shadow-lg py-1"
                    onBlur={() => setUserOpen(false)}
                  >
                    {isLoggedIn ? (
                      <>
                        <Link
                          to="/account"
                          className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                          onClick={() => setUserOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          to="/admin"
                          className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                          onClick={() => setUserOpen(false)}
                        >
                          Admin Panel
                        </Link>
                        <div className="border-t border-border my-1" />
                        <button
                          type="button"
                          onClick={() => {
                            clear();
                            setUserOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-secondary transition-colors"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          login();
                          setUserOpen(false);
                        }}
                        disabled={isLoggingIn}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                      >
                        {isLoggingIn ? "Signing in..." : "Sign In"}
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-foreground/70 hover:text-gold transition-colors"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden shadow-md"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm tracking-widest uppercase hover:text-gold transition-colors border-b border-border/40 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                {isLoggedIn ? (
                  <div className="space-y-1">
                    <Link
                      to="/account"
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 text-sm hover:text-gold transition-colors"
                    >
                      My Account
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        clear();
                        setMobileOpen(false);
                      }}
                      className="text-destructive px-0"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      login();
                      setMobileOpen(false);
                    }}
                    disabled={isLoggingIn}
                    className="border-gold text-gold hover:bg-primary hover:text-white"
                  >
                    {isLoggingIn ? "Signing in..." : "Sign In"}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
