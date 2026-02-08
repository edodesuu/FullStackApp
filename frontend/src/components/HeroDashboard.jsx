import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  PieChart, Pie, Cell, 
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, CartesianGrid, YAxis
} from 'recharts';

const HeroDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/stats/')
      .then(res => {
        // Чтобы круг выглядел как на макете (4 цвета), 
        // мы искусственно разобьем "used" на 3 части + остаток
        const used = res.data.monthly_plan.used;
        const part = used / 3;
        const fakeData = [
            { name: 'A', value: part },
            { name: 'B', value: part },
            { name: 'C', value: part },
            { name: 'Left', value: 100 - used }
        ];
        
        setStats({ ...res.data, pieData: fakeData });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Цвета точно как на макете
  const COLORS = ['#4ADE80', '#3B82F6', '#EF4444', '#F4CE14']; // Green, Blue, Red, Yellow

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1F2128] border border-white/10 p-2 rounded shadow-xl text-xs">
          <p className="text-white">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className="w-full h-full bg-[#2A2D36] animate-pulse rounded-2xl"></div>;

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
      
      {/* 1. Monthly Plan (Разноцветный бублик) */}
      <div className="bg-[#2A2D36] p-5 rounded-2xl relative flex flex-col justify-between min-h-[180px]">
        <div>
            <h4 className="text-sm font-medium text-white border-b border-yellow-500/50 inline-block pb-1">Monthly plan</h4>
        </div>
        
        <div className="w-full h-32 relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={stats.pieData}
                        innerRadius={45} // Тоньше
                        outerRadius={55}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                        startAngle={90}
                        endAngle={-270}
                    >
                        {stats.pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
            {/* Числа вокруг (имитация макета) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="text-xs text-blue-400 absolute top-2 right-8">300</div>
                 <div className="text-xs text-green-400 absolute top-8 left-6">200</div>
                 <div className="text-xs text-red-400 absolute bottom-2 left-10">300</div>
                 <div className="text-xs text-yellow-500 absolute bottom-6 right-6">200</div>
            </div>
        </div>
      </div>

      {/* 2. Spending Frequency (Плавная линия) */}
      <div className="bg-[#2A2D36] p-5 rounded-2xl min-h-[180px] flex flex-col">
        <h4 className="text-sm font-medium text-white border-b border-yellow-500/50 inline-block pb-1 mb-4 w-max">Spending frequency</h4>
        <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.spending_frequency}>
                    <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#F4CE14" 
                        strokeWidth={2} 
                        dot={false} // Убираем точки для "дорогого" вида
                    />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fill: '#6B7280'}} 
                        interval={1}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Weekly Plan (Area Chart с сеткой) */}
      <div className="md:col-span-2 bg-[#2A2D36] p-5 rounded-2xl min-h-[220px] flex flex-col">
        <h4 className="text-sm font-medium text-white border-b border-yellow-500/50 inline-block pb-1 mb-4 w-max">Weekly plan</h4>
        <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.weekly_plan}>
                    <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F4CE14" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#F4CE14" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    {/* Сетка - делает график "техничным" */}
                    <CartesianGrid stroke="#444" vertical={true} horizontal={true} strokeOpacity={0.3} />
                    
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fill: '#6B7280', dy: 10}} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#F4CE14" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorVal)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default HeroDashboard;