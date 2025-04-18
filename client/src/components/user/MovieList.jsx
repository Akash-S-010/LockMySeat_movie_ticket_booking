import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "../ui/MovieCardSkeleton";
import { Link } from "react-router-dom";
import {Button} from "../../components/ui/Buttons";

const MovieList = ({ page }) => {
  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = page === "home" ? 4 : 8;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get("/movie/movies", {
          params: {
            limit: page === "home" ? 4 : undefined, // Fetch only 4 for home page
          },
        });
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
        setDisplayedMovies(
          page === "home" ? movieData : movieData.slice(0, moviesPerPage)
        );
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = currentPage * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const newMovies = movies.slice(0, endIndex);
    setDisplayedMovies(newMovies);
    setCurrentPage(nextPage);
  };

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="mx-auto min-h-screen my-10 px-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-3xl mb-6">
          {page === "movies" ? "All Movies" : "Latest Movies"}
        </h1>
        {page === "home" ? (
          <Link to="/all-movies" className="text-primary text-lg hover:scale-105 transition">
            View More →
          </Link>
        ) : null}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
        {loading
          ? Array(moviesPerPage)
              .fill(0)
              .map((_, index) => <MovieCardSkeleton key={index} />)
          : displayedMovies.map((movie) => (
              <MovieCard key={movie.id || movie._id} movie={movie} />
            ))}
      </div>
      {page === "movies" && displayedMovies.length < movies.length && (
        <div className="text-center">
          <Button title="Show More" onClick={handleShowMore} />
        </div>
      )}
    </div>
  );
};

export default MovieList;