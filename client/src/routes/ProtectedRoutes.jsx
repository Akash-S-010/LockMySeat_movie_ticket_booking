import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "lucide-react";

const ProtectedRoutes = () => {
  const { isUserAuth, isLoading } = useAuthStore();
  const navigate = useNavigate();
 

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-20 text-primary" />
      </div>
    ); // Show loading until checkUser completes

// if user is not authenticated redirect to login
  if (!isUserAuth) {
    navigate("/login");
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
