import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axiosInstance.get(`/movie/movie-details/${id}`);
        setMovie(response.data.data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="relative bg-black min-h-[500px] flex items-center justify-center overflow-hidden w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={movie?.bannerImg || "/placeholder.jpg"}
            alt={movie?.title || "Movie Banner"}
            className="w-full h-full object-cover opacity-18"
          />
        </div>

        {/* Centered Content */}
        <div className="relative container mx-auto px-6 py-2 sm:px-6 md:px-10 lg:px-20 flex flex-col md:flex-row  gap-10 z-10 items-center">
          {/* Movie Poster */}
          <div className="w-full md:w-1/5">
            <img
              src={movie?.verticalImg || "/placeholder.jpg"}
              alt={movie?.title || "Movie Poster"}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="w-full md:w-3/4 text-white text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-7">
              {movie?.title || "Unknown Title"}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <span className="text-lg text-gray-300">
                {movie?.language?.join(", ") || "N/A"}
              </span>
            </div>
            <p className="text-lg text-gray-300 mb-7">
              {movie?.duration || "N/A"} • {movie?.genre?.join(", ") || "N/A"} •{" "}
              {movie?.releaseDate
                ? new Date(movie.releaseDate).toDateString()
                : "N/A"}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <button
                className="bg-primary cursor-pointer font-semibold px-10 py-3 rounded-lg"
                onClick={() => navigate(`/user/show-selection/${id}`)}
              >
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About the Movie Section */}
      <div className="container mx-auto px-6 py-2 sm:px-6 md:px-10 lg:px-20 mt-8">
        <h2 className="text-3xl font-bold text-base mb-4">About the Movie</h2>
        <p className="text-gray-400 leading-relaxed">
          {movie?.plot || "No description available."}
        </p>
      </div>

      {/* Cast & Crew Section */}
      <div className="container mx-auto px-6 py-2 sm:px-6 md:px-10 lg:px-20 mt-8">
        <h2 className="text-3xl font-bold mb-6">Cast & Crew</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movie?.cast?.length > 0 ? (
            movie.cast.map((actor, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-base-300 text-base flex items-center justify-center text-center px-2 text-sm font-semibold shadow-md">
                  {actor}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No cast information available.</p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-6 py-2 sm:px-6 md:px-10 lg:px-20 mt-8">
        <h2 className="text-3xl font-bold text-base mb-6">User Reviews</h2>
        {movie?.reviews?.length > 0 ? (
          <div className="space-y-6">
            {movie.reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-sm bg-white"
              >
                <p className="font-bold text-gray-800">
                  {review?.user || "Anonymous"}
                </p>
                <p className="text-sm text-gray-500">
                  ⭐ {review?.rating ? `${review.rating}/5` : "N/A"}
                </p>
                <p className="mt-2 text-gray-600">
                  {review?.comment || "No comment provided."}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
