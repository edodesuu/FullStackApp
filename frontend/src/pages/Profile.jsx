import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  });
  
  const [passwords, setPasswords] = useState({
    new_password: '',
    confirm_password: ''
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // 1. Загрузка данных при старте
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return; 
        }

        const res = await axios.get('http://127.0.0.1:8000/api/auth/user/', {
          // ИСПРАВЛЕНИЕ: Для JWT используем префикс Bearer
          headers: { Authorization: `Bearer ${token}` } 
        });
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. Please log in again.");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setMessage(null); 
    setError(null);
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setMessage(null); 
    setError(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const token = localStorage.getItem('token');

    try {
        // 2. Обновление инфо (PATCH)
        await axios.patch('http://127.0.0.1:8000/api/auth/user/', user, {
            // ИСПРАВЛЕНИЕ: Bearer
            headers: { Authorization: `Bearer ${token}` }
        });
        
        // Обновляем localStorage
        localStorage.setItem('username', user.username);

        // 3. Смена пароля
        if (passwords.new_password) {
            if (passwords.new_password !== passwords.confirm_password) {
                setError("Passwords do not match!");
                return;
            }
            await axios.post('http://127.0.0.1:8000/api/auth/password/change/', {
                new_password1: passwords.new_password,
                new_password2: passwords.confirm_password
            }, {
                // ИСПРАВЛЕНИЕ: Bearer
                headers: { Authorization: `Bearer ${token}` }
            });
        }

        setMessage("Profile updated successfully!");
        setPasswords({ new_password: '', confirm_password: '' });

    } catch (err) {
        console.error("Update Error:", err.response);
        if (err.response?.data?.username) {
            setError("This username is already taken.");
        } else if (err.response?.data?.new_password1) {
             setError("Password is too weak or common.");
        } else {
            setError("Failed to update profile.");
        }
    }
  };

  if (loading) return <div className="min-h-screen bg-[#1F2128] text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#1F2128] font-sans text-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-4xl font-bold mb-8 text-[#F4CE14]">Profile Settings</h1>

        <form onSubmit={handleSave} className="bg-[#2A2D36] p-8 md:p-10 rounded-[30px] border border-white/5 shadow-xl space-y-8">
            
            {/* Блок: Личные данные */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Email Address</label>
                    <input 
                        type="text" 
                        value={user.email} 
                        disabled 
                        className="w-full bg-[#1F2128]/50 border border-white/5 rounded-xl p-4 text-gray-500 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">First Name</label>
                    <input 
                        type="text" name="first_name" 
                        value={user.first_name} onChange={handleChange}
                        className="w-full bg-[#1F2128] border border-white/10 rounded-xl p-4 text-white focus:border-[#F4CE14] outline-none transition"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Last Name</label>
                    <input 
                        type="text" name="last_name" 
                        value={user.last_name} onChange={handleChange}
                        className="w-full bg-[#1F2128] border border-white/10 rounded-xl p-4 text-white focus:border-[#F4CE14] outline-none transition"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2 font-medium">Username</label>
                    <input 
                        type="text" name="username" 
                        value={user.username} onChange={handleChange}
                        className="w-full bg-[#1F2128] border border-white/10 rounded-xl p-4 text-white focus:border-[#F4CE14] outline-none transition"
                    />
                </div>
            </div>

            {/* Блок: Смена пароля */}
            <div className="pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    Change Password 
                    <span className="text-xs font-normal text-gray-500 bg-[#1F2128] px-2 py-1 rounded">Optional</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                        type="password" name="new_password" placeholder="New Password"
                        value={passwords.new_password} onChange={handlePasswordChange}
                        className="w-full bg-[#1F2128] border border-white/10 rounded-xl p-4 text-white focus:border-[#F4CE14] outline-none transition"
                    />
                    <input 
                        type="password" name="confirm_password" placeholder="Confirm New Password"
                        value={passwords.confirm_password} onChange={handlePasswordChange}
                        className="w-full bg-[#1F2128] border border-white/10 rounded-xl p-4 text-white focus:border-[#F4CE14] outline-none transition"
                    />
                </div>
            </div>

            {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center">{error}</div>}
            {message && <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-center">{message}</div>}

            <button type="submit" className="w-full bg-[#F4CE14] text-[#2A2D36] font-bold py-4 rounded-xl hover:bg-[#E5C00E] transition shadow-lg cursor-pointer text-lg">
                Save Changes
            </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;