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
    <div>
      {isUserAuth ? <UserHeader /> : <Header />}
      <div className="min-h-96">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
