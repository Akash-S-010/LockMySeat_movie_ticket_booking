import React from 'react';
import { motion } from 'framer-motion';
import {Button} from '../ui/Buttons';

const HeroSection = () => {
  // Animation variants with reduced timing
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  };

  const fadeInDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  return (
    <div className="relative w-full h-screen bg-base-100 flex items-center justify-center overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-primary bg-opacity-20 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary bg-opacity-20 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center base px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 tracking-tight"
          variants={fadeInDown}
          initial="initial"
          animate="animate"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            LockMySeat
          </span>
          <br />
          Your Cinematic Journey Begins!
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-400"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
        >
          Experience the magic of movies with seamless ticket booking
        </motion.p>

        {/* Call to Action */}
        <motion.div
          className="flex justify-center gap-4"
          variants={scaleIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <Button title="Get Started" className="btn btn-primary btn-lg text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300" />

          <Button title="Learn More" className="btn btn-outline btn-lg text-gray-400 font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;