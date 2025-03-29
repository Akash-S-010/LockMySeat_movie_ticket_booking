import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/user/Footer";
import UserHeader from "../components/user/UserHeader";


const RootLayout = () => {

  return (
    <div className="bg-base-100">
      <UserHeader />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
