import React, { useEffect, useState } from "react";
import OwnerHeader from "../components/owner/OwnerHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import OwnerFooter from "../components/owner/OwnerFooter";
import { Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <OwnerHeader toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main
          className={`flex-1 min-h-screen transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : ""
          } lg:ml-64`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <Outlet />
          </div>
        </main>
      </div>
      <OwnerFooter />
    </div>
  );
};

export default AdminLayout;
