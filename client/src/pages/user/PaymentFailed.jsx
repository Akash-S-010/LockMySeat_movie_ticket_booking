import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import failureAnimation from "../../assets/animationFiles/Animation - 1744389355088.json";
import { Button } from "../../components/ui/Buttons"; 

const PaymentFailed = () => {
  const navigate = useNavigate();

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
          animationData={failureAnimation}
          loop={false}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </motion.div>

      {/* Failure Message and Details */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl mt-8 text-center"
      >
        <motion.h1
          variants={textVariants}
          className="text-3xl font-bold text-red-500 flex items-center justify-center gap-2 mb-4"
        >
          <span role="img" aria-label="warning">⚠️</span> Payment Failed
        </motion.h1>
        <motion.p
          variants={textVariants}
          className="text-lg text-red-500 mb-6"
        >
          Something went wrong with your payment. Please try again.
        </motion.p>

        {/* Action Button */}
        <motion.div variants={textVariants} className="mt-6 w-full">
          <Button
            title="Try Again"
            onClick={() => navigate(-1)} // Go back to payment page
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Try Again
          </Button>
        </motion.div>

        {/* Footer Message */}
        <motion.p
          variants={textVariants}
          className="text-sm text-gray-500 mt-4"
        >
          If the issue persists, contact support.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;