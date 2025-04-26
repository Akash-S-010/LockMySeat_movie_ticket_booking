import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/Buttons";
import toast from "react-hot-toast";

const SeatSelection = () => {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [theaterName, setTheaterName] = useState("");
  const [theaterLocation, setTheaterLocation] = useState("");
  const [showTime, setShowTime] = useState("");
  const [seatLayout, setSeatLayout] = useState({ rows: 0, columns: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/show/seats/${showId}`);
        const data = response.data;

        setSeats(data.seats || []);
        setTicketPrice(data.ticketPrice || 0);
        setMovieTitle(data.movieTitle || "Unknown Movie");
        setPoster(data.poster || "");
        setTheaterName(data.theaterName || "Unknown Theater");
        setTheaterLocation(data.theaterLocation || "Unknown Location");
        setShowTime(data.showTime || "Unknown Time");
        setSeatLayout(data.seatLayout || { rows: 10, columns: 10 });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch seats.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [showId]);

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;

    setSelectedSeats((prev) =>
      prev.includes(seat.id) ? prev.filter((s) => s !== seat.id) : [...prev, seat.id]
    );
  };

  const totalPrice = selectedSeats.length * ticketPrice;

  const handlePayment = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat.");
      return;
    }

    try {
      const response = await axiosInstance.post("/booking/create", {
        showId,
        selectedSeats,
        totalPrice,
      });

      const { bookingId } = response.data;

      navigate(`/user/payment/${showId}`, {
        state: { selectedSeats, totalPrice, bookingId, movieTitle, theaterName, theaterLocation, showTime, poster },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to initiate booking.");
    }
  };

  const rows = Array.from({ length: seatLayout.rows }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const columns = Array.from({ length: seatLayout.columns }, (_, i) => i + 1);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center py-10 px-6">
        <Loader2 size={40} className="animate-spin text-primary mb-4" />
        <p className="text-lg text-gray-400">Loading seats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg shadow-md h-screen">
        <AlertCircle size={32} className="mx-auto mb-2 text-red-500" />
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center py-12 px-5 sm:px-6 md:px-10 lg:px-20">
      {/* Movie and Show Details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 w-full gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{movieTitle}</h1>
          <p className="text-sm sm:text-base text-gray-400 mb-6">
            {theaterName}, {theaterLocation}, {showTime}
          </p>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Ticket Price</h1>
          <p className="text-md font-bold text-primary mb-6 text-center">
            {ticketPrice > 0 ? `₹ ${ticketPrice}` : "Free"}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <span className="text-sm sm:text-base">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-black rounded"></div>
            <span className="text-sm sm:text-base">Booked</span>
          </div>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="overflow-x-auto w-full max-w-full">
        <div
          className="grid gap-2 mb-6 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${seatLayout.columns}, minmax(40px, 1fr))`,
            maxWidth: `${seatLayout.columns * 50}px`,
          }}
        >
          {rows.map((row) =>
            columns.map((col) => {
              const seatId = `${row}${col}`;
              const seat = seats.find((s) => s.id === seatId) || {
                id: seatId,
                isBooked: false,
              };
              const isSelected = selectedSeats.includes(seatId);
              return (
                <button
                  key={seatId}
                  onClick={() => handleSeatClick(seat)}
                  className={`w-10 h-10 rounded-t-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    seat.isBooked
                      ? "bg-black text-white cursor-not-allowed"
                      : isSelected
                      ? "bg-primary text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-primary hover:text-white"
                  }`}
                >
                  {seatId}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Screen Image */}
      <img
        src="https://www.libertycinemas.in/assets/img/ss.svg"
        alt="screen"
        className="mt-4 w-full max-w-xs sm:max-w-md md:max-w-lg"
      />

      {/* Total and Payment Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between w-full md:w-1/2 mt-10 bg-base-200 p-6 rounded-lg">
        <div>
          <p className="text-lg font-semibold text-primary mb-2">TOTAL</p>
          <p className="text-2xl font-bold">₹ {totalPrice}</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-primary mb-2">SEATS</p>
          <p className="text-base font-bold">{selectedSeats.join(", ") || "None"}</p>
        </div>
        <Button
          title={`Pay ₹ ${totalPrice}`}
          className="w-full md:w-auto"
          onClick={handlePayment}
        />
      </div>
    </div>
  );
};

export default SeatSelection;