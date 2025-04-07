import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import {Button} from "../../components/ui/Buttons";
import { useNavigate } from "react-router-dom";

const OwnerMovieList = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen text-base">
      <div className="bg-base-300 p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-semibold">Movies</h1>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-64"
          />
        </div>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => (
                <tr key={index} className="hover:bg-base-100">
                  <td>
                    <div className="avatar">
                      <div className="w-14 rounded-md">
                        <img 
                          src={movie.verticalImg}
                          alt={movie.title}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.releaseDate}</td>
                  <td>{movie.language}</td>
                  <td>{movie.duration}</td>
                  <td>
                    <Button title="Add show" onClick={() => navigate('/owner/shows')} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerMovieList;
