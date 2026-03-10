import { Badge } from "@/components/ui/badge";
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
import {
  type Order,
  type OrderStatus,
  formatPrice,
  getOrders,
  updateOrderStatus,
} from "@/data/store";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { ChevronLeft, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-amber-500/20 text-amber-400 border-0",
  processing: "bg-blue-500/20 text-blue-400 border-0",
  shipped: "bg-purple-500/20 text-purple-400 border-0",
  delivered: "bg-green-500/20 text-green-400 border-0",
  cancelled: "bg-red-500/20 text-red-400 border-0",
};

export default function AdminOrdersPage() {
  const { identity } = useInternetIdentity();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

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

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );
    toast.success(`Order ${orderId} updated to ${status}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <Link
          to="/admin"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-gold transition-colors mb-3 w-fit"
        >
          <ChevronLeft className="w-3 h-3" /> Back to Dashboard
        </Link>
        <h1 className="font-display text-3xl lg:text-4xl font-medium">
          Order Manager
        </h1>
      </div>

      {orders.length === 0 ? (
        <div
          data-ocid="admin.orders.empty_state"
          className="border border-border p-16 text-center"
        >
          <p className="font-display text-2xl text-muted-foreground mb-2">
            No orders yet
          </p>
          <p className="text-sm text-muted-foreground">
            Orders will appear here once customers make purchases.
          </p>
        </div>
      ) : (
        <div className="border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  Order ID
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  Date
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  Customer
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  Items
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  Total
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, idx) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.04 }}
                  data-ocid={`admin.order.item.${idx + 1}`}
                  className="border-border hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    <span className="text-xs font-mono text-gold">
                      {order.id}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">
                        {order.shippingAddress.firstName}{" "}
                        {order.shippingAddress.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.shippingAddress.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {order.items.slice(0, 3).map((item) => (
                        <div
                          key={item.product.id}
                          className="w-8 h-8 bg-muted overflow-hidden"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{order.items.length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {formatPrice(order.total)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(val) =>
                        handleStatusChange(order.id, val as OrderStatus)
                      }
                    >
                      <SelectTrigger
                        data-ocid={`admin.order.status_select.${idx + 1}`}
                        className="w-32 h-7 text-xs border-border bg-transparent"
                      >
                        <Badge
                          className={`rounded-full text-[10px] capitalize ${STATUS_COLORS[order.status]}`}
                        >
                          {order.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem
                            key={s}
                            value={s}
                            className="text-xs capitalize"
                          >
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
