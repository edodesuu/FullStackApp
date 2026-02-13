import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Шаблон для юридических страниц
const LegalTemplate = ({ title, date, children }) => {
  return (
    <div className="min-h-screen bg-[#1F2128] font-sans text-white flex flex-col">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto px-6 py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-[#F4CE14] mb-4">{title}</h1>
        <p className="text-gray-400 mb-10 border-b border-white/10 pb-6">Last updated: {date}</p>
        
        <div className="space-y-8 text-gray-300 leading-relaxed text-lg">
            {children}
        </div>
      </div>
      
      {/* ВОТ ТУТ ГЛАВНОЕ ИЗМЕНЕНИЕ: прячем блок CTA */}
      <Footer hideCTA />
    </div>
  );
};

// --- СТРАНИЦА 1: Privacy Policy ---
export const PrivacyPolicy = () => {
  return (
    <LegalTemplate title="Privacy Policy" date="February 12, 2026">
        <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>Welcome to Wallet ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at edodesuu@gmail.com.</p>
        </section>
        <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.</p>
        </section>
        <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
        </section>
    </LegalTemplate>
  );
};

// --- СТРАНИЦА 2: Cookies Policy ---
export const CookiesPolicy = () => {
  return (
    <LegalTemplate title="Cookies Policy" date="February 12, 2026">
        <section>
            <h2 className="text-2xl font-bold text-white mb-4">What are Cookies?</h2>
            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
        </section>
        <section>
            <h2 className="text-2xl font-bold text-white mb-4">Why do we use Cookies?</h2>
            <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.</p>
        </section>
    </LegalTemplate>
  );
};

// --- СТРАНИЦА 3: Terms of Use ---
export const TermsOfUse = () => {
  return (
    <LegalTemplate title="Terms of Use" date="February 12, 2026">
        <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Wallet ("we," "us" or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.</p>
        </section>
        <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.</p>
        </section>
        <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Representations</h2>
            <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.</p>
        </section>
    </LegalTemplate>
  );
};