import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Принимаем пропс hideCTA (по умолчанию false)
const Footer = ({ hideCTA = false }) => {
  const [email, setEmail] = useState('');

  const handleContactUs = () => {
    window.open('https://t.me/vagabondideology', '_blank');
  };

  const handleSubscribeSend = (e) => {
    e.preventDefault();
    const recipient = "edodesuu@gmail.com";
    const subject = encodeURIComponent("Subscription / Inquiry from Wallet App");
    const body = encodeURIComponent(
        email 
        ? `Hello! I would like to get in touch. My email is: ${email}` 
        : `Hello! I would like to subscribe to updates.`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setEmail('');
  };

  return (
    <footer className={`px-6 md:px-10 pb-10 border-t border-white/5 bg-[#1F2128] font-sans text-white ${hideCTA ? 'pt-10' : 'pt-32'}`}>
      
      {/* 1. Блок CTA ("Questions? Let's talk") */}
      {/* Рендерим ТОЛЬКО если hideCTA === false */}
      {!hideCTA && (
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1440px] mx-auto mb-40 gap-10">
           <div className="w-full md:w-1/2">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                  Questions? <br/> Let's talk
              </h2>
              <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-md leading-relaxed">
                  Contact us through our 24/7 live chat. We're always happy to help!
              </p>
              <button 
                  onClick={handleContactUs}
                  className="bg-[#F4CE14] text-[#1F2128] px-10 py-4 rounded-xl font-bold text-xl hover:bg-[#E5C00E] transition cursor-pointer shadow-[0_10px_20px_-5px_rgba(244,206,20,0.3)]"
              >
                  Contact Us
              </button>
           </div>

           <div className="w-full md:w-1/2 flex justify-center md:justify-end">
               <img 
                  src="src/assets/payment.png" 
                  alt="Payment Preview" 
                  className="w-full max-w-[500px] h-auto object-contain transform hover:scale-105 transition duration-500"
               />
           </div>
        </div>
      )}

      {/* 2. Нижняя полоса (Copyright и ссылки) - ОНА ОСТАЕТСЯ ВСЕГДА */}
      <div className={`flex flex-col md:flex-row justify-between items-end pb-24 gap-10 max-w-[1440px] mx-auto ${!hideCTA ? 'pt-20 border-t border-white/10' : ''}`}>
        
        <div className="flex flex-col gap-8 w-full md:w-auto">
            <Link to="/" className="text-2xl font-bold text-white tracking-wide hover:text-gray-300 transition cursor-pointer font-sans">
                Wallet
            </Link>

            <div className="text-base text-gray-400 flex flex-wrap gap-8 items-center font-medium">
                <span>© Wallet 2022</span>
                <Link to="/privacy" className="hover:text-white transition">Privacy policy</Link>
                <Link to="/cookies" className="hover:text-white transition">Cookies policy</Link>
                <Link to="/terms" className="hover:text-white transition">Terms of use</Link>
            </div>
        </div>

        <div className="w-full md:w-auto flex flex-col items-start md:items-end">
             <p className="text-base text-gray-400 mb-4 font-medium">Updates right to your Inbox</p>
             <form onSubmit={handleSubscribeSend} className="flex flex-col sm:flex-row gap-4 w-full">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#2A2D36] text-white px-6 py-4 rounded-xl outline-none border border-transparent focus:border-[#F4CE14] text-lg w-full sm:w-80 placeholder-gray-500 transition-all"
                />
                <button type="submit" className="bg-[#F4CE14] text-[#1F2128] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#E5C00E] transition cursor-pointer whitespace-nowrap shadow-[0_10px_20px_-5px_rgba(244,206,20,0.3)]">
                    Send
                </button>
             </form>
        </div>

      </div>
    </footer>
  );
};

export default Footer;