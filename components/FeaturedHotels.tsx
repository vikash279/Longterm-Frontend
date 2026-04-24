'use client';


import React from 'react';
import { Star, Heart, MapPin, ChevronRight, CheckCircle2, Sparkles, TrendingDown } from 'lucide-react';

const FeaturedHotels: React.FC = () => {
  const hotels = [
    {
      id: 1,
      name: "The First Collection Dubai Marina",
      location: "Dubai, UAE",
      rating: 4.7,
      reviews: "8.6k",
      price: "₹16,911",
      originalPrice: "₹20,745",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
      mentions: ["Trendy", "Great View"],
      sponsored: true,
      tag: "Top Rated",
      savings: "18%"
    },
    {
      id: 2,
      name: "Address Beach Resort Dubai",
      location: "JBR, Dubai",
      rating: 4.9,
      reviews: "12.4k",
      price: "₹42,800",
      originalPrice: "₹55,200",
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
      mentions: ["Infinity Pool", "Sky Spa"],
      sponsored: false,
      tag: "Luxury",
      savings: "22%"
    },
    {
      id: 3,
      name: "Radisson Blu Hotel PASCHIM VIHAR",
      location: "Paschim Vihar, Delhi",
      rating: 4.8,
      reviews: "3.5k",
      price: "₹18,200",
      originalPrice: "₹24,000",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
      mentions: ["Central Hub", "Elite Lounge"],
      sponsored: true,
      tag: "Best Seller",
      savings: "24%"
    }
  ];

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-40 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section - Compact */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-agent-orange" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Prime Selections</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-black text-slate-950 tracking-tighter leading-none">
              World-Class <span className="text-gradient">Portfolio Stays</span>
            </h3>
          </div>
          
          <button className="group flex items-center space-x-2 px-6 py-3 rounded-2xl bg-white border border-slate-100 text-[9px] font-black uppercase tracking-[0.3em] text-slate-950 hover:bg-slate-50 hover:shadow-xl transition-all active:scale-95">
            <span>Explore All Nodes</span>
            <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" strokeWidth={3} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div 
              key={hotel.id} 
              className="group bg-white rounded-[2.2rem] border border-slate-100 overflow-hidden hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1.5"
            >
              
              {/* Media Container */}
              <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                <img 
                  src={hotel.img} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                  <div className="flex flex-col gap-1.5">
                    {hotel.sponsored && (
                      <div className="bg-slate-950/90 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-[7px] font-black uppercase tracking-[0.2em] border border-white/10 w-fit">
                        Sponsored
                      </div>
                    )}
                    <div className="bg-agent-orange text-white px-2 py-0.5 rounded-lg text-[7px] font-black uppercase tracking-[0.2em] shadow-lg w-fit">
                      {hotel.tag}
                    </div>
                  </div>
                  
                  <button className="p-2.5 bg-white/95 backdrop-blur rounded-full shadow-lg text-slate-300 hover:text-agent-pink transition-all active:scale-90 transform group-hover:scale-110">
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center space-x-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <div className="bg-emerald-500 text-white px-2.5 py-1 rounded-lg shadow-xl flex items-center space-x-1.5 border border-white/20">
                      <TrendingDown className="w-3 h-3" />
                      <span className="text-[8px] font-black uppercase leading-none">SAVE {hotel.savings}</span>
                   </div>
                </div>
              </div>

              {/* Informative Content */}
              <div className="p-4 lg:p-5 flex flex-col flex-1">
                <div className="mb-4">
                  <div className="flex items-center space-x-1.5 mb-1 text-agent-blue">
                    <MapPin className="w-2.5 h-2.5" />
                    <span className="text-[8px] font-black uppercase tracking-widest">{hotel.location}</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-950 leading-tight group-hover:text-agent-blue transition-colors tracking-tighter line-clamp-1">
                    {hotel.name}
                  </h4>
                </div>

                <div className="flex items-center justify-between mb-4 bg-slate-50/50 p-2 rounded-xl border border-slate-100/50">
                  <div className="flex items-center space-x-2">
                    <div className="bg-white text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm border border-slate-100 flex items-center">
                      <Star className="w-2.5 h-2.5 text-agent-orange fill-agent-orange mr-1" />
                      {hotel.rating}
                    </div>
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none">{hotel.reviews} reviews</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-slate-300 line-through font-bold leading-none tracking-tight">{hotel.originalPrice}</div>
                    <div className="text-lg font-black text-slate-950 tracking-tighter leading-none">{hotel.price}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {hotel.mentions.map((mention, mIdx) => (
                    <div key={mIdx} className="flex items-center space-x-1 text-[8px] text-slate-500 font-black uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" strokeWidth={3} />
                      <span>{mention}</span>
                    </div>
                  ))}
                </div>

                {/* Integrated Action Button - "Check Details" fit to card */}
                <button 
                  className="w-full relative overflow-hidden bg-slate-950 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg transition-all transform active:scale-95 flex items-center justify-center group/btn z-10 mt-auto"
                >
                  <div className="absolute inset-0 bg-gradient-agent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10">CHECK DETAILS</span>
                  <ChevronRight className="relative z-10 w-3.5 h-3.5 ml-2 transition-transform group-hover/btn:translate-x-1" strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Ticker - Dense */}
        <div className="mt-8 flex flex-col items-center">
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-100 flex items-center space-x-3 shadow-xl shadow-slate-200/5">
            <div className="flex -space-x-1.5">
              {[1,2,3].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=h${i}`} className="w-5 h-5 rounded-full border border-white shadow-sm object-cover" alt="user" />
              ))}
            </div>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">
              <span className="text-slate-950">2.4k+ Secured</span> portfolio rates in 24h
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
