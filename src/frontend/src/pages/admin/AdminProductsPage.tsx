import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  PRODUCTS,
  type Product,
  type ProductCategory,
  formatPrice,
} from "@/data/store";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { ChevronLeft, Edit, Lock, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CATEGORIES: ProductCategory[] = [
  "rings",
  "necklaces",
  "bracelets",
  "earrings",
  "pendants",
  "sets",
];

const emptyProduct = (): Omit<Product, "id"> => ({
  name: "",
  description: "",
  price: 0,
  category: "rings",
  images: [""],
  stock: 0,
  featured: false,
  material: "",
  badge: "",
});

export default function AdminProductsPage() {
  const { identity } = useInternetIdentity();
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newProductData, setNewProductData] = useState(emptyProduct());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (!identity) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Lock className="w-8 h-8 text-muted-foreground mb-4" />
        <p className="font-display text-2xl mb-3">Access Restricted</p>
        <Link
          to="/admin"
          className="text-gold text-sm tracking-widest uppercase border-b border-gold/40 pb-0.5"
        >
          Go to Admin
        </Link>
      </div>
    );
  }

  const handleAddProduct = () => {
    if (!newProductData.name || !newProductData.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    const product: Product = {
      ...newProductData,
      id: `p${Date.now()}`,
      price: Number(newProductData.price),
      stock: Number(newProductData.stock),
      images: newProductData.images[0]
        ? [newProductData.images[0]]
        : ["/assets/generated/ring-solitaire.dim_600x600.jpg"],
    };
    setProducts((prev) => [product, ...prev]);
    setNewProductData(emptyProduct());
    setDialogOpen(false);
    toast.success("Product added");
  };

  const handleEditSave = () => {
    if (!editProduct) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === editProduct.id ? editProduct : p)),
    );
    setEditDialogOpen(false);
    setEditProduct(null);
    toast.success("Product updated");
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product removed");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div>
          <Link
            to="/admin"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-gold transition-colors mb-3"
          >
            <ChevronLeft className="w-3 h-3" /> Back to Dashboard
          </Link>
          <h1 className="font-display text-3xl lg:text-4xl font-medium">
            Product Manager
          </h1>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              data-ocid="admin.add_product_button"
              className="flex items-center gap-2 gold-gradient text-background px-5 py-3 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                Add New Product
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              data={newProductData}
              onChange={(d) =>
                setNewProductData(
                  (prev) => ({ ...prev, ...d }) as Omit<Product, "id">,
                )
              }
              onSave={handleAddProduct}
              onCancel={() => setDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                Product
              </TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                Category
              </TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                Price
              </TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                Stock
              </TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, idx) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.03 }}
                data-ocid={`admin.product.item.${idx + 1}`}
                className="border-border hover:bg-muted/50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted overflow-hidden flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {product.material}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="rounded-full text-[10px] capitalize bg-secondary text-secondary-foreground border-0">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell>
                  <span
                    className={`text-sm ${product.stock <= 3 ? "text-amber-400" : product.stock === 0 ? "text-destructive" : ""}`}
                  >
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>
                  {product.featured ? (
                    <Badge className="rounded-full text-[10px] bg-gold/20 text-gold border-0">
                      Featured
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Dialog
                      open={editDialogOpen && editProduct?.id === product.id}
                      onOpenChange={(open) => {
                        setEditDialogOpen(open);
                        if (!open) setEditProduct(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          onClick={() => {
                            setEditProduct({ ...product });
                            setEditDialogOpen(true);
                          }}
                          data-ocid={`admin.product.edit_button.${idx + 1}`}
                          className="p-2 text-muted-foreground hover:text-gold transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-border max-w-lg max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="font-display text-xl">
                            Edit Product
                          </DialogTitle>
                        </DialogHeader>
                        {editProduct && (
                          <ProductForm
                            data={editProduct}
                            onChange={(d) =>
                              setEditProduct((prev) =>
                                prev ? { ...prev, ...d } : null,
                              )
                            }
                            onSave={handleEditSave}
                            onCancel={() => {
                              setEditDialogOpen(false);
                              setEditProduct(null);
                            }}
                          />
                        )}
                      </DialogContent>
                    </Dialog>

                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      data-ocid={`admin.product.delete_button.${idx + 1}`}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

type FormData = Omit<Product, "id"> | (Omit<Product, "id"> & { id: string });

function ProductForm({
  data,
  onChange,
  onSave,
  onCancel,
}: {
  data: FormData;
  onChange: (d: Partial<FormData>) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="space-y-4 pt-2">
      <div>
        <Label className="text-xs tracking-wider uppercase text-muted-foreground mb-1.5 block">
          Name *
        </Label>
        <Input
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="bg-muted border-border focus:border-gold"
          data-ocid="admin.product.name_input"
        />
      </div>
      <div>
        <Label className="text-xs tracking-wider uppercase text-muted-foreground mb-1.5 block">
          Description *
        </Label>
        <Textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className="bg-muted border-border focus:border-gold resize-none"
          rows={3}
          data-ocid="admin.product.textarea"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs tracking-wider uppercase text-muted-foreground mb-1.5 block">
            Price (cents)
          </Label>
          <Input
            type="number"
            value={data.price}
            onChange={(e) => onChange({ price: Number(e.target.value) })}
            className="bg-muted border-border focus:border-gold"
            data-ocid="admin.product.price_input"
          />
        </div>
        <div>
          <Label className="text-xs tracking-wider uppercase text-muted-foreground mb-1.5 block">
            Stock
          </Label>
          <Input
            type="number"
            value={data.stock}
            onChange={(e) => onChange({ stock: Number(e.target.value) })}
            className="bg-muted border-border focus:border-gold"
            data-ocid="admin.product.stock_input"
          />
        </div>
      </div>
      <div>
        <Label className="text-xs tracking-wider uppercase text-muted-foreground mb-1.5 block">
          Category
        </Label>
        <Select
          value={data.category}
          onValueChange={(val) =>
            onChange({ category: val as ProductCategory })
          }
        >
          <SelectTrigger
            className="bg-muted border-border"
            data-ocid="admin.product.category_select"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c} className="capitalize">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs tracking-wider uppercase text-muted-foreground mb-1.5 block">
          Material
        </Label>
        <Input
          value={data.material}
          onChange={(e) => onChange({ material: e.target.value })}
          className="bg-muted border-border focus:border-gold"
          data-ocid="admin.product.material_input"
        />
      </div>
      <div>
        <Label className="text-xs tracking-wider uppercase text-muted-foreground mb-1.5 block">
          Badge (optional)
        </Label>
        <Input
          value={data.badge ?? ""}
          onChange={(e) => onChange({ badge: e.target.value })}
          placeholder="Bestseller, New, Limited..."
          className="bg-muted border-border focus:border-gold"
          data-ocid="admin.product.badge_input"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onSave}
          data-ocid="admin.product.save_button"
          className="flex-1 gold-gradient text-background py-3 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          Save Product
        </button>
        <button
          type="button"
          onClick={onCancel}
          data-ocid="admin.product.cancel_button"
          className="flex-1 border border-border text-foreground py-3 text-xs tracking-widest uppercase hover:border-foreground/50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
