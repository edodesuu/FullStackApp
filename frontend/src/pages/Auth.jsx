import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGoogle, 
  faMicrosoft, 
  faFacebookF, 
  faVk, 
  faTelegram 
} from '@fortawesome/free-brands-svg-icons';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const authUrl = isLogin 
        ? 'http://127.0.0.1:8000/api/auth/login/' 
        : 'http://127.0.0.1:8000/api/auth/registration/';

    try {
        let payload = {};

        if (isLogin) {
            // ЛОГИКА ВХОДА
            if (formData.email.includes('@')) {
                payload = {
                    email: formData.email,
                    password: formData.password,
                };
            } else {
                payload = {
                    username: formData.email, 
                    password: formData.password,
                };
            }
        } else {
            // ЛОГИКА РЕГИСТРАЦИИ
            payload = { 
                username: formData.username, 
                email: formData.email, 
                password: formData.password 
            };
        }

        const res = await axios.post(authUrl, payload);
        
        const token = res.data.key || res.data.access_token || res.data.access;
        if(token) {
            localStorage.setItem('token', token);
            navigate('/');
        }

    } catch (err) {
        console.error("Auth Error:", err.response);

        if (err.response && err.response.data) {
            const data = err.response.data;

            if (data.non_field_errors) {
                setError("Incorrect username or password.");
            } else {
                if (data.username) setError(`Username: ${data.username[0]}`);
                else if (data.email) setError(`Email: ${data.email[0]}`);
                
                // Проверяем все варианты имени поля пароля
                else if (data.password) setError(`Password: ${data.password[0]}`);
                else if (data.password1) setError(`Password: ${data.password1[0]}`);
                else if (data.password2) setError(`Password: ${data.password2[0]}`);
                
                else {
                    const firstKey = Object.keys(data)[0];
                    const firstVal = data[firstKey];
                    setError(`${firstKey}: ${Array.isArray(firstVal) ? firstVal[0] : firstVal}`);
                }
            }
        } else {
            setError("Server error. Please check your connection.");
        }
    }
  };

  const SocialButton = ({ text, icon, halfWidth = false }) => (
    <button 
        type="button"
        className={`
            ${halfWidth ? 'w-full' : 'w-full'} 
            py-3 rounded-xl font-bold text-bg-dark 
            bg-[#F4CE14] hover:bg-[#E5C00E] 
            mb-3 transition shadow-md flex items-center justify-center gap-3
        `}
    >
       <FontAwesomeIcon icon={icon} className="text-xl text-black" />
       <span className="text-sm md:text-base font-bold text-black whitespace-nowrap">
          {halfWidth ? text : `Continue with ${text}`}
       </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#1F2128] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-md bg-[#2A2D36] p-8 rounded-[30px] shadow-2xl border border-white/5">
        
        <h2 className="text-3xl font-bold mb-2 text-center">
            {isLogin ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="text-gray-400 text-center mb-8">
            {isLogin ? 'Enter your details to sign in' : 'Sign up to get started'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
            <input 
                type="text" 
                name="email"
                placeholder={isLogin ? "Email or Username" : "Email"} 
                onChange={handleChange}
                className="bg-[#1F2128] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#F4CE14] transition"
            />
            
            {!isLogin && (
                <input 
                    type="text" 
                    name="username"
                    placeholder="Username" 
                    onChange={handleChange}
                    className="bg-[#1F2128] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#F4CE14] transition"
                />
            )}

            <input 
                type="password" 
                name="password"
                placeholder="Password" 
                onChange={handleChange}
                className="bg-[#1F2128] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#F4CE14] transition"
            />

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg text-red-400 text-sm text-center">
                    {error} 
                </div>
            )}

            <button type="submit" className="bg-[#F4CE14] text-black font-bold py-4 rounded-xl mt-2 hover:bg-[#E5C00E] transition shadow-[0_4px_14px_0_rgba(244,206,20,0.39)] cursor-pointer">
                {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
        </form>

        <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-[#2A2D36] text-gray-500">Or continue with</span></div>
        </div>

        <div className="flex flex-col gap-2">
            <SocialButton text="Google" icon={faGoogle} />
            <SocialButton text="Microsoft" icon={faMicrosoft} />
            <SocialButton text="Facebook" icon={faFacebookF} />
            <div className="flex gap-3">
                <div className="w-1/2">
                    <SocialButton text="Telegram" icon={faTelegram} halfWidth={true} />
                </div>
                <div className="w-1/2">
                    <SocialButton text="VK" icon={faVk} halfWidth={true} />
                </div>
            </div>
        </div>

        <p className="text-center mt-8 text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
                className="text-[#BFAFF2] font-bold cursor-pointer hover:underline"
                onClick={() => { setIsLogin(!isLogin); setError(null); }}
            >
                {isLogin ? 'Sign up' : 'Log in'}
            </span>
        </p>

      </div>
    </div>
  );
};

export default Auth;