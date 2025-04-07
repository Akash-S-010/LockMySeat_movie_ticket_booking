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
        const response = await axiosInstance.get("/show/all-shows");
        const activeShows = response.data.data.filter(
          (show) => show.status === "started" || show.status === "notStarted"
        );
        setShows(activeShows);
      } catch (err) {
        setError(err.data.message || "Failed to fetch shows");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  const handleShowAdded = (newShow) => {
    setShows((prevShows) => [newShow, ...prevShows]);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto bg-base-100 text-base min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Active Shows</h1>
        <Button title="Add Show" onClick={() => setIsModalOpen(true)} />
      </div>
      <AddShowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShowAdded={handleShowAdded}
      />
      <table className="w-full bg-base-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-base-300">
            <th className="p-2 text-left">Poster</th>
            <th className="p-2 text-left">Movie Title</th>
            <th className="p-2 text-left">Theater Name</th>
            <th className="p-2 text-left">Show Date</th>
            <th className="p-2 text-left">Show Time</th>
            <th className="p-2 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {shows.length > 0 ? (
            shows.map((show) => (
              <tr key={show._id} className="border-b border-gray-700">
                <td className="p-2">
                  <div className="w-16 h-16 bg-gray-600 rounded-full overflow-hidden">
                    <img
                      src={show.movieId.verticalImg || "placeholder-image-url"}
                      alt={show.movieId.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-2">{show.movieId.title || "N/A"}</td>
                <td className="p-2">{show.theaterId.name || "N/A"}</td>
                <td className="p-2">
                  {dayjs(show.dateTime).isValid()
                    ? dayjs(show.dateTime).format("MMMM D, YYYY")
                    : "N/A"}
                </td>
                <td className="p-2">
                  {dayjs(show.dateTime).isValid()
                    ? dayjs(show.dateTime).format("h:mm A")
                    : "N/A"}
                </td>
                <td className="p-2">₹ {show.ticketPrice || "0.00"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-2 text-center text-gray-400">
                No active shows
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddShows;