import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import { TheaterSkeleton } from "../../components/shared/DashboardSkeletons";
import SearchBox from "../../components/shared/SearchBox.jsx";

const OwnerTheaterList = () => {
  const { data, isLoading, error } = useFetch("/theater/owner-theaters");
  const [searchTerm, setSearchTerm] = useState('');

  const theaters = Array.isArray(data) ? data : [];

  const filteredTheaters = theaters.filter(theater =>
    theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theater.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (error) {
    toast.error(error.message || "Failed to fetch theaters");
  }

  if (isLoading) {
    return <TheaterSkeleton />;
  }

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
          <h1 className="text-2xl font-semibold">My Theaters</h1>
          <SearchBox 
            onSearch={handleSearch}
            placeholder="Search theaters..."
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
              {filteredTheaters.map((theater, index) => (
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
              {filteredTheaters.length === 0 && (
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