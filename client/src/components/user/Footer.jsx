import React from 'react';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div className="container mx-auto">
        {/* Grid layout for responsive design */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <div>
            <h2 className="footer-title text-xl mb-4">MovieMagic</h2>
            <p className="text-sm">
              Your one-stop destination for movie tickets and entertainment.
              Book your seats with ease and enjoy the show!
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="footer-title">Quick Links</h2>
            <div className="flex flex-col gap-2">
              <a href="/" className="link link-hover">Home</a>
              <a href="/movies" className="link link-hover">Movies</a>
              <a href="/theaters" className="link link-hover">Theaters</a>
              <a href="/bookings" className="link link-hover">My Bookings</a>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="footer-title">Support</h2>
            <div className="flex flex-col gap-2">
              <a href="/faq" className="link link-hover">FAQ</a>
              <a href="/contact" className="link link-hover">Contact Us</a>
              <a href="/terms" className="link link-hover">Terms of Service</a>
              <a href="/privacy" className="link link-hover">Privacy Policy</a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="footer-title">Get in Touch</h2>
            <div className="flex flex-col gap-2">
              <p>Email: support@moviemagic.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <div className="flex gap-4 mt-2">
                {/* Social Media Buttons */}
                <a href="#" className="btn btn-circle btn-ghost">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Twitter Icon */}
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="btn btn-circle btn-ghost">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Facebook Icon */}
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474V9.308c0-2.617 1.467-3.987 3.927-3.987.739 0 1.51.127 2.389.127v2.663h-1.345c-1.328 0-1.733.84-1.733 1.813v2.102h2.953l-.467 3.667h-2.486v7.98H9.101z"/>
                  </svg>
                </a>
                <a href="#" className="btn btn-circle btn-ghost">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Instagram Icon */}
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.062 1.366-.326 2.633-1.301 3.608-1.301.975-.975 1.24-2.242 1.301-3.608.058-1.266.07-1.646.07-4.85 0-3.204-.012-3.584-.07-4.85-.062-1.366-.326-2.633-1.301-3.608-.975-.975-2.242-1.24-3.608-1.301-1.266-.058-1.646-.07-4.85-.07-3.204 0-3.584.012-4.85.07-1.366.062-2.633.326-3.608 1.301-.975.975-1.24 2.242-1.301 3.608-.058 1.266-.07 1.646-.07 4.85zm0-2.163c-3.259 0-3.667.014-4.947.072-1.453.066-2.895.422-4.045 1.572S.642 3.55.576 5.003C.518 6.283.504 6.691.504 9.95s.014 3.667.072 4.947c.066 1.453.422 2.895 1.572 4.045s2.592 1.506 4.045 1.572c1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.453-.066 2.895-.422 4.045-1.572s1.506-2.592 1.572-4.045c.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.066-1.453-.422-2.895-1.572-4.045s-2.592-1.506-4.045-1.572c-1.28-.058-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-10 pt-6 border-t border-base-300 text-center">
          <p>
            © {new Date().getFullYear()} MovieMagic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;