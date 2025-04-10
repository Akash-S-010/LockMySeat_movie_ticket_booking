import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, SubmitBtn } from "../../components/ui/Buttons";
import { CalendarCheck, Tag, CheckCircle, User } from "lucide-react";
import ContactForm from "../../components/user/ContactForm.jsx";
import BannerSlider from "../../components/ui/Banner.jsx";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-base-100">
      {/* Banner Section */}
      <div
        className="relative text-center min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/044/514/545/small_2x/background-a-movie-theater-where-love-stories-are-unfolding-on-the-big-screen-and-the-smell-of-popcorn-fills-the-air-photo.jpg')`,
        }}
      >
        {/* Darker overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        <div className="hero-content text-center text-neutral-content z-10">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl md:text-6xl font-extrabold tracking-tight">
              Welcome to <span className="text-primary">LockMySeat</span>
            </h1>
            <p className="mb-6 text-lg md:text-2xl font-light max-w-2xl mx-auto">
              Your Ultimate Movie Ticket Booking Experience
            </p>
            <Button
              title="Get Started"
              className={"btn btn-primary px-8 py-5"}
              onClick={() => navigate("/register")}
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-2 sm:px-6 md:px-10 lg:px-20">
        {/* About Description */}
        <div className="container mx-auto px-4 py-26">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold text-base-content">
              Why Choose LockMySeat?
            </h2>
            <p className="mt-4 text-lg text-base-content/80 max-w-3xl mx-auto">
              At <span className="font-bold text-primary">LockMySeat</span>,
              we’re dedicated to transforming how you experience movies. From
              blockbuster premieres to indie gems, we make booking your tickets
              effortless with real-time seat selection, exclusive deals, and a
              platform designed for movie lovers by movie lovers.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-30">
            <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="card-title mt-4">Real-Time Booking</h3>
                <p>Secure your seats instantly with live updates.</p>
              </div>
            </div>
            <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <h3 className="card-title mt-4">Exclusive Offers</h3>
                <p>Enjoy special discounts and promotions.</p>
              </div>
            </div>
            <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="card-title mt-4">Easy to Use</h3>
                <p>Book tickets with a simple, intuitive design.</p>
              </div>
            </div>
            <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="card-title mt-4">Personalized Experience</h3>
                <p>Get recommendations tailored to your taste.</p>
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-30">
            <div className="md:w-1/2">
              <img
                src="https://media.gettyimages.com/id/1136613594/video/red-seats-in-theather-horizontal-slider-move.jpg?s=640x640&k=20&c=bfIqS9ilZiorY0_gZCA8aqwYm2VNBbhYob6V8TBnkGQ="
                alt="Movie Theater"
                className="rounded-lg shadow-lg w-full h-60"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Our Commitment to Moviegoers
              </h3>
              <p className="text-base-content/80">
                At <span className="font-bold text-primary">LockMySeat</span>,
                we believe in making every movie experience seamless and
                memorable. From effortless ticket booking to exclusive deals,
                we’re here to enhance your cinematic journey with just a few
                clicks.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 mb-30">
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Seamless Ticketing, Unforgettable Moments
              </h3>
              <p className="text-base-content/80">
                We’re not just about booking tickets; we’re about creating
                experiences. Whether it's a first date, a family outing, or a
                night out with friends,{" "}
                <span className="font-bold text-primary">LockMySeat</span>{" "}
                ensures that your ticketing experience is quick, easy, and
                reliable.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/18515130/pexels-photo-18515130/free-photo-of-cinema-audience-hand-catching-popcorn-from-a-box.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Movie Theater"
                className="rounded-lg shadow-lg w-full h-60"
              />
            </div>
          </div>
          {/* BannerSlider Section */}
          <BannerSlider />
          {/* Reviews Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card bg-base-300 shadow-lg p-6">
                <p className="italic text-base-content/80">
                  "Booking tickets has never been this easy! I love how I can
                  pick my seats in real-time."
                </p>
                <p className="mt-4 font-bold">- Sarah K.</p>
              </div>
              <div className="card bg-base-300 shadow-lg p-6">
                <p className="italic text-base-content/80">
                  "The exclusive offers saved me money on my last movie night.
                  Highly recommend!"
                </p>
                <p className="mt-4 font-bold">- James P.</p>
              </div>
              <div className="card bg-base-300 shadow-lg p-6">
                <p className="italic text-base-content/80">
                  "Super intuitive app. I booked tickets for my whole family in
                  minutes."
                </p>
                <p className="mt-4 font-bold">- Priya M.</p>
              </div>
            </div>
          </div>

          {/*  Contact Section */}
          <ContactForm />

          {/* Footer Call to Action */}
          <div className="text-center py-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Lock Your Seat?
            </h3>
            <p className="text-base-content/80 mb-8 max-w-2xl mx-auto">
              Join thousands of movie lovers who trust{" "}
              <span className="font-bold text-primary">LockMySeat</span> for
              unforgettable cinema experiences.
            </p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/")}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
