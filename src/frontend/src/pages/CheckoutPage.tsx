import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type ShippingAddress,
  formatPrice,
  generateOrderId,
  saveOrder,
  useCart,
} from "@/data/store";
import { ChevronRight, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Japan",
  "UAE",
  "Other",
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal >= 50000 ? 0 : 1500;
  const total = subtotal + shipping;

  const [form, setForm] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingAddress, string>>
  >({});

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="font-display text-2xl mb-4">Your bag is empty</p>
        <Link
          to="/shop"
          className="text-gold text-sm tracking-widest uppercase border-b border-gold/40 pb-0.5"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingAddress, string>> = {};
    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email required";
    if (!form.address.trim()) newErrors.address = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.postalCode.trim()) newErrors.postalCode = "Required";
    if (!form.country) newErrors.country = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate processing

    const order = {
      id: generateOrderId(),
      items: [...items],
      shippingAddress: form,
      subtotal,
      shipping,
      total,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);
    localStorage.setItem("creshed_last_order", JSON.stringify(order));
    clearCart();
    setSubmitting(false);
    navigate("/order-confirmation");
  };

  const field = (
    id: keyof ShippingAddress,
    label: string,
    ocid: string,
    type = "text",
    placeholder = "",
  ) => (
    <div>
      <Label
        htmlFor={id}
        className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5 block"
      >
        {label}{" "}
        {[
          "firstName",
          "lastName",
          "email",
          "address",
          "city",
          "postalCode",
          "country",
        ].includes(id) && <span className="text-gold">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={form[id]}
        onChange={(e) => {
          setForm((prev) => ({ ...prev, [id]: e.target.value }));
          if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }));
        }}
        data-ocid={ocid}
        className={`bg-card border-border focus:border-gold text-foreground placeholder:text-muted-foreground/50 ${
          errors[id] ? "border-destructive" : ""
        }`}
      />
      {errors[id] && (
        <p
          className="text-xs text-destructive mt-1"
          data-ocid={`checkout.${id}_error`}
        >
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
        <Link to="/cart" className="hover:text-gold transition-colors">
          Cart
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Checkout</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl lg:text-4xl font-medium mb-8"
          >
            Shipping Details
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field("firstName", "First Name", "checkout.name_input")}
              {field("lastName", "Last Name", "checkout.name_input")}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field(
                "email",
                "Email Address",
                "checkout.email_input",
                "email",
                "hello@example.com",
              )}
              {field(
                "phone",
                "Phone (optional)",
                "checkout.phone_input",
                "tel",
                "+1 (555) 000-0000",
              )}
            </div>

            {field(
              "address",
              "Street Address",
              "checkout.address_input",
              "text",
              "123 Gold Street, Apt 4",
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {field("city", "City", "checkout.city_input")}
              {field("state", "State / Province", "checkout.state_input")}
              {field("postalCode", "Postal Code", "checkout.postal_input")}
            </div>

            {/* Country Select */}
            <div>
              <Label className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5 block">
                Country <span className="text-gold">*</span>
              </Label>
              <Select
                value={form.country}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, country: val }))
                }
              >
                <SelectTrigger
                  data-ocid="checkout.country_select"
                  className="bg-card border-border focus:border-gold"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c} className="hover:bg-muted">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Lock className="w-3.5 h-3.5 text-gold" />
                Your personal data is encrypted and secured
              </div>
              <button
                type="submit"
                disabled={submitting}
                data-ocid="checkout.submit_button"
                className="w-full gold-gradient text-background py-4 text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Place Order — {formatPrice(total)}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <div className="bg-card border border-border p-6 sticky top-24">
            <h2 className="font-display text-xl font-medium mb-5">
              Order Summary
            </h2>

            <div className="space-y-4 mb-5 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="w-14 h-14 bg-muted flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm flex-shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2.5 text-sm">
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
              <div className="border-t border-border pt-2.5 flex justify-between font-medium text-base">
                <span>Total</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
