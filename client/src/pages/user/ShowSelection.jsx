import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";
import { Search, Loader2, AlertCircle } from "lucide-react";

const ShowSelection = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [movieLoading, setMovieLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setMovieLoading(true);
        const response = await axiosInstance.get(
          `/movie/movie-details/${movieId}`
        );
        if (!response.data.data) {
          setError("Movie not found.");
          return;
        }
        setMovie(response.data.data);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again later.");
      } finally {
        setMovieLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const fetchShowsByDate = async (date) => {
    try {
      setLoading(true);
      // Format the date as YYYY-MM-DD in UTC
      const formattedDate = date.toISOString().split("T")[0]; // e.g., "2025-03-31"
      const response = await axiosInstance.get(
        `/show/by-date?movieId=${movieId}&date=${formattedDate}`
      );
      setShows(response.data.data);
    } catch (err) {
      setError("No shows found for this date.");
      setShows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowsByDate(selectedDate);
  }, [selectedDate, movieId]);

  const getNextFiveDays = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  const days = getNextFiveDays();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLocationSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchShowsByDate(selectedDate);
    }
  };

  const handleShowClick = (showId) => {
    navigate(`/user/seat-selection/${showId}`);
  };

  const groupedShows = shows.reduce((acc, show) => {
    const theaterId = show.theaterId._id;
    if (!acc[theaterId]) {
      acc[theaterId] = { theater: show.theaterId, shows: [] };
    }
    acc[theaterId].shows.push(show);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-base-100 mt-10">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        {movieLoading ? "Loading ..." : movie ? movie.title : "Movie Not Found"}
      </h1>

      <div className="mb-8 max-w-4xl mx-auto">
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateChange(day)}
              className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 cursor-pointer ${
                selectedDate.toDateString() === day.toDateString()
                  ? "bg-primary text-white"
                  : "bg-base-300 text-gray-500 hover:bg-primary hover:text-white"
              }`}
            >
              <div className="text-sm font-semibold">
                {day.toLocaleDateString("en-US", { day: "numeric", month: "short" })}
              </div>
              <div className="text-xs">
                {day.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}
              </div>
            </button>
          ))}
        </div>

        <form onSubmit={handleLocationSearch} className="flex justify-center gap-3">
          <input
            type="text"
            placeholder="Search Location (e.g., MAHE)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input input-bordered w-full max-w-xs bg-base-300 text-white placeholder-gray-500 border-gray-600"
          />
          <button type="submit" className="btn bg-primary hover:bg-primaryHover border-none">
            <Search size={20} className="text-white" />
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center text-gray-400 text-lg">
            <Loader2 size={32} className="animate-spin mx-auto mb-2 text-primary" />
            Loading shows...
          </div>
        ) : Object.values(groupedShows).length > 0 ? (
          Object.values(groupedShows).map((group, index) => (
            <div key={index} className="mb-6 p-6 bg-base-300 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">{group.theater.name}</h2>
              <p className="text-sm mb-4">{group.theater.location}</p>
              <div className="flex gap-3 flex-wrap">
                {group.shows.map((show) => (
                  <button
                    key={show._id}
                    onClick={() => handleShowClick(show._id)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-rose-500 transition cursor-pointer"
                  >
                    {show.formattedTime}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 bg-base-300 p-6 rounded-lg">
            <AlertCircle size={32} className="mx-auto mb-4 text-gray-500" />
            <p className="text-lg">No shows available for this date or location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowSelection;
