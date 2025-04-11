import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import dayjs from "dayjs";
import { Button } from "../../components/ui/Buttons";
import AddShowModal from "../../components/owner/AddShowModal";
import { useNavigate } from "react-router-dom";

const AddShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/show/all-shows");
        const activeShows = response.data.data.filter(
          (show) => show.status === "started" || show.status === "notStarted"
        );
        setShows(activeShows);
      } catch (err) {
        setError(err.data?.message || "Failed to fetch shows");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  const handleShowAdded = async (newShow) => {
    try {
      // Refetch shows after adding to ensure updated data
      const response = await axiosInstance.get("/show/all-shows");
      const activeShows = response.data.data.filter(
        (show) => show.status === "started" || show.status === "notStarted"
      );
      setShows(activeShows);
      setIsModalOpen(false); // Close modal after successful refetch
    } catch (err) {
      console.error("Failed to refetch shows:", err);
      // Optionally set error state or show a toast here if needed
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen text-base py-4">
      <div className="bg-base-300 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Active Shows</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-64"
            />
            <Button
              title="Add Show"
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary"
            />
          </div>
        </div>
        <AddShowModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onShowAdded={handleShowAdded}
        />
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-400 text-left">
                <th>Poster</th>
                <th>Movie Title</th>
                <th>Theater Name</th>
                <th>Show Date</th>
                <th>Show Time</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {shows.length > 0 ? (
                shows.map((show) => (
                  <tr key={show._id} className="hover:bg-base-100">
                    <td className="py-3">
                      <div className="w-12 h-16 rounded overflow-hidden">
                        <img
                          src={
                            show.movieId?.verticalImg || "placeholder-image-url"
                          }
                          alt={show.movieId?.title || "Poster"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 text-lg">
                      {show.movieId?.title || "N/A"}
                    </td>
                    <td className="py-3 text-lg">
                      {show.theaterId?.name || "N/A"}
                    </td>
                    <td className="py-3 text-lg">
                      {dayjs(show.dateTime).isValid()
                        ? dayjs(show.dateTime).format("MMMM D, YYYY")
                        : "N/A"}
                    </td>
                    <td className="py-3 text-lg">
                      {dayjs(show.dateTime).isValid()
                        ? dayjs(show.dateTime).format("h:mm A")
                        : "N/A"}
                    </td>
                    <td className="py-3 text-lg">
                      ₹ {show.ticketPrice || "0.00"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No active shows found.
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

export default AddShows;