import React from 'react';
import HeroDashboard from './HeroDashboard';

const Hero = () => {
  return (
    <section className="pt-10 pb-10 px-6 md:px-10 max-w-[1440px] mx-auto flex flex-col justify-center min-h-[800px]">
      
      {/* Верхняя часть: Контент + Графики */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16 mb-10">
        
        {/* Левая часть: Текст */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            SaaS Landing <br /> Page Template
          </h1>
          <p className="text-text-muted text-lg mb-8 max-w-lg">
            This is a template Figma file, turned into code using Anima. 
            Learn more at AnimaApp.com
          </p>
          <button className="bg-accent-yellow text-bg-dark px-10 py-3.5 rounded-xl font-bold text-lg hover:bg-[#E5C00E] transition shadow-[0_10px_20px_-5px_rgba(244,206,20,0.3)] cursor-pointer">
            Get started
          </button>
        </div>

        {/* Правая часть: Динамический Дэшборд */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-xl bg-[#1E1F25] border border-white/5 rounded-[30px] p-2 shadow-2xl">
            <HeroDashboard />
          </div>
        </div>

      </div>

      {/* Нижняя часть: Партнеры (Sandwich style) */}
      {/* py-16 увеличивает высоту "коридора" между линиями */}
      {/* mt-40 отодвигает блок далеко вниз */}
      <div className="w-full border-y border-white/10 py-16 mt-40 mb-10">
        <div className="flex flex-wrap justify-between items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 px-4 md:px-10">
            <img src="public/assets/img/Logos.png" alt="" />
        </div>
      </div>

    </section>
  );
};

export default Hero;