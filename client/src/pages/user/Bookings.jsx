// Bookings.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import BookingSkeleton from "../../components/ui/BookingSkeletons";
import { Button } from "../../components/ui/Buttons";
import ReviewModal from "../../components/user/ReviewModal";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("/booking/all-bookings");
        setBookings(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

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

  if (loading) return <BookingSkeleton />;
  if (error)
    return (
      <p className="text-center text-red-500 text-lg font-medium mt-10">
        {error}
      </p>
    );
  if (bookings.length === 0)
    return (
      <p className="text-center text-gray-500 text-lg font-medium mt-10">
        No bookings found.
      </p>
    );

  return (
    <div className="min-h-screen bg-base-100 text-base p-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center tracking-wide">
          Booking History
        </h2>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="flex items-center gap-5 p-4 bg-base-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={booking.moviePoster}
                alt={booking.movieName}
                className="w-24 h-34 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1 flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary mb-1">
                    {booking.movieName}
                  </h3>
                  <div className="text-sm text-gray-400 space-y-0.5">
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
                <div className="my-auto">
                  <Button
                    title="Add Review"
                    onClick={() => handleAddReview(booking)}
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