import React from "react";
import BannerSlider from "../../components/ui/Banner";
import MovieList from "../../components/user/MovieList";

const Home = () => {
  return (
    <div className="px-6 py-2 sm:px-6 md:px-10 lg:px-20">
      <MovieList />
      <BannerSlider />
    </div>
  );
};

export default Home;
