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
  const [theaterName, setTheaterName] = useState("");
  const [theaterLocation, setTheaterLocation] = useState("");
  const [showTime, setShowTime] = useState("");
  const [seatLayout, setSeatLayout] = useState({ rows: 0, columns: 0 }); // Dynamic seat layout
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch seats and show details
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/show/seats/${showId}`);
        const data = response.data;

        setSeats(data.seats || []);
        setTicketPrice(data.ticketPrice || 0);
        setMovieTitle(data.movieTitle || "Unknown Movie");
        setTheaterName(data.theaterName || "Unknown Theater");
        setTheaterLocation(data.theaterLocation || "Unknown Location");
        setShowTime(data.showTime || "Unknown Time");
        setSeatLayout(data.seatLayout || { rows: 10, columns: 10 }); // Default to 10x10 if no layout
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch seats.");
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [showId]);

  // Handle seat selection
  const handleSeatClick = (seat) => {
    if (seat.isBooked) return; // Can't select booked seats

    setSelectedSeats((prev) => {
      if (prev.includes(seat.id)) {
        return prev.filter((s) => s !== seat.id); // Deselect seat
      } else {
        return [...prev, seat.id]; // Select seat
      }
    });
  };

  // Calculate total price
  const totalPrice = selectedSeats.length * ticketPrice;

  // Handle payment
  const handlePayment = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat.");
      return;
    }

    navigate(`/user/payment/${showId}`, { state: { selectedSeats, totalPrice } });
  };

  // Generate seat grid dynamically based on seatLayout
  const rows = Array.from({ length: seatLayout.rows }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // A, B, C, ..., based on rows
  const columns = Array.from({ length: seatLayout.columns }, (_, i) => i + 1); // 1, 2, 3, ..., based on columns

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center py-10 px-6 sm:px-6 md:px-10 lg:px-20">
        <Loader2 size={40} className="animate-spin text-primary mb-4" />
        <p className="text-lg text-gray-400">Loading seats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg shadow-md">
        <AlertCircle size={32} className="mx-auto mb-2 text-red-500" />
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center py-10 px-6 py-2 sm:px-6 md:px-10 lg:px-20">
      {/* Movie and Show Details */}
      <div className="flex justify-between items-center mb-6 w-full">
        <div>
          {/* Movie Title */}
          <h1 className="text-3xl font-bold base mb-2">{movieTitle}</h1>
          <p className="text-sm text-gray-400 mb-6">
            {theaterName}, {theaterLocation}, {showTime}
          </p>
        </div>

        {/* Seat Status Legend */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <span className="text-base">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-black rounded"></div>
            <span className="text-base">Booked</span>
          </div>
        </div>
      </div>

      {/* Seat Grid */}
      <div
        className="grid gap-2 mb-6 "
        style={{
          gridTemplateColumns: `repeat(${seatLayout.columns}, minmax(0, 1fr))`,
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
                className={`w-10 h-10 rounded text-sm font-semibold transition-colors cursor-pointer ${
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

      {/* Screen Indicator */}
      <img
        src="https://www.libertycinemas.in/assets/img/ss.svg"
        alt="screen"
        className="mt-4"
      />

      {/* Total and Payment */}
      <div className="flex items-center gap-6 justify-between w-1/2 mt-10">
        <div>
          <p className="text-lg font-semibold text-primary mb-3">TOTAL</p>
          <p className="text-2xl font-bold base">
            ₹ <span className="base">{totalPrice}</span>
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-primary mb-3">SEATS</p>
          <p className="text-lg base font-bold">
            {selectedSeats.join(", ") || "None"}
          </p>
        </div>
        <Button
          title={`Pay ₹ ${totalPrice}`}
          className="w-[150px]"
          onClick={handlePayment}
        />
      </div>
    </div>
  );
};

export default SeatSelection;
