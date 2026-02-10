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
  const [isLogin, setIsLogin] = useState(false); 
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleMode = (mode) => {
    setIsLogin(mode === 'login');
    setError(null);
    setFormData({ email: '', username: '', password: '' });
  };

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
        
        {/* --- ПЕРЕКЛЮЧАТЕЛЬ РЕЖИМОВ --- */}
        <div className="flex bg-[#1F2128] p-1 rounded-xl mb-8">
            <button
                type="button"
                onClick={() => toggleMode('signup')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    !isLogin 
                        ? 'bg-[#F4CE14] text-[#2A2D36] shadow-md' 
                        : 'text-gray-400 hover:text-white'
                }`}
            >
                Sign Up
            </button>
            <button
                type="button"
                onClick={() => toggleMode('login')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    isLogin 
                        ? 'bg-[#F4CE14] text-[#2A2D36] shadow-md' 
                        : 'text-gray-400 hover:text-white'
                }`}
            >
                Log In
            </button>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-center">
            {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </h2>
        <p className="text-gray-400 text-center mb-8 text-sm">
            {isLogin ? 'Please sign in to continue' : 'Sign up to get started with us'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
            {!isLogin && (
                <input 
                    type="text" 
                    name="username"
                    value={formData.username}
                    placeholder="Username" 
                    onChange={handleChange}
                    className="bg-[#1F2128] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#F4CE14] transition"
                />
            )}

            <input 
                type="text" 
                name="email"
                value={formData.email}
                placeholder={isLogin ? "Email or Username" : "Email"} 
                onChange={handleChange}
                className="bg-[#1F2128] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#F4CE14] transition"
            />
            
            <input 
                type="password" 
                name="password"
                value={formData.password}
                placeholder="Password" 
                onChange={handleChange}
                className="bg-[#1F2128] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#F4CE14] transition"
            />

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg text-red-400 text-sm text-center animate-pulse">
                    {error} 
                </div>
            )}

            <button type="submit" className="bg-[#F4CE14] text-[#2A2D36] font-bold py-4 rounded-xl mt-2 hover:bg-[#E5C00E] transition shadow-[0_4px_14px_0_rgba(244,206,20,0.39)] cursor-pointer active:scale-[0.98]">
                {isLogin ? 'Log In' : 'Create Account'}
            </button>
        </form>

        <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-[#2A2D36] text-gray-500">Or continue with</span></div>
        </div>

        <div className="flex flex-col gap-2">
            <SocialButton text="Google" icon={faGoogle} />
            {/* ВЕРНУЛИ КНОПКИ */}
            <SocialButton text="Microsoft" icon={faMicrosoft} />
            <SocialButton text="Facebook" icon={faFacebookF} />
        </div>

        <p className="text-center mt-8 text-gray-400 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
                className="text-[#F4CE14] font-bold cursor-pointer hover:underline"
                onClick={() => toggleMode(isLogin ? 'signup' : 'login')}
            >
                {isLogin ? 'Sign up' : 'Log in'}
            </span>
        </p>

      </div>
    </div>
  );
};

export default Auth;