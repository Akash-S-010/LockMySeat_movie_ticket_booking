import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { SubmitBtn } from "../../components/ui/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore.js";

const Login = ({ role }) => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = {
    role: "user",
    loginAPI: "user/login",
    redirectRoute: "/",
    registerRoute: "/register",
    forgotRoute: "/forgot-password",
  };

  if (role === "theaterOwner") {
    user.role = "theaterOwner";
    user.loginAPI = "admin/login";
    user.redirectRoute = "/owner/dashboard";
    user.registerRoute = "/owner/register";
    user.forgotRoute = "/owner/forgot-password";
  }

  if (role === "admin") {
    user.role = "admin";
    user.loginAPI = "admin/login";
    user.redirectRoute = "/admin/dashboard";
    user.registerRoute = "/admin/register";
    user.forgotRoute = "/admin/forgot-password";
  }

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(user.loginAPI, {
        email: data.email,
        password: data.password,
      });

      login(response.data.data, user.role);

      toast.success("Login successful");
      navigate(user.redirectRoute);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-base-100 flex items-center justify-center overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-primary bg-opacity-20 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      />

      {/* Login Form Content */}
      <div className="relative z-10 bg-base-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex justify-center mb-6">
          <h2 className="text-3xl font-bold text-primary">Login</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-base mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-2 bg-base-200 text-base rounded-md border border-base-300 focus:outline-none focus:border-primary ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-base mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-12 py-2 bg-base-200 text-base rounded-md border border-base-300 focus:outline-none focus:border-primary ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <div className="text-right mt-2">
              <Link
                to={user.forgotRoute}
                className="text-primary text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <SubmitBtn title="Login" loading={isLoading} />
        </form>

        {/* Register Link */}
        {role === "admin" ? null : (
          <p className="text-center text-base mt-4">
            Don't have an account?{" "}
            <Link to={user.registerRoute} className="text-primary hover:underline">
              Register
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;