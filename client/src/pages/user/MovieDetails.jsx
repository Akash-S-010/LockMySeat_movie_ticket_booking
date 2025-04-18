import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieDetailsSkeleton from "../../components/ui/MovieDetailsSkeleton";
import MovieReviews from "../../components/user/MovieReviews";
import {Button} from "../../components/ui/Buttons";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, isLoading, error } = useFetch(`/movie/movie-details/${id}`);

  if (isLoading) return <MovieDetailsSkeleton />;
  if (error) return <div className="text-center text-red-500">Failed to fetch movie details.</div>;
  if (!movie) toast.error("Movie not found.");

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Banner Section */}
      <div className="relative bg-black min-h-[500px] flex items-center justify-center overflow-hidden w-full">
        <div className="absolute inset-0">
          <img
            src={movie?.bannerImg || "/placeholder.jpg"}
            alt={movie?.title || "Movie Banner"}
            className="w-full h-full object-cover opacity-18"
            loading="lazy"
          />
        </div>

        {/* Centered Content */}
        <div className="relative container mx-auto px-6 py-2 sm:px-6 md:px-10 lg:px-20 flex flex-col md:flex-row gap-10 z-2 items-center">
          {/* Movie Poster */}
          <div className="w-full md:w-1/5">
            <img
              src={movie?.verticalImg || "/placeholder.jpg"}
              alt={movie?.title || "Movie Poster"}
              className="w-full rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Movie Details */}
          <div className="w-full md:w-3/4 text-white text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-7">
              {movie?.title || "Unknown Title"}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <span className="text-lg bg-white px-2 text-black rounded">
                {movie?.language?.join(", ") || "N/A"}
              </span>
            </div>
            <p className="text-lg text-gray-300 mb-7">
              {movie?.duration || "N/A"} • {movie?.genre?.join(", ") || "N/A"} •{" "}
              {movie?.releaseDate
                ? new Date(movie.releaseDate).toDateString()
                : "N/A"}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 pb-10">
              <Button
                title="Book Tickets"
                className="w-42 h-12 text-lg"
                onClick={() => navigate(`/user/show-selection/${id}`)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* About the Movie Section */}
      <div className="container mx-auto px-6 py-8 sm:px-6 md:px-10 lg:px-20 mt-8 border-b border-base-300">
        <h2 className="text-3xl font-bold mb-4">About the Movie</h2>
        <p className="text-gray-400 leading-relaxed">
          {movie?.plot || "No description available."}
        </p>
      </div>

      {/* Crew Section */}
      <div className="container mx-auto px-6 py-8 sm:px-6 md:px-10 lg:px-20 mt-8">
        <h2 className="text-3xl font-bold mb-6">Cast & Crew</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movie?.cast?.length > 0 ? (
            movie.cast.map((actor, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-base-300 flex items-center justify-center text-center px-2 text-sm font-semibold shadow-md">
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
      <MovieReviews reviews={movie?.reviews || []} />
    </div>
  );
};

export default MovieDetails;
