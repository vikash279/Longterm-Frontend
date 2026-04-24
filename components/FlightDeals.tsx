'use client';


import React from 'react';
import { Plane, TrendingDown, MoveRight, Sparkles, Globe, History } from 'lucide-react';

const FlightDeals: React.FC = () => {
  const deals = [
    { from: "Kolkata", to: "UAE", price: "₹18,400", drop: "-15%", status: "TOP DEAL", color: "text-orange-500", bg: "bg-orange-50/50" },
    { from: "Mumbai", to: "Malaysia", price: "₹14,200", drop: "-22%", status: "LOWEST", color: "text-pink-500", bg: "bg-pink-50/50" },
    { from: "Delhi", to: "Goa", price: "₹3,100", drop: "HOT", status: "SELLING FAST", color: "text-indigo-500", bg: "bg-indigo-50/50" },
    { from: "Bangalore", to: "Rajasthan", price: "₹5,400", drop: "LOW", status: "BEST TIME", color: "text-emerald-500", bg: "bg-emerald-50/50" },
  ];

  return (
    <section className="py-10 bg-[#FAFBFF] border-y border-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Side: Header & Context (Ultra-Compact) */}
          <div className="lg:w-[28%] text-left pt-2">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-indigo-600">AI Live Scanner</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
              Real-time <br />
              <span className="text-gradient">Deal Scanner</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 max-w-[240px]">
              Catch automated price drops with our 24/7 hyper-yield monitoring hub.
            </p>
            <button className="bg-slate-950 text-white px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center space-x-2 shadow-lg hover:shadow-indigo-100 hover:-translate-y-0.5 transition-all active:scale-95">
              <span>Book Flights</span>
              <MoveRight className="w-3.5 h-3.5" />
            </button>
            
            <div className="mt-8 flex items-center space-x-2">
               <div className="flex -space-x-1.5">
                 {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full bg-slate-200 border border-white" />)}
               </div>
               <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">12k tracking now</span>
            </div>
          </div>

          {/* Right Side: Grid of Cards (High Density) */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {deals.map((deal, idx) => (
              <div 
                key={idx} 
                className={`group relative bg-white border border-slate-100 rounded-[1.8rem] p-4 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer`}
              >
                {/* Accent Background Glow */}
                <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full blur-2xl opacity-10 ${deal.bg}`} />
                
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-slate-900 group-hover:text-white transition-colors">
                          <Plane className="w-3.5 h-3.5" />
                        </div>
                        <span className={`${deal.color} text-[8px] font-black px-2 py-0.5 rounded bg-opacity-10 border border-current uppercase tracking-wider`}>
                          {deal.status}
                        </span>
                      </div>
                      <span className="text-emerald-500 font-black text-[10px] flex items-center bg-emerald-50 px-2 py-0.5 rounded">
                        <TrendingDown className="w-2.5 h-2.5 mr-1" />
                        {deal.drop}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="text-[11px] font-bold text-slate-400">{deal.from}</span>
                      <MoveRight className="w-3 h-3 text-slate-200" />
                      <span className="text-[13px] font-black text-slate-900 tracking-tight">{deal.to}</span>
                    </div>
                    
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-black text-slate-900 tracking-tighter">{deal.price}</span>
                      <span className="text-[9px] text-slate-300 font-bold line-through">₹22k</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-[8px] font-black text-slate-300 uppercase tracking-widest">
                      <History className="w-2.5 h-2.5" />
                      <span>2m ago</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-950 group-hover:text-white transition-all transform group-hover:translate-x-0.5">
                      <MoveRight className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Live Feed Status Bar (High Density) */}
            <div className="sm:col-span-2 mt-1 bg-white border border-slate-100 rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3">
                 <div className="relative flex h-1.5 w-1.5">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                 </div>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                   System Status: <span className="text-slate-900">Scanning Global Hubs</span>
                 </p>
              </div>
              <div className="hidden sm:flex items-center space-x-1.5 text-[8px] font-black text-indigo-600 uppercase tracking-[0.2em] cursor-pointer hover:text-indigo-800 transition-colors">
                <span>All Deals</span>
                <Globe className="w-3 h-3" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FlightDeals;
