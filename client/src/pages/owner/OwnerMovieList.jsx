import React, { useState } from "react";
import MovieListComponent from "../../components/shared/MovieListComponent.jsx";
import SearchBox from "../../components/shared/SearchBox.jsx";

const OwnerMovieList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen text-base">
      <div className="bg-base-300 p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-semibold">Movies</h1>
          <SearchBox 
            onSearch={handleSearch}
            placeholder="Search movies..."
          />
        </div>
        <MovieListComponent 
          showActions={false}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default OwnerMovieList;