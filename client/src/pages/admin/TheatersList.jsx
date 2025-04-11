import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';
import { TheaterManagementSkeleton } from "../../components/shared/DashboardSkeletons.jsx";

const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/theater/all-theaters");
        setTheaters(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch theaters:", error);
      }
    };

    fetchTheaters();
  }, []);

  const handleApprove = async (theaterId) => {
    try {
      await axiosInstance.put(`/theater/${theaterId}/approve`);
      setTheaters(
        theaters.map((theater) =>
          theater._id === theaterId
            ? { ...theater, status: "approved" }
            : theater
        )
      );
      Swal.fire({
        title: 'Success!',
        text: 'Theater approved successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error("Failed to approve theater:", error);
      toast.error("Failed to approve theater");
    }
  };

  const handleReject = async (theaterId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to reject this theater?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    });
  
    if (result.isConfirmed) {
      try {
        await axiosInstance.put(`/theater/${theaterId}/reject`);
        setTheaters(
          theaters.map((theater) =>
            theater._id === theaterId
              ? { ...theater, status: "rejected" }
              : theater
          )
        );
        toast.success("Theater rejected successfully");
      } catch (error) {
        console.error("Failed to reject theater:", error);
        toast.error("Failed to reject theater");
      }
    }
  };
  

  if (loading) {
    return <TheaterManagementSkeleton />;
  }

  // Function to get badge color based on status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen text-base py-4">
      <div className="bg-base-300 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Theater Management</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-400 text-left">
                <th>Theater Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {theaters.map((theater) => (
                <tr key={theater._id} className="hover:bg-base-100">
                  <td className="py-3 text-lg">{theater.name}</td>
                  <td className="py-3 text-lg">{theater.location}</td>
                  <td className="py-3 text-lg">
                    <div
                      className={`px-3 py-1 rounded-full text-white text-center text-sm font-medium w-fit ${getStatusColor(
                        theater.status
                      )}`}
                    >
                      {theater.status}
                    </div>
                  </td>
                  <td className="py-3 text-lg">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(theater._id)}
                        className="btn btn-sm btn-success"
                        disabled={theater.status === "approved"}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(theater._id)}
                        className="btn btn-sm btn-error"
                        disabled={theater.status === "rejected"}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {theaters.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No theaters found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TheaterList;
