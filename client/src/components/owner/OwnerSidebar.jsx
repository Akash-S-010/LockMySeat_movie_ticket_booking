// components/owner/OwnerSidebar.jsx
import React from 'react';
import { 
  Home, 
  Film, 
  Theater, 
  PlusCircle, 
  Clapperboard 
} from 'lucide-react';

const OwnerSidebar = ({ setActiveSection, activeSection }) => {
  return (
    <div className="hidden lg:flex lg:flex-col w-64 h-screen fixed left-0 top-0 bg-base-200 pt-16">
      <ul className="p-4 w-full cursor-pointer">
        <li className="mb-3">
          <button 
            onClick={() => setActiveSection('dashboard')}
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
            onClick={() => setActiveSection('movies')}
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
            onClick={() => setActiveSection('theaterList')}
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
            onClick={() => setActiveSection('addTheaters')}
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
            onClick={() => setActiveSection('shows')}
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
  );
};

export default OwnerSidebar;