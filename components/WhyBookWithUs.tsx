'use client';


import React from 'react';
import { Coffee, TrendingUp, Zap, ShieldCheck, Tag, Briefcase, Star, ChevronRight } from 'lucide-react';

const WhyBookWithUs: React.FC = () => {
  const benefits = [
    { 
      icon: Coffee, 
      title: "Complimentary Breakfast", 
      desc: "Start your morning right at select partner properties.", 
      accent: "from-orange-400 to-red-500",
      num: "01"
    },
    { 
      icon: TrendingUp, 
      title: "Free Room Upgrade", 
      desc: "Automatic bumps to better views and larger spaces.", 
      accent: "from-pink-500 to-rose-600",
      num: "02"
    },
    { 
      icon: Zap, 
      title: "Early Check-in", 
      desc: "Priority access to your suite the moment you arrive.", 
      accent: "from-blue-500 to-indigo-600",
      num: "03"
    },
    { 
      icon: Tag, 
      title: "Direct Hotel Offers", 
      desc: "Rates negotiated by our AI agents specifically for you.", 
      accent: "from-amber-400 to-orange-500",
      num: "04"
    },
    { 
      icon: ShieldCheck, 
      title: "Guaranteed Confirmation", 
      desc: "Your stay is locked in the moment you click—zero failures.", 
      accent: "from-fuchsia-500 to-pink-600",
      num: "05"
    },
    { 
      icon: Briefcase, 
      title: "Partner Program", 
      desc: "The only platform where sharing travels builds wealth.", 
      accent: "from-cyan-500 to-blue-600",
      num: "06"
    },
  ];

  const brands = [
    { name: "Forbes", style: "font-serif tracking-tighter" },
    { name: "CNN Travel", style: "font-black tracking-tight" },
    { name: "CNBC", style: "font-sans font-black italic tracking-tighter" },
    { name: "The Times", style: "font-serif italic font-bold" },
    { name: "Bloomberg", style: "font-sans font-black tracking-tight" },
    { name: "Vogue", style: "font-serif uppercase tracking-[0.3em] font-light" }
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Subtle brand glow in the background */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-agent-orange/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-agent-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full mb-3">
              <span className="flex h-1.5 w-1.5 rounded-full bg-gradient-agent animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">The Edge</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Why <span className="text-gradient">WanderWealth?</span>
            </h2>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl shadow-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=b${i}`} className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="user" />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                <span className="text-xs font-black text-slate-900">4.9/5</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">2M+ Members</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {benefits.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx} 
                className="group relative p-6 rounded-3xl bg-gray-50 border border-transparent hover:border-gray-100 hover:bg-white transition-all duration-500 hover:shadow-[0_15px_40px_-12px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                <span className="absolute -top-2 -right-2 text-7xl font-black text-slate-900/5 group-hover:text-gradient group-hover:opacity-10 transition-all duration-500 select-none">
                  {item.num}
                </span>

                <div className="flex items-center space-x-4 mb-4">
                  <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-gradient-to-br ${item.accent}`}>
                    <IconComponent className="w-5 h-5 text-slate-900 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:translate-x-1 transition-transform">
                    {item.title}
                  </h3>
                </div>

                <div className="relative">
                  <p className="text-sm text-slate-500 leading-relaxed font-medium group-hover:text-slate-600 transition-colors">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center text-[10px] font-black uppercase tracking-widest text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 cursor-pointer">
                  <span>Learn More</span>
                  <ChevronRight className="ml-1 w-3 h-3" />
                </div>
                
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-agent w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            );
          })}
        </div>

        <div className="relative mt-4 border-t border-slate-100/60 pt-10 overflow-hidden group/marquee">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 select-none">
              As seen on global media hubs
            </span>
            
        
            <div className="relative flex w-full overflow-hidden">
              <div className="flex items-center justify-around min-w-full animate-[marquee_30s_linear_infinite] group-hover/marquee:[animation-play-state:paused]">
                {[...brands, ...brands].map((brand, i) => (
                  <div 
                    key={i} 
                    className={`mx-8 text-xl lg:text-2xl text-slate-900 opacity-20 hover:opacity-100 transition-all duration-700 cursor-default select-none grayscale hover:grayscale-0 ${brand.style}`}
                  >
                    {brand.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
         
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>
      </div> */}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default WhyBookWithUs;
