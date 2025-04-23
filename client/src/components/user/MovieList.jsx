import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "../ui/MovieCardSkeleton";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Buttons";
import MovieFilter from "./MovieFilter";
import toast from "react-hot-toast";

const MovieList = ({ page }) => {
  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ language: "", genre: "" });
  const moviesPerPage = page === "home" ? 4 : 8;

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get("/movie/movies", {
          params: {
            limit: page === "home" ? 4 : undefined,
            language: filters.language || undefined,
            genre: filters.genre || undefined,
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

        if (movieData.length === 0 && (filters.language || filters.genre)) {
          // Only show toast and reset if a filter was applied
          toast.error(
            "No movies found for selected filters."
          );
          setFilters({ language: "", genre: "" });
          return;
        }

        setMovies(movieData);
        setDisplayedMovies(
          page === "home" ? movieData : movieData.slice(0, moviesPerPage)
        );
        setCurrentPage(1);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err.response?.status === 404 && (filters.language || filters.genre)
            ? "No movies found for the selected filters. Showing all movies."
            : "Failed to fetch movies. Please try again.";
        toast.error(errorMessage);
        if (err.response?.status !== 404 || !(filters.language || filters.genre)) {
          setError(errorMessage); // Set error only for non-404 or no filters
        } else {
          setFilters({ language: "", genre: "" }); // Reset filters for 404 with filters
        }
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, filters]);

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
        <h1 className="font-bold text-3xl">
          {page === "movies" ? "All Movies" : "Latest Movies"}
        </h1>
        {page === "home" ? (
          <Link
            to="/all-movies"
            className="text-primary text-sm lg:text-lg hover:scale-105 transition"
          >
            View More →
          </Link>
        ) : null}
      </div>
      {page === "movies" && (
        <MovieFilter onFilterChange={handleFilterChange} selectedFilters={filters} />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
        {loading ? (
          Array(moviesPerPage)
            .fill(0)
            .map((_, index) => <MovieCardSkeleton key={index} />)
        ) : displayedMovies.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No movies found.
          </div>
        ) : (
          displayedMovies.map((movie) => (
            <MovieCard
              key={movie.id || movie._id}
              movie={movie}
              className="w-full max-w-sm mx-auto"
            />
          ))
        )}
      </div>
      {page === "movies" &&
        displayedMovies.length < movies.length &&
        displayedMovies.length > 0 && (
          <div className="text-center">
            <Button title="Show More" onClick={handleShowMore} />
          </div>
        )}
    </div>
  );
};

export default MovieList;