import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/AppLogo.png";
import AvatarDropdown from "../user/AvatarDropdown";
import { Button } from "../ui/Buttons";
import { useAuthStore } from "../../store/useAuthStore";

const UserHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkUser, isUserAuth, hasCheckedAuth } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar px-6 sm:px-6 md:px-10 lg:px-20 sticky top-0 z-20 transition-all duration-300 ${
        isScrolled ? "bg-base-300 shadow-md py-4" : "bg-transparent py-3"
      }`}
    >
      <div className="navbar-start">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="App Logo" className="w-42 object-contain" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-8 px-1 space-x-2">
          <li className="relative text-lg group">
            <Link to="/" className="py-2">
              Home
            </Link>
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-center transition-all duration-300 ${
                location.pathname === "/"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }`}
            ></span>
          </li>
          <li className="relative text-lg group">
            <Link to="/all-movies" className="py-2">
              Movies
            </Link>
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-center transition-all duration-300 ${
                location.pathname === "/all-movies"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }`}
            ></span>
          </li>
          <li className="relative text-lg group">
            <Link to="/about-us" className="py-2">
              About
            </Link>
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-center transition-all duration-300 ${
                location.pathname === "/about-us"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }`}
            ></span>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        {!hasCheckedAuth ? (
          <Button title="Login" onClick={() => navigate("/login")} />
        ) : isUserAuth ? (
          <AvatarDropdown />
        ) : (
          <Button title="Login" onClick={() => navigate("/login")} />
        )}
      </div>
    </nav>
  );
};

export default UserHeader;
