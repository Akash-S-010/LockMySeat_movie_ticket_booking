import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "lucide-react";

const ProtectedRoutesOwner = () => {
  const { isUserAuth, isLoading, user, checkOwner, hasCheckedAuth } = useAuthStore();
  const navigate = useNavigate();

  // Run auth check on mount
  useEffect(() => {
    checkOwner();
  }, [checkOwner]);

  // Redirect *only* after auth check completes
  useEffect(() => {
    if (hasCheckedAuth && !isUserAuth) {
      navigate("/owner/login", { replace: true });
    }
  }, [hasCheckedAuth, isUserAuth, navigate]);

  // Optional loading state
  if (!hasCheckedAuth || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return isUserAuth && user?.role === "theaterOwner" ? <Outlet /> : null;
};

export default ProtectedRoutesOwner;
