'use client';


import React, { useState } from 'react';
import { Users, Clock, Heart, Compass, Star, ChevronRight, Sparkles, MapPin, ArrowRight, Zap } from 'lucide-react';

const HolidayPackages: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'Group' | 'Romantic' | 'Family'>('Group');

  const categories = [
    { id: 'Group', label: 'Group Trips', icon: Users, sub: "Social" },
    { id: 'Romantic', label: 'Romantic', icon: Heart, sub: "Intimate" },
    { id: 'Family', label: 'Adventure', icon: Compass, sub: "Curated" },
  ];

  const packageData = {
    Group: [
      {
        title: "Thailand Full Moon Party",
        location: "Koh Phangan",
        price: "₹45,999",
        originalPrice: "₹58k",
        duration: "6D / 5N",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1528181304800-2f170b89892f?auto=format&fit=crop&q=80&w=600",
        tag: "Legendary"
      },
      {
        title: "Ibiza Summer Blast",
        location: "Spain",
        price: "₹1.12L",
        originalPrice: "₹1.4L",
        duration: "7D / 6N",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=600",
        tag: "VIP Access"
      },
      {
        title: "Bali Squad Retreat",
        location: "Indonesia",
        price: "₹52,400",
        originalPrice: "₹65k",
        duration: "5D / 4N",
        rating: 4.7,
        img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600",
        tag: "Best Seller"
      }
    ],
    Romantic: [
      {
        title: "Worth Falling For",
        location: "Maldives",
        price: "₹1.25L",
        originalPrice: "₹1.8L",
        duration: "5D / 4N",
        rating: 5.0,
        img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600",
        tag: "Ultimate Privacy"
      },
      {
        title: "Santorini Sunset Bliss",
        location: "Greece",
        price: "₹1.45L",
        originalPrice: "₹1.9L",
        duration: "6D / 5N",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=600",
        tag: "Iconic Views"
      },
      {
        title: "Parisian Dream",
        location: "France",
        price: "₹98,000",
        originalPrice: "₹1.2L",
        duration: "4D / 3N",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600",
        tag: "Honeymoon"
      }
    ],
    Family: [
      {
        title: "Family Basecamp",
        location: "Nepal Himalayas",
        price: "₹82,400",
        originalPrice: "₹95k",
        duration: "8D / 7N",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&q=80&w=600",
        tag: "Adventure"
      },
      {
        title: "African Safari Duo",
        location: "Kenya",
        price: "₹2.10L",
        originalPrice: "₹2.8L",
        duration: "7D / 6N",
        rating: 5.0,
        img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600",
        tag: "Wild Discovery"
      },
      {
        title: "Iceland Aurora Hunt",
        location: "Iceland",
        price: "₹1.75L",
        originalPrice: "₹2.2L",
        duration: "6D / 5N",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1531366930477-4fbd0f064f08?auto=format&fit=crop&q=80&w=600",
        tag: "Bucket List"
      }
    ]
  };

  return (
    <section className="py-12 bg-white relative overflow-hidden flex flex-col items-center">
      {/* Dynamic Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-8 gap-4">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3 h-3 text-agent-pink" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Negotiated Packages</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-950 leading-tight tracking-tight">
              Curated <span className="text-gradient">Holiday Packages</span>
            </h2>
          </div>

          {/* Inline Sleek Category Tabs */}
          <div className="flex p-1.5 bg-slate-50 border border-slate-100 rounded-2xl">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
                    isActive 
                    ? 'bg-slate-950 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon size={14} strokeWidth={isActive ? 3 : 2} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dense Grid - Vertical Height Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {packageData[activeCategory].map((pkg, idx) => (
            <div 
              key={pkg.title}
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="relative h-44 lg:h-48 overflow-hidden">
                <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-950 shadow-sm">
                    {pkg.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center space-x-1.5 border border-white/10">
                   <Clock className="w-3 h-3 text-agent-pink" />
                   <span className="text-[9px] font-black text-white tracking-widest uppercase">{pkg.duration}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-1.5 text-slate-400 mb-1">
                  <MapPin className="w-3 h-3" />
                  <span className="text-[8px] font-black uppercase tracking-widest">{pkg.location}</span>
                </div>
                <h4 className="text-lg font-black text-slate-950 mb-4 tracking-tight group-hover:text-agent-blue transition-colors leading-tight line-clamp-1">
                  {pkg.title}
                </h4>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-medium text-slate-400/50 line-through tracking-widest italic mb-0.5">{pkg.originalPrice}</span>
                    <div className="flex items-baseline space-x-1">
                       <span className="text-xl font-black text-slate-950 tracking-tighter">{pkg.price}</span>
                       <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">/ Pax</span>
                    </div>
                  </div>
                  <button className="bg-slate-950 text-white p-2.5 rounded-xl transition-all hover:bg-slate-800 group/btn shadow-md">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Interaction Footer */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-50 pt-8">
          <div className="flex items-center space-x-4">
             <div className="flex items-center -space-x-1.5">
                {[1,2,3,4].map(i => (
                   <img key={i} src={`https://i.pravatar.cc/100?u=h${i}${activeCategory}`} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" alt="user" />
                ))}
             </div>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">
               <Zap className="inline w-3 h-3 mr-1 text-agent-orange fill-agent-orange" />
               <span className="text-slate-950">4.2k+ Travelers</span> interested in {activeCategory} style
             </p>
          </div>

          <button className="group relative overflow-hidden bg-slate-50 border border-slate-200 text-slate-900 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-sm hover:shadow-xl hover:bg-white hover:border-slate-300 transition-all active:scale-95">
             <span className="relative z-10 flex items-center">
               Explore all 250+ packages
               <ChevronRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
             </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default HolidayPackages;
