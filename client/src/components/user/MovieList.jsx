import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "../ui/MovieCardSkeleton"; 

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get("/movie/movies");
        const movieData = response.data.data.map((movie) => ({
          id: movie._id,
          title: movie.title,
          verticalImg: movie.verticalImg,
          languages: Array.isArray(movie.language)
            ? movie.language
            : [movie.language],
          genres: Array.isArray(movie.genre) ? movie.genre : [movie.genre],
        }));
        setMovies(movieData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="mx-auto min-h-screen mt-10 px-4">
      <h1 className="font-bold text-3xl mb-6">Now Showing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? // Render skeletons while loading
            Array(4)
              .fill(0)
              .map((_, index) => <MovieCardSkeleton key={index} />)
          : // Render actual movie cards once loaded
            movies.map((movie) => (
              <MovieCard key={movie.id || movie._id} movie={movie} />
            ))}
      </div>
      <div className="text-center mt-8">
        <button className="btn btn-outline btn-error">Load More</button>
      </div>
    </div>
  );
};

export default MoviesList;