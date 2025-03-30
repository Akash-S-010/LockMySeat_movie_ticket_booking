import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff } from "lucide-react";
import {SubmitBtn} from "../../components/ui/Buttons";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Show loader
    try {
      const response = await axiosInstance.post("user/reset-password", {
        token,
        newPassword: data.newPassword,
      });
      toast.success("Password reset successful");
      setTimeout(() => navigate("/login"),setLoading(true), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="bg-base-300 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password Field */}
          <div>
            <label className="block text-base">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className={`w-full pl-10 pr-12 py-2 border rounded-md outline-none focus:border-primary ${
                  errors.newPassword ? "border-red-500" : "border-base-100"
                }`}
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Must be at least 6 characters" },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
          </div>

          <SubmitBtn title="Reset Password" loading={loading} disabled={loading} />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
