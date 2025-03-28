import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";

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
        if (err.response && err.response.status === 404) {
          setError("Movie not found.");
        } else {
          setError("Failed to fetch movie details. Please try again later.");
        }
      } finally {
        setMovieLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const fetchShowsByDate = async (date) => {
    try {
      setLoading(true);
      const formattedDate = date.toISOString().split("T")[0];
      const response = await axiosInstance.get(
        `/show/by-date?movieId=${movieId}&date=${formattedDate}`
      );
      setShows(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("No shows found for this date.");
      setShows([]);
      setLoading(false);
    }
  };

  const fetchShowsByLocation = async (location) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/show/by-location?location=${location}`
      );
      const allShows = response.data.data;
      const filteredShows = allShows.filter((show) => show.movieId === movieId);
      setShows(filteredShows);
      setLoading(false);
    } catch (err) {
      setError("No shows found for this location.");
      setShows([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowsByDate(selectedDate);
  }, [selectedDate, movieId]);

  const getNextFiveDays = () => {
    const days = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const days = getNextFiveDays();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLocationSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchShowsByLocation(location);
    }
  };

  const handleShowClick = (showId) => {
    navigate(`/user/seat-selection/${showId}`);
  };

  const groupShowsByTheater = () => {
    const grouped = {};
    shows.forEach((show) => {
      const theaterId = show.theaterId._id;
      if (!grouped[theaterId]) {
        grouped[theaterId] = {
          theater: show.theaterId,
          shows: [],
        };
      }
      grouped[theaterId].shows.push(show);
    });
    return Object.values(grouped);
  };

  const groupedShows = groupShowsByTheater();

  if (error && !movie)
    return (
      <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg shadow-md">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-base-100 mt-10">
      {/* Movie Title */}
      <h1 className="text-4xl font-extrabold font-base mb-6 text-center">
        {movieLoading
          ? "Loading Movie..."
          : movie
          ? movie.title
          : "Movie Not Found"}
      </h1>

      {/* Date Picker and Location Search */}
      <div className="mb-8 max-w-4xl mx-auto">
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateChange(day)}
              className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 cursor-pointer ${
                selectedDate.toDateString() === day.toDateString()
                  ? "bg-primary text-white"
                  : "bg-gray-700  text-white hover:bg-indigo-500 hover:text-white"
              }`}
            >
              <div className="text-sm font-semibold">
                {day.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <div className="text-xs">
                {day
                  .toLocaleDateString("en-US", { weekday: "short" })
                  .toUpperCase()}
              </div>
            </button>
          ))}
        </div>

        <form
          onSubmit={handleLocationSearch}
          className="flex justify-center gap-3"
        >
          <input
            type="text"
            placeholder="Search Location (e.g., MAHE)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input input-bordered w-full max-w-xs bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="btn  bg-primary hover:bg-indigo-700 border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Show Listings */}
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center text-gray-400 text-lg">
            <svg
              className="animate-spin h-8 w-8 mx-auto mb-2 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Loading shows...
          </div>
        ) : groupedShows.length > 0 ? (
          groupedShows.map((group, index) => (
            <div
              key={index}
              className="mb-6 p-6 bg-base-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold font-base mb-2">
                {group.theater.name}
              </h2>
              <p className="text-sm font-base mb-4">{group.theater.location}</p>
              <div className="flex gap-3 flex-wrap">
                {group.shows.map((show) => (
                  <button
                    key={show._id}
                    onClick={() => handleShowClick(show._id)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
                  >
                    {show.formattedTime}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 bg-gray-800 p-6 rounded-lg shadow-md">
            <svg
              className="h-12 w-12 mx-auto mb-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg">
              No shows available for this date or location.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowSelection;
