'use client';


import React, { useState } from 'react';
import { Wallet, Share2, DollarSign, Users, ArrowUpRight, X, Sparkles, Trophy, Globe, Zap, ArrowRight } from 'lucide-react';
import PerksSection from './PerksSection';

const PartnerProgram: React.FC = () => {
  const [showBenefits, setShowBenefits] = useState(false);

  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden">
      {/* Dynamic Background Auras */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-agent-orange/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-agent-blue/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-slate-100 relative group transition-all duration-700 hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.1)]">
          
          <div className="flex flex-col lg:flex-row items-stretch min-h-[600px]">
            
            {/* Left Column: Cinematic Visual & Social Proof */}
            <div className="lg:w-[42%] relative min-h-[350px] lg:min-h-auto overflow-hidden border-r border-slate-50">
              <div className="absolute inset-0 transition-transform duration-[4s] group-hover:scale-110">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                  alt="Partnership Collaborative Session" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-8 left-8 right-8">
                 <div className="bg-white/85 backdrop-blur-2xl border border-white p-7 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-gradient-agent p-2.5 rounded-xl shadow-lg">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Wealth Report 2025</span>
                    </div>
                    <h4 className="text-3xl font-black text-slate-950 tracking-tighter mb-2">₹4.2 Cr+</h4>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-4">
                      Our top partners generated over <span className="text-slate-950 font-black">₹8.5 Lakhs</span> in commissions last quarter.
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2.5">
                        {[1,2,3,4].map(i => (
                          <img key={i} src={`https://i.pravatar.cc/100?u=p${i}`} className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" alt="partner" />
                        ))}
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">+2.4k Joining Today</span>
                    </div>
                 </div>
              </div>
            </div>
            
            {/* Right Column: High Fidelity Information Layer */}
            <div className="lg:w-[58%] p-10 lg:p-14 flex flex-col justify-center relative bg-white">
              
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-3 bg-slate-50 border border-slate-100 px-5 py-2 rounded-full mb-6 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-agent-pink animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Global Affiliate Protocol
                  </span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-black text-slate-950 mb-6 leading-[1.1] tracking-tighter">
                  Convert Your <br />
                  <span className="text-gradient">Wanderlust Into Wealth</span>
                </h2>
                
                <p className="text-slate-500 text-base font-medium mb-10 max-w-lg leading-relaxed">
                  Join the exclusive network of luxury travel curators who are redefining the business of travel referrals.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                  {[
                    { icon: Share2, title: "Super Nodes", desc: "Automated high-conversion links.", accent: "bg-agent-orange/10 text-agent-orange" },
                    { icon: DollarSign, title: "12% Yield", desc: "Highest referral rates in Asia.", accent: "bg-agent-pink/10 text-agent-pink" },
                    { icon: Wallet, title: "Instant Settles", desc: "Earnings cleared in 24 hours.", accent: "bg-agent-blue/10 text-agent-blue" },
                    { icon: Users, title: "Inner Circle", desc: "Invites to 5-star partner retreats.", accent: "bg-slate-100 text-slate-900" },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-4 group/item cursor-pointer">
                      <div className={`p-4 rounded-[1.4rem] transition-all duration-500 ${benefit.accent} group-hover/item:scale-105 group-hover/item:shadow-lg`}>
                        <benefit.icon className="w-5 h-5" strokeWidth={2.5} />
                      </div>
                      <div className="pt-0.5">
                        <h4 className="font-black text-slate-900 text-base mb-0.5 tracking-tight">{benefit.title}</h4>
                        <p className="text-slate-400 text-[9px] font-bold leading-tight tracking-wide uppercase opacity-70 group-hover/item:opacity-100 transition-opacity">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-4">
                  {/* Small Compact Button */}
                  <button className="group relative bg-slate-950 text-white px-6 py-3.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center space-x-2.5 transition-all transform hover:scale-[1.03] active:scale-95 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-agent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10">Deploy Affiliate ID</span>
                    <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={3} />
                  </button>
                  
                  <button 
                    onClick={() => setShowBenefits(true)}
                    className="group flex items-center space-x-2.5 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-slate-950 transition-all py-1.5"
                  >
                    <span>Analyze Benefits</span>
                    <div className="w-6 h-px bg-slate-200 group-hover:w-9 group-hover:bg-agent-pink transition-all duration-500"></div>
                  </button>
                </div>
              </div>

              {/* Real-time Ticker Decor */}
              <div className="absolute bottom-10 right-10 hidden xl:flex items-center space-x-3 opacity-20 select-none">
                 <Globe className="w-3.5 h-3.5 animate-spin-slow" />
                 <span className="text-[9px] font-mono font-black uppercase tracking-widest">Load: 12% • Node: MUM-92</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Modal (Luxury Grade UI) */}
      {showBenefits && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <div 
            className="absolute inset-0 bg-white/40 backdrop-blur-3xl transition-opacity duration-700 animate-in fade-in"
            onClick={() => setShowBenefits(false)}
          ></div>
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[3.5rem] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] bg-white border border-slate-100 animate-in fade-in zoom-in-95 slide-in-from-bottom-10 duration-700 custom-scrollbar">
            
            {/* Modal Header */}
            <div className="sticky top-0 right-0 z-[110] flex justify-end p-8 pointer-events-none">
              <button 
                onClick={() => setShowBenefits(false)}
                className="pointer-events-auto p-4 bg-slate-950 text-white rounded-[1.5rem] transition-all hover:scale-110 active:scale-90 shadow-2xl hover:rotate-90 duration-500"
              >
                <X className="w-6 h-6" strokeWidth={3} />
              </button>
            </div>
            
            <div className="-mt-16">
              <PerksSection />
              
              {/* Additional Modal Footer Context */}
              <div className="px-10 lg:px-20 pb-20 -mt-10">
                 <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-md">
                       <h5 className="text-xl font-black text-slate-950 mb-1.5 tracking-tight">Ready to integrate?</h5>
                       <p className="text-slate-500 text-xs font-medium">Join 2,400+ premium partners and start building your travel empire with WanderWealth.</p>
                    </div>
                    <button className="bg-gradient-agent text-white px-8 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.25em] flex items-center space-x-2.5 shadow-xl hover:scale-105 active:scale-95 transition-all">
                       <span>Apply for Master Tier</span>
                       <Zap className="w-4 h-4 fill-current" />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PartnerProgram;
