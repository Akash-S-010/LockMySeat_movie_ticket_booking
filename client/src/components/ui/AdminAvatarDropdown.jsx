import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/Avatar.png";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance.js";
import { useAuthStore } from "../../store/useAuthStore.js";
import { LogOut } from "lucide-react";

const AdminAvatarDropdown = ({role}) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  {role === "theaterOwner" ? role = "owner" : role = "admin"}

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Toggle Theme---
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Logout Function---
  const handleLogout = async () => {
    try {
      await axiosInstance.post("user/logout");
      navigate(`/${role}/login`);
      window.location.reload();
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative">
      {/* Unified Avatar Button */}
      <div
        className="btn btn-ghost btn-circle avatar bg-gray-500 cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <img
          src={user?.profilePic || Avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-top"
        />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <ul className="menu dropdown-content absolute right-0 mt-2 w-56 p-2 shadow-lg bg-base-100 rounded-box z-50 border border-primary">
          <li>
            <Link to={`/${role}/profile`} className="hover:bg-base-300" onClick={() => setIsDropdownOpen(false)}>
              Profile
            </Link>
          </li>
          <li>
            <div
              onClick={toggleTheme}
              className="hover:bg-base-300 flex justify-between items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {theme === "light" ? "🌞" : "🌙"}
              </span>
              <span className="bg-primary px-2 rounded-md text-white text-xs">
                {theme === "light" ? "Change to Dark Mode" : "Change to Light Mode"}
              </span>
            </div>
          </li>
          <li>
            <button
              onClick={() => {
                handleLogout();
                setIsDropdownOpen(false);
              }}
              className="hover:bg-base-300 text-error"
            >
              <LogOut className="mr-2" size={18} />
              Sign Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AdminAvatarDropdown;
