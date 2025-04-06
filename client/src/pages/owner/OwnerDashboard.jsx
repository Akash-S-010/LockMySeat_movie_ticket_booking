import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import {Button} from "../../components/ui/Buttons";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [totalMovies, setTotalMovies] = useState("");
  const [totalShows, setTotalShows] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalMovies = async () => {
      try {
        const response = await axiosInstance.get("/movie/total-movies");
        setLoading(false);
        setTotalMovies(response.data.data);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };
  
    const fetchShows = async () => {
      try {
        const response = await axiosInstance.get("/show/total-shows");
        setLoading(false);
        setTotalShows(response.data.data); // ✅ number
      } catch (err) {
        console.error("Failed to fetch shows:", err);
      }
    };
  
    fetchTotalMovies();
    fetchShows();
  }, []);
  

  // Render loading state or content
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Replace with your loader component
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-bold">Total Movies</h2>
            <p className="text-4xl font-extrabold">{totalMovies || 0}</p>
            <Button title="View Movies" onClick={() => navigate("/owner/movies")}/>
          </div>
        </div>
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-bold">Active Movies</h2>
            <p className="text-4xl font-extrabold">{totalShows || 0}</p>
            <Button title="View Shows" onClick={() => navigate("/owner/shows")}/>
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