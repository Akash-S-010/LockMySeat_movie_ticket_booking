import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import {SubmitBtn} from "../../components/ui/Buttons";
import axiosInstance from "../../config/axiosInstance.js";
import toast from "react-hot-toast";

const ForgotPassword = ({role}) => {
  const [loading, setLoading] = useState(false); // Loader state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const forgotAPI =
  role === "theaterOwner" || role === "admin"
    ? "admin/forgot-password"
    : "user/forgot-password";



  const onSubmit = async (data) => {
    setLoading(true); // Show loader
    try {
      const response = await axiosInstance.post(forgotAPI, data);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending reset link");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="bg-base-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-base">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-2 border rounded-md outline-none focus:border-primary ${
                  errors.email ? "border-red-500" : "border-base-100"
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <SubmitBtn title="Send Reset Link" loading={loading} disabled={loading} />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
