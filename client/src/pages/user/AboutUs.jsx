import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, SubmitBtn } from "../../components/ui/Buttons";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-base-100">
      {/* Banner Section */}
      <div
        className="relative text-center min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/7991486/pexels-photo-7991486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="absolute inset-0  backdrop-blur-sm"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl md:text-6xl font-extrabold tracking-tight">
              Welcome to <span className="text-primary">LockMySeat</span>
            </h1>
            <p className="mb-6 text-lg md:text-2xl font-light max-w-2xl mx-auto">
              Your Ultimate Movie Ticket Booking Experience
            </p>
            <Button
              title="Get Started"
              className={"px-8 py-6 text-xl"}
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
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 5v14M9 5v14m6-14H9"
                    />
                  </svg>
                </div>
                <h3 className="card-title mt-4">Real-Time Booking</h3>
                <p>Secure your seats instantly with live updates.</p>
              </div>
            </div>
            <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0-4v4m0 8v4m-8-8h4m8 0h4"
                    />
                  </svg>
                </div>
                <h3 className="card-title mt-4">Exclusive Offers</h3>
                <p>Enjoy special discounts and promotions.</p>
              </div>
            </div>
            <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="card-title mt-4">Easy to Use</h3>
                <p>Book tickets with a simple, intuitive design.</p>
              </div>
            </div>
            <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c1.66 0 3-1.34 3-3S13.66 5 12 5s-3 1.34-3 3 1.34 3 3 3zm0 2c-2.76 0-5 2.24-5 5h10c0-2.76-2.24-5-5-5z"
                    />
                  </svg>
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
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Our Mission
              </h3>
              <p className="text-base-content/80">
                We aim to bring the magic of cinema closer to you. With
                cutting-edge technology and a passion for movies,{" "}
                <span className="font-bold text-primary">LockMySeat</span>{" "}
                ensures every ticket you book is the start of a memorable
                adventure.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 mb-30">
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Our Mission
              </h3>
              <p className="text-base-content/80">
                We aim to bring the magic of cinema closer to you. With
                cutting-edge technology and a passion for movies,{" "}
                <span className="font-bold text-primary">LockMySeat</span>{" "}
                ensures every ticket you book is the start of a memorable
                adventure.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://media.gettyimages.com/id/1136613594/video/red-seats-in-theather-horizontal-slider-move.jpg?s=640x640&k=20&c=bfIqS9ilZiorY0_gZCA8aqwYm2VNBbhYob6V8TBnkGQ="
                alt="Movie Theater"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>

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
          <div className="bg-base-300 py-16 px-8 mb-10">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-18 text-primary">
                Let’s Connect
              </h2>
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">
                    Contact Information
                  </h3>
                  <p className="text-base-content/80 mb-6">
                    We’re here to assist you with any questions or feedback.
                    Reach out today!
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a
                        href="mailto:support@Lockmyseat.com"
                        className="text-primary"
                      >
                        support@Lockmyseat.com
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="Againstround"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      +1 (555) 123-4567
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      123 Cinema Lane, Movie City, USA
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <form className="card bg-base-100 shadow-xl p-6 space-y-6">
                    <h3 className="text-2xl font-bold text-center mb-4">
                      Send Us a Message
                    </h3>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="input input-bordered w-full focus:input-primary"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full focus:input-primary"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your Message</span>
                      </label>
                      <textarea
                        placeholder="Type your message here"
                        className="textarea textarea-bordered w-full h-32 focus:textarea-primary"
                      ></textarea>
                    </div>
                    <SubmitBtn title="Send Message" />
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Call to Action */}
          <div className="text-center py-20">
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
