import Layout from "@/components/layout/Layout";
import { CartProvider } from "@/data/store";
import AboutPage from "@/pages/AboutPage";
import AccountPage from "@/pages/AccountPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ShopPage from "@/pages/ShopPage";
import AdminOrdersPage from "@/pages/admin/AdminOrdersPage";
import AdminPage from "@/pages/admin/AdminPage";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
