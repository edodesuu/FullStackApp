import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full max-w-[1440px] mx-auto flex justify-between items-center py-6 px-6 md:px-10">
      
      {/* Логотип */}
      <a href="/" className="text-3xl font-bold text-white tracking-wide hover:text-gray-300 transition cursor-pointer font-sans">
        Wallet
      </a>
      
      <div className="flex items-center gap-8">
        {/* Кнопка Log In -> Передает state: 'login' */}
        <button 
            onClick={() => navigate('/login', { state: { mode: 'login' } })}
            className="text-sm font-medium text-white hover:text-white/80 transition cursor-pointer"
        >
            Log In
        </button>

        {/* Кнопка Sign Up -> Передает state: 'signup' */}
        <button 
            onClick={() => navigate('/login', { state: { mode: 'signup' } })}
            className="bg-[#F4CE14] text-[#1F2128] px-6 py-2.5 rounded-xl font-bold hover:bg-[#E5C00E] transition shadow-[0_4px_14px_0_rgba(244,206,20,0.39)] cursor-pointer"
        >
            Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;