import React from "react";
import Logo from "../assets/AppLogo.png";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-5 px-10 bg-base-300">
      <img src={Logo} alt="App Logo" className="w-42" />

      <div>
        <Link to={"/"} className="mx-4">Home</Link>
        <Link to={"/all-movies"}>Movies</Link>
      </div>

      <div>
        <button onClick={() => navigate("/login")} className="bg-[--primary] mx-3 px-5">Login</button>
        <button onClick={() => navigate("/register")} className="btn btn-outline btn-secondary">Register</button>
      </div>
    </div>
  )
};

export default Header;
