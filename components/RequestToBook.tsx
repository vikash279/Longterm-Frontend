'use client';


import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface RequestToBookProps {
  hotel: any;
  onCancel: () => void;
  onConfirm: () => void;
}

const RequestToBook: React.FC<RequestToBookProps> = ({ hotel, onCancel, onConfirm }) => {
  const competitors = [
    { name: "The Lunar Sanctuary", location: "Moon Crater Tyco", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400" },
    { name: "Martian Red Sands Resort", location: "Mars Olympus Mons", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" },
    { name: "Orbital Ring Hotel", location: "Low Earth Orbit", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=400" },
    { name: "Titan Methane Lakes Lodge", location: "Saturn Moon Titan", img: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FDFDFD] flex flex-col items-center pt-24 pb-20 px-4 font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-2xl mx-auto">
        
        {/* Header Section - Serif Font as per Screenshot */}
        <div className="text-center mb-10">
          <h1 className="text-[44px] font-serif font-medium text-[#0F172A] leading-tight mb-4">
            Request to Book
          </h1>
          <div className="space-y-1">
            <p className="text-[#64748B] text-[16px] font-medium tracking-tight">
              We'll send your request to <span className="text-[#00A3C2] font-bold">5 premium properties</span> simultaneously.
            </p>
            <p className="text-[#94A3B8] text-[14px] font-medium tracking-tight">
              Increase your chances of acceptance. You only pay for the one you select.
            </p>
          </div>
        </div>

        {/* Primary Choice Card - Soft Cyan Style */}
        <div className="mb-10">
          <div className="bg-[#E6F9FB] border border-[#CFF1F6] rounded-[2rem] p-6 shadow-sm flex items-center justify-between group transition-all hover:shadow-md">
            <div className="flex items-center space-x-5">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                <img 
                  src={hotel?.mainImg || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400"} 
                  className="w-full h-full object-cover" 
                  alt="primary" 
                />
              </div>
              <div>
                <span className="text-[10px] font-black text-[#00A3C2] uppercase tracking-[0.2em] block mb-1">PRIMARY CHOICE</span>
                <h3 className="text-2xl font-serif text-[#0F172A] leading-tight mb-1">
                  {hotel?.name || 'Venus Cloud City'}
                </h3>
                <div className="flex flex-col text-[13px] font-medium text-[#64748B]">
                  <span>Standard Pod</span>
                  <span className="text-[#475569]">₹21,000 / night</span>
                </div>
              </div>
            </div>
            <div className="w-8 h-8 bg-[#00D1FF] rounded-lg flex items-center justify-center text-white shadow-lg">
              <Check className="w-5 h-5" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Alternative List Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6 px-2">
             <span className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.3em] whitespace-nowrap">ALSO CONTACTING (4)</span>
             <div className="flex-1 h-px bg-[#F1F5F9]"></div>
          </div>
          
          <div className="space-y-3">
            {competitors.map((comp, idx) => (
              <div key={idx} className="bg-white border border-[#F1F5F9] rounded-[1.5rem] p-4 flex items-center justify-between group hover:border-[#E2E8F0] hover:shadow-sm transition-all cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#F1F5F9]">
                    <img src={comp.img} className="w-full h-full object-cover" alt="comp" />
                    {/* Status Dot */}
                    <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#00D1FF] rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                  <div>
                    <h4 className="text-[16px] font-serif text-[#0F172A] leading-tight mb-0.5">{comp.name}</h4>
                    <p className="text-[11px] font-medium text-[#94A3B8]">{comp.location}</p>
                  </div>
                </div>
                <div className="w-7 h-7 bg-[#0F172A] rounded-lg flex items-center justify-center text-white shrink-0">
                   <Check className="w-4 h-4" strokeWidth={3} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sleek Action Footer */}
        <div className="flex flex-col items-center space-y-6">
          <button 
            onClick={onConfirm}
            className="w-full max-w-sm bg-[#0F172A] text-white py-5 rounded-full font-bold text-[14px] uppercase tracking-[0.3em] shadow-xl hover:bg-[#1E293B] transition-all flex items-center justify-center space-x-4 active:scale-[0.98] group"
          >
            <span>SEND 5 REQUESTS</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={onCancel}
            className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.4em] hover:text-[#0F172A] transition-colors"
          >
            CANCEL
          </button>
        </div>

      </div>
    </div>
  );
};

export default RequestToBook;
