import React, { useEffect, useState } from "react";

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Your next credit card gets you 24 free* tickets!",
      buttonText: "Apply Now",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/044/514/545/small_2x/background-a-movie-theater-where-love-stories-are-unfolding-on-the-big-screen-and-the-smell-of-popcorn-fills-the-air-photo.jpg",
    },
    {
      title: "Get 50% off on your first booking!",
      buttonText: "Book Now",
      image:
        "https://png.pngtree.com/thumb_back/fh260/background/20230523/pngtree-popcorn-bucket-is-located-around-an-empty-movie-theatre-image_2607017.jpg",
    },
    {
      title: "Exclusive Member Discounts!",
      buttonText: "Join Now",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd-kKV2ZwezdRUWrMO7wy6_W-O-pDdZaxlBUhyGS6WMepv_OuCJLGFbTv1rmdPX3T5UX4&usqp=CAU",
    },
    {
      title: "Watch the Latest Blockbusters!",
      buttonText: "Explore Movies",
      image:
        "https://img.freepik.com/free-photo/view-3d-cinema-theatre-room_23-2150866053.jpg?t=st=1743406705~exp=1743410305~hmac=66e93c9cfa1ee0baaa2dc431c1e28332b78e8c81dc58b0f75f0611263015903e&w=1060",
    },
    {
      title: "Special Weekend Offers!",
      buttonText: "Grab Now",
      image:
        "https://img.freepik.com/premium-photo/popcorn-movie-theater_1030879-33730.jpg",
    },
  ];

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[300px] mt-10 rounded-md border-2 border-base-200 my-20 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-[300px] flex-shrink-0 flex items-center justify-center relative"
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            {/* Overlay */}
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(5px)"  }}></div>

            {/* Content */}
            <div className="relative z-10 text-white text-center max-w-xl flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-4">{slide.title}</h1>
              <button className="btn btn-primary text-white border-none px-6 py-3 rounded-lg shadow-md mt-2">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
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
