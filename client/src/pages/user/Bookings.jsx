import {  useState } from "react";
import BookingSkeleton from "../../components/ui/BookingSkeletons";
import { Button } from "../../components/ui/Buttons";
import ReviewModal from "../../components/user/ReviewModal";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

const Bookings = () => {
  const { data, isLoading, error } = useFetch("/booking/all-bookings");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = Array.isArray(data) ? data : [];

  const handleAddReview = (booking) => {
    if (!booking.movieId) {
      console.error("No movieId found in booking:", booking);
      setError("Cannot add review: Movie ID missing");
      return;
    }
    setSelectedBooking(booking);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

  if (isLoading) return <BookingSkeleton />;
  if (error) toast.error(error);
  if (bookings.length === 0)
    return (
      <p className="text-center text-gray-500 text-lg font-medium mt-6 sm:mt-10">
        No bookings found.
      </p>
    );

  return (
    <div className="min-h-screen bg-base-100 text-base p-4 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center tracking-wide">
          Booking History
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 p-3 sm:p-4 bg-base-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={booking.moviePoster}
                alt={booking.movieName}
                className="w-20 h-28 sm:w-24 sm:h-34 object-cover rounded-lg shadow-md"
                loading="lazy"
              />
              <div className="flex-1 flex flex-col sm:flex-row justify-between items-start w-full">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1">
                    {booking.movieName}
                  </h3>
                  <div className="text-xs sm:text-sm text-gray-400 space-y-0.5">
                    <p>
                      <span className="font-medium text-gray-300">
                        Booking ID:
                      </span>{" "}
                      {booking.bookingId}
                    </p>
                    <p>
                      <span className="font-medium text-gray-300">
                        Theater:
                      </span>{" "}
                      {booking.theaterName}
                    </p>
                    <p>
                      <span className="font-medium text-gray-300">
                        Show Date:
                      </span>{" "}
                      {booking.showDate}
                    </p>
                    <p>
                      <span className="font-medium text-gray-300">
                        Show Time:
                      </span>{" "}
                      {booking.showTime}
                    </p>
                    <p>
                      <span className="font-medium text-gray-300">
                        Booked Seats:
                      </span>{" "}
                      {booking.bookedSeats.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0">
                  <Button
                    title="Add Review"
                    onClick={() => handleAddReview(booking)}
                    className="w-full sm:w-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBooking && (
        <ReviewModal
          isOpen={!!selectedBooking}
          onClose={handleCloseModal}
          movieId={selectedBooking.movieId}
          movieName={selectedBooking.movieName}
        />
      )}
    </div>
  );
};

export default Bookings;