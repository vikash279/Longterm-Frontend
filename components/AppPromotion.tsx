'use client';


import React from 'react';
import { Download, CheckCircle2 } from 'lucide-react';

const AppPromotion: React.FC = () => {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] p-8 lg:p-12 relative overflow-hidden text-white">
          <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
            <div className="flex-1">
              <h2 className="text-3xl lg:text-4xl font-black mb-4 leading-tight">
                Travel Smarter with <span className="text-indigo-200">Our App</span>
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  "Nego Engine",
                  "Exclusive Deals",
                  "Track Earnings",
                  "24/7 Chat"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-300" />
                    <span className="font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center space-x-2 text-xs">
                  <Download className="w-4 h-4" />
                  <span>App Store</span>
                </button>
                <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center space-x-2 text-xs">
                  <Download className="w-4 h-4" />
                  <span>Google Play</span>
                </button>
              </div>
            </div>

            <div className="hidden lg:block lg:w-1/4">
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400" alt="App" className="rounded-2xl shadow-xl border-4 border-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromotion;
