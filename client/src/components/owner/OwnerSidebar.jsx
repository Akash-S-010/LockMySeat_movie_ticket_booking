import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Theater, PlusCircle, Clapperboard } from 'lucide-react';
import Logo from '../../assets/AppLogo.png';

const OwnerSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/owner/dashboard', label: 'Dashboard', icon: Home },
    { path: '/owner/movies', label: 'Movie List', icon: Film },
    { path: '/owner/theater-list', label: 'Theater List', icon: Theater },
    { path: '/owner/add-theaters', label: 'Add Theaters', icon: PlusCircle },
    { path: '/owner/shows', label: 'Shows', icon: Clapperboard },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-base-200 pt-2 transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0`}
      >
        <ul className="p-4 space-y-2">
          <img src={Logo} alt="logo" className="w-40 mb-12" />
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center p-3 text-sm font-medium rounded-lg transition-colors duration-200
                  ${location.pathname === item.path
                    ? 'bg-primary text-primary-content'
                    : 'text-base-content hover:bg-base-100 hover:text-primary'
                  }`}
              >
                <item.icon className="mr-3" size={20} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default OwnerSidebar;
