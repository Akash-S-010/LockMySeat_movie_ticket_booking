import React from 'react'

const MovieDetailsSkeleton = () => {
    return (
      <div className="bg-base-100 min-h-screen animate-pulse px-6 py-2 sm:px-6 md:px-10 lg:px-20">
        {/* Hero Section */}
        <div className="relative bg-base-300 min-h-[500px] flex items-center justify-center w-full">
          <div className="absolute inset-0 bg-base-100"></div>
          <div className="relative container mx-auto px-6 py-2 flex flex-col md:flex-row gap-10 z-10 items-center">
            <div className="w-full md:w-1/5 h-80 bg-gray-500 rounded-lg"></div>
            <div className="w-full md:w-3/4">
              <div className="h-10 bg-gray-500 w-3/4 mb-4 rounded"></div>
              <div className="h-6 bg-gray-500 w-1/2 mb-4 rounded"></div>
              <div className="h-6 bg-gray-500 w-1/3 mb-6 rounded"></div>
              <div className="h-12 bg-gray-500 w-1/4 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Details Sections */}
        <div className="container mx-auto px-6 py-8">
          <div className="h-8 bg-gray-500 w-1/6 mb-6 rounded"></div>
          <div className="h-6 bg-gray-400 w-full mb-4 rounded"></div>
          <div className="h-6 bg-gray-400 w-5/6 mb-4 rounded"></div>
          <div className="h-6 bg-gray-400 w-3/4 mb-4 rounded"></div>
        </div>
        
        {/* Cast Skeleton */}
        <div className="container mx-auto px-6 py-20">
          <div className="h-8 bg-gray-500 w-1/6 mb-10 rounded"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="w-24 h-24 bg-gray-500 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default MovieDetailsSkeleton
