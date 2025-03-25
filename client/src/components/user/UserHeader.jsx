import React from "react";
import Logo from "../../assets/AppLogo.png";
import { Link } from "react-router-dom";
import AvatarDropdown from "../ui/AvatarDropdown";

const UserHeader = () => {
  return (
    <nav className="navbar bg-base-300 shadow-lg px-6 py-2 sm:px-6 md:px-10 lg:px-20">
      <div className="navbar-start">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="App Logo" className="w-42 object-contain" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li>
            <Link to="/" className="hover:primary-text font-medium transition-colors duration-200 text-lg">
              Home
            </Link>
          </li>
          <li>
            <Link to="/all-movies" className="text-base-content hover:text-primary font-medium transition-colors duration-200 text-lg">
              Movies
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="text-base-content hover:text-primary font-medium transition-colors duration-200 text-lg">
              About Us
            </Link>
          </li>
        </ul>
      </div>

      <AvatarDropdown />
    </nav>
  );
};

export default UserHeader;