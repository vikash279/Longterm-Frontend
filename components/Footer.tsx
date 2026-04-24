'use client';


import React from 'react';
import { Plane, Twitter, Instagram, Linkedin, Facebook, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const links = {
    Products: ["Hotels", "Flights", "Holidays"],
    Partner: ["Join Program", "Portal", "Success"],
    Support: ["Concierge", "Safety", "FAQs"],
    Legal: ["Privacy", "Refund", "Terms"]
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          <div className="lg:max-w-xs">
            <a href="#" className="flex items-center space-x-2 mb-4 group">
              <div className="bg-gradient-agent p-2 rounded-xl">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter">Wander<span className="text-gradient">Wealth</span></span>
            </a>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">Reinventing travel through hyper-negotiation.</p>
            <div className="flex space-x-3">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            {Object.entries(links).map(([title, items], idx) => (
              <div key={idx}>
                <h4 className="font-black text-white/80 mb-4 uppercase tracking-widest text-[9px]">{title}</h4>
                <ul className="space-y-2.5">
                  {items.map((link, lidx) => (
                    <li key={lidx}><a href="#" className="text-white/40 hover:text-white transition-colors text-xs">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/20">
           <p>© 2025 WanderWealth Travel. Worldwide Patent Pending.</p>
           <div className="flex items-center space-x-8 text-white/40">
             <div className="flex items-center space-x-2"><Mail className="w-3 h-3" /><span>concierge@wanderwealth.com</span></div>
             <div className="flex items-center space-x-2"><Phone className="w-3 h-3" /><span>+91 1800-NEGO-AI</span></div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
