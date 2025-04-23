import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/AppLogo.png';
import AdminAvatarDropdown from '../shared/AdminAvatarDropdown';
import { useAuthStore } from '../../store/useAuthStore.js';

const OwnerHeader = ({ toggleSidebar }) => {
  const { user } = useAuthStore();
  const role = user?.role;
  return (
    <header className="navbar bg-base-200 fixed top-0 z-10 w-full px-5 ">
      <div className="navbar-start flex items-center">
        <button className="btn btn-ghost lg:hidden mr-2" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <Link to={"/owner/dashboard"}><img src={Logo} alt="logo" className='w-32 sm:w-40' /></Link>
      </div>
      <div className="navbar-end">
        <AdminAvatarDropdown role={role}/>
      </div>
    </header>
  );
};

export default OwnerHeader;