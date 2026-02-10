import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импорт компонентов
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesDashboard from './components/FeaturesDashboard';
import FeaturesGrid from './components/FeaturesGrid';
import Footer from './components/Footer';
import Auth from './pages/Auth'; // Наша новая страница

// Создадим компонент Home, чтобы собрать лендинг в кучу
const Home = () => (
  <>
    <Navbar />
    <Hero />
    <FeaturesDashboard />
    <FeaturesGrid />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans bg-[#1F2128]">
        <Routes>
            {/* Главная страница */}
            <Route path="/" element={<Home />} />
            
            {/* Страница авторизации */}
            <Route path="/login" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;