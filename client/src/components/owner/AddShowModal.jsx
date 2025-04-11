import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { Button } from "../ui/Buttons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddShowModal = ({ isOpen, onClose, onShowAdded }) => {
  const navigate = useNavigate();
  const [movieId, setMovieId] = useState("");
  const [theaterId, setTheaterId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [moviesRes, theatersRes] = await Promise.all([
          axiosInstance.get("/movie/movies"),
          axiosInstance.get("/theater/owner-theaters"),
        ]);
        setMovies(moviesRes.data.data || []);
        const approvedTheaters = theatersRes.data.data.filter(
          (theater) => theater.status === "approved"
        );
        setTheaters(approvedTheaters);
      } catch (err) {
        toast.error("Failed to load options");
        console.error("Error fetching options:", err);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dateTime) {
      toast.error("Please select date and time");
      return;
    }

    const combinedDateTime = new Date(dateTime);
    if (combinedDateTime < new Date()) {
      toast.error("Please provide a future date and time");
      return;
    }

    if (!ticketPrice || ticketPrice <= 0) {
      toast.error("Please enter a valid ticket price");
      return;
    }

    try {
      const response = await axiosInstance.post("/show/add-show", {
        movieId,
        theaterId,
        dateTime: combinedDateTime.toISOString(),
        ticketPrice: parseFloat(ticketPrice),
      });

      if (response.status === 201) {
        toast.success("Show added successfully!");
        onShowAdded(response.data.data); // Pass the new show data
        onClose(); 
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add show";
      toast.error(errorMessage);
      console.error("Error adding show:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open backdrop-blur-sm">
      <div className="modal-box">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-primary">ADD SHOW</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Movie</label>
            <select
              value={movieId}
              onChange={(e) => setMovieId(e.target.value)}
              className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              required
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Theater</label>
            <select
              value={theaterId}
              onChange={(e) => setTheaterId(e.target.value)}
              className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              required
            >
              <option value="">Select a theater</option>
              {theaters.map((theater) => (
                <option key={theater._id} value={theater._id}>
                  {theater.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Show Date and Time</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              required
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Ticket Price (₹)</label>
            <input
              type="number"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="modal-action">
            <Button
              title="Cancel"
              className="bg-black hover:bg-black"
              onClick={() => onClose()}
            />
            <Button title="Add Show" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShowModal;