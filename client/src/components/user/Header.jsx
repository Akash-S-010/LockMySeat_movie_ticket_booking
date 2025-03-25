import React from "react";
import Logo from "../../assets/AppLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-base-300 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-2 px-12">
        <Link to="/">
          <img src={Logo} alt="App Logo" className="w-36" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-lg">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/all-movies" className="hover:text-primary transition">
            Movies
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <Button
            title="Login"
            onClick={() => navigate("/login")}
          />

          <Button
            title="Register"
            onClick={() => navigate("/register")}
            className={"bg-base-100 px-3 rounded border-2 border-primary primary-btn-hover cursor-pointer"}
          />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-base-200 py-4 space-y-3 text-center">
          <Link
            to="/"
            className="block py-2 hover:text-primary"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/all-movies"
            className="block py-2 hover:text-primary"
            onClick={() => setMenuOpen(false)}
          >
            Movies
          </Link>
          <Button
            title="Login"
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
          />
          <Button
            title="Register"
            onClick={() => {
              navigate("/register");
              setMenuOpen(false);
            }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
