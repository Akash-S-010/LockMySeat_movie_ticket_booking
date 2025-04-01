import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance.js";
import { Loader2 } from "lucide-react";
import { Button } from "../../components/ui/Buttons";
import toast from "react-hot-toast";

const Payment = () => {
  const { showId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { selectedSeats, totalPrice, bookingId } = state || {};

  useEffect(() => {
    if (!selectedSeats || !totalPrice || !bookingId) {
      toast.error("Invalid payment details.");
      navigate(`/user/seat-selection/${showId}`);
    }
  }, [selectedSeats, totalPrice, bookingId, navigate, showId]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        console.log("Razorpay script loaded successfully");
        resolve(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
        toast.error("Failed to load Razorpay SDK. Check your network or ad blockers.");
        setLoading(false);
        return;
    }

    try {
        // Call the correct createOrder endpoint
        const response = await axiosInstance.post("/payment/createOrder", {
            amount: totalPrice,
            bookingId,
        });
        console.log("Create Order Response:", response.data);

        const { order_id, amount, currency } = response.data;

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Ensure this is set in your .env
            amount: amount, // Already in paise from backend
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
                    navigate("/user/bookings");
                } catch (error) {
                    toast.error("Payment verification failed.");
                    setLoading(false);
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
            setLoading(false);
        });
        paymentObject.open();
    } catch (error) {
        console.error("Payment Error:", error);
        toast.error(error.response?.data?.message || "Failed to initiate payment.");
        setLoading(false);
    }
};


  if (!selectedSeats || !totalPrice || !bookingId) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center py-12 px-6 sm:px-6 md:px-10 lg:px-20">
      <h1 className="text-3xl font-bold mb-6">Complete Your Payment</h1>
      <div className="bg-base-200 p-6 rounded-lg shadow-md w-full max-w-md">
        <p className="text-lg font-semibold text-primary mb-3">Booking Summary</p>
        <p className="text-lg mb-2">
          <span className="font-bold">Seats:</span> {selectedSeats.join(", ")}
        </p>
        <p className="text-lg mb-4">
          <span className="font-bold">Total Price:</span> ₹{totalPrice}
        </p>
        <Button
          title={loading ? "Processing..." : `Pay ₹${totalPrice}`}
          className="w-full"
          onClick={handlePayment}
          disabled={loading}
        />
        {loading && (
          <Loader2 size={24} className="animate-spin text-primary mt-4 mx-auto" />
        )}
      </div>
    </div>
  );
};

export default Payment;