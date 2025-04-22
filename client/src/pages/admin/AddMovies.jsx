import React, { useState } from "react";
import { Button } from "../../components/ui/Buttons";
import MovieListComponent from "../../components/shared/MovieListComponent";
import AddMovieModal from "../../components/admin/AddMovieModal";
import SearchBox from "../../components/shared/SearchBox";

const AddMovies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Used to trigger MovieListComponent refresh
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleMovieAdded = () => {
    setRefreshKey((prev) => prev + 1); // Increment to trigger useEffect in MovieListComponent
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen text-base">
      <div className="bg-base-300 p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-semibold">Movies</h1>
          <div className="flex items-center gap-4">
            <SearchBox onSearch={handleSearch} placeholder="Search movies..." />
            <Button title="Add Movie" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
        <MovieListComponent showActions={true} refreshKey={refreshKey} searchTerm={searchTerm} />
      </div>
      <AddMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMovieAdded={handleMovieAdded}
      />
    </div>
  );
};

export default AddMovies;
