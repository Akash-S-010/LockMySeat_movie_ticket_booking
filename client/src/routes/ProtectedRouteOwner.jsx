import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "lucide-react";

const ProtectedRoutesOwner = () => {
  const { isUserAuth, isLoading, user, checkUser } = useAuthStore();
  const navigate = useNavigate();

  // Check auth status on mount
  useEffect(() => {
    if (!isUserAuth && !isLoading) {
      checkUser();
    }
  }, []);

  // Redirect if not authenticated or not a theater owner
  useEffect(() => {
    if (!isLoading) {
      if (!isUserAuth || user?.role !== "theaterOwner") {
        navigate("/owner/login", { replace: true });
      }
    }
  }, [isLoading, isUserAuth, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-16 text-primary" />
      </div>
    );
  }

  return isUserAuth && user?.role === "theaterOwner" ? <Outlet /> : null;
};

export default ProtectedRoutesOwner;