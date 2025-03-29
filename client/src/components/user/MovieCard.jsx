import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/movie-details/${movie.id}`);
  };

  return (
    <div
      className="card w-full sm:max-w-[280px] bg-base-300 hover:scale-102 transition cursor-pointer shadow-xl mx-auto"
      onClick={handleClick}
    >
      <figure>
        <img
          src={movie.verticalImg}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover rounded-t-lg"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold">
          {movie.title}
        </h2>

        {movie.languages?.length > 0 && (
          <div className="mt-1">
            <p className="text-sm font-semibold text-gray-500">Languages:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {movie.languages.map((lang, index) => (
                <span
                  key={index}
                  className="badge bg-transparent border border-primary text-primary text-xs"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {movie.genres?.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-500">Genres:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {movie.genres.map((genre, index) => (
                <span
                  key={index}
                  className="badge bg-transparent border border-primary text-primary text-xs"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;