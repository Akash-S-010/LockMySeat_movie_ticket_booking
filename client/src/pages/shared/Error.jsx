import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const numberVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
    },
  };

  const bounceVariants = {
    bounce: {
      y: [-10, 0, -10],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-base-300 p-4">
      <motion.div
        className="text-center max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated 404 Illustration */}
        <div className="relative mb-8">
          <motion.h1
            className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500"
            variants={numberVariants}
            animate="pulse"
          >
            404
          </motion.h1>
          <motion.div
            className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-300 rounded-full opacity-50"
            variants={bounceVariants}
            animate="bounce"
          ></motion.div>
          <motion.div
            className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-300 rounded-full opacity-50"
            variants={bounceVariants}
            animate="bounce"
            transition={{ delay: 0.2 }}
          ></motion.div>
        </div>

        {/* Error Message */}
        <h2 className="text-4xl font-bold text-primary mb-4">
          Oops! Lost in Space? 🚀
        </h2>
        <p className="text-lg base mb-6">
          The page you're looking for has vanished into the digital cosmos. 
          Let's get you back to reality!
        </p>

        {/* Call to Action */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={-1}
            className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-full shadow-lg"
          >
            Go Back
          </Link>
        </motion.div>

        {/* Optional Error Details */}
        {error && (
          <p className="mt-6 text-sm text-gray-500 italic">
            Error: {error.statusText || error.message}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default ErrorPage;