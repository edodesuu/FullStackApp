import React from 'react';
// Lucide иконки больше не нужны, удаляем импорт

const FeaturesGrid = () => {
  const features = [
    { 
      // Путь к картинке первой карточки
      img: "src/assets/card.png", 
      title: "Customizable card", 
      desc: "Custom your own card for your exact incomes and expenses needs." 
    },
    { 
      // Путь к картинке второй карточки
      img: "src/assets/coin.png", 
      title: "No payment fee", 
      desc: "Transfer your payment all over the world with no payment fee." 
    },
    { 
      // Путь к картинке третьей карточки
      img: "src/assets/purse.png", 
      title: "All in one place", 
      desc: "The right place to keep your credit and debit cards, boarding passes & more." 
    },
  ];

  return (
    // Уменьшил отступы: py-32 -> py-24, чтобы блок был компактнее
    <section className="py-24 px-6 md:px-10 max-w-[1200px] mx-auto font-sans">
      
      {/* 3 Колонки с картинками */}
      {/* Уменьшил нижний отступ: mb-32 -> mb-24 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-24">
        {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center">
                {/* Просто выводим картинку. 
                    Убедись, что твои png уже имеют цветной фон (синий/фиолетовый/желтый), как на макете.
                */}
                <div className="mb-6">
                    <img 
                        src={f.img} 
                        alt={f.title} 
                        className="w-16 h-16 object-contain" 
                    />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{f.title}</h3>
                <p className="text-text-muted leading-relaxed text-lg max-w-xs">{f.desc}</p>
            </div>
        ))}
      </div>

      {/* Testimonial Блок (Оставляем идеальным, как было) */}
      <div className="bg-accent-purple text-bg-dark rounded-[40px] p-12 md:p-24 text-center">
        <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-16 max-w-5xl mx-auto">
            “Wallet is a great product! All of my most important information is there - credit cards, transit cards, boarding passes, tickets, and more. And I don't need to worry because it's all in one place! thanks!”
        </h3>
        
        <div className="flex items-center justify-center gap-5">
            <img 
                src="src/assets/author.png" 
                alt="Johnny Owens" 
                className="w-14 h-14 rounded-full object-cover shadow-sm"
            />
            
            <div className="flex flex-col items-start">
                <div className="flex gap-1 text-xl mb-1 font-bold">
                    ★★★★★
                </div>
                <p className="font-bold text-lg">Johnny Owens</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;