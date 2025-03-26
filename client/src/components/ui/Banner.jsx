import React, { useState } from "react";

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample slide data (you can replace this with your own content)
  const slides = [
    {
      title: "Your next credit card gets you 24 free* tickets!",
      buttonText: "Apply Now",
      buttonColor: "bg-primary",
      background: "bg-gradient-to-r from-black to-brown-900",
      image: "https://cdn.grabon.in/gograbon/images/web-images/uploads/1618571888087/movie-ticket-offers.jpg",
    },
    {
      title: "Get 50% off on your first booking!",
      buttonText: "Book Now",
      buttonColor: "bg-primary",
      background: "bg-gradient-to-r from-black to-brown-900",
      image: "https://www.pngfind.com/pngs/m/214-2143472_cinema-ticket-movie-film-hd-png-download.png", 
    },
  ];

  // Function to handle slide change
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  // Auto-slide functionality (optional)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden mt-10 rounded-md border-2 border-base-200">
      {/* BannerSlider Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full h-[400px] flex-shrink-0 ${slide.background} flex items-center justify-between px-10`}
          >
            {/* Left Side: Text and Button */}
            <div className="text-white max-w-lg">
              <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
              <button
                className={`btn ${slide.buttonColor} text-white border-none hover:${slide.buttonColor}-dark`}
              >
                {slide.buttonText}
              </button>
            </div>

            {/* Right Side: Image */}
            <div className="hidden md:block">
              <img
                src={slide.image}
                alt="Slide"
                className="h-[300px] object-contain rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;