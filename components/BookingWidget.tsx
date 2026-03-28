'use client';


import React, { useState } from 'react';
import { Calendar, Users, MapPin, Search, X, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingWidgetProps {
  onSearch: (params: any) => void;
  theme?: 'light' | 'dark';
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ onSearch, theme = 'light' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState('2 Guests');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, guests });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-10 left-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`absolute bottom-20 left-0 w-[350px] rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border overflow-hidden ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-950'
            }`}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-agent-blue" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Booking</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <h3 className="text-2xl font-black tracking-tighter mb-6 leading-none">Where to next?</h3>

              <form onSubmit={handleSearch} className="space-y-4">
                <div className={`relative rounded-2xl border p-4 transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Destination</label>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-agent-blue" />
                    <input 
                      type="text" 
                      placeholder="Search destinations..." 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-sm font-bold placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`relative rounded-2xl border p-4 transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Dates</label>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-agent-pink" />
                      <span className="text-sm font-bold truncate">Add dates</span>
                    </div>
                  </div>
                  <div className={`relative rounded-2xl border p-4 transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Guests</label>
                    <div className="flex items-center space-x-3">
                      <Users className="w-4 h-4 text-agent-purple" />
                      <span className="text-sm font-bold truncate">{guests}</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-slate-950 text-white py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-agent-blue transition-all transform active:scale-95 mt-4"
                >
                  <Search className="w-4 h-4" />
                  <span>FIND ADVENTURE</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-3 px-6 py-4 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 relative overflow-hidden group ${
          isOpen ? 'bg-slate-950 text-white' : 'bg-white text-slate-950'
        }`}
      >
        {!isOpen && (
          <div className="absolute inset-0 bg-gradient-agent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        )}
        <div className="relative z-10 flex items-center space-x-3">
          {isOpen ? <X className="w-5 h-5" strokeWidth={3} /> : <Briefcase className="w-5 h-5" strokeWidth={2.5} />}
          <span className="text-[11px] font-black uppercase tracking-widest">{isOpen ? 'CLOSE' : 'BOOK NOW'}</span>
        </div>
        
        {!isOpen && (
          <div className="absolute inset-0 border-4 border-agent-blue/20 rounded-full animate-ping"></div>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
