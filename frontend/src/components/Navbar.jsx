import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  // Проверяем, есть ли токен
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="w-full max-w-[1440px] mx-auto flex justify-between items-center py-6 px-6 md:px-10">
      
      <a href="/" className="text-3xl font-bold text-white tracking-wide hover:text-gray-300 transition cursor-pointer font-sans">
        Wallet
      </a>
      
      <div className="flex items-center gap-8">
        {token ? (
            // --- ЕСЛИ ЗАЛОГИНЕН ---
            <div className="flex items-center gap-4">
                <span className="text-white font-bold text-lg">
                    Hi, <span className="text-[#F4CE14]">{username || 'User'}</span>
                </span>
                <button 
                    onClick={handleLogout}
                    className="text-sm font-medium text-white/60 hover:text-red-400 transition cursor-pointer"
                >
                    Logout
                </button>
            </div>
        ) : (
            // --- ЕСЛИ НЕ ЗАЛОГИНЕН ---
            <>
                <button 
                    onClick={() => navigate('/login', { state: { mode: 'login' } })}
                    className="text-sm font-medium text-white hover:text-white/80 transition cursor-pointer"
                >
                    Log In
                </button>

                <button 
                    onClick={() => navigate('/login', { state: { mode: 'signup' } })}
                    className="bg-[#F4CE14] text-[#1F2128] px-6 py-2.5 rounded-xl font-bold hover:bg-[#E5C00E] transition shadow-[0_4px_14px_0_rgba(244,206,20,0.39)] cursor-pointer"
                >
                    Sign Up
                </button>
            </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;