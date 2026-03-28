'use client';


import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Loader2, 
  Coins, 
  Trophy, 
  Gift, 
  Mic, 
  Copy, 
  Check 
} from 'lucide-react';

interface SignUpProps {
  onLogin: () => void;
  onHome: () => void;
  onLoginSuccess?: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onLogin, onHome, onLoginSuccess }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length < 10) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => onLoginSuccess?.(), 1500);
    }, 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WANDERFIRST');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const benefits = [
    {
      icon: Coins,
      iconColor: "text-[#FF6B35]",
      iconBg: "bg-orange-50",
      title: "Earn goCash",
      desc: "₹100 on Sign Up & Instant Cashback",
    },
    {
      icon: Trophy,
      iconColor: "text-[#2E6BFF]",
      iconBg: "bg-blue-50",
      title: "Loyalty Benefits",
      desc: "Extra Discounts & Free Selection",
    },
    {
      icon: Gift,
      iconColor: "text-[#F23B7B]",
      iconBg: "bg-pink-50",
      title: "Exclusive Offers",
      desc: "Daily Steal Deals & Flash Sales",
    }
  ];

  if (status === 'success') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-['Plus_Jakarta_Sans']">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"></div>
        <div className="relative w-full max-w-[400px] bg-white rounded-[3rem] p-12 text-center shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center border-4 border-emerald-500 shadow-xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" strokeWidth={3} />
            </div>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tighter mb-2">Access Granted</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Re-mapping your travel network...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-['Plus_Jakarta_Sans']">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-500" onClick={onHome}></div>
      
      <div className="relative w-full max-w-[880px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-6 duration-500">
        
        {/* LEFT COLUMN: MINIMALIST BENEFITS */}
        <div className="w-full md:w-[42%] bg-[#F8FAFC] p-8 lg:p-12 flex flex-col relative overflow-hidden shrink-0 border-r border-slate-100">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(46,107,255,0.05),transparent)]"></div>
          
          <h3 className="relative z-10 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">
            UNLOCK SYSTEM BENEFITS
          </h3>

          <div className="relative z-10 space-y-10 flex-1">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start space-x-5 group cursor-default">
                <div className={`w-12 h-12 shrink-0 flex items-center justify-center rounded-xl transition-all group-hover:scale-110 duration-500 ${benefit.iconBg}`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.iconColor}`} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1.5">{benefit.title}</h4>
                  <p className="text-[13px] font-medium text-slate-400 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* COMPACT PROMO CARD */}
          <div className="relative z-10 mt-10 bg-white rounded-[1.8rem] p-6 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-50 group/promo overflow-hidden">
            <div className="flex items-center justify-between mb-0.5">
              <h4 className="text-[18px] font-black text-slate-900 tracking-tighter">FLAT 12% OFF*</h4>
              <Sparkles className="w-4 h-4 text-[#2E6BFF] animate-pulse" />
            </div>
            <p className="text-[12px] font-medium text-slate-400 mb-5">on first booking</p>
            
            <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 flex items-center justify-between transition-all group-hover/promo:bg-slate-100">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">WANDERFIRST</span>
              <button 
                onClick={handleCopyCode}
                className="flex items-center space-x-2 text-[#2E6BFF] font-black text-[10px] uppercase tracking-widest hover:text-blue-700 transition-colors"
              >
                {copied ? <Check size={14} strokeWidth={3} /> : <span className="opacity-70 group-hover/promo:opacity-100">COPY</span>}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CORE FORM */}
        <div className="flex-1 p-8 lg:p-14 flex flex-col relative bg-white">
          <button 
            onClick={onHome}
            className="absolute top-8 right-8 p-2.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all active:scale-90 z-20"
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </button>

          <div className="max-w-[340px] mx-auto w-full my-auto">
            <div className="mb-12 text-left">
              <h2 className="text-[42px] font-black text-slate-950 tracking-tighter leading-[0.9] mb-3">Login/Signup</h2>
              <div className="h-1 w-10 bg-slate-950 rounded-full"></div>
            </div>

            <form className="space-y-8" onSubmit={handleContinue}>
              <div className="relative group">
                <div className={`absolute -top-2.5 left-5 px-2 bg-white z-10 transition-colors duration-300 ${isFocused ? 'text-[#2E6BFF]' : 'text-slate-400'}`}>
                   <span className="text-[10px] font-black uppercase tracking-widest">Mobile Number</span>
                </div>
                
                <div className={`flex items-center border-2 rounded-[1.2rem] transition-all duration-300 h-16 bg-white ${
                  isFocused ? 'border-[#2E6BFF] ring-4 ring-blue-50' : 'border-slate-200 group-hover:border-slate-300'
                }`}>
                  <div className="flex items-center space-x-2 px-5 border-r border-slate-100 cursor-pointer h-full hover:bg-slate-50 transition-colors shrink-0">
                    <img 
                      src="https://flagcdn.com/w40/in.png" 
                      alt="India" 
                      className="w-5 h-3.5 object-cover rounded shadow-sm" 
                    />
                    <span className="text-[15px] font-black text-slate-800">+91</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isFocused ? 'text-blue-600' : 'text-slate-300'}`} strokeWidth={3} />
                  </div>
                  
                  <input 
                    type="tel"
                    autoFocus
                    className="flex-1 px-5 text-[18px] font-black text-slate-950 bg-transparent outline-none tracking-tight appearance-none border-none focus:ring-0 placeholder:text-slate-200"
                    placeholder="00000 00000"
                    value={mobileNumber}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={mobileNumber.length < 10 || status === 'loading'}
                className={`w-full py-4.5 rounded-[1.2rem] font-black text-[13px] uppercase tracking-[0.3em] transition-all transform active:scale-[0.98] relative overflow-hidden group h-16 ${
                  mobileNumber.length >= 10 && status !== 'loading'
                  ? 'bg-slate-950 text-white shadow-xl shadow-slate-200' 
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                {status === 'loading' ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SYNCHRONIZING</span>
                  </div>
                ) : (
                  <span className="relative z-10">CONTINUE</span>
                )}
              </button>
            </form>

            <div className="mt-12 text-center">
              <div className="flex items-center justify-center space-x-2 mb-5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">SECURE ACCESS NODE</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-[260px] mx-auto">
                By proceeding, you agree to WanderWealth's <br/>
                <button className="text-slate-950 font-black hover:text-[#2E6BFF] transition-colors uppercase tracking-widest">Privacy Policy</button> & <button className="text-slate-950 font-black hover:text-[#2E6BFF] transition-colors uppercase tracking-widest">Terms</button>
              </p>
            </div>
          </div>

          {/* COMPACT VOICE TRIGGER */}
          <div className="absolute bottom-8 right-8">
             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 text-slate-950 hover:scale-110 active:scale-95 transition-all group">
                <Mic className="w-5 h-5 transition-transform group-hover:scale-110" strokeWidth={2.5} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
