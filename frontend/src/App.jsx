import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Импорт компонентов
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesDashboard from './components/FeaturesDashboard';
import FeaturesGrid from './components/FeaturesGrid';
import Footer from './components/Footer';

// Импорт страниц
import Auth from './pages/Auth';
import Profile from './pages/Profile';
// Импорт новых юридических страниц
import { PrivacyPolicy, CookiesPolicy, TermsOfUse } from './pages/LegalPages';

// --- Сборка Главной Страницы (Лендинг) ---
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#1F2128] text-white font-sans selection:bg-[#F4CE14] selection:text-[#1F2128]">
      <Navbar />
      <Hero />
      <FeaturesDashboard />
      <FeaturesGrid />
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
        
        {/* Авторизация */}
        <Route path="/login" element={<Auth />} />
        
        {/* Профиль пользователя */}
        <Route path="/profile" element={<Profile />} />

        {/* Юридические страницы */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiesPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        
      </Routes>
    </Router>
  );
};

export default App;