import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "lucide-react";

const ProtectedRoutes = () => {
  const { isUserAuth, checkUser } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const verifyAuth = async () => {
      await checkUser();
      setLoading(false);
    };

    verifyAuth();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-20 text-primary" />
      </div>
    ); // Show loading until checkUser completes

  if (!isUserAuth) {
    navigate("/login", { replace: true });
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
