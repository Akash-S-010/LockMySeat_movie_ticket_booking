import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import successAnimation from "../../assets/animations/Animation - 1744434301480.json";
import { Button } from "../../components/ui/Buttons";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(4); // Initial countdown value (matches 4000ms timeout)

  useEffect(() => {
    // Set up the redirect timeout
    const timeout = setTimeout(() => {
      navigate("/user/bookings");
    }, 5000);

    // Update countdown every second
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // Stop interval when countdown reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timeout and interval on component unmount
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8 w-full">
      {/* Full-width Lottie Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full h-64 overflow-hidden"
      >
        <Lottie
          animationData={successAnimation}
          loop={false}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </motion.div>

      {/* Success Message and Details */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl mt-8 text-center"
      >
        <motion.h1
          variants={textVariants}
          className="text-3xl font-bold text-green-400 flex items-center justify-center gap-2 mb-4"
        >
          <span role="img" aria-label="party-popper">🎉</span> Payment Successful!
        </motion.h1>
        <motion.p
          variants={textVariants}
          className="text-lg text-green-600 mb-6"
        >
          Congratulations! Your booking is confirmed. Enjoy your movie!
        </motion.p>

        {/* Timer Message */}
        <motion.p
          variants={textVariants}
          className="text-base text-gray-500 mb-4"
        >
          You will be redirected to your bookings in {seconds} second{seconds !== 1 ? "s" : ""}...
        </motion.p>

        {/* Action Button */}
        <motion.div variants={textVariants} className="mt-6 w-full">
          <Button
            title="View Your Bookings"
            onClick={() => navigate("/user/bookings")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            View Your Bookings
          </Button>
        </motion.div>

        {/* Footer Message */}
        <motion.p
          variants={textVariants}
          className="text-sm base mt-4"
        >
          Check your email for the booking details.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;