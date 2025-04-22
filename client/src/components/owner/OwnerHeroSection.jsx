import React from "react";
import { Button } from "../ui/Buttons";
import { useNavigate } from "react-router-dom";

const OwnerHeroSection = () => {
    const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-base-300 via-base-200 to-base-100">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <img
            src="https://t3.ftcdn.net/jpg/03/74/28/58/360_F_374285858_KzJ88FysqJ79AhyNPW2lqnBtsRTokuav.jpg"
            alt="Theater background"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full -translate-x-1/2 translate-y-1/4 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/4 -translate-y-1/4 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-block px-4 py-2 mb-6 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 animate-pulse">
              Theater Owner Exclusive Portal
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-base-content">
              Transform Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">Theater Business</span>
                <span className="absolute inset-x-0 bottom-0 h-2 bg-primary/30 blur-md transform -skew-x-12"></span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="mb-8 text-lg md:text-xl text-base-content/80 font-light max-w-3xl mx-auto leading-relaxed">
              Elevate your theater management with LockMySeat — register your venue, 
              schedule shows effortlessly, track revenue in real-time, and maximize attendance.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
              <div className="p-4 bg-base-100/50 backdrop-blur-lg rounded-xl border hover:bg-base-200/50 transition-colors border-primary">
                <h3 className="text-primary font-semibold">Register Theater</h3>
                <p className="text-sm text-base-content/70">Add your venue in minutes</p>
              </div>
              <div className="p-4 bg-base-100/50 backdrop-blur-lg rounded-xl border hover:bg-base-200/50 transition-colors border-primary">
                <h3 className="text-primary font-semibold">Manage Shows</h3>
                <p className="text-sm text-base-content/70">Schedule with ease</p>
              </div>
              <div className="p-4 bg-base-100/50 backdrop-blur-lg rounded-xl border hover:bg-base-200/50 transition-colors border-primary">
                <h3 className="text-primary font-semibold">Track Revenue</h3>
                <p className="text-sm text-base-content/70">Real-time insights</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div>
              <Button
                title="Get Started Now"
                className=" px-8 py-6 text-lg font-semibold rounded-full transition-all shadow-lg"
                onClick={() => navigate("/owner/register")}
              />
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default OwnerHeroSection;