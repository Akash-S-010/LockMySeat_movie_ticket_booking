import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import {Button} from "../../components/ui/Buttons";

const OwnerDashboard = () => {
  const [totalMovies, setTotalMovies] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalMovies = async () => {
      try {
        const response = await axiosInstance.get("/movie/total-movies");
        setTotalMovies(response.data.data);
        console.log("Total Movies:", totalMovies);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setLoading(false);
      }
    };

    fetchTotalMovies();
  }, []);

  // Render loading state or content
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Replace with your loader component
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-bold">Total Movies</h2>
            <p className="text-4xl font-extrabold">{totalMovies || 0}</p>
            <Button title="View Movies" />
          </div>
        </div>
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-bold">Active Movies</h2>
            <p className="text-4xl font-extrabold">12</p>
            <button className="text-sm text-base-content/70">
              Currently Showing
            </button>
          </div>
        </div>
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-bold">Theaters</h2>
            <p className="text-4xl font-extrabold">5</p>
            <button className="text-sm text-base-content/70">
              Operating Locations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;