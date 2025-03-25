import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import { useAuthStore } from "../store/useAuthStore";
import UserHeader from "../components/user/UserHeader";

const RootLayout = () => {
  const { isUserAuth, checkUser } = useAuthStore();

  useEffect(() => {
    checkUser();
  },[]);

  return (
    <div className="bg-base-100">
      {isUserAuth ? <Header /> : <UserHeader />}
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
