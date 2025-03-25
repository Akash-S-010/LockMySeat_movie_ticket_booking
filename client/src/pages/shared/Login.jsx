import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import SubmitBtn from "../../components/ui/SubmitBtn";
import { Link } from "react-router-dom";

const Login = () => {


  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Add your login logic here (e.g., API call)
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="bg-base-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex  justify-center mb-6">
          <img src="Logo.png" alt="logo" className="w-12 mx-2" />
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
                className={`w-full pl-10 pr-4 py-2 bg-base-200 text-base rounded-md border-1 border-base-300 focus:outline-none focus:border-1 focus:border-[#f64d71] ${
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
                className={`w-full pl-10 pr-12 py-2 bg-base-200 text-base rounded-md border-1 border-base-300 focus:outline-none focus:border-1 focus:border-[#f64d71]${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
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
              <a href="#" className="text-primary text-sm hover:underline">
                Forget Password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <SubmitBtn title="Login"/>
        </form>

        {/* Register Link */}
        <p className="text-center text-base mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#f64d71] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;