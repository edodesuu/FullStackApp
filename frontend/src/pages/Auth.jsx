import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faMicrosoft, faFacebookF } from '@fortawesome/free-brands-svg-icons';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Режимы: 'login', 'signup', 'verify', 'reset_request'
  const [mode, setMode] = useState('login'); 
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [verifyKey, setVerifyKey] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    if (location.state?.mode) {
        setMode(location.state.mode);
        setError(null);
        setFormData({ email: '', username: '', password: '' });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  // ... (handleResend оставь без изменений) ...
    const handleResend = async () => {
    setLoading(true);
    setError(null);
    try {
        await axios.post('http://127.0.0.1:8000/api/auth/registration/resend-email/', {
            email: formData.email
        });
        setMessage('Email sent! Check your inbox.');
        setResendTimer(60); 
    } catch (err) {
        console.error("Resend error:", err);
        setError("Failed to resend. Please wait.");
    } finally {
        setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
        // 1. ВХОД
        if (mode === 'login') {
            const payload = { 
                username: formData.email, 
                password: formData.password 
            };
            const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', payload);
            handleAuthSuccess(res.data);
        } 
        
        // 2. РЕГИСТРАЦИЯ
        else if (mode === 'signup') {
            const payload = { 
                username: formData.username, 
                email: formData.email, 
                password: formData.password 
            };
            await axios.post('http://127.0.0.1:8000/api/auth/registration/', payload);
            setMode('verify'); 
        } 
        
        // 3. ВЕРИФИКАЦИЯ
        else if (mode === 'verify') {
            await axios.post('http://127.0.0.1:8000/api/auth/registration/verify-email/', { key: verifyKey });
            setMessage("Email Verified! Logging you in...");
            setTimeout(async () => {
                try {
                    const loginPayload = { username: formData.email, password: formData.password };
                    const loginRes = await axios.post('http://127.0.0.1:8000/api/auth/login/', loginPayload);
                    handleAuthSuccess(loginRes.data);
                } catch (loginErr) {
                    setMode('login');
                    setMessage("Verified! Please enter your password to log in.");
                    setLoading(false);
                }
            }, 1000);
            return;
        }

        // 4. СБРОС ПАРОЛЯ (Запрос)
        else if (mode === 'reset_request') {
             await axios.post('http://127.0.0.1:8000/api/auth/password/reset/', {
                 email: formData.email
             });
             setMessage("Reset link sent to your email!");
             setLoading(false);
             // Здесь бэк отправит ссылку. 
             // Чтобы сделать ввод кода, нужно писать кастомный View на Django, 
             // который генерирует код и сохраняет его в БД.
             // Пока стандартный сброс шлет ссылку.
        }

    } catch (err) {
        console.error("Auth Error:", err.response);
        if (err.response?.data) {
             const data = err.response.data;
             if (data.non_field_errors) setError("Incorrect credentials or invalid code.");
             else if (data.email) setError(`Email: ${data.email[0]}`);
             else setError("An error occurred. Please try again.");
        } else {
            setError("Server connection error.");
        }
    } finally {
        if (mode !== 'verify') setLoading(false);
    }
  };

  const handleAuthSuccess = (data) => {
    const token = data.key || data.access_token || data.access;
    if(token) {
        localStorage.setItem('token', token);
        const userDisplay = data.user?.username || formData.username || formData.email;
        localStorage.setItem('username', userDisplay);
        navigate('/');
    }
  };

  const SocialButton = ({ text, icon }) => (
    <button type="button" className="w-full py-3 rounded-xl font-bold text-bg-dark bg-[#F4CE14] hover:bg-[#E5C00E] mb-3 transition shadow-md flex items-center justify-center gap-3">
       <FontAwesomeIcon icon={icon} className="text-xl text-black" />
       <span className="text-sm md:text-base font-bold text-black">{`Continue with ${text}`}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#1F2128] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-md bg-[#2A2D36] p-8 rounded-[30px] shadow-2xl border border-white/5">
        
        {/* Переключатель (скрываем при верификации и сбросе) */}
        {(mode === 'login' || mode === 'signup') && (
            <div className="flex bg-[#1F2128] p-1 rounded-xl mb-8">
                <button onClick={() => { setMode('signup'); setError(null); }} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${mode === 'signup' ? 'bg-[#F4CE14] text-[#2A2D36]' : 'text-gray-400'}`}>Sign Up</button>
                <button onClick={() => { setMode('login'); setError(null); }} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${mode === 'login' ? 'bg-[#F4CE14] text-[#2A2D36]' : 'text-gray-400'}`}>Log In</button>
            </div>
        )}

        {/* Заголовок */}
        <h2 className="text-2xl font-bold mb-2 text-center">
            {mode === 'login' && 'Welcome Back!'}
            {mode === 'signup' && 'Create an Account'}
            {mode === 'verify' && 'Check your Email'}
            {mode === 'reset_request' && 'Reset Password'}
        </h2>
        <p className="text-gray-400 text-center mb-8 text-sm">
            {mode === 'login' && 'Please sign in to continue'}
            {mode === 'signup' && 'Sign up to get started with us'}
            {mode === 'verify' && `We sent a code to ${formData.email}`}
            {mode === 'reset_request' && 'Enter your email to receive instructions'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
            
            {/* Поля для Login/Signup */}
            {(mode === 'login' || mode === 'signup') && (
                <>
                    {mode === 'signup' && (
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username} className="bg-[#1F2128] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#F4CE14] transition"/>
                    )}
                    <input type="text" name="email" placeholder={mode === 'login' ? "Email or Username" : "Email"} onChange={handleChange} value={formData.email} className="bg-[#1F2128] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#F4CE14] transition"/>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} className="bg-[#1F2128] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#F4CE14] transition"/>
                </>
            )}

            {/* Поле для Верификации */}
            {mode === 'verify' && (
                <>
                    <input type="text" placeholder="Enter Verification Key" onChange={(e) => setVerifyKey(e.target.value)} className="bg-[#1F2128] border border-[#F4CE14] p-4 rounded-xl text-white text-center text-lg tracking-widest outline-none transition"/>
                    <button type="button" onClick={handleResend} disabled={resendTimer > 0} className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${resendTimer > 0 ? 'bg-[#2A2D36] border border-white/10 text-gray-500 cursor-not-allowed opacity-50' : 'bg-[#2A2D36] border border-[#F4CE14] text-[#F4CE14] hover:bg-[#F4CE14] hover:text-[#2A2D36] cursor-pointer shadow-lg'}`}>
                        {resendTimer > 0 ? `Wait ${resendTimer}s` : 'Resend Email'}
                    </button>
                </>
            )}

            {/* Поле для Сброса пароля (Email) */}
            {mode === 'reset_request' && (
                <input type="text" name="email" placeholder="Enter your registered Email" onChange={handleChange} value={formData.email} className="bg-[#1F2128] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#F4CE14] transition"/>
            )}

            {/* Ссылка Forgot Password (только при логине) */}
            {mode === 'login' && (
                <div className="text-right">
                    <span onClick={() => {setMode('reset_request'); setError(null);}} className="text-sm text-gray-400 hover:text-[#F4CE14] cursor-pointer transition">
                        Forgot Password?
                    </span>
                </div>
            )}
            
            {/* Ссылка "Вернуться" для сброса */}
            {mode === 'reset_request' && (
                <div className="text-center">
                    <span onClick={() => {setMode('login'); setError(null);}} className="text-sm text-[#F4CE14] cursor-pointer hover:underline">
                        Back to Login
                    </span>
                </div>
            )}

            {error && <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg text-red-400 text-sm text-center">{error}</div>}
            {message && <div className="bg-green-500/10 border border-green-500/50 p-3 rounded-lg text-green-400 text-sm text-center">{message}</div>}

            <button type="submit" disabled={loading} className="bg-[#F4CE14] text-[#2A2D36] font-bold py-4 rounded-xl mt-2 hover:bg-[#E5C00E] transition shadow-[0_4px_14px_0_rgba(244,206,20,0.39)] cursor-pointer active:scale-[0.98]">
                {loading ? 'Processing...' : (mode === 'verify' ? 'Verify & Login' : (mode === 'reset_request' ? 'Send Reset Link' : (mode === 'login' ? 'Log In' : 'Create Account')))}
            </button>
        </form>

        {(mode === 'login' || mode === 'signup') && (
            <div className="flex flex-col gap-2">
                 <div className="relative mb-4"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-[#2A2D36] text-gray-500">Or continue with</span></div></div>
                 <SocialButton text="Google" icon={faGoogle} />
                 <SocialButton text="Microsoft" icon={faMicrosoft} />
                 <SocialButton text="Facebook" icon={faFacebookF} />
            </div>
        )}
      </div>
    </div>
  );
};

export default Auth;