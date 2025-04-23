import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";
import { Loader2, AlertCircle } from "lucide-react";
import SearchBox from "../../components/shared/SearchBox.jsx";

const ShowSelection = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [loading, setLoading] = useState(true);
  const [movieLoading, setMovieLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setMovieLoading(true);
        const response = await axiosInstance.get(`/movie/movie-details/${movieId}`);
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

  useEffect(() => {
    const fetchShowsByDate = async () => {
      try {
        setLoading(true);
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await axiosInstance.get(`/show/by-date?movieId=${movieId}&date=${formattedDate}`);
        setShows(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "No shows found for this date.");
        setShows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchShowsByDate();
  }, [selectedDate, movieId]);

  const getNextFiveDays = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  const days = getNextFiveDays();

  const handleDateChange = (date) => setSelectedDate(date);

  const handleShowClick = (showId) => navigate(`/user/seat-selection/${showId}`);

  // Handle search term updates from SearchBox
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Group and filter shows by theater and search term
  const groupedShows = shows.reduce((acc, show) => {
    const theaterId = show.theaterId._id;
    const theaterLocation = show.theaterId.location.toLowerCase();
    if (
      !searchTerm ||
      theaterLocation.includes(searchTerm.toLowerCase())
    ) {
      if (!acc[theaterId]) {
        acc[theaterId] = { theater: show.theaterId, shows: [] };
      }
      acc[theaterId].shows.push(show);
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-base-100 mt-6 sm:mt-10">
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-center">
        {movieLoading ? "Loading ..." : movie ? movie.title : "Movie Not Found"}
      </h1>

      <div className="mb-6 sm:mb-8 max-w-4xl mx-auto px-4 sm:px-0">
        <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateChange(day)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md transition-all duration-300 cursor-pointer ${
                selectedDate.toDateString() === day.toDateString()
                  ? "bg-primary text-white"
                  : "bg-base-300 text-gray-500 hover:bg-primary hover:text-white"
              }`}
            >
              <div className="text-xs sm:text-sm font-semibold">
                {day.toLocaleDateString("en-US", { day: "numeric", month: "short" })}
              </div>
              <div className="text-xs">
                {day.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <SearchBox
            onSearch={handleSearch}
            placeholder="Search location eg: thalasserry..."
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-0">
        {loading ? (
          <div className="text-center text-gray-400 text-base sm:text-lg">
            <Loader2 size={24} className="animate-spin mx-auto mb-2 text-primary sm:w-8 sm:h-8" />
            Loading shows...
          </div>
        ) : error ? (
          <div className="text-center text-gray-400 bg-base-300 p-4 sm:p-6 rounded-lg">
            <AlertCircle size={24} className="mx-auto mb-2 sm:mb-4 text-gray-500 sm:w-8 sm:h-8" />
            <p className="text-base sm:text-lg">{error}</p>
          </div>
        ) : Object.values(groupedShows).length > 0 ? (
          Object.values(groupedShows).map((group, index) => (
            <div key={index} className="mb-4 sm:mb-6 p-4 sm:p-6 bg-base-300 rounded-lg shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{group.theater.name}</h2>
              <p className="text-xs sm:text-sm mb-2 sm:mb-4">{group.theater.location}</p>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                {group.shows.map((show) => (
                  <button
                    key={show._id}
                    onClick={() => handleShowClick(show._id)}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-white rounded-lg hover:bg-rose-500 transition cursor-pointer text-sm sm:text-base"
                  >
                    {show.formattedTime}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 bg-base-300 p-4 sm:p-6 rounded-lg">
            <AlertCircle size={24} className="mx-auto mb-2 sm:mb-4 text-gray-500 sm:w-8 sm:h-8" />
            <p className="text-base sm:text-lg">
              {searchTerm
                ? "No shows available for this location."
                : "No shows available for this date or location."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowSelection;