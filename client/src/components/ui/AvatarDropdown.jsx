import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/Avatar.png";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance.js";

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Logout Function
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("user/logout");
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar-end">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden">
        <button
          className="btn btn-ghost"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Avatar Dropdown - Desktop */}
      <div
        className="relative hidden lg:flex items-center cursor-pointer"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <div className="flex items-center gap-1">
          <div className={`btn btn-ghost btn-circle avatar ${theme === "light" ? "bg-base-100" : "bg-base-200"} p-1`}>
            <img src={Avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
          </div>
          <svg className="w-4 h-4 font-base-content" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {isDropdownOpen && (
          <ul className="menu dropdown-content absolute right-0 top-full w-56 p-2 shadow-lg bg-base-100 rounded-box z-50 border border-primary">
            <li>
              <Link to="/profile" className="hover:bg-base-300" onClick={() => setIsDropdownOpen(false)}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/my-bookings" className="hover:bg-base-300" onClick={() => setIsDropdownOpen(false)}>
                My Bookings
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
                <span className="bg-primary px-2 rounded-md text-white">
                  {theme === "light" ? "Change to Dark Mode" : "Change to Light Mode"}
                </span>
              </div>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:bg-base-300 text-error"
              >
                Sign Out
              </button>
            </li>
          </ul>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-base-100 shadow-lg z-50">
          <ul className="menu p-4">
            <li><Link to="/" className="hover:bg-base-200" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/all-movies" className="hover:bg-base-200" onClick={() => setIsOpen(false)}>Movies</Link></li>
            <li><Link to="/about-us" className="hover:bg-base-200" onClick={() => setIsOpen(false)}>About Us</Link></li>
            <li><Link to="/profile" className="hover:bg-base-200" onClick={() => setIsOpen(false)}>Profile</Link></li>
            <li><Link to="/my-bookings" className="hover:bg-base-200" onClick={() => setIsOpen(false)}>My Bookings</Link></li>
            <li>
              <div
                onClick={toggleTheme}
                className="hover:bg-base-200 flex justify-between items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {theme === "light" ? "🌞" : "🌙"}
                </span>
                <span className="badge badge-outline badge-primary">
                  {theme === "light" ? "Dark" : "Light"}
                </span>
              </div>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="hover:bg-base-200 text-error"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
