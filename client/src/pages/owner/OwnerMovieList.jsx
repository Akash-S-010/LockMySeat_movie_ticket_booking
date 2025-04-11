import React from "react";
import MovieListComponent from "../../components/shared/MovieListComponent.jsx";

const OwnerMovieList = () => {

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
        <MovieListComponent showActions={false}/>
      </div>
    </div>
  );
};

export default OwnerMovieList;
