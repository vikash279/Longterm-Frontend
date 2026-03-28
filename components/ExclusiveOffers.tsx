'use client';


import React from 'react';
import { Copy, Percent, Sparkles, Zap, ArrowRight, Tag } from 'lucide-react';

const ExclusiveOffers: React.FC = () => {
  const offers = [
    { 
      title: "First Galactic", 
      value: "₹4,000 OFF", 
      promo: "COSMICFIRST", 
      accent: "bg-agent-orange", 
      sub: "First Booking Reward",
      tag: "Limited Time" 
    },
    { 
      title: "Premium Flux", 
      value: "₹6,000 OFF", 
      promo: "LUNARLUX", 
      accent: "bg-agent-pink", 
      sub: "Signature Stays Only",
      tag: "Member Exclusive"
    },
    { 
      title: "Zero-G Upgrade", 
      value: "FREE ROOM", 
      promo: "GRAVITYFREE", 
      accent: "bg-slate-900", 
      sub: "Auto-Negotiated Perk",
      tag: "Best Value"
    }
  ];

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 text-center md:text-left">
          <div className="max-w-md">
            <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full mb-3">
              <Tag className="w-3 h-3 text-agent-orange" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">Yield Management</span>
            </div>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-tight">
              Exclusive <span className="text-gradient">Injectable Promos</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium mt-2">Apply these codes for deeper price drops.</p>
          </div>
          
          <button className="group bg-slate-950 text-white px-8 py-3.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center space-x-2 shadow-xl transition-all transform hover:scale-[1.05] active:scale-95">
            <Sparkles className="w-3.5 h-3.5 text-agent-pink" />
            <span>Unlock All Offers</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {offers.map((offer, idx) => (
            <div 
              key={idx} 
              className="group relative rounded-[2.5rem] bg-white border border-slate-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] cursor-pointer overflow-hidden"
            >
              <div className="p-7 h-full flex flex-col justify-between relative">
                {/* Lightning Bolt Icon */}
                <div className="absolute top-7 right-7">
                  <Zap className="w-5 h-5 text-slate-950" strokeWidth={2.5} />
                </div>
                
                <div className="mt-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{offer.title}</p>
                  <h3 className="text-3xl font-black text-slate-950 mb-2 tracking-tighter leading-none">{offer.value}</h3>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{offer.sub}</p>
                </div>
                
                <div className="mt-8 bg-slate-50/50 rounded-2xl p-4 flex justify-between items-center group/promo border border-slate-50">
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Copy Code</p>
                    <span className="font-black text-base text-slate-950 tracking-tighter">{offer.promo}</span>
                  </div>
                  <button className="p-3 rounded-xl bg-white shadow-sm border border-slate-100 text-slate-200 transition-all transform hover:scale-110 active:scale-90 hover:text-slate-400">
                    <Copy className="w-4 h-4" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Verification Footer */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center space-x-3 px-5 py-2 bg-slate-50 rounded-xl border border-slate-100">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">
               Promos validated for next <span className="text-slate-950">14m 22s</span>
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOffers;
