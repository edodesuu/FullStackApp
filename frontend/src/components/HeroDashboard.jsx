import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  PieChart, Pie, Cell, 
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, CartesianGrid
} from 'recharts';

const HeroDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/stats/')
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Цвета для Customer Rate (строго в порядке данных с бэка: 5 звезд, 4, 3, 2)
  // 5 Stars -> Green, 4 -> Blue, 3 -> Yellow, 2 -> Red
  const PIE_COLORS = ['#4ADE80', '#3B82F6', '#F4CE14', '#EF4444']; 

  // Тултип без слова "Value"
  const CustomTooltip = ({ active, payload, label, prefix = "", suffix = "" }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1F2128] border border-white/10 p-2 rounded shadow-xl text-xs z-50">
          <p className="text-white font-bold">
            {prefix}{payload[0].value.toLocaleString()}{suffix}
          </p>
          {/* Если есть label (например дата), покажем его мелко */}
          {label && <p className="text-gray-400 mt-1">{label}</p>}
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className="w-full h-full bg-[#2A2D36] animate-pulse rounded-2xl"></div>;

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
      
      {/* 1. Customer Rate (Pie Chart) */}
      <div className="bg-[#2A2D36] p-5 rounded-2xl relative flex flex-col justify-between min-h-[180px]">
        <div>
            <h4 className="text-sm font-medium text-white border-b border-yellow-500/50 inline-block pb-1">Customer Rate</h4>
        </div>
        
        <div className="w-full h-32 relative mt-2">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={stats.customer_rate}
                        innerRadius={45}
                        outerRadius={58}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                    >
                        {stats.customer_rate.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
            
            {/* Текст внутри бублика (Сумма или среднее, но можно просто декоративный процент) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <span className="text-white font-bold text-xl">4.8</span>
            </div>
            
            {/* Динамические цифры по углам (берем из stats) */}
            <div className="absolute inset-0 pointer-events-none text-[10px] font-bold opacity-80">
                 {/* 5 звезд (Зеленый) */}
                 <div className="text-green-400 absolute top-0 right-4">{stats.customer_rate[0].value}</div>
                 {/* 4 звезды (Синий) */}
                 <div className="text-blue-400 absolute bottom-4 right-0">{stats.customer_rate[1].value}</div>
                 {/* 3 звезды (Желтый) */}
                 <div className="text-yellow-400 absolute bottom-0 left-4">{stats.customer_rate[2].value}</div>
                 {/* 2 звезды (Красный) */}
                 <div className="text-red-400 absolute top-4 left-0">{stats.customer_rate[3].value}</div>
            </div>
        </div>
      </div>

      {/* 2. Usage Statistics (Line Chart) */}
      <div className="bg-[#2A2D36] p-5 rounded-2xl min-h-[180px] flex flex-col">
        <h4 className="text-sm font-medium text-white border-b border-yellow-500/50 inline-block pb-1 mb-4 w-max">Usage Statistics</h4>
        <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.usage_statistics}>
                    <Tooltip 
                        cursor={{stroke: 'white', strokeWidth: 1, strokeDasharray: '4 4'}} 
                        content={<CustomTooltip />} 
                    />
                    <Line 
                        type="monotone" // Максимальная плавность
                        dataKey="value" 
                        stroke="#F4CE14" 
                        strokeWidth={3} 
                        dot={{r: 3, fill: '#F4CE14', strokeWidth: 0}} // Маленькие аккуратные точки
                        activeDot={{r: 6, stroke: '#fff', strokeWidth: 2}}
                    />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 9, fill: '#6B7280'}} 
                        interval={0}
                        dy={5}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Weekly Plan (Area Chart - Сбор средств) */}
      <div className="md:col-span-2 bg-[#2A2D36] p-5 rounded-2xl min-h-[220px] flex flex-col">
        <div className="flex justify-between items-end mb-4 border-b border-gray-700 pb-2">
            <h4 className="text-sm font-medium text-white border-b border-yellow-500/50 inline-block pb-1">Weekly plan</h4>
            {/* Показываем последнюю (текущую) сумму */}
            <span className="text-green-400 font-bold text-lg">
                ${stats.weekly_plan[stats.weekly_plan.length - 1].value.toLocaleString()}
            </span>
        </div>
        
        <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.weekly_plan}>
                    <defs>
                        <linearGradient id="colorMoney" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F4CE14" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#F4CE14" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#444" vertical={false} strokeOpacity={0.3} strokeDasharray="3 3" />
                    
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fill: '#9CA3AF', dy: 10}} 
                    />
                    <Tooltip content={<CustomTooltip prefix="$" />} />
                    
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#F4CE14" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorMoney)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default HeroDashboard;