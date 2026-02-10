import React, { useState } from 'react';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email) return;
    try {
      await axios.post('http://127.0.0.1:8000/api/subscribe/', { email });
      setStatus('Thanks for subscribing!');
      setEmail('');
    } catch (error) {
      setStatus('Error. Try again.');
    }
  };

  return (
    <footer className="pt-32 px-6 md:px-10 pb-10 border-t border-white/5 bg-bg-dark font-sans">
      
      {/* CTA блок с формой */}
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1440px] mx-auto mb-40 gap-10">
         
         <div className="w-full md:w-1/2">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                Questions? <br/> Let's talk
            </h2>
            <p className="text-text-muted text-lg md:text-xl mb-10 max-w-md leading-relaxed">
                Contact us through our 24/7 live chat. We're always happy to help!
            </p>
            <button className="bg-[#F4CE14] text-[#1F2128] px-10 py-4 rounded-xl font-bold text-xl hover:bg-[#E5C00E] transition cursor-pointer shadow-[0_10px_20px_-5px_rgba(244,206,20,0.3)]">
                Get started
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

      {/* Нижняя полоса */}
      <div className="flex flex-col md:flex-row justify-between items-end pt-20 pb-24 border-t border-white/10 gap-10 max-w-[1440px] mx-auto">
        
        {/* Лого и ссылки */}
        <div className="flex flex-col gap-8 w-full md:w-auto">
            
            <a href="/" className="text-2xl font-bold text-white tracking-wide hover:text-gray-300 transition cursor-pointer font-sans">
                Wallet
            </a>

            <div className="text-base text-text-muted flex flex-wrap gap-8 items-center font-medium">
                <span>© Wallet 2022</span>
                <a href="#" className="hover:text-white transition">Privacy policy</a>
                <a href="#" className="hover:text-white transition">Cookies policy</a>
                <a href="#" className="hover:text-white transition">Terms of use</a>
            </div>
        </div>

        {/* Форма подписки */}
        <div className="w-full md:w-auto flex flex-col items-start md:items-end">
             <p className="text-base text-text-muted mb-4 font-medium">Updates right to your Inbox</p>
             <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full">
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // Исправлен focus:border на желтый
                    className="bg-[#2A2D36] text-white px-6 py-4 rounded-xl outline-none border border-transparent focus:border-[#F4CE14] text-lg w-full sm:w-80 placeholder-gray-500 transition-all"
                />
                {/* Кнопка Send теперь желтая */}
                <button type="submit" className="bg-[#F4CE14] text-[#1F2128] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#E5C00E] transition cursor-pointer whitespace-nowrap shadow-[0_10px_20px_-5px_rgba(244,206,20,0.3)]">
                    Send
                </button>
             </form>
             {status && <p className="text-sm text-[#F4CE14] mt-2 font-medium">{status}</p>}
        </div>

      </div>
    </footer>
  );
};

export default Footer;