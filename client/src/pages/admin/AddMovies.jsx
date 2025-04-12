import React, { useState } from "react";
import { Button } from "../../components/ui/Buttons";
import MovieListComponent from "../../components/shared/MovieListComponent";
import AddMovieModal from "../../components/admin/AddMovieModal";

const AddMovies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Used to trigger MovieListComponent refresh

  const handleMovieAdded = () => {
    setRefreshKey((prev) => prev + 1); // Increment to trigger useEffect in MovieListComponent
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen text-base">
      <div className="bg-base-300 p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-semibold">Movies</h1>
          <Button
            title="Add Movie"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <MovieListComponent showActions={true} refreshKey={refreshKey} />
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