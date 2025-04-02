const BookingSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base p-6">
      <div className="max-w-4xl mx-auto">
        <div className="skeleton h-10 w-1/3 mx-auto mb-6 rounded-lg"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-base-300 rounded-xl shadow-lg"
            >
              <div className="skeleton w-20 h-28 rounded-lg"></div>
              <div className="flex-1 flex justify-between items-start">
                <div className="flex-1 space-y-0.5">
                  <div className="skeleton h-6 w-1/3 rounded"></div>
                  <div className="skeleton h-4 w-2/3 rounded"></div>
                  <div className="skeleton h-4 w-1/2 rounded"></div>
                  <div className="skeleton h-4 w-1/2 rounded"></div>
                  <div className="skeleton h-4 w-1/2 rounded"></div>
                  <div className="skeleton h-4 w-1/3 rounded"></div>
                </div>
                <div className="skeleton h-10 w-32 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingSkeleton;