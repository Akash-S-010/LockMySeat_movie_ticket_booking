import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { SubmitBtn } from "../../components/ui/Buttons.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";
import toast from "react-hot-toast";

const Verification = ({ role = "user" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = {
    role: "user",
    verifyAPI: "user/verify-otp",
    redirectRoute: "/login",
    errRedirectionRoute: "/register",
    resendOptRoute: "user/resend-otp",
  };

  if (role == "theaterOwner") {
    user.role = "theaterOwner";
    user.verifyAPI = "admin/verify-otp";
    user.redirectRoute = "/owner/login";
    user.errRedirectionRoute = "/owner/register";
    user.resendOptRoute = "admin/resend-otp";
  }

  if (role == "admin") {
    user.role = "admin";
    user.verifyAPI = "admin/verify-otp";
    user.redirectRoute = "/admin/login";
    user.errRedirectionRoute = "/admin/register";
    user.resendOptRoute = "admin/resend-otp";
  }

  // Extract and store email on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userEmail = params.get("email") || localStorage.getItem("userEmail");

    if (userEmail) {
      setEmail(userEmail);
      localStorage.setItem("userEmail", userEmail); // Store email to prevent loss
    } else {
      toast.error("Invalid access. Redirecting...");
      navigate(user.errRedirectionRoute);
    }
  }, [location, navigate]);

  // OTP Verification
  const onSubmit = async (data) => {
    if (!email) {
      toast.error("Email not found. Please try again.");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(user.verifyAPI, {
        email,
        otp: data.otp,
      });
      toast.success(response.data.message);
      // Clear email storage and redirect to login
      localStorage.removeItem("userEmail");
      navigate(user.redirectRoute);
      setLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP, please try again."
      );
      setLoading(false);
    }
  };

  // Resend OTP Handler
  const handleResendOTP = async () => {
    if (!email) {
      toast.error("Email not found. Please try again.");
      return;
    }

    setIsResending(true);
    try {
      const response = await axiosInstance.post(user.resendOptRoute, { email });
      toast.success(response.data.message || "OTP resent successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resending OTP.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="bg-base-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Display */}
          <div>
            <label className="block text-base mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base w-5 h-5" />
              <input
                type="email"
                value={email}
                readOnly
                className="w-full pl-10 pr-4 py-2 bg-base-200 text-base rounded-md border border-base-300 focus:outline-none cursor-not-allowed"
              />
            </div>
          </div>

          {/* OTP Input */}
          <div>
            <label className="block text-base mb-2">Enter OTP</label>
            <input
              type="text"
              placeholder="6-digit OTP"
              className={`w-full pl-4 pr-4 py-2 bg-base-200 text-base rounded-md border border-base-300 focus:outline-none focus:border-primary ${
                errors.otp ? "border-red-500" : ""
              }`}
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "OTP must be 6 digits",
                },
              })}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <SubmitBtn title="Verify OTP" loading={loading} />
        </form>

        {/* Resend OTP */}
        <p className="text-center text-base mt-4">
          Didn’t receive OTP?{" "}
          <button
            onClick={handleResendOTP}
            disabled={isResending}
            className="text-primary hover:underline cursor-pointer"
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Verification;
