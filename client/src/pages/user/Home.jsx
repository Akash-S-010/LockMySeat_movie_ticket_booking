import React from "react";
import BannerSlider from "../../components/ui/Banner";
import MovieList from "../../components/user/MovieList";
import HeroSection from "../../components/user/Hero";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <div className="px-6 py-2 sm:px-6 md:px-10 lg:px-20">
        <MovieList page="home"/>
        <BannerSlider />
      </div>
    </div>
  );
};

export default Home;
