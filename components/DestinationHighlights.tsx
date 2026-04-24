'use client';


import React, { useState } from 'react';
import { 
  ChevronRight, 
  Compass, 
  MapPin, 
  Zap, 
  Thermometer, 
  CalendarDays,
  UserCheck,
  Heart,
  Activity,
  Sparkles
} from 'lucide-react';

const DestinationHighlights: React.FC = () => {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const dests = [
    { 
      title: "Mauritius", 
      sub: "Lush Reefs", 
      price: "₹1.42L",
      original: "₹1.85L",
      savings: "24%",
      trending: "High Demand",
      temp: "27°C",
      bestMonth: "Oct-Dec",
      img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=800",
      accent: "from-orange-500/30"
    },
    { 
      title: "Maldives", 
      sub: "Over-water Bliss", 
      price: "₹2.10L",
      original: "₹2.55L",
      savings: "18%",
      trending: "Hot Pick",
      temp: "29°C",
      bestMonth: "Nov-Apr",
      img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800",
      accent: "from-pink-500/30"
    },
    { 
      title: "Switzerland", 
      sub: "Alpine Luxury", 
      price: "₹1.88L",
      original: "₹2.72L",
      savings: "31%",
      trending: "Seasonal",
      temp: "4°C",
      bestMonth: "Dec-Mar",
      img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800",
      accent: "from-blue-500/30"
    },
    { 
      title: "Bordeaux", 
      sub: "Vintage Estates", 
      price: "₹94k",
      original: "₹1.1L",
      savings: "15%",
      trending: "Curated",
      temp: "19°C",
      bestMonth: "Jun-Sep",
      img: "https://images.unsplash.com/photo-1506318164473-2dfd3ede3623?auto=format&fit=crop&q=80&w=800",
      accent: "from-slate-900/30"
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-agent-orange/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Compact Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 text-agent-pink" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Prime Portfolio</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-950 tracking-tighter leading-tight">
              Popular <span className="text-gradient">Global Getaways</span>
            </h2>
          </div>
          
          <button className="group flex items-center space-x-2.5 bg-slate-50 text-slate-900 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-white hover:shadow-xl hover:border-slate-200 active:scale-95">
            <span>Explore All</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
          </button>
        </div>

        {/* Compact 4-Column Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dests.map((dest, idx) => (
            <div 
              key={idx} 
              className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] transition-all duration-700 cursor-pointer border border-slate-100/50"
            >
              {/* Media Layer */}
              <div className="absolute inset-0 transition-transform duration-[2000ms] group-hover:scale-110">
                <img src={dest.img} alt={dest.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${dest.accent} to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>
              </div>

              {/* Controls Overlay - Compact */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                <button 
                  onClick={(e) => toggleLike(idx, e)}
                  className={`p-2.5 rounded-xl backdrop-blur-2xl border border-white/20 shadow-xl transition-all duration-500 ${liked[idx] ? 'bg-pink-500 text-white scale-110' : 'bg-white/10 text-white hover:bg-white/30'}`}
                >
                  <Heart className={`w-3.5 h-3.5 ${liked[idx] ? 'fill-current' : ''}`} strokeWidth={3} />
                </button>

                <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-center border border-white/20 shadow-lg">
                  <p className="text-[10px] font-black text-slate-950 tracking-tighter">-{dest.savings}</p>
                </div>
              </div>

              {/* Minimalist Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-30 transition-all duration-500 group-hover:pb-6">
                <div className="bg-white/10 backdrop-blur-3xl border border-white/10 p-5 rounded-[2rem] transition-all duration-700 group-hover:bg-white/20 group-hover:border-white/30">
                  <div className="flex items-center space-x-1.5 text-agent-orange mb-1">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em]">Verified Node</span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-1 tracking-tighter leading-none">{dest.title}</h3>
                  <p className="text-white/50 text-[9px] font-bold uppercase tracking-widest mb-4 line-clamp-1">{dest.sub}</p>

                  {/* Hidden Content revealed on hover - Compact version */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-700 overflow-hidden">
                    <div className="flex items-center justify-between mb-4 pt-3 border-t border-white/10">
                      <div className="flex flex-col">
                        <span className="text-white/30 text-[8px] font-black line-through mb-0.5">{dest.original}</span>
                        <span className="text-xl font-black text-white tracking-tighter">{dest.price}</span>
                      </div>
                      <div className="flex flex-col items-end text-[9px] font-black text-white/60">
                        <span className="flex items-center space-x-1"><Thermometer className="w-2.5 h-2.5" /> <span>{dest.temp}</span></span>
                        <span className="flex items-center space-x-1"><CalendarDays className="w-2.5 h-2.5" /> <span>{dest.bestMonth}</span></span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-white text-slate-950 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-all hover:bg-agent-orange hover:text-white">
                      <span>Instant Secure</span>
                      <Zap className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Verification Ticker */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl">
             <div className="flex items-center -space-x-1.5">
                {[1,2,3].map(i => (
                   <img key={i} src={`https://i.pravatar.cc/100?u=d${i}`} alt="user" className="w-6 h-6 rounded-full border-2 border-white shadow-sm" />
                ))}
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <span className="text-emerald-500">Live:</span> 1.4k travelers planning nodes right now
             </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DestinationHighlights;
