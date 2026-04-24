'use client';


import React from 'react';
/* Added Globe to the lucide-react imports */
import { Gift, Plane, Bus, Train, ChevronRight, Sparkles, Zap, Award, Star, ArrowRight, Globe } from 'lucide-react';

const PerksSection: React.FC = () => {
  const perks = [
    { 
      icon: Gift, 
      title: "Save ₹6,000", 
      desc: "Instant rebate on signature stays", 
      accent: "text-agent-orange",
      border: "border-agent-orange/20",
      bg: "bg-agent-orange/5",
      badge: "PLATINUM"
    },
    { 
      icon: Plane, 
      title: "₹400 Credit", 
      desc: "Yield bonus on domestic routes", 
      accent: "text-agent-blue",
      border: "border-agent-blue/20",
      bg: "bg-agent-blue/5",
      badge: "TITANIUM"
    },
    { 
      icon: Bus, 
      title: "2,000 Coins", 
      desc: "Loyalty multiplier on ground transit", 
      accent: "text-agent-pink",
      border: "border-agent-pink/20",
      bg: "bg-agent-pink/5",
      badge: "ELITE"
    },
    { 
      icon: Award, 
      title: "Priority Pass", 
      desc: "Global lounge access for Master partners", 
      accent: "text-slate-950",
      border: "border-slate-200",
      bg: "bg-slate-50",
      badge: "MASTER"
    },
  ];

  return (
    <section className="bg-white py-24 px-8 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-16">
          
          {/* Left Content: Premium Messaging */}
          <div className="lg:w-[45%] text-center lg:text-left">
            <div className="inline-flex items-center space-x-3 bg-slate-50 border border-slate-100 px-5 py-2 rounded-full mb-8 shadow-sm">
              <Star className="w-4 h-4 text-agent-orange fill-agent-orange" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                Partner Advantage Tiers
              </span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-950 mb-8 leading-[0.9] tracking-tighter">
              Unlock Your <br /> 
              <span className="text-gradient">Agent Perks</span>
            </h2>
            <p className="text-slate-500 text-xl mb-12 font-medium leading-relaxed max-w-sm">
              We provide the tools. You provide the vision. Together, we build travel wealth.
            </p>
            
            <div className="space-y-6 mb-12">
               {[
                 "Real-time commission tracking",
                 "Dedicated relationship concierge",
                 "Wholesale inventory access"
               ].map((item, i) => (
                 <div key={i} className="flex items-center space-x-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                      <Zap className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                    </div>
                    <span className="text-[11px] font-black text-slate-950 uppercase tracking-widest">{item}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Right Cards: High Fidelity Bento Grid */}
          <div className="lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            {perks.map((perk, idx) => {
              const IconComponent = perk.icon;
              return (
                <div 
                  key={idx} 
                  className={`group relative p-10 rounded-[3.5rem] border ${perk.border} ${perk.bg} flex flex-col justify-between min-h-[260px] transition-all duration-700 hover:bg-white hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden transform hover:-translate-y-2`}
                >
                  <div className="absolute top-8 right-8">
                     <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] group-hover:text-agent-pink transition-colors">{perk.badge}</span>
                  </div>

                  <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl border border-slate-100 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6`}>
                    <IconComponent className={`w-7 h-7 ${perk.accent}`} strokeWidth={2.5} />
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-3xl font-black text-slate-950 mb-2 tracking-tight leading-none">
                      {perk.title}
                    </h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                  
                  {/* Interaction Indicator */}
                  <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                     <span className="text-[9px] font-black text-slate-950 uppercase tracking-[0.3em]">Claim Perk</span>
                     <ArrowRight className="w-4 h-4 text-slate-950" />
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>

        {/* System Monitoring: Trust Elements */}
        <div className="pt-10 border-t border-slate-50 flex flex-wrap items-center justify-center gap-10 lg:gap-20">
           <div className="flex items-center space-x-4 group cursor-help">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-agent-blue/5 transition-colors">
                <Globe className="w-5 h-5 text-slate-400 group-hover:text-agent-blue transition-colors" />
              </div>
              <div>
                 <p className="text-slate-950 font-black text-xs uppercase tracking-widest">Global Payouts</p>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">24h Settlement cycle</p>
              </div>
           </div>

           <div className="hidden sm:block w-px h-10 bg-slate-100"></div>

           <div className="flex items-center space-x-4 group cursor-help">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-agent-pink/5 transition-colors">
                <Sparkles className="w-5 h-5 text-slate-400 group-hover:text-agent-pink transition-colors" />
              </div>
              <div>
                 <p className="text-slate-950 font-black text-xs uppercase tracking-widest">Smart Tiers</p>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Dynamic yield adjustments</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default PerksSection;
