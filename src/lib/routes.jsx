import { createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router";
import AboutUSPage from "../Pages/AboutUS.jsx";
import BlogPage from "../Pages/Blog.jsx";
import CartPage from "../Pages/Cart.jsx";
import ContactUSPage from "../Pages/ContactUS.jsx";
import HomePage from "../Pages/HomePage.jsx";
import ProductPage from "../Pages/Product.jsx";
import AppLayout from "../Components/Layouts/AppLayout.jsx";
import AuthPage from "../Pages/Auth.jsx";
import AuthLayout from "../Components/Layouts/AuthLayout.jsx";
import CMSLayout from "../Components/Layouts/CMSLayout.jsx";
import * as AuthServices from "./../services/auth.service.js";
import Forbidden from "../Pages/Forbidden.jsx";
import NotFound from "./../Pages/NotFound";
import ModeratorProducts from "../Pages/moderator/products/page.jsx";
import ModeratorCategories from "../Pages/Dashboard/moderator/categories/page.jsx";
import ModeratorUsers from "./../Pages/Dashboard/moderator/users/page";
import CheckoutPage from "../Pages/Checkout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about-us", element: <AboutUSPage /> },
      { path: "contact-us", element: <ContactUSPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "product/:productSlug", element: <ProductPage /> },
      { path: "blog/:blogID", element: <BlogPage /> },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [{ index: true, element: <AuthPage /> }],
      },
      { path: "forbidden", element: <Forbidden /> },
      { path: "*", element: <NotFound /> },
    ],
  },

  {
    path: "/dashboard",
    element: <CMSLayout />,
    children: [
      {
        path: "moderator",
        loader: async () => {
          try {
            const { data } = await AuthServices.getMe();

            if (!data.user.roles.includes("ADMIN")) {
              return redirect("/forbidden");
            }
            return data.user;
          } catch (err) {
            return redirect("/auth");
          }
        },
        children: [
          { index: true, loader: () => redirect("home") },
          { path: "home", element: <div>Home Page</div> },
          { path: "orders", element: <div>Orders Page</div> },
          { path: "products", element: <ModeratorProducts /> },
          { path: "categories", element: <ModeratorCategories /> },
          { path: "users", element: <ModeratorUsers /> },
        ],
      },
    ],
  },
]);

export default router;
