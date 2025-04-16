import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import { Button } from "../../components/ui/Buttons";
import { useNavigate } from "react-router-dom";
import RevenueChart from "../../components/shared/RevenueChart.jsx";
import { DashboardSkeleton } from "../../components/shared/DashboardSkeletons.jsx";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [totalTheaters, setTotalTheaters] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axiosInstance.get("/theater/total-theaters");
        setLoading(false);
        setTotalTheaters(response.data.data);
      } catch (err) {
        console.error("Failed to fetch theaters:", err);
      }
    };

    const fetchTotalUsers = async () => {
      try {
        const response = await axiosInstance.get("/user/all-users");
        setLoading(false);
        setTotalUsers(response.data.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    const fetchTotalMovies = async () => {
      try {
        const response = await axiosInstance.get("/movie/total-movies");
        setLoading(false);
        setTotalMovies(response.data.data);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };

    fetchTheaters();
    fetchTotalUsers();
    fetchTotalMovies();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-bold">Total Theaters</h2>
            <p className="text-4xl font-extrabold my-2">{totalTheaters || 0}</p>
            <Button
              title="View Theaters"
              onClick={() => navigate("/admin/theaters-list")}
              className="w-32 mx-auto"
            />
          </div>
        </div>
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="text-4xl font-extrabold my-2">{totalUsers || 0}</p>
            <Button
              title="View Users"
              onClick={() => navigate("/admin/users")}
              className="w-30 mx-auto"
            />
          </div>
        </div>
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-xl font-bold">Total Movies</h2>
            <p className="text-4xl font-extrabold my-2">{totalMovies || 0}</p>
            <Button
              title="View Users"
              onClick={() => navigate("/admin/movies")}
              className="w-30 mx-auto"
            />
          </div>
        </div>
      </div>
      <RevenueChart role="admin" />
    </div>
  );
};

export default AdminDashboard;
