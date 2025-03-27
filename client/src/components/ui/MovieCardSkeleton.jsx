import React from "react";

const MovieCardSkeleton = () => {
  return (
    <div className="card w-full sm:max-w-[280px] bg-base-300 shadow-xl mx-auto">
      {/* Skeleton for the Image */}
      <figure>
        <div className="skeleton w-full aspect-[2/3] rounded-t-lg"></div>
      </figure>
      {/* Skeleton for the Card Body */}
      <div className="card-body p-4">
        {/* Skeleton for the Title */}
        <div className="skeleton h-6 w-3/4 mb-3"></div>
        {/* Skeleton for Languages */}
        <div className="mt-1">
          <div className="skeleton h-4 w-1/3 mb-1"></div>
          <div className="flex flex-wrap gap-2 mt-1">
            <div className="skeleton h-5 w-12"></div>
            <div className="skeleton h-5 w-12"></div>
          </div>
        </div>
        {/* Skeleton for Genres */}
        <div className="mt-1">
          <div className="skeleton h-4 w-1/3 mb-1"></div>
          <div className="flex flex-wrap gap-2 mt-1">
            <div className="skeleton h-5 w-12"></div>
            <div className="skeleton h-5 w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;