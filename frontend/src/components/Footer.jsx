import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              KatheShop
            </h2>

            <p className="leading-7 text-gray-400">
              Your trusted Cisco networking equipment store. We provide
              enterprise-grade routers, switches, firewalls, and networking
              solutions for businesses and professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="transition hover:text-blue-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/products" className="transition hover:text-blue-400">
                  Products
                </Link>
              </li>

              <li>
                <Link to="/team" className="transition hover:text-blue-400">
                  Team
                </Link>
              </li>

              <li>
                <Link to="/contact" className="transition hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Contact Us
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Manila, Philippines</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-400" />
                <span>+63 912 345 6789</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400" />
                <span>support@katheshop.com</span>
              </div>

            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <Link
                to="#"
                className="rounded-full bg-blue-600 p-3 transition hover:scale-110 hover:bg-blue-700"
              >
                <FaFacebookF />
              </Link>

              <Link
                to="#"
                className="rounded-full bg-sky-500 p-3 transition hover:scale-110"
              >
                <FaTwitter />
              </Link>

              <Link
                to="#"
                className="rounded-full bg-pink-600 p-3 transition hover:scale-110"
              >
                <FaInstagram />
              </Link>

              <Link
                to="#"
                className="rounded-full bg-blue-800 p-3 transition hover:scale-110"
              >
                <FaLinkedinIn />
              </Link>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} KatheShop. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;