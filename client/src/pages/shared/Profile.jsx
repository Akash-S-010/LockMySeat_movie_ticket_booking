import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../../store/useAuthStore.js"; 
import axiosInstance from "../../config/axiosInstance.js";
import { Loader, Pencil, User } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, checkUser } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [isEditingName, setIsEditingName] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setProfilePic(user.profilePic || "");
    }
  }, [user]);

  // Handle name update
  const handleNameUpdate = async () => {
    try {
      const res = await axiosInstance.put("/user/update-profile", { name });
      toast.success(res.data.message); 
      setIsEditingName(false);
      checkUser(); // Refresh user data in Zustand store
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update name"); 
    }
  };

  // Handle profile picture update
  const handleProfilePicUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      setLoading(true);
      const res = await axiosInstance.put("/user/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message); 
      setProfilePic(res.data.data.profilePic);
      checkUser();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update profile picture"
      );
    } finally {
    }
    setLoading(false);
  };

  // Trigger file input click when pen icon is clicked
  const handlePenClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100 px-4">
      <div className="card w-full max-w-md bg-base-300 shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center">Profile</h2>
        <p className="text-center text-gray-500 mb-6">
          Your profile information
        </p>

        {/* Profile Picture with Pen Icon */}
        <div className="flex justify-center mb-6">
          <div className="avatar relative">
            <div className="w-24 rounded-full ring border-primary ring-offset-1">
              {loading ? (
                <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                  <Loader className="w-10 h-10 animate-spin" />
                </div>
              ) : profilePic ? (
                <img src={profilePic} alt="Profile" className="object-top" />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                  <User className="w-12 h-12" />{" "}
                  {/* Default user icon from lucide-react */}
                </div>
              )}
            </div>
            <button
              onClick={handlePenClick}
              className="absolute bottom-0 right-1 btn btn-primary btn-circle btn-sm"
              disabled={loading} // Disable the button while loading
            >
              <Pencil className="w-4 h-4" />{" "}
              {/* Pencil icon from lucide-react */}
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfilePicUpdate}
            className="hidden"
            accept="image/*"
            disabled={loading} // Disable the input while loading
          />
        </div>

        {/* User Name */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text mb-1">User Name</span>
          </label>
          {isEditingName ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered border-primary w-full"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleNameUpdate}
                  className="btn btn-primary btn-md w-full sm:w-auto"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingName(false)}
                  className="btn border-amber-50 btn-md w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center px-3 py-2 border rounded-lg">
              <span>{name}</span>
              <button
                onClick={() => setIsEditingName(true)}
                className="btn btn-ghost btn-sm"
              >
                <Pencil className="w-4 h-4" />{" "}
              </button>
            </div>
          )}
        </div>

        {/* Email (Read-only) */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text mb-1">Email</span>
          </label>
          <div className="p-3 border rounded-lg">{user?.email}</div>
        </div>

        {/* Account Information */}
        <h3 className="text-lg font-semibold mt-6 mb-4">Account Information</h3>
        <div className="mb-4 flex justify-between">
          <label className="label">
            <span className="label-text">Member Since</span>
          </label>
          <div>
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </div>
        </div>
        <hr />
        <div className="mb-4 flex justify-between">
          <label className="label">
            <span className="label-text">Account Status</span>
          </label>
          <div className="p-3 text-green-600">Active</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
