'use client';


import React, { useState, useEffect } from 'react';
import { Clock, Star, ArrowLeft, Tag, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Loader2, Zap, Ban, AlertCircle } from 'lucide-react';

interface BookingStatusProps {
  hotel: any;
  onHome: () => void;
  onViewDetail?: (hotel: any) => void;
  onBookNow?: (hotel: any) => void;
  timer: number | null;
}

type Stage = 'pending' | 'results';

const BookingStatus: React.FC<BookingStatusProps> = ({ hotel, onHome, onViewDetail, onBookNow, timer }) => {
  const [stage, setStage] = useState<Stage>('pending');
  const [currentLog, setCurrentLog] = useState(0);

  const logs = [
    "Initializing secure connection to property nodes...",
    "Transmitting offer to Orion Nebula Cluster...",
    "Interrogating real-time availability APIs...",
    "AI Agents negotiating yield adjustments...",
    "Verifying Titanium membership perks...",
    "Waiting for hotelier confirmation..."
  ];

  const competitors = [
    { name: hotel?.name || "The First Collection Dubai Marina", location: "Dubai Marina", img: hotel?.mainImg || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400", price: "₹28,000", rating: 4.6, offer: "10% OFFER FROM HOTEL", isPrimary: true, status: 'accepted' },
    { name: "The Lunar Sanctuary", location: "Moon Crater Tyco", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400", price: "₹25,000", rating: 4.8, offer: "5% OFFER FROM HOTEL", isPrimary: false, status: 'accepted' },
    { name: "Martian Red Sands Resort", location: "Mars Olympus Mons", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400", price: "₹22,000", rating: 4.4, status: 'rejected' },
    { name: "Orbital Ring Hotel", location: "Low Earth Orbit", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=400", price: "₹31,000", rating: 4.7, status: 'waiting' },
    { name: "Titan Methane Lakes Lodge", location: "Saturn Moon Titan", img: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=400", price: "₹19,000", rating: 4.5, status: 'rejected' },
  ];

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLog(prev => (prev + 1) % logs.length);
    }, 1500);

    const transitionTimeout = setTimeout(() => {
      setStage('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 5000);

    return () => {
      clearInterval(logInterval);
      clearTimeout(transitionTimeout);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mm = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const ss = (seconds % 60).toString().padStart(2, '0');
    return { mm, ss };
  };

  const time = formatTime(timer || 600);

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'accepted': return { color: 'text-emerald-500 bg-emerald-50', label: 'ACCEPTED', icon: CheckCircle2 };
      case 'rejected': return { color: 'text-red-500 bg-red-50', label: 'REJECTED', icon: XCircle };
      default: return { color: 'text-slate-400 bg-slate-50', label: 'WAITING', icon: Loader2 };
    }
  };

  if (stage === 'pending') {
    return (
      <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-20 px-4 font-['Plus_Jakarta_Sans'] animate-in fade-in duration-700">
        <div className="max-w-xl mx-auto text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-agent-blue/10 rounded-full animate-ping opacity-25"></div>
            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-xl">
              <Loader2 className="w-10 h-10 text-agent-blue animate-spin" />
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-serif text-slate-900 mb-4 italic tracking-tight leading-tight">Actively Negotiating</h1>
          
          <div className="h-6 mb-12">
            <p className="text-agent-blue text-sm font-black uppercase tracking-widest animate-pulse">
              {logs[currentLog]}
            </p>
          </div>

          <p className="text-slate-400 text-sm font-medium mb-12 leading-relaxed">
            We've contacted <span className="text-slate-950 font-black">5 premium hotels</span>. <br/>
            Real-time bidding is in progress. Offers are time-sensitive.
          </p>

          {/* Large Countdown Timer */}
          <div className="flex flex-col items-center mb-16">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">Initial Offer Lock Time</span>
            <div className="flex items-center justify-center space-x-6">
              <div className="flex flex-col items-center">
                <span className="text-6xl font-serif text-slate-900 tracking-tighter">{time.mm}</span>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1">Minutes</span>
              </div>
              <span className="text-3xl font-serif text-slate-200 pb-5">:</span>
              <div className="flex flex-col items-center">
                <span className="text-6xl font-serif text-slate-900 tracking-tighter">{time.ss}</span>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-20 px-4 font-['Plus_Jakarta_Sans'] animate-in fade-in duration-1000">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Navigation */}
        <div className="max-w-4xl mx-auto px-4 lg:px-0">
          <button onClick={onHome} className="flex items-center space-x-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-10 hover:text-slate-900 transition-colors group">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO EXPLORE</span>
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif text-slate-950 mb-3 italic tracking-tight leading-tight">Great news! 2 hotels accepted.</h1>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Choose your preferred stay before the negotiated rates expire.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-[2rem] px-10 py-4 shadow-xl shadow-slate-200/40 border border-slate-50 flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">NEGOTIATED RATES EXPIRE IN</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-serif text-agent-pink tracking-tighter">{time.mm}</span>
                  <span className="text-[9px] font-black text-slate-300">MIN</span>
                </div>
                <span className="text-xl text-slate-200">:</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-serif text-agent-pink tracking-tighter">{time.ss}</span>
                  <span className="text-[9px] font-black text-slate-300">SEC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROPERTY CARDS WITH STATUS COLORS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16 px-4">
          {competitors.slice(0, 2).map((comp, idx) => {
            const statusStyle = getStatusDisplay(comp.status);
            return (
              <div key={idx} className={`bg-white rounded-[2.2rem] overflow-hidden border transition-all duration-500 hover:-translate-y-1 ${comp.isPrimary ? 'border-agent-pink/30 shadow-2xl shadow-agent-pink/10 ring-1 ring-agent-pink/5' : 'border-slate-100 shadow-xl shadow-slate-200/30'}`}>
                <div className="flex flex-col h-full">
                  <div className="w-full h-44 relative overflow-hidden">
                    <img src={comp.img} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="accepted" />
                    <div className={`absolute top-4 left-4 ${statusStyle.color} px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center space-x-1 shadow-lg border border-white/20`}>
                      <statusStyle.icon className={`w-3 h-3 ${comp.status === 'waiting' ? 'animate-spin' : ''}`} strokeWidth={4} />
                      <span>{statusStyle.label}</span>
                    </div>
                  </div>

                  <div className="flex-1 px-6 py-6 flex flex-col">
                    <div className="mb-auto">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-[17px] font-black text-slate-950 tracking-tighter leading-tight">
                          {comp.name}
                        </h3>
                        <div className="flex items-center space-x-1 text-orange-400 shrink-0 ml-4">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-[11px] font-black">{comp.rating}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] block mb-4">{comp.location}</span>
                      <div className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-xl">
                        <Tag className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest leading-none">{comp.offer}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-50">
                      <div className="flex flex-col">
                         <span className="text-2xl font-black text-slate-950 tracking-tighter leading-none mb-0.5">{comp.price}</span>
                         <span className="text-[8px] text-slate-300 font-black uppercase tracking-[0.1em] italic">total for 1 night</span>
                      </div>
                      <button 
                        onClick={() => comp.isPrimary && onBookNow ? onBookNow(comp) : onViewDetail?.(comp)}
                        className="bg-gradient-agent text-white px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-2 group/btn"
                      >
                        <span>{comp.isPrimary ? 'BOOK NOW' : 'VIEW DETAIL'}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* OTHER REQUESTS IN GHOST UI */}
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center space-x-3 mb-6 px-4">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">OTHER REQUESTS STATUS</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-2.5">
            {competitors.slice(2).map((comp, idx) => {
              const statusStyle = getStatusDisplay(comp.status);
              return (
                <div key={idx} className="bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-3 flex items-center justify-between group transition-all hover:bg-slate-50">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-slate-200/50 grayscale opacity-50">
                      <img src={comp.img} className="w-full h-full object-cover" alt="status" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-slate-400 tracking-tight leading-none mb-1">{comp.name}</span>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{comp.location}</span>
                    </div>
                  </div>
                  
                  <div className={`${statusStyle.color} px-2.5 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] border border-current/20 flex items-center space-x-1.5 shadow-sm`}>
                    <statusStyle.icon className={`w-2.5 h-2.5 ${comp.status === 'waiting' ? 'animate-spin' : ''}`} />
                    <span>{statusStyle.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStatus;
