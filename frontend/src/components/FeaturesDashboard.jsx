import React from 'react';

const FeaturesDashboard = () => {
  return (
    <section className="mt-10 px-4 md:px-10 py-10 max-w-[1400px] mx-auto">
        {/* Контейнер для картинки */}
        <div className="w-full rounded-[40px] overflow-hidden shadow-2xl border border-white/5 bg-[#1E1F25] flex justify-center items-center">
            {/* Путь к картинке. 
                Вставь свой файл 'img.png' в папку: frontend/public/assets/img/ 
            */}
            <img 
                src="src/assets/img.png" 
                alt="Application Preview" 
                className="w-full h-auto object-cover"
            />
        </div>
    </section>
  );
};

export default FeaturesDashboard;