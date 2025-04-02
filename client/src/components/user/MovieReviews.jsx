import React from "react";

const MovieReviews = ({ reviews }) => {
  return (
    <div className="container mx-auto px-6 py-10 sm:px-6 md:px-10 lg:px-20 mt-8 border-t border-base-300">
      <h2 className="text-3xl font-bold mb-6">User Reviews</h2>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-sm bg-base-300 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold base text-lg">
                  {review?.userId.name || "Anonymous"}
                </p>
                <p className="text-lg text-yellow-500 flex items-center gap-1">
                  <span>⭐</span>
                  {review?.rating ? `${review.rating}/5` : "N/A"}
                </p>
              </div>
              <p className="base text-sm leading-relaxed">
                {review?.comment || "No comment provided."}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No reviews yet.</p>
      )}
    </div>
  );
};

export default MovieReviews;