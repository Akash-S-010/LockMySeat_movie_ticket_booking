import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance.js";

const MovieListComponent = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await axiosInstance.get("/movie/movies");
          setLoading(false);
          setMovies(response.data.data);
        } catch (error) {
          console.error("Failed to fetch movies:", error);
          setLoading(false);
        }
      };
  
      fetchMovies();
    }, []);

    if (loading) {
      return <div className="min-h-screen">Loading...</div>;
    }

  return (
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
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={index} className="hover:bg-base-100">
              <td>
                <div className="avatar">
                  <div className="w-14 rounded-md">
                    <img src={movie.verticalImg} alt={movie.title} />
                  </div>
                </div>
              </td>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.releaseDate}</td>
              <td>{movie.language.join(", ")}</td>
              <td>{movie.duration}</td>               
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieListComponent;
