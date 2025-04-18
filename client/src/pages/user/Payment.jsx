import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";
import { Button } from "../../components/ui/Buttons";
import toast from "react-hot-toast";

const Payment = () => {
  const { showId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    selectedSeats,
    totalPrice,
    bookingId,
    movieTitle,
    theaterName,
    theaterLocation,
    showTime,
    poster,
  } = state || {};

  // Redirect if required data is missing
  useEffect(() => {
    if (!selectedSeats || !totalPrice || !bookingId) {
      toast.error("Invalid payment details.");
      navigate(`/user/seat-selection/${showId}`);
    }
  }, [selectedSeats, totalPrice, bookingId, navigate, showId]);

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle payment initiation
  const handlePayment = async () => {
    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay SDK. Check your network.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/payment/createOrder", {
        amount: totalPrice,
        bookingId,
      });

      const { order_id, amount, currency } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "LockMySeat",
        description: `Payment for Booking ID: ${bookingId}`,
        order_id: order_id,
        handler: async (response) => {
          try {
            const verificationResponse = await axiosInstance.post(
              "/payment/paymentVerification",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId,
              }
            );
            toast.success(verificationResponse.data.message);
            // Redirect to success page with booking details (absolute path)
            navigate("/user/payment-success")
          } catch (error) {
            toast.error("Payment verification failed.");
            // Redirect to failure page (absolute path)
            navigate("/user/payment-failed");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#fd5479" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
        // Redirect to failure page (absolute path)
        navigate("/user/payment-failed");
        setLoading(false);
      });
      paymentObject.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to initiate payment.");
      // Redirect to failure page (absolute path)
      navigate("/user/payment-failed");
      setLoading(false);
    }
  };

  if (!selectedSeats || !totalPrice || !bookingId) {
    return null; // Redirect handled in useEffect
  }

  // Split showTime into date and time (assuming format: "10:30 PM")
  const [date, time] = showTime ? ["TBD", showTime] : ["TBD", "TBD"];

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-12 px-4 sm:px-8 lg:px-8">
      <div className="bg-base-300 p-8 rounded-xl shadow-lg w-full max-w-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold base mb-6 text-center text-primary">
          Summary
        </h1>

        {/* Movie Poster and Title */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={
              poster && poster !== ""
                ? poster
                : "https://via.placeholder.com/100x150?text=No+Poster"
            }
            alt={`${movieTitle} Poster`}
            className="w-20 h-30 rounded-md object-cover shadow-sm"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/100x150?text=No+Poster";
            }}
            loading="lazy"
          />
          <div>
            <h2 className="text-2xl font-semibold base mb-1">{movieTitle}</h2>
            <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="border-t border-gray-600 pt-4 mb-6">
          <h3 className="text-lg font-medium base mb-4">Booking Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Theater:</span>
              <span className="text-lg font-medium base">{theaterName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Location:</span>
              <span className="text-lg font-medium base">{theaterLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Date:</span>
              <span className="text-lg font-medium base">{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Time:</span>
              <span className="text-lg font-medium base">{time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Seats:</span>
              <span className="text-lg font-medium text-primary">
                {selectedSeats.join(", ")}
              </span>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="border-t border-gray-600 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold base">Total Amount:</p>
            <p className="text-xl font-bold text-primary">₹{totalPrice}</p>
          </div>
        </div>

        {/* Payment Button */}
        <Button
          title={`Proceed to Pay ₹ ${totalPrice}`}
          onClick={handlePayment}
          loading={loading}
          disabled={loading}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Payment;