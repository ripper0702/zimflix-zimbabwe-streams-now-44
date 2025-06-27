
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-4 md:px-8 py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Social Media Icons */}
        <div className="flex space-x-6 mb-8">
          <a href="#" className="hover:text-white transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Youtube className="w-6 h-6" />
          </a>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <a href="#" className="block hover:text-white transition-colors">Audio Description</a>
            <a href="#" className="block hover:text-white transition-colors">Help Centre</a>
            <a href="#" className="block hover:text-white transition-colors">Gift Cards</a>
            <a href="#" className="block hover:text-white transition-colors">Media Centre</a>
          </div>
          
          <div className="space-y-3">
            <a href="#" className="block hover:text-white transition-colors">Investor Relations</a>
            <a href="#" className="block hover:text-white transition-colors">Jobs</a>
            <a href="#" className="block hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="block hover:text-white transition-colors">Privacy</a>
          </div>
          
          <div className="space-y-3">
            <a href="#" className="block hover:text-white transition-colors">Legal Notices</a>
            <a href="#" className="block hover:text-white transition-colors">Cookie Preferences</a>
            <a href="#" className="block hover:text-white transition-colors">Corporate Information</a>
            <a href="#" className="block hover:text-white transition-colors">Contact Us</a>
          </div>
          
          <div className="space-y-3">
            <a href="#" className="block hover:text-white transition-colors">Account</a>
            <a href="#" className="block hover:text-white transition-colors">Redeem Gift Cards</a>
            <a href="#" className="block hover:text-white transition-colors">Buy Gift Cards</a>
            <a href="#" className="block hover:text-white transition-colors">Ways to Watch</a>
          </div>
        </div>

        {/* Service Code Button */}
        <button className="border border-gray-600 text-gray-400 px-4 py-2 mb-6 hover:border-gray-500 transition-colors">
          Service Code
        </button>

        {/* Copyright */}
        <div className="text-sm">
          <p className="mb-2">© 2024 ZimFlix Zimbabwe</p>
          <p className="flex items-center space-x-2">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>in Zimbabwe</span>
            <span className="ml-4 flex items-center space-x-1">
              <span className="w-3 h-2 bg-green-500 inline-block"></span>
              <span className="w-3 h-2 bg-yellow-500 inline-block"></span>
              <span className="w-3 h-2 bg-red-500 inline-block"></span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
