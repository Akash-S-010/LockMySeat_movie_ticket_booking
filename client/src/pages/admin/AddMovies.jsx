import React from 'react'
import {Button} from "../../components/ui/Buttons";
import MovieListComponent from '../../components/shared/MovieListComponent';

const AddMovies = () => {
  return (
    <div className="min-h-screen text-base">
      <div className="bg-base-300 p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-semibold">Movies</h1>
          <Button title="Add Movie" />
        </div>
        <MovieListComponent/>
      </div>
    </div>
  )
}

export default AddMovies
