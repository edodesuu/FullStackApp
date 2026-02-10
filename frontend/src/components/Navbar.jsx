import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full max-w-[1440px] mx-auto flex justify-between items-center py-6 px-6 md:px-10">
      
      {/* Логотип: Стал крупнее (text-3xl) */}
      <a href="/" className="text-3xl font-bold text-white tracking-wide hover:text-gray-300 transition cursor-pointer font-sans">
        Wallet
      </a>
      
      <div className="flex items-center gap-8">
        <a href="#" className="text-sm font-medium hover:text-white/80 transition">Sign up</a>
        <Link to="/login">
          <button className="bg-accent-purple text-bg-dark px-6 py-2.5 rounded-xl font-semibold hover:bg-[#A995ED] transition cursor-pointer">
              Log in
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;