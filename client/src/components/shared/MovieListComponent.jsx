import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import EditMovieModal from "../admin/EditMovieModal.jsx";
import Swal from "sweetalert2";
import { MovieListSkeleton } from "./DashboardSkeletons.jsx";

const MovieListComponent = ({ showActions = false, refreshKey, searchTerm = '' }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, [refreshKey]); // Re-fetch when refreshKey changes

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/movie/movies");
      setMovies(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // ------ Delete Movie -----
  const handleDelete = async (movie) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this movie?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/movie/delete-movie/${movie._id}`);
          setMovies(movies.filter((m) => m._id !== movie._id));
          Swal.fire("Deleted!", "Movie deleted successfully", "success");
        } catch (error) {
          console.error("Failed to delete movie:", error);
          Swal.fire("Error!", "Failed to delete movie", "error");
        }
      }
    });
  };

  //-------- Update Movie -----
  const handleUpdate = async (updatedMovie) => {
    try {
      const response = await axiosInstance.put(
        `/movie/update-movie/${selectedMovie._id}`,
        updatedMovie
      );
      setMovies(
        movies.map((m) =>
          m._id === selectedMovie._id ? response.data.data : m
        )
      );
      setSelectedMovie(null);
      Swal.fire("Updated!", "Movie updated successfully", "success");
    } catch (error) {
      console.error("Failed to update movie:", error);
      Swal.fire("Error!", "Failed to update movie", "error");
    }
  };

  if (loading) {
    return <MovieListSkeleton />;
  }

  // Filter movies based on searchTerm
  const filteredMovies = movies.filter(movie =>
    movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-gray-400">
              <th>Poster</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Release Date</th>
              <th>Language</th>
              <th>Duration (Min)</th>
              {showActions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredMovies.length === 0 ? (
              <tr>
                <td colSpan={showActions ? 7 : 6} className="text-center py-4">
                  No movies found.
                </td>
              </tr>
            ) : (
              filteredMovies.map((movie) => (
                <tr key={movie._id} className="hover:bg-base-100">
                  <td>
                    <div className="avatar">
                      <div className="w-14 rounded-md">
                        <img src={movie.verticalImg} alt={movie.title} />
                      </div>
                    </div>
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.genre.join(", ")}</td>
                  <td>{movie.releaseDate}</td>
                  <td>{movie.language.join(", ")}</td>
                  <td>{movie.duration}</td>
                  {showActions && (
                    <td>
                      <button
                        className="btn btn-sm btn-warning mr-2 w-16"
                        onClick={() => setSelectedMovie(movie)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600 w-16"
                        onClick={() => handleDelete(movie)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedMovie && (
        <EditMovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default MovieListComponent;