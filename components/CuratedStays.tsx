'use client';


import React, { useState } from 'react';
import { Umbrella, Mountain, Wine, Snowflake, Flame, ThumbsUp, Sparkles, ChevronRight, MapPin, Building, Home, Tent, Palmtree } from 'lucide-react';

const CuratedStays: React.FC = () => {
  const tabs = ['Hotels', 'Villas', 'Resorts', 'HomeStay', 'Unique Stay'];
  const [activeTab, setActiveTab] = useState('Hotels');

  // Data mapping for different tabs to show varied "Property Kinds"
  const contentMap: Record<string, any[]> = {
    'Hotels': [
      { icon: Umbrella, label: "Beachy Getaways", sub: "Signature Coastal Hotels", color: "text-blue-600", bg: "bg-blue-50/50" },
      { icon: Mountain, label: "Hilly Hotels", sub: "Luxury Mountain Escapes", color: "text-emerald-600", bg: "bg-emerald-50/50" },
      { icon: Building, label: "Urban Suites", sub: "City Center Icons", color: "text-slate-600", bg: "bg-slate-50/50" },
    ],
    'Villas': [
      { icon: Home, label: "Private Estates", sub: "Fully Staffed Mansions", color: "text-indigo-600", bg: "bg-indigo-50/50" },
      { icon: Palmtree, label: "Tropical Villas", sub: "Poolside Paradises", color: "text-emerald-600", bg: "bg-emerald-50/50" },
      { icon: Wine, label: "Vineyard Manors", sub: "Sip, Savor, Seclude", color: "text-purple-600", bg: "bg-purple-50/50" },
    ],
    'Resorts': [
      { icon: Palmtree, label: "All-Inclusive", sub: "Carefree Island Luxury", color: "text-cyan-600", bg: "bg-cyan-50/50" },
      { icon: Snowflake, label: "Ski Retreats", sub: "Powder-Side Chalets", color: "text-blue-600", bg: "bg-blue-50/50" },
      { icon: Flame, label: "Wellness Spas", sub: "Holistic Sanctuary Stays", color: "text-orange-600", bg: "bg-orange-50/50" },
    ],
    'HomeStay': [
      { icon: Home, label: "Heritage Homes", sub: "Cultural Immersion", color: "text-amber-600", bg: "bg-amber-50/50" },
      { icon: Mountain, label: "Farmhouse Stays", sub: "Organic Living", color: "text-emerald-600", bg: "bg-emerald-50/50" },
      { icon: ThumbsUp, label: "Local Favorites", sub: "Highly Rated Hosts", color: "text-pink-600", bg: "bg-pink-50/50" },
    ],
    'Unique Stay': [
      { icon: Tent, label: "Glamping Hubs", sub: "Luxury Under Canvas", color: "text-emerald-700", bg: "bg-emerald-50/50" },
      { icon: Sparkles, label: "Glass Domes", sub: "Sleep Under the Stars", color: "text-blue-500", bg: "bg-blue-50/50" },
      { icon: Building, label: "Castle Stays", sub: "Historical Grandeur", color: "text-slate-700", bg: "bg-slate-100/50" },
    ]
  };

  const activeContent = contentMap[activeTab] || contentMap['Hotels'];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section with Dynamic Tabs */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 text-agent-blue" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Curated Collections</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-950 leading-tight tracking-tight">
              Explore {activeTab} <br />
              <span className="text-gradient font-black">Specially Negotiated</span>
            </h2>
          </div>
          
          {/* Scrollable Tabs Container for Mobile, Centered for Desktop */}
          <div className="w-full lg:w-auto overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            <div className="flex items-center p-1.5 bg-slate-50/80 backdrop-blur-sm rounded-2xl border border-slate-100 whitespace-nowrap">
               {tabs.map((tab) => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab 
                    ? 'bg-white text-slate-950 shadow-md transform scale-[1.02]' 
                    : 'text-slate-400 hover:text-slate-600'
                  }`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Bento-style Category Grid (Updated to 3 columns for better fit) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeContent.map((cat, idx) => {
            // Fix: Assign component to a capitalized variable
            const IconComponent = cat.icon;
            return (
              <button 
                key={idx} 
                className={`group relative flex items-center p-7 rounded-[2.2rem] border border-slate-100/60 bg-slate-50/30 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden text-left animate-in fade-in slide-in-from-bottom-2 duration-700`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Subtle Decorative Aura */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 flex items-center space-x-5 w-full">
                  <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-50 flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-500`}>
                    <IconComponent size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base mb-0.5 tracking-tight">{cat.label}</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                      {cat.sub}
                    </p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className={`w-4 h-4 ${cat.color}`} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Compact Concierge Bento Card */}
        <div className="mt-8 group relative bg-white border border-slate-100 rounded-[2.5rem] p-1 shadow-xl shadow-slate-200/20 overflow-hidden">
          <div className="relative bg-slate-50/50 rounded-[2.4rem] p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-md text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-4">
                <MapPin className="w-3.5 h-3.5 text-agent-blue" />
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">Personal Concierge</span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 mb-2 tracking-tight">
                Perfect {activeTab.slice(0, -1)} <span className="text-gradient">Not Found?</span>
              </h3>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">
                Let our Super Agent find a customized {activeTab.toLowerCase()} specifically for your requirements.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="bg-slate-950 text-white px-7 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">
                Quick Discovery
              </button>
              <button className="bg-white border border-slate-200 text-slate-900 px-7 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
                Talk to Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedStays;
