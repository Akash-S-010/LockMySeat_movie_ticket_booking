import React from 'react'
import MovieList from '../../components/user/MovieList'

const Movies = () => {
  return (
    <div className='px-6 py-2 sm:px-6 md:px-10 lg:px-20'>
      <MovieList page="movies"/>
    </div>
  )
}

export default Movies