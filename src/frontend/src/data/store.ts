import {
  type ReactNode,
  createContext,
  createElement,
  useContext,
  useEffect,
  useReducer,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProductCategory =
  | "rings"
  | "necklaces"
  | "bracelets"
  | "earrings"
  | "pendants"
  | "sets"
  | "mens";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // in paise (1 INR = 100 paise)
  category: ProductCategory;
  images: string[];
  stock: number;
  featured: boolean;
  material: string;
  badge?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  userPrincipal?: string;
};

// ─── Mock Products ─────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    id: "p001",
    name: "Lumière Solitaire Ring",
    description:
      "A breathtaking solitaire ring featuring a 1.2 carat brilliant-cut diamond set in 18k gold. The elegant four-prong setting allows maximum light to dance through the stone, creating an unforgettable sparkle.",
    price: 285000,
    category: "rings",
    images: ["/assets/generated/ring-solitaire.dim_600x600.jpg"],
    stock: 8,
    featured: true,
    material: "18k Gold, Diamond",
    badge: "Bestseller",
  },
  {
    id: "p002",
    name: "Étoile Pearl Necklace",
    description:
      "A cascade of hand-selected South Sea pearls suspended on a delicate 18k gold chain. Each pearl is chosen for its exceptional lustre and perfectly symmetrical form.",
    price: 189000,
    category: "necklaces",
    images: ["/assets/generated/necklace-pearl.dim_600x600.jpg"],
    stock: 12,
    featured: true,
    material: "18k Gold, South Sea Pearls",
    badge: "New",
  },
  {
    id: "p003",
    name: "Aurore Bangle",
    description:
      "A twisted 18k gold bangle that catches light from every angle. Hand-crafted by our master goldsmiths using traditional techniques, this statement piece pairs beautifully with any ensemble.",
    price: 145000,
    category: "bracelets",
    images: ["/assets/generated/bracelet-bangle.dim_600x600.jpg"],
    stock: 15,
    featured: true,
    material: "18k Gold",
    badge: "Bestseller",
  },
  {
    id: "p004",
    name: "Verdure Drop Earrings",
    description:
      "Stunning drop earrings featuring vivid emerald-cut emeralds cradled in 18k gold. The rich green gemstones are ethically sourced from certified Colombian mines.",
    price: 225000,
    category: "earrings",
    images: ["/assets/generated/earrings-emerald.dim_600x600.jpg"],
    stock: 6,
    featured: false,
    material: "18k Gold, Colombian Emeralds",
    badge: "Limited Edition",
  },
  {
    id: "p005",
    name: "Infinité Eternity Band",
    description:
      "A timeless eternity band set with 30 brilliant-cut diamonds, each precisely matched for colour and clarity. The seamless channel setting creates an unbroken circle of light.",
    price: 350000,
    category: "rings",
    images: ["/assets/generated/ring-eternity.dim_600x600.jpg"],
    stock: 4,
    featured: false,
    material: "18k White Gold, Diamonds",
  },
  {
    id: "p006",
    name: "Azuré Sapphire Pendant",
    description:
      "A cushion-cut Ceylon sapphire of the deepest cornflower blue, suspended from a fine platinum chain. The sapphire is surrounded by a halo of pavé-set diamonds.",
    price: 312000,
    category: "necklaces",
    images: ["/assets/generated/necklace-sapphire.dim_600x600.jpg"],
    stock: 7,
    featured: false,
    material: "Platinum, Ceylon Sapphire, Diamonds",
    badge: "New",
  },
  {
    id: "p007",
    name: "Diamant Tennis Bracelet",
    description:
      "A classic tennis bracelet featuring 52 round brilliant diamonds set in a flexible 18k white gold mounting. Each diamond is individually hand-set for maximum brilliance.",
    price: 485000,
    category: "bracelets",
    images: ["/assets/generated/bracelet-tennis.dim_600x600.jpg"],
    stock: 3,
    featured: false,
    material: "18k White Gold, Diamonds",
    badge: "Bestseller",
  },
  {
    id: "p008",
    name: "Soleil Hoop Earrings",
    description:
      "Sleek diamond-paved hoop earrings that add instant glamour to any look. The seamless pavé setting creates an unbroken surface of sparkling diamonds.",
    price: 168000,
    category: "earrings",
    images: ["/assets/generated/earrings-hoop.dim_600x600.jpg"],
    stock: 10,
    featured: false,
    material: "18k Gold, Diamonds",
  },
  {
    id: "p009",
    name: "Rouge Royale Ring",
    description:
      "A breathtaking vintage-inspired ring featuring a 2.1 carat Burmese ruby in a milgrain-edged rose gold setting. The ruby's pigeon-blood red hue is extraordinarily rare.",
    price: 420000,
    category: "rings",
    images: ["/assets/generated/ring-ruby-vintage.dim_600x600.jpg"],
    stock: 2,
    featured: false,
    material: "Rose Gold, Burmese Ruby",
    badge: "Rare",
  },
  {
    id: "p010",
    name: "Lumière Collection Set",
    description:
      "The complete Lumière collection — a matching necklace, earrings, and bracelet in 18k gold. Presented in Crushed's signature black lacquer box, perfect as an exceptional gift.",
    price: 695000,
    category: "sets",
    images: ["/assets/generated/jewelry-set-gold.dim_600x600.jpg"],
    stock: 5,
    featured: false,
    material: "18k Gold",
    badge: "Gift Set",
  },
  {
    id: "p011",
    name: "Monogram Chain Pendant",
    description:
      "Personalise your jewellery with our bespoke monogram pendant, hand-engraved on 18k gold. Each letter is meticulously crafted to your specification, suspended from an elegant curb chain.",
    price: 128000,
    category: "pendants",
    images: ["/assets/generated/necklace-chain-pendant.dim_600x600.jpg"],
    stock: 20,
    featured: false,
    material: "18k Gold",
    badge: "Personalised",
  },
  {
    id: "p012",
    name: "Perle Pearl Stud Earrings",
    description:
      "Timeless Akoya pearl studs in 18k gold settings — a wardrobe essential. Our pearls are selected for their exceptional round shape, satiny lustre, and unblemished surface.",
    price: 95000,
    category: "earrings",
    images: ["/assets/generated/earrings-pearl-stud.dim_600x600.jpg"],
    stock: 18,
    featured: false,
    material: "18k Gold, Akoya Pearls",
  },
  {
    id: "p013",
    name: "Cannabis Leaf Silver Chain",
    description:
      "A bold statement necklace featuring a crystal-encrusted cannabis leaf pendant set in sterling silver. Suspended from a twisted rope chain, this piece blends street edge with artisan craftsmanship.",
    price: 8900,
    category: "mens",
    images: ["/assets/uploads/WhatsApp-Image-2026-03-08-at-4.16.14-AM-1.jpeg"],
    stock: 20,
    featured: true,
    material: "Sterling Silver, Crystal",
    badge: "New",
  },
  {
    id: "p014",
    name: "Mohawk Silver Cuff",
    description:
      "A raw, elemental cuff bracelet with a deeply engraved branch pattern — forged from oxidised sterling silver. The open design makes it easy to wear and adjust, perfect for stacking or wearing alone.",
    price: 7500,
    category: "mens",
    images: [
      "/assets/uploads/WhatsApp-Image-2026-03-08-at-4.16.14-AM-1--2.jpeg",
    ],
    stock: 15,
    featured: true,
    material: "Sterling Silver",
    badge: "Bestseller",
  },
  {
    id: "p015",
    name: "Vandal Golden Bracelet",
    description:
      "An iced-out Cuban link bracelet dripping in pavé-set crystals on a 18k gold-plated base. The double-locking clasp ensures security while making a luxury statement with every move.",
    price: 12500,
    category: "mens",
    images: ["/assets/uploads/WhatsApp-Image-2026-03-08-at-4.16.15-AM-3.jpeg"],
    stock: 10,
    featured: true,
    material: "18k Gold Plate, Crystal",
    badge: "New",
  },
  // ─── New Men's Collection ───────────────────────────────────────────────────
  {
    id: "p016",
    name: "Reaper Skull Ring",
    description:
      "A commanding gothic skull ring hand-sculpted in oxidised sterling silver with a deep black onyx inset. The intricate bone detailing makes this a true statement piece for the bold.",
    price: 9800,
    category: "mens",
    images: ["/assets/generated/mens-skull-ring.dim_600x600.jpg"],
    stock: 12,
    featured: true,
    material: "Sterling Silver, Black Onyx",
    badge: "Gothic",
  },
  {
    id: "p017",
    name: "Dragon Fire Pendant",
    description:
      "A heavyweight oxidised silver dragon pendant with fiery red garnet eyes, suspended on a thick curb chain. Inspired by ancient mythology, crafted for the modern warrior.",
    price: 14500,
    category: "mens",
    images: ["/assets/generated/mens-dragon-pendant.dim_600x600.jpg"],
    stock: 8,
    featured: true,
    material: "Oxidised Silver, Garnet",
    badge: "New",
  },
  {
    id: "p018",
    name: "Shadow Stack Ring Set",
    description:
      "A trio of men's stacking rings — a polished plain band, a black diamond-encrusted band, and a geometric engraved band. Mix and match for a custom layered look.",
    price: 18500,
    category: "mens",
    images: ["/assets/generated/mens-stacking-rings.dim_600x600.jpg"],
    stock: 10,
    featured: false,
    material: "Sterling Silver, Black Diamonds",
    badge: "Set of 3",
  },
  {
    id: "p019",
    name: "Outlaw Leather Bracelet",
    description:
      "A rugged hand-braided black leather bracelet with a chunky sterling silver skull charm and double-locking clasp. Built for everyday wear with an edge that doesn't soften.",
    price: 6200,
    category: "mens",
    images: ["/assets/generated/mens-leather-bracelet.dim_600x600.jpg"],
    stock: 18,
    featured: false,
    material: "Leather, Sterling Silver",
    badge: "Bestseller",
  },
];

// ─── Cart State ────────────────────────────────────────────────────────────────

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.findIndex(
        (i) => i.product.id === action.product.id,
      );
      if (existing >= 0) {
        const updated = [...state.items];
        updated[existing] = {
          ...updated[existing],
          quantity: updated[existing].quantity + action.quantity,
        };
        return { items: updated };
      }
      return {
        items: [
          ...state.items,
          { product: action.product, quantity: action.quantity },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter((i) => i.product.id !== action.productId),
        };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: action.quantity }
            : i,
        ),
      };
    }
    case "CLEAR_CART":
      return { items: [] };
    case "LOAD_CART":
      return { items: action.items };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = "crushed_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        dispatch({ type: "LOAD_CART", items: parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", product, quantity });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  return createElement(
    CartContext.Provider,
    {
      value: {
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      },
    },
    children,
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// ─── Orders ──────────────────────────────────────────────────────────────────

const ORDERS_STORAGE_KEY = "crushed_orders";

export function getOrders(): Order[] {
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx >= 0) {
    orders[idx].status = status;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }
}

export function generateOrderId(): string {
  return `CRS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

// ─── Format price in Indian Rupees (INR) ─────────────────────────────────────
// Price values are stored in paise (1 INR = 100 paise), so we divide by 100.
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}
