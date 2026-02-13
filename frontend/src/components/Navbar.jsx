import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Убедись, что установил пакет иконок, или используй SVG

// Если нет FontAwesome, можно использовать SVG иконки прямо в коде (я использую SVG ниже для надежности)

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  
  // Состояние для мобильного меню
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsMobileMenuOpen(false); // Закрываем меню при выходе
    navigate('/login');
  };

  const handleNavigate = (path, state = {}) => {
    setIsMobileMenuOpen(false); // Закрываем меню при переходе
    navigate(path, { state });
  };

  return (
    <nav className="relative w-full max-w-[1440px] mx-auto flex justify-between items-center py-6 px-4 md:px-10 z-50">
      
      {/* Логотип */}
      <a href="/" className="text-2xl md:text-3xl font-bold text-white tracking-wide hover:text-gray-300 transition cursor-pointer font-sans z-50">
        Wallet
      </a>
      
      {/* --- DESKTOP MENU (Скрыто на мобильных 'hidden md:flex') --- */}
      <div className="hidden md:flex items-center gap-8">
        {token ? (
            <div className="flex items-center gap-6 lg:gap-10">
                <span className="text-white font-bold text-base lg:text-lg">
                    Hi, 
                    <span 
                        onClick={() => navigate('/profile')}
                        className="text-[#F4CE14] ml-2 cursor-pointer hover:underline hover:text-[#E5C00E] transition"
                    >
                        {username || 'User'}
                    </span>
                </span>
                <button 
                    onClick={handleLogout}
                    className="text-sm lg:text-base font-medium text-gray-400 hover:text-white transition cursor-pointer border border-white/10 px-4 py-2 rounded-xl hover:border-red-400/50 hover:bg-red-500/10"
                >
                    Logout
                </button>
            </div>
        ) : (
            <>
                <button 
                    onClick={() => navigate('/login', { state: { mode: 'login' } })}
                    className="text-sm font-medium text-white hover:text-white/80 transition cursor-pointer"
                >
                    Log In
                </button>
                <button 
                    onClick={() => navigate('/login', { state: { mode: 'signup' } })}
                    className="bg-[#F4CE14] text-[#1F2128] px-5 py-2 lg:px-6 lg:py-2.5 rounded-xl font-bold hover:bg-[#E5C00E] transition shadow-[0_4px_14px_0_rgba(244,206,20,0.39)] cursor-pointer text-sm lg:text-base"
                >
                    Sign Up
                </button>
            </>
        )}
      </div>

      {/* --- MOBILE BURGER BUTTON (Видно только на мобильных 'md:hidden') --- */}
      <div className="md:hidden z-50">
        <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
        >
            {/* Иконка Гамбургера / Крестика */}
            {isMobileMenuOpen ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
        </button>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`fixed inset-0 bg-[#1F2128]/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {token ? (
            <>
                <div className="text-center">
                    <p className="text-gray-400 mb-2">Logged in as</p>
                    <span 
                        onClick={() => handleNavigate('/profile')}
                        className="text-2xl font-bold text-[#F4CE14] cursor-pointer hover:underline"
                    >
                        {username || 'User'}
                    </span>
                </div>
                
                <button 
                    onClick={() => handleNavigate('/profile')}
                    className="text-xl text-white font-medium hover:text-[#F4CE14] transition"
                >
                    Profile Settings
                </button>

                <button 
                    onClick={handleLogout}
                    className="text-xl text-red-400 font-medium border border-red-500/20 px-8 py-3 rounded-2xl bg-red-500/10"
                >
                    Logout
                </button>
            </>
        ) : (
            <>
                <button 
                    onClick={() => handleNavigate('/login', { mode: 'login' })}
                    className="text-2xl font-medium text-white hover:text-[#F4CE14] transition"
                >
                    Log In
                </button>

                <button 
                    onClick={() => handleNavigate('/login', { mode: 'signup' })}
                    className="bg-[#F4CE14] text-[#1F2128] px-10 py-4 rounded-2xl font-bold text-xl hover:bg-[#E5C00E] transition shadow-lg"
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