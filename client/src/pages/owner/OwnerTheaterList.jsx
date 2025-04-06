import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";

const OwnerTheaterList = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/theater/owner-theaters");
        setLoading(false);
        setTheaters(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch theaters:", error);
      }
    };

    fetchTheaters();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  // function to get badge color based on status
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
    <div className="min-h-screen text-base p-4">
      <div className="bg-base-300 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">My Theaters</h1>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-64"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-400 text-left">
                <th>Theater Name</th>
                <th>Theater Location</th>
                <th>Theater Status</th>
              </tr>
            </thead>
            <tbody>
              {theaters.map((theater, index) => (
                <tr key={index} className="hover:bg-base-100">
                  <td className="py-3 text-lg">
                    <div className="flex justify-between w-full">
                      <span>{theater.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-lg">
                    <div className="flex justify-between w-full">
                      <span>{theater.location}</span>
                    </div>
                  </td>
                  <td className="py-3 text-lg">
                    <div
                      className={`px-3 py-1 rounded-full text-white text-center text-sm font-medium w-fit ${getStatusColor(
                        theater.status
                      )}`}
                    >
                      {theater.status}
                    </div>
                  </td>
                </tr>
              ))}
              {theaters.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500 py-4">
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

export default OwnerTheaterList;
