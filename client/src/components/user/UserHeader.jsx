import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/AppLogo.png";
import AvatarDropdown from "../ui/AvatarDropdown";
import Button from "../ui/Button"; 
import { useAuthStore } from "../../store/useAuthStore";

const UserHeader = () => {
  const navigate = useNavigate();
  const { isUserAuth, checkUser } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, []);
  

  return (
    <nav className="navbar bg-base-300 shadow-lg px-6 py-2 sm:px-6 md:px-10 lg:px-20">
      <div className="navbar-start">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="App Logo" className="w-42 object-contain" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li className="font-base text-primary list font-medium transition-colors duration-200 text-lg">
            <Link to="/">Home</Link>
          </li>
          <li className="font-base text-primary list font-medium transition-colors duration-200 text-lg">
            <Link to="/all-movies">Movies</Link>
          </li>
          <li className="font-base text-primary list font-medium transition-colors duration-200 text-lg">
            <Link to="/about-us">About</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        {isUserAuth ? (
          <AvatarDropdown />
        ) : (
          <>
            <Button
              title="Login"
              onClick={() => navigate("/login")}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default UserHeader;
