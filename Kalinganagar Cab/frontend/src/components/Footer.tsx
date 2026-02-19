import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Github, Linkedin, Globe, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="text-white bg-gray-900">
      {/* Main Footer Content */}
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">Kalinganagar Cab</span>
            </div>
            <p className="text-sm text-gray-300">
              Your trusted partner for premium car rentals. Experience the freedom of the road with our extensive fleet of vehicles.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@carrental.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Delhi, Bangalore</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-gray-300 transition-colors hover:text-blue-400">
                Home
              </Link>
              <Link to="/cars" className="block text-sm text-gray-300 transition-colors hover:text-blue-400">
                Browse Cars
              </Link>
              <Link to="/bookings" className="block text-sm text-gray-300 transition-colors hover:text-blue-400">
                My Bookings
              </Link>
              <Link to="/login" className="block text-sm text-gray-300 transition-colors hover:text-blue-400">
                Login
              </Link>
              <Link to="/register" className="block text-sm text-gray-300 transition-colors hover:text-blue-400">
                Register
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link to="/help-center" className="block text-sm text-gray-300 transition-colors hover:text-blue-400">
                Help Center
              </Link>
              <Link to="/contact" className="block text-sm text-gray-300 transition-colors hover:text-blue-400">
                Contact Us
              </Link>
              <Link to="/terms" className="block text-sm text-gray-300 transition-colors hover:text-blue-400">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="block text-sm text-gray-300 transition-colors hover:text-blue-400">
                Privacy Policy
              </Link>
              <Link to="/disclaimer" className="block text-sm text-gray-300 transition-colors hover:text-blue-400">
                Disclaimer
              </Link>
            </div>
          </div>

          {/* Developer Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Developer</h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-300">
                <p className="font-medium text-blue-400">Abhisek Panda</p>
                <p>Full-Stack Developer</p>
              </div>
              <div className="flex space-x-3">
                <a
                  href="https://abhisekpanda072.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 transition-colors hover:text-blue-400"
                >
                  <Globe className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/abhisek2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 transition-colors hover:text-blue-400"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/abhisekpanda2004/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 transition-colors hover:text-blue-400"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <p className="text-xs text-gray-400">
                Built with <Heart className="inline w-3 h-3 text-red-400" /> using MERN Stack
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-400">
              © 2026 Kalinganagar Cab. All rights reserved. Built for educational purposes.
            </p>
            <div className="flex mt-2 space-x-4 md:mt-0">
              <Link to="/terms" className="text-xs text-gray-400 transition-colors hover:text-blue-400">
                Terms
              </Link>
              <Link to="/privacy" className="text-xs text-gray-400 transition-colors hover:text-blue-400">
                Privacy
              </Link>
              <Link to="/disclaimer" className="text-xs text-gray-400 transition-colors hover:text-blue-400">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;