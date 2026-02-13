import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импорт компонентов (используем то, что ты создал!)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesDashboard from './components/FeaturesDashboard'; // Большой скриншот приложения
import FeaturesGrid from './components/FeaturesGrid'; // Карточки + Отзыв
import Footer from './components/Footer';

// Импорт страниц
import Auth from './pages/Auth';
import Profile from './pages/Profile';

// --- Сборка Главной Страницы (Лендинг) ---
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#1F2128] text-white font-sans selection:bg-[#F4CE14] selection:text-[#1F2128]">
      {/* Навигация */}
      <Navbar />
      
      {/* 1. Главный блок с графиками (Hero.jsx уже содержит HeroDashboard) */}
      <Hero />
      
      {/* 2. Блок с большой картинкой (скриншот приложения) */}
      <FeaturesDashboard />

      {/* 3. Карточки преимуществ + Отзыв */}
      <FeaturesGrid />

      {/* 4. Футер с формой подписки */}
      <Footer />
    </div>
  );
};

// --- Роутинг ---
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Главная */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Вход / Регистрация / Сброс */}
        <Route path="/login" element={<Auth />} />
        
        {/* Профиль пользователя */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;