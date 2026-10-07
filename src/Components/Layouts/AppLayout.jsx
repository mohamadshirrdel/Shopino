import { Outlet } from "react-router";
import { Toaster } from "sonner";
import AuthProvider from "../../context/AuthProvider";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import CartProvider from "./../../context/CartProvider";

const AppLayout = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "IRANSansX",
            },
          }}
        />
        <Header />
        <Outlet />
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default AppLayout;
