import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";

const ShowSelectionPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [shows, setShows] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate the next 5 days for selection
  useEffect(() => {
    const today = new Date();
    const nextFiveDays = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });
    setDates(nextFiveDays);
  }, []);

  // Fetch shows based on selected date and movie ID
  const fetchShowsByDate = async (date) => {
    setLoading(true);
    setError(null);

    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await axiosInstance.get("/api/show/by-date", {
        params: { movieId, date: formattedDate },
      });

      if (response.data?.data) {
        setShows(response.data.data);
      } else {
        setShows([]);
        setError("No shows found for this date.");
      }
    } catch (err) {
      console.error("Error fetching shows:", err);
      setError("Failed to fetch shows for the selected date.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch shows when selectedDate or movieId changes
  useEffect(() => {
    if (movieId) {
      fetchShowsByDate(selectedDate);
    }
  }, [selectedDate, movieId]);

  // Fetch shows based on location search
  const handleLocationSearch = async () => {
    if (!location.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/api/show/by-location", {
        params: { location },
      });

      if (response.data?.data) {
        const filteredShows = response.data.data.filter((show) => show.movieId === movieId);
        setShows(filteredShows);
      } else {
        setShows([]);
        setError("No shows found for this location.");
      }
    } catch (err) {
      console.error("Error fetching shows by location:", err);
      setError("Failed to fetch shows for the selected location.");
    } finally {
      setLoading(false);
    }
  };

  // Group shows by theater
  const groupShowsByTheater = () => {
    return shows.reduce((acc, show) => {
      const theaterId = show?.theaterId?._id || show?.theaterId;
      if (!theaterId) return acc;

      if (!acc[theaterId]) {
        acc[theaterId] = {
          theater: show.theaterId,
          showTimes: [],
        };
      }
      acc[theaterId].showTimes.push(show);
      return acc;
    }, {});
  };

  // Navigate to seat selection page
  const handleTimeClick = (showId) => {
    navigate(`/user/seat-selection/${showId}`);
  };

  // Format date for display (e.g., "21 Oct Mon")
  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      weekday: "short",
    });
  };

  return (
    <div className="mx-auto min-h-screen mt-10 px-4">
      <h1 className="font-bold text-3xl mb-6">Select Show</h1>

      {/* Date Selection */}
      <div className="mb-6">
        <h2 className="font-semibold text-xl mb-2">Movie Name</h2>
        <div className="flex gap-2">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
              className={`btn btn-outline ${
                selectedDate.toDateString() === date.toDateString() ? "btn-primary" : ""
              }`}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>
      </div>

      {/* Location Search */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <button onClick={handleLocationSearch} className="btn btn-primary">
            🔍
          </button>
        </div>
      </div>

      {/* Show Listings Grouped by Theater */}
      {loading ? (
        <div className="text-center text-gray-500">Loading shows...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : shows.length === 0 ? (
        <div className="text-center text-gray-500">No shows available for this date.</div>
      ) : (
        Object.values(groupShowsByTheater()).map((group, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <h2 className="font-semibold text-xl mb-2">{group.theater?.name || "Unknown Theater"}</h2>
            <p className="text-gray-500 mb-2">{group.theater?.location || "Unknown Location"}</p>
            <div className="flex flex-wrap gap-2">
              {group.showTimes.map((show) => (
                <button
                  key={show._id}
                  onClick={() => handleTimeClick(show._id)}
                  className="btn btn-outline btn-sm"
                >
                  {show.formattedTime || "No Time Available"}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowSelectionPage;
