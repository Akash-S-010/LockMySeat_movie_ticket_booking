import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Github } from 'lucide-react';
import AppLogo from '../../assets/AppLogo.png';

const Footer = () => {
  return (
    <footer className="bg-base-300 px-6 py-2 sm:px-6 md:px-10 lg:px-20">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <img src={AppLogo} alt="LockMySeat Logo" className="w-50" />
            <p className="mt-4 max-w-xs text-gray-500">
              LockMySeat - Secure your movie tickets online with ease. Book your seats for the latest films today!
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 transition hover:text-primary">
                  <Facebook className="size-6" strokeWidth={2} />
                </a>
              </li>
              <li>
                <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 transition hover:text-primary">
                  <Instagram className="size-6" strokeWidth={2} />
                </a>
              </li>
              <li>
                <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 transition hover:text-primary">
                  <Twitter className="size-6" strokeWidth={2} />
                </a>
              </li>
              <li>
                <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 transition hover:text-primary">
                  <Github className="size-6" strokeWidth={2} />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-primary">Our Services</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><Link to="/movies" className="text-base transition hover:opacity-75">Movie Tickets</Link></li>
                <li><Link to="/showtimes" className="text-base transition hover:opacity-75">Showtimes</Link></li>
                <li><Link to="/theaters" className="text-base transition hover:opacity-75">Theater Listings</Link></li>
                <li><Link to="/offers" className="text-base transition hover:opacity-75">Special Offers</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-primary">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><Link to="/about-us" className="text-base transition hover:opacity-75">About Us</Link></li>
                <li><Link to="/careers" className="text-base transition hover:opacity-75">Careers</Link></li>
                <li><Link to="/partners" className="text-base transition hover:opacity-75">Our Partners</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-primary">Support</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><Link to="/contact" className="text-base transition hover:opacity-75">Contact Us</Link></li>
                <li><Link to="/faq" className="text-base transition hover:opacity-75">FAQs</Link></li>
                <li><Link to="/support" className="text-base transition hover:opacity-75">Customer Support</Link></li>
                <li><Link to="owner/dashboard" className="text-base transition hover:opacity-75">Theater Owner Portal</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-primary">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><Link to="/terms" className="text-base transition hover:opacity-75">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-base transition hover:opacity-75">Privacy Policy</Link></li>
                <li><Link to="/refund" className="text-base transition hover:opacity-75">Refund Policy</Link></li>
                <li><Link to="/accessibility" className="text-base transition hover:opacity-75">Accessibility</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">© 2025 LockMySeat. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
