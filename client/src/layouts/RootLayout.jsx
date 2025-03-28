import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/user/Footer";
import UserHeader from "../components/user/UserHeader";
import { Toaster } from "react-hot-toast";


const RootLayout = () => {

  return (
    <div className="bg-base-100">
      <Toaster position="top-right"/>
      <UserHeader />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
