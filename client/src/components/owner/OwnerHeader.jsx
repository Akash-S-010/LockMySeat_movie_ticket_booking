import React from 'react';
import { LogOut, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/AppLogo.png';

const OwnerHeader = ({ toggleSidebar }) => {
  return (
    <header className="navbar bg-base-100 shadow-lg fixed top-0 z-10 w-full px-5">
      <div className="navbar-start flex items-center">
        <button className="btn btn-ghost lg:hidden mr-2" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <Link to={"/owner/dashboard"}><img src={Logo} alt="logo" className='w-32 sm:w-40' /></Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://api.dicebear.com/7.x/avataaars/svg" alt="Profile" />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm bg-base-300 dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 border-2 gap-y-3 border-primary">
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><a><LogOut className="mr-2" size={18} /> Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default OwnerHeader;