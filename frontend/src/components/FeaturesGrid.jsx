import React from 'react';
import { CreditCard, Ban, Layers } from 'lucide-react';

const FeaturesGrid = () => {
  const features = [
    { icon: <CreditCard className="text-white" size={28} />, color: "bg-blue-500", title: "Customizable card", desc: "Custom your own card for your exact incomes and expenses needs." },
    { icon: <Ban className="text-white" size={28} />, color: "bg-accent-purple", title: "No payment fee", desc: "Transfer your payment all over the world with no payment fee." },
    { icon: <Layers className="text-white" size={28} />, color: "bg-accent-yellow", title: "All in one place", desc: "The right place to keep your credit and debit cards, boarding passes & more." },
  ];

  return (
    <section className="py-32 px-6 md:px-10 max-w-[1200px] mx-auto font-sans">
      {/* 3 Колонки с иконками (без изменений) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center mb-32">
        {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center">
                <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-white/5`}>
                    {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{f.title}</h3>
                <p className="text-text-muted leading-relaxed text-lg">{f.desc}</p>
            </div>
        ))}
      </div>

      {/* Testimonial Блок
          - bg-accent-purple: Фиолетовый фон
          - text-bg-dark: Темный текст (важно для контраста)
      */}
      <div className="bg-accent-purple text-bg-dark rounded-[40px] p-12 md:p-24 text-center">
        {/* Цитата */}
        <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-16 max-w-5xl mx-auto">
            “Wallet is a great product! All of my most important information is there - credit cards, transit cards, boarding passes, tickets, and more. And I don't need to worry because it's all in one place! thanks!”
        </h3>
        
        {/* Блок автора */}
        <div className="flex items-center justify-center gap-5">
            {/* Аватарка картинкой */}
            <img 
                src="src/assets/author.png" 
                alt="Johnny Owens" 
                className="w-14 h-14 rounded-full object-cover shadow-sm"
            />
            
            {/* Колонка с информацией */}
            <div className="flex flex-col items-start">
                {/* Звезды (Черные, наследуют text-bg-dark от родителя) */}
                <div className="flex gap-1 text-xl mb-1 font-bold">
                    ★★★★★
                </div>
                {/* Имя */}
                <p className="font-bold text-lg">Johnny Owens</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;