import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import {SubmitBtn} from "../../components/ui/Buttons";

const Register = ({role}) => {
  const [ loading, setLoading ] = useState(false); 

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const user = {
    role: "user",
    registerAPI: "user/signup",
    redirectRoute: "/verify-otp",
    loginRoute: "/login",
};

if (role == "theaterOwner") {
    user.role = "theaterOwner";
    user.registerAPI = "admin/signup";
    user.redirectRoute = "/owner/verify-otp";
    user.loginRoute = "/owner/login";
}

if (role == "admin") {
  user.role = "admin";
  user.registerAPI = "admin/signup";
  user.redirectRoute = "/admin/verify-otp";
  user.loginRoute = "/admin/signup";
}

  const password = watch("password");

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    const payload = { name, email, password };
  
    try {
      setLoading(true);
      const response = await axiosInstance.post(user.registerAPI, payload);
      
      // Handle scenario where user is unverified but can continue
      if (response.data.message.includes("New OTP sent")) {
        toast.success("Account already exists but is unverified. OTP sent!");
      } else {
        toast.success(response.data.message || "OTP sent! Please verify.");
      }
  
      navigate(`${user.redirectRoute}?email=${email}`);
  
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      toast.error(errorMsg);
      console.error("Registration failed:", errorMsg);
      
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="bg-base-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-3xl font-bold text-primary">Sign Up</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-base mb-2">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter your name"
                className={`w-full pl-10 pr-4 py-2 bg-base-200 rounded-md border ${
                  errors.name ? "border-red-500" : "border-base-300"
                } focus:outline-none focus:border-primary`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-base mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-2 bg-base-200 rounded-md border ${
                  errors.email ? "border-red-500" : "border-base-300"
                } focus:outline-none focus:border-primary`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-base mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-12 py-2 bg-base-200 rounded-md border ${
                  errors.password ? "border-red-500" : "border-base-300"
                } focus:outline-none focus:border-primary`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-base mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className={`w-full pl-10 pr-12 py-2 bg-base-200 rounded-md border ${
                  errors.confirmPassword ? "border-red-500" : "border-base-300"
                } focus:outline-none focus:border-primary`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <SubmitBtn title="Register" loading={loading} />
        </form>

        {/* Login Link */}
        <p className="text-center text-base mt-4">
          Already have an account?{" "}
          <Link to={user.loginRoute} className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
