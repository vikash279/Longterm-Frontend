'use client';


import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane, Compass, Search as SearchIcon, Zap, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import SearchBar from "@/components/SearchBar"

interface HeroProps {
}

const Hero: React.FC<HeroProps> = ({ }) => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date(2026, 2, 13)); // Mar 13, 2026
  const [endDate, setEndDate] = useState<Date | null>(new Date(2026, 2, 15));   // Mar 15, 2026
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  // Close calendar on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDatePickerOpen && !target.closest('.timeline-container')) {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDatePickerOpen]);

  const handleSearchClick = () => {
    // Handled by SearchBar
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-12 lg:pt-40 bg-white overflow-visible">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=90&w=2400"
          className="w-full h-full object-cover opacity-90 scale-105 animate-[slow-zoom_30s_linear_infinite]"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-resort-in-the-maldives-21915-large.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center lg:text-left">
        <div className="max-w-4xl mx-auto lg:mx-0">
          <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full mb-8 shadow-2xl border border-white">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.3em]">System Live: Global Nodes Active</span>
          </div>

          <h1 className="text-6xl md:text-[7.5rem] font-black text-white leading-[0.85] mb-8 tracking-tighter drop-shadow-2xl">
            Hyper-Travel <br />
            <span className="text-white opacity-90">Reinvented.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white font-semibold mb-14 max-w-2xl leading-relaxed drop-shadow-lg">
            Experience premium stays at algorithmic prices. The only platform that negotiates live for your exclusive perks.
          </p>

          {/* New Compact Premium Search Tool */}
         <div className="relative z-[1000]">
            <SearchBar />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        .react-datepicker {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          border: none !important;
          border-radius: 1.5rem !important;
        }
        .react-datepicker__header {
          background-color: white !important;
          border-bottom: 1px solid #f1f5f9 !important;
          border-top-left-radius: 1.5rem !important;
          border-top-right-radius: 1.5rem !important;
          padding-top: 1rem !important;
        }
        .react-datepicker__day {
          color: #1e293b !important;
          font-weight: 600 !important;
        }
        .react-datepicker__day:hover {
          background-color: #f1f5f9 !important;
          border-radius: 0.5rem !important;
        }
        .react-datepicker__day--disabled {
          color: #cbd5e1 !important;
        }
        .react-datepicker__day--outside-month {
          color: #e2e8f0 !important;
        }
        .react-datepicker__day--selected, 
        .react-datepicker__day--in-selecting-range, 
        .react-datepicker__day--in-range {
          background-color: #2E6BFF !important;
          color: white !important;
          border-radius: 0.5rem !important;
        }
        .react-datepicker__current-month {
          font-weight: 800 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          font-size: 0.8rem !important;
          color: #0f172a !important;
        }
        .react-datepicker__day-name {
          font-weight: 700 !important;
          color: #94a3b8 !important;
          text-transform: uppercase !important;
          font-size: 0.6rem !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;
