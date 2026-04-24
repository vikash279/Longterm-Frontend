'use client';


import React, { useState, useEffect } from 'react';
import { Activity, Cpu, ArrowRight, Sparkles, CheckCircle2, RefreshCw, TrendingDown } from 'lucide-react';

const NegotiationEngine: React.FC = () => {
  const [prices, setPrices] = useState([84200, 34500, 28900, 52400, 31800]);
  const [activeNode, setActiveNode] = useState(0);
  const [tick, setTick] = useState(0);

  // Simulate real-time price negotiation "jitter" before settling
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map((p, i) => {
        // Last one is settled
        if (i === 4) return p; 
        const change = Math.floor(Math.random() * 20) - 10;
        return p + (tick % 5 === 0 ? change : 0);
      }));
      setTick(t => t + 1);
      if (tick % 15 === 0) {
        setActiveNode(prev => (prev + 1) % 5);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [tick]);

  const biddingHotels = [
    { hotel: "Aman Tokyo", current: `¥${prices[0].toLocaleString()}`, drop: "-24%", progress: 85, original: "₹1.1L", id: 0 },
    { hotel: "The St. Regis", current: `₹${prices[1].toLocaleString()}`, drop: "-18%", progress: 62, original: "₹42K", id: 1 },
    { hotel: "Four Seasons", current: `₹${prices[2].toLocaleString()}`, drop: "-15%", progress: 45, original: "₹34K", id: 2 },
    { hotel: "Ritz-Carlton", current: `₹${prices[3].toLocaleString()}`, drop: "-27%", progress: 78, original: "₹72K", id: 3 },
    { hotel: "Six Senses", current: "₹31,800", drop: "-32%", progress: 100, original: "₹46K", id: 4 },
  ];

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-agent-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-agent-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-agent-pink" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Super Agent AI Deployment</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-950 leading-tight tracking-tight">
              Hyper‑Negotiation <span className="text-gradient font-black">Engine™</span>
            </h2>
          </div>
          
          <div className="hidden sm:flex items-center bg-white px-4 py-2 rounded-xl border border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest italic shadow-sm">
            <Activity className="w-3.5 h-3.5 text-emerald-500 mr-2 animate-pulse" />
            <span>Active Nodes: Global 01-05</span>
          </div>
        </div>

        <div className="relative bg-white rounded-[2.5rem] p-1 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
          <div className="relative bg-white rounded-[2.4rem] p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Active Negotiation List */}
              <div className="lg:col-span-7 space-y-2 relative">
                {biddingHotels.map((bid, i) => (
                  <div key={i} className={`group/row relative p-4 bg-white border rounded-[1.8rem] transition-all duration-500 ${activeNode === i ? 'border-agent-blue/30 shadow-lg shadow-slate-100/50' : 'border-slate-100'}`}>
                    {activeNode === i && bid.progress < 100 && (
                      <div className="absolute top-1.5 right-6 flex items-center space-x-1.5">
                        <span className="text-[7px] font-black text-agent-blue animate-pulse">NEGOTIATING...</span>
                        <RefreshCw className="w-2.5 h-2.5 text-agent-blue animate-spin" />
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-2 px-1">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${bid.progress === 100 ? 'bg-emerald-500' : 'bg-agent-blue animate-ping'}`} />
                        <h4 className="font-black text-slate-900 text-sm tracking-tight truncate">{bid.hotel}</h4>
                      </div>
                      
                      <div className="flex items-center space-x-3 shrink-0">
                         <span className="text-[9px] font-bold text-slate-300 line-through tracking-tight italic">{bid.original}</span>
                         <span className={`text-base font-black tracking-tighter transition-colors ${activeNode === i ? 'text-agent-blue' : 'text-slate-950'}`}>
                            {bid.current}
                         </span>
                         <span className={`text-[8px] font-black px-2 py-1 rounded-lg border transition-colors ${bid.progress === 100 ? 'text-emerald-600 bg-emerald-50/80 border-emerald-100/50' : 'text-agent-pink bg-pink-50/80 border-pink-100/50'}`}>
                           {bid.drop}
                         </span>
                      </div>
                    </div>
                    
                    <div className="px-1 relative overflow-hidden rounded-full">
                      <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden relative">
                         <div 
                           className="h-full bg-gradient-agent transition-all duration-[2000ms] ease-out shadow-[0_0_10px_rgba(46,107,255,0.2)]"
                           style={{ width: `${bid.progress}%` }}
                         />
                         {activeNode === i && bid.progress < 100 && (
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/4 animate-[shimmer_1.5s_infinite]" />
                         )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: COMPACT DECISION CARD */}
              <div className="lg:col-span-5">
                <div className="h-full relative bg-white border border-slate-100 rounded-[2.5rem] p-7 flex flex-col justify-between overflow-hidden group/decision shadow-2xl shadow-slate-200/10 min-h-[380px]">
                   
                   <div className="relative z-10">
                      {/* Top Header Row - Slim */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="inline-flex items-center space-x-1.5 bg-[#E6F9FB]/80 border border-[#BFF6FF]/60 px-3.5 py-1.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-[#00A3C2]" strokeWidth={3} />
                          <span className="text-[8px] font-black uppercase tracking-[0.15em] text-[#00A3C2]">Verified Price Floor</span>
                        </div>
                        <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm text-slate-300 group-hover/decision:text-slate-900 transition-colors">
                          <Cpu size={16} strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* Title - Compact */}
                      <div className="flex items-center space-x-2 mb-3">
                        <h4 className="text-3xl font-black tracking-tighter text-slate-950 leading-none">Target Locked</h4>
                        <div className="flex space-x-1 mt-1">
                          {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
                        </div>
                      </div>
                      
                      <p className="text-slate-400 text-[13px] font-medium leading-relaxed mb-8 max-w-[280px]">
                        Our agents have finalized negotiations for your selected dates with real-time API handshakes.
                      </p>
                      
                      {/* Price Block - Refined Size */}
                      <div className="mb-2 flex items-center space-x-3">
                        <span className="text-5xl font-black tracking-tighter text-slate-950 italic">₹31,800</span>
                        <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                           <ArrowRight size={16} strokeWidth={3} />
                        </div>
                      </div>

                      {/* Savings Label - Compact */}
                      <div className="flex items-center space-x-1.5 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span>Saving you ₹14,200 today</span>
                      </div>
                   </div>

                   {/* Compact Gradient Button */}
                   <div className="relative z-10 mt-6">
                      <button className="w-full bg-gradient-to-r from-[#FF6B35] via-[#F23B7B] to-[#0f172a] p-[1.5px] rounded-full transition-all transform hover:scale-[1.02] active:scale-98 shadow-xl">
                        <div className="bg-transparent text-white py-4 px-6 rounded-full font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 group/btn">
                          <span>Lock Best Rate</span>
                          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1.5" strokeWidth={3} />
                        </div>
                      </button>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </section>
  );
};

export default NegotiationEngine;
