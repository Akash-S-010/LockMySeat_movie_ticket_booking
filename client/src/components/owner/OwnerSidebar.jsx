import React from 'react';
import { Home, Film, Theater, PlusCircle, Clapperboard } from 'lucide-react';

const OwnerSidebar = ({ setActiveSection, activeSection, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-screen w-64 bg-base-200 pt-18 transition-transform duration-300 ease-in-out z-5
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:w-64 lg:flex lg:flex-col`}
      >
        <ul className="p-4 w-full cursor-pointer">
          <li className="mb-3">
            <button 
              onClick={() => {
                setActiveSection('dashboard');
                setIsOpen(false);
              }}
              className={`flex items-center p-2 w-full text-left transition-colors duration-200 rounded-md cursor-pointer ${
                activeSection === 'dashboard' 
                  ? 'bg-primary text-primary-content' 
                  : 'hover:bg-primary hover:text-primary-content'
              }`}
            >
              <Home className="mr-5" size={20} /> Dashboard
            </button>
          </li>
          <li className="mb-3">
            <button 
              onClick={() => {
                setActiveSection('movies');
                setIsOpen(false);
              }}
              className={`flex items-center p-2 w-full text-left transition-colors duration-200 rounded-md cursor-pointer ${
                activeSection === 'movies' 
                  ? 'bg-primary text-primary-content' 
                  : 'hover:bg-primary hover:text-primary-content'
              }`}
            >
              <Film className="mr-5" size={20} /> Movie List
            </button>
          </li>
          <li className="mb-3">
            <button 
              onClick={() => {
                setActiveSection('theaterList');
                setIsOpen(false);
              }}
              className={`flex items-center p-2 w-full text-left transition-colors duration-200 rounded-md cursor-pointer ${
                activeSection === 'theaterList' 
                  ? 'bg-primary text-primary-content' 
                  : 'hover:bg-primary hover:text-primary-content'
              }`}
            >
              <Theater className="mr-5" size={20} /> Theater List
            </button>
          </li>
          <li className="mb-3">
            <button 
              onClick={() => {
                setActiveSection('addTheaters');
                setIsOpen(false);
              }}
              className={`flex items-center p-2 w-full text-left transition-colors duration-200 rounded-md cursor-pointer ${
                activeSection === 'addTheaters' 
                  ? 'bg-primary text-primary-content' 
                  : 'hover:bg-primary hover:text-primary-content'
              }`}
            >
              <PlusCircle className="mr-5" size={20} /> Add Theaters
            </button>
          </li>
          <li className="mb-3">
            <button 
              onClick={() => {
                setActiveSection('shows');
                setIsOpen(false);
              }}
              className={`flex items-center p-2 w-full text-left transition-colors duration-200 rounded-md cursor-pointer ${
                activeSection === 'shows' 
                  ? 'bg-primary text-primary-content' 
                  : 'hover:bg-primary hover:text-primary-content'
              }`}
            >
              <Clapperboard className="mr-5" size={20} /> Shows
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default OwnerSidebar;