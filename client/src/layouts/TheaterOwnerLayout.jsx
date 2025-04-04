import React, { useState } from "react";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import OwnerHeader from "../components/owner/OwnerHeader";
import OwnerSidebar from "../components/owner/OwnerSidebar";
import OwnerFooter from "../components/owner/OwnerFooter";
import OwnerMovieList from "../pages/owner/OwnerMovieList";
import OwnerTheaterList from "../pages/owner/OwnerTheaterList";
import AddTheater from "../pages/owner/AddTheater";
import AddShows from "../pages/owner/AddShows";

const TheaterOwnerLayout = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <OwnerDashboard />;
      case "movies":
        return <OwnerMovieList />;
      case "theaterList":
        return <OwnerTheaterList />;
      case "addTheaters":
        return <AddTheater />;
      case "shows":
        return <AddShows />;
      default:
        return <OwnerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <OwnerHeader toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <OwnerSidebar 
          setActiveSection={setActiveSection} 
          activeSection={activeSection}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <main className="flex-1 pt-16 pb-16 lg:ml-64 transition-all duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {renderContent()}
          </div>
        </main>
      </div>
      <OwnerFooter />
    </div>
  );
};

export default TheaterOwnerLayout;