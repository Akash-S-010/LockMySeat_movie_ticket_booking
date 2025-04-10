import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import EditMovieModal from "../admin/EditMovieModal.jsx";
import Swal from 'sweetalert2';

const MovieListComponent = ({ showActions = false }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axiosInstance.get("/movie/movies");
      setMovies(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
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
      Swal.fire("Updated!", "Movie Updated successfully", "success");
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen">Loading...</div>;
  }

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
            {movies.map((movie) => (
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
                      className="btn btn-sm btn-warning mr-2"
                      onClick={() => setSelectedMovie(movie)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
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
