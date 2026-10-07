import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Sidebar from "./../Common/Sidebar";
import AuthProvider from "../../context/AuthProvider";

const CMSLayout = () => {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "IRANSansX",
          },
        }}
      />
      <main id="application" className="flex gap-10 min-h-dvh bg-zinc-50">
        <Sidebar />
        <section className="container mx-auto  py-4" id="content">
          <Outlet />
        </section>
      </main>
    </AuthProvider>
  );
};

export default CMSLayout;
