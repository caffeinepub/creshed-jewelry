import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.18 0 0)",
            border: "1px solid oklch(0.25 0 0)",
            color: "oklch(0.95 0.01 90)",
          },
        }}
      />
    </div>
  );
}
