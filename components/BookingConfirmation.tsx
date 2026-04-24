'use client';


import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowLeft, 
  MapPin, 
  Star, 
  ShieldCheck, 
  ChevronRight, 
  Info,
  LogIn,
  PlusCircle,
  AlertTriangle,
  ChevronDown,
  Tag,
  ArrowRight,
  X,
  Clock,
  UserCheck,
  Zap,
  Coffee,
  Ban,
  Phone,
  Baby,
  Bed,
  ListFilter,
  Download,
  Calendar,
  Users
} from 'lucide-react';

interface BookingConfirmationProps {
  hotel: any;
  onHome: () => void;
  onManageBooking?: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ hotel, onHome, onManageBooking }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState('SMARTDEAL');
  const [showRulesModal, setShowRulesModal] = useState(false);

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const ResortRulesModal = () => {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
        <div 
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" 
          onClick={() => setShowRulesModal(false)}
        />
        <div className="relative w-full max-w-7xl max-h-[95vh] bg-white rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col border border-slate-100">
          <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-between bg-white shrink-0">
            <div>
              <h2 className="text-3xl font-serif text-[#0F172A] font-medium tracking-tight">Stay Protocols</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1">Reviewing the guidelines for your voyage</p>
            </div>
            <button 
              onClick={() => setShowRulesModal(false)}
              className="p-4 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all active:scale-90"
            >
              <X className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-[#FDFDFD]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500"><Clock className="w-6 h-6" /></div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Timing</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-50">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Check-in</span>
                    <span className="text-lg font-black text-slate-900">1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-50">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Check-out</span>
                    <span className="text-lg font-black text-slate-900">11:00 AM</span>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500"><Zap className="w-6 h-6" /></div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Must Read</h3>
                </div>
                <ul className="space-y-3">
                  {["Passport, DL, Aadhaar accepted.", "No pets allowed.", "Outside food not permitted."].map((txt, i) => (
                    <li key={i} className="flex items-center space-x-3 text-[13px] font-bold text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{txt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-black uppercase tracking-widest mb-4">Fine Print</h3>
                  <p className="text-[11px] text-white/50 font-medium leading-relaxed">
                    Admision remains at property discretion. Rates secured by WanderWealth AI agents are fixed for the confirmed duration.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-10 border-t border-slate-50 bg-white flex justify-center shrink-0">
             <button onClick={() => setShowRulesModal(false)} className="w-full max-w-sm bg-slate-950 text-white py-5 rounded-full font-black text-xs uppercase tracking-[0.4em]">I Acknowledge</button>
          </div>
        </div>
      </div>
    );
  };

  // SUCCESS SCREEN
  if (isConfirmed) {
    return (
      <div className="min-h-screen pt-[120px] pb-20 px-4 bg-[#F8FAFC] font-['Plus_Jakarta_Sans'] animate-in fade-in duration-700">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100 shadow-xl shadow-emerald-500/10">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" strokeWidth={3} />
            </div>
            <h1 className="text-5xl font-serif text-[#0F172A] mb-3 font-medium tracking-tight">Booking Confirmed!</h1>
            <p className="text-slate-500 font-medium max-w-lg mx-auto">
              Your voyage to <span className="text-slate-950 font-bold">{hotel?.name || 'Orbital Ring Hotel'}</span> is secured. 
              Voucher and itinerary have been dispatched to your email.
            </p>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden mb-12 transform hover:scale-[1.01] transition-transform duration-500">
            <div className="p-10 flex items-center justify-between border-b border-slate-50 bg-[#FDFDFD]">
               <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
                    <img src={hotel?.mainImg} className="w-full h-full object-cover" alt="hotel" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-[#0F172A] font-medium tracking-tight mb-1">{hotel?.name}</h3>
                    <div className="flex items-center space-x-3">
                       <span className="text-[12px] font-medium text-slate-400 flex items-center">
                         <MapPin size={14} className="mr-1.5 opacity-60" /> {hotel?.locationDetail}
                       </span>
                    </div>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">NEGOTIATED PRICE</p>
                  <p className="text-3xl font-black text-[#0F172A] tracking-tighter italic">{hotel?.price}</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-10">
               <div>
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3">CHECK-IN</p>
                 <h4 className="text-[19px] font-bold text-[#0F172A] leading-none mb-1">13 Feb 2026</h4>
                 <p className="text-[12px] font-medium text-slate-400">01:00 PM</p>
               </div>
               <div>
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3">CHECK-OUT</p>
                 <h4 className="text-[19px] font-bold text-[#0F172A] leading-none mb-1">14 Feb 2026</h4>
                 <p className="text-[12px] font-medium text-slate-400">11:00 AM</p>
               </div>
               <div className="lg:border-l lg:border-slate-50 lg:pl-10">
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3">GUEST DETAIL</p>
                 <h4 className="text-[17px] font-bold text-[#0F172A] leading-none mb-1">Ayush Bansal</h4>
                 <p className="text-[12px] font-medium text-slate-400 flex items-center"><Users size={12} className="mr-1.5 opacity-60" /> 2 Adults</p>
               </div>
            </div>

            <div className="bg-slate-50/50 p-6 px-10 flex items-center justify-between">
               <div className="flex items-center space-x-2 text-emerald-600">
                  <ShieldCheck size={18} />
                  <span className="text-[11px] font-black uppercase tracking-widest">Price Protection Confirmed</span>
               </div>
               <button className="flex items-center space-x-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
                  <Download size={14} />
                  <span>Download Voucher</span>
               </button>
            </div>
          </div>

          {/* Prominent Action Area */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button 
               onClick={onManageBooking}
               className="w-full sm:w-auto bg-slate-950 text-white px-12 py-5 rounded-[1.8rem] font-black text-[13px] uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-3 active:scale-95 group"
             >
                <Zap className="w-4 h-4 text-agent-orange group-hover:animate-pulse" />
                <span>Manage Booking</span>
             </button>
             <button 
               onClick={onHome}
               className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 px-12 py-5 rounded-[1.8rem] font-black text-[13px] uppercase tracking-[0.3em] shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center"
             >
                Exit to Explorer
             </button>
          </div>
        </div>
      </div>
    );
  }

  // REVIEW & FORM SCREEN (PRE-PAYMENT)
  return (
    <div className="min-h-screen pt-[120px] pb-20 px-4 bg-[#F8FAFC] font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-10">
          <button onClick={onHome} className="p-3 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[34px] font-serif text-[#0F172A] font-medium tracking-tight">Finalize Reservation</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            {/* Property Summary Card */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 flex items-start space-x-8 border-b border-slate-50">
                <div className="w-48 h-32 rounded-3xl overflow-hidden shrink-0 shadow-lg border border-slate-100">
                  <img src={hotel?.mainImg} className="w-full h-full object-cover" alt="property" />
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-3xl font-serif text-[#0F172A] font-medium tracking-tight">{hotel?.name}</h2>
                    <div className="bg-orange-50 px-3 py-1.5 rounded-xl flex items-center space-x-1.5 border border-orange-100">
                      <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                      <span className="text-[12px] font-black text-orange-700">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[14px] font-medium text-slate-400 mb-6">
                    <MapPin className="w-4 h-4 opacity-50" />
                    <span>{hotel?.locationDetail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-black text-agent-pink uppercase tracking-[0.3em] border border-pink-100 px-3 py-1 rounded-lg bg-pink-50/30">ELITE CHOICE</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 relative border-b border-slate-50">
                <div className="p-8 border-r border-slate-50">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] block mb-3">CHECK-IN</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-black text-slate-900">Fri 13 Feb</span>
                    <span className="text-sm text-slate-400 font-bold tracking-widest uppercase">2026</span>
                  </div>
                  <span className="text-[12px] text-slate-400 font-bold mt-1.5 block">01:00 PM</span>
                </div>
                <div className="p-8 text-right">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] block mb-3">CHECK-OUT</span>
                  <div className="flex items-baseline justify-end space-x-2">
                    <span className="text-2xl font-black text-slate-900">Sat 14 Feb</span>
                    <span className="text-sm text-slate-400 font-bold tracking-widest uppercase">2026</span>
                  </div>
                  <span className="text-[12px] text-slate-400 font-bold mt-1.5 block">11:00 AM</span>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0F172A] text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                   1 Night | 2 Adults
                </div>
              </div>

              <div className="p-10">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-xl font-black text-slate-900 tracking-tight">Standard Orbit Suite</h3>
                   <button onClick={() => setShowRulesModal(true)} className="text-[11px] font-black text-[#00A3C2] uppercase tracking-[0.3em] hover:opacity-70 transition-opacity flex items-center space-x-2">
                      <ListFilter size={14} />
                      <span>Review Protocols</span>
                   </button>
                </div>
                <div className="grid grid-cols-2 gap-y-4 text-[14px] text-slate-500 font-medium">
                   {["Breakfast included", "Smart City View", "Priority Node Access", "Quantum Wi-Fi"].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#00A3C2]"></div>
                         <span>{item}</span>
                      </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Guest Details Form */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden p-10">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-serif text-[#0F172A] font-medium tracking-tight">Guest Information</h2>
                <div className="flex items-center space-x-2 text-[#00A3C2] bg-[#E6F9FB] px-4 py-2 rounded-xl border border-[#BFF6FF]">
                   <ShieldCheck size={18} />
                   <span className="text-[10px] font-black uppercase tracking-widest">ID Verified Node</span>
                </div>
              </div>

              <div className="space-y-8">
                 <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">TITLE</label>
                       <div className="relative">
                          <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-[15px] font-bold appearance-none outline-none focus:border-agent-blue transition-colors">
                             <option>Mr.</option><option>Ms.</option><option>Dr.</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                       </div>
                    </div>
                    <div className="col-span-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">FIRST NAME</label>
                       <input type="text" className="w-full bg-white border border-slate-200 rounded-2xl p-5 text-[15px] font-bold outline-none focus:border-agent-blue transition-all" defaultValue="Ayush" />
                    </div>
                    <div className="col-span-5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">LAST NAME</label>
                       <input type="text" className="w-full bg-white border border-slate-200 rounded-2xl p-5 text-[15px] font-bold outline-none focus:border-agent-blue transition-all" defaultValue="Bansal" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">EMAIL ADDRESS</label>
                       <input type="email" className="w-full bg-white border border-slate-200 rounded-2xl p-5 text-[15px] font-bold outline-none focus:border-agent-blue transition-all" defaultValue="ayush.bansal@gmail.com" />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">MOBILE NUMBER</label>
                       <div className="flex border border-slate-200 rounded-2xl overflow-hidden focus-within:border-agent-blue transition-colors">
                          <div className="bg-slate-50 px-5 flex items-center border-r border-slate-200 font-bold text-slate-500">+91</div>
                          <input type="tel" className="flex-1 p-5 text-[15px] font-bold outline-none" placeholder="9876543210" />
                       </div>
                    </div>
                 </div>

                 <div className="pt-6">
                    <button className="flex items-center space-x-3 text-agent-blue font-black text-[12px] uppercase tracking-[0.2em] group">
                       <div className="bg-blue-50 p-2.5 rounded-xl group-hover:bg-blue-100 transition-colors">
                          <PlusCircle size={20} />
                       </div>
                       <span>Add Traveler to Sequence</span>
                    </button>
                 </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6 sticky top-[100px]">
            {/* Price Card */}
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-10">
              <h2 className="text-2xl font-serif text-[#0F172A] mb-8 font-medium tracking-tight">Yield Summary</h2>
              
              <div className="space-y-5 pb-8 border-b border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold text-sm">Negotiated Rate</span>
                  <span className="text-slate-950 font-black text-lg">₹42,000</span>
                </div>
                <div className="flex justify-between items-center bg-emerald-50 p-4 rounded-2xl border border-emerald-100/50">
                   <div className="flex items-center space-x-2 text-emerald-700">
                      <Tag size={14} />
                      <span className="font-black text-[10px] uppercase tracking-widest">Protocol Discount</span>
                   </div>
                   <span className="text-emerald-600 font-black text-lg">− ₹16,103</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold text-sm">System Taxes</span>
                  <span className="text-slate-950 font-black text-lg">₹4,540</span>
                </div>
              </div>

              <div className="py-10 flex justify-between items-center">
                 <span className="text-[14px] font-black text-slate-900 uppercase tracking-[0.3em]">Total Settlement</span>
                 <span className="text-4xl font-serif text-[#0F172A] font-medium tracking-tighter italic">₹30,437</span>
              </div>

              <button 
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full bg-[#0F172A] text-white py-6 rounded-3xl font-black text-[14px] uppercase tracking-[0.4em] shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center space-x-3 active:scale-95 group disabled:opacity-70"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Confirm & Pay</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </>
                )}
              </button>
              
              <div className="mt-8 flex items-center justify-center space-x-3 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] italic">Secure SSL Sync Active</span>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-6 text-white flex items-center space-x-5 shadow-xl">
               <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-agent-orange" />
               </div>
               <p className="text-[11px] font-medium text-white/70 leading-relaxed">
                  Rate locked via WanderWealth AI for next <span className="text-white font-black">14:59 minutes</span>. Confirmation is instant.
               </p>
            </div>
          </div>
        </div>
      </div>
      {showRulesModal && <ResortRulesModal />}
    </div>
  );
};

export default BookingConfirmation;
