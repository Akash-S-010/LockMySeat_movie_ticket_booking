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
    <div className="min-h-screen bg-base-100">
      <OwnerHeader />
      <OwnerSidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <main className="ml-64 pt-16 pb-16">
        <div className="container mx-auto p-6">{renderContent()}</div>
      </main>
      <OwnerFooter />
    </div>
  );
};

export default TheaterOwnerLayout;
