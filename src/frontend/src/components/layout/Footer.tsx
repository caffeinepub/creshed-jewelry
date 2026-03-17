import { Facebook, Instagram, Twitter } from "lucide-react";
import { SiPinterest } from "react-icons/si";
import { Link } from "react-router-dom";

const footerLinks = {
  Shop: [
    { label: "All Jewelry", href: "/shop" },
    { label: "Rings", href: "/shop?category=rings" },
    { label: "Necklaces", href: "/shop?category=necklaces" },
    { label: "Bracelets", href: "/shop?category=bracelets" },
    { label: "Earrings", href: "/shop?category=earrings" },
  ],
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "My Account", href: "/account" },
  ],
  Policies: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Return Policy", href: "#" },
    { label: "Shipping Info", href: "#" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="font-display text-2xl tracking-[0.3em] text-gold font-semibold inline-block mb-4"
            >
              CRUSHED
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              Luxury jewelry crafted for those who seek the exceptional. Each
              piece is a testament to the art of fine jewellery making.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Pinterest"
              >
                <SiPinterest className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs tracking-[0.2em] uppercase font-medium text-gold mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {year} Crushed. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
