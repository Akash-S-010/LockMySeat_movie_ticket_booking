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
          className="w-full aspect-[3/4] object-cover rounded-t-lg"
          loading="lazy"
        />
      </figure>
      <div className="card-body p-3">
        <h2 className="card-title text-base font-bold">
          {movie.title}
        </h2>

        {movie.languages?.length > 0 && (
          <div className="mt-1">
            <p className="text-xs font-semibold text-gray-500">Languages:</p>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {movie.languages.map((lang, index) => (
                <span
                  key={index}
                  className="badge bg-transparent border border-primary text-primary text-[10px]"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {movie.genres?.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500">Genres:</p>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {movie.genres.map((genre, index) => (
                <span
                  key={index}
                  className="badge bg-transparent border border-primary text-primary text-[10px]"
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