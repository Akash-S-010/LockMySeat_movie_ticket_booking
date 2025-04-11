import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "lucide-react";

const ProtectedRoutes = () => {
  const { isUserAuth, isLoading, hasCheckedAuth, checkUser } = useAuthStore();
  const navigate = useNavigate();

  // Run auth check on mount
  useEffect(() => {
    if (!hasCheckedAuth && !isLoading) {
      checkUser(); 
    }
  }, [hasCheckedAuth, isLoading, checkUser]);

  // Redirect logic
  useEffect(() => {
    if (hasCheckedAuth && !isUserAuth && !isLoading) {
      navigate("/login");
    }
  }, [hasCheckedAuth, isUserAuth, isLoading, navigate]);

  if (isLoading || !hasCheckedAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;