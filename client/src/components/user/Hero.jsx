import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Buttons';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
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
    transition: { duration: 0.5, ease: 'easeOut' }
  };

  return (
    <div
      className="relative w-full bg-base-100 flex items-center justify-center overflow-hidden"
      style={{ height: 'calc(100vh - 70px)' }} // Adjust for navbar height
    >
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-28 left-0 w-64 h-64 bg-primary bg-opacity-20 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="absolute bottom-28 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
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
          transition={{ delay: 0.4 }}
        >
          Experience the magic of movies with seamless ticket booking
        </motion.p>

        {/* Call to Action */}
        <motion.div
          className="flex justify-center gap-4"
          variants={scaleIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <Button
            title="Get Started"
            className="btn btn-primary btn-lg text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/register')}
          />

          <button className="btn btn-outline btn-lg border-primary font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary hover:text-white" onClick={() => navigate('/all-movies')}>
            Explore Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;