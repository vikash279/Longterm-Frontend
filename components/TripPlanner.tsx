'use client';


import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Plus, 
  Share2, 
  Trash2, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  Send,
  X,
  CheckCircle2,
  Copy,
  Mail,
  ExternalLink,
  Timer,
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';

interface Activity {
  id: string;
  time: string;
  text: string;
}

interface Trip {
  id: string;
  name: string;
  destination: string;
  date: string;
  duration?: string;
  activities: Activity[];
}

const TripPlanner: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharedTripToImport, setSharedTripToImport] = useState<Trip | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // New Trip Form State
  const [newTripName, setNewTripName] = useState('');
  const [newTripDest, setNewTripDest] = useState('');
  const [newTripDate, setNewTripDate] = useState('');

  // New Activity Form State
  const [newActivityText, setNewActivityText] = useState('');
  const [newActivityTime, setNewActivityTime] = useState('12:00');

  useEffect(() => {
    const savedTrips = localStorage.getItem('ww-trips');
    if (savedTrips) {
      try {
        const parsed = JSON.parse(savedTrips);
        setTrips(parsed);
        if (parsed.length > 0 && !activeTripId) setActiveTripId(parsed[0].id);
      } catch (e) {
        console.error("Failed to parse saved trips", e);
      }
    }

    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('share');
    if (sharedData) {
      try {
        const decodedTrip = JSON.parse(atob(sharedData)) as Trip;
        setSharedTripToImport(decodedTrip);
      } catch (e) {
        console.error("Invalid share link", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ww-trips', JSON.stringify(trips));
  }, [trips]);

  const addTrip = () => {
    if (!newTripName || !newTripDest) return;
    const newTrip: Trip = {
      id: Date.now().toString(),
      name: newTripName,
      destination: newTripDest,
      date: newTripDate || 'TBD',
      activities: []
    };
    setTrips([newTrip, ...trips]);
    setNewTripName('');
    setNewTripDest('');
    setNewTripDate('');
    setIsCreating(false);
    setActiveTripId(newTrip.id);
  };

  const importSharedTrip = () => {
    if (sharedTripToImport) {
      const importedTrip = { ...sharedTripToImport, id: Date.now().toString() };
      setTrips([importedTrip, ...trips]);
      setActiveTripId(importedTrip.id);
      setSharedTripToImport(null);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const deleteTrip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTrips(trips.filter(t => t.id !== id));
    if (activeTripId === id) setActiveTripId(trips.length > 1 ? trips[0].id : null);
  };

  const submitActivity = () => {
    if (!newActivityText || !activeTripId) return;
    const [hours, minutes] = newActivityTime.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHours = h % 12 || 12;
    const timeString = `${displayHours}:${minutes} ${ampm}`;

    setTrips(trips.map(trip => {
      if (trip.id === activeTripId) {
        return {
          ...trip,
          activities: [...trip.activities, { id: Date.now().toString(), time: timeString, text: newActivityText }]
            .sort((a, b) => a.time.localeCompare(b.time))
        };
      }
      return trip;
    }));
    setNewActivityText('');
    setShowNewActivityModal(false);
  };

  const removeActivity = (tripId: string, activityId: string) => {
    setTrips(trips.map(trip => trip.id === tripId ? { ...trip, activities: trip.activities.filter(a => a.id !== activityId) } : trip));
  };

  const activeTrip = trips.find(t => t.id === activeTripId);

  const generateShareLink = () => {
    if (!activeTrip) return "";
    return `${window.location.origin}${window.location.pathname}?share=${atob(JSON.stringify(activeTrip))}`;
  };

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(46,107,255,0.03),transparent)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-agent-pink" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Collaborative Nodes</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-950 tracking-tighter leading-none">
              AI-Powered <span className="text-gradient">Trip Planner</span>
            </h2>
          </div>
          
          <div className="flex items-center space-x-3 text-slate-400">
             <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full flex items-center space-x-1 border border-emerald-100/50">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[8px] font-black uppercase tracking-widest">System Sync Active</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
          
          {/* SIDEBAR: Node Management */}
          <div className="lg:col-span-4 flex flex-col h-full space-y-4">
            
            {/* Integrated "Initialize New Node" UI */}
            <div className={`transition-all duration-500 overflow-hidden bg-white border rounded-[2rem] shadow-sm ${isCreating ? 'h-[280px] border-agent-blue ring-1 ring-agent-blue/20' : 'h-[72px] border-slate-100 hover:border-slate-200'}`}>
              {!isCreating ? (
                <button 
                  onClick={() => setIsCreating(true)}
                  className="w-full h-full px-6 flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-950 group-hover:bg-slate-950 group-hover:text-white transition-all">
                      <Plus size={20} strokeWidth={3} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-950">Initialize New Node</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="p-6 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-[10px] font-black text-agent-blue uppercase tracking-widest">Protocol Setup</h4>
                    <button onClick={() => setIsCreating(false)} className="text-slate-300 hover:text-slate-900"><X size={16} /></button>
                  </div>
                  <input 
                    type="text" placeholder="Trip Name (e.g. Dubai Summit)" 
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-agent-blue/10"
                    value={newTripName} onChange={e => setNewTripName(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" placeholder="Target Destination" 
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-agent-blue/10"
                      value={newTripDest} onChange={e => setNewTripDest(e.target.value)}
                    />
                    <input 
                      type="text" placeholder="Launch Date" 
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-agent-blue/10"
                      value={newTripDate} onChange={e => setNewTripDate(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={addTrip}
                    className="w-full bg-slate-950 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Deploy Node</span>
                    <ArrowRight size={14} strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>

            {/* Scrollable Trip List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1">
              {trips.map(trip => (
                <div 
                  key={trip.id}
                  onClick={() => setActiveTripId(trip.id)}
                  className={`group relative p-5 rounded-[1.8rem] border transition-all duration-300 cursor-pointer ${activeTripId === trip.id ? 'bg-slate-950 border-slate-950 shadow-xl scale-[1.02]' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className={`p-2 rounded-lg ${activeTripId === trip.id ? 'bg-white/10 text-agent-orange' : 'bg-slate-50 text-slate-400'}`}>
                      <MapPin size={14} />
                    </div>
                    <button 
                      onClick={(e) => deleteTrip(trip.id, e)}
                      className={`p-1.5 opacity-0 group-hover:opacity-100 transition-opacity ${activeTripId === trip.id ? 'text-white/30 hover:text-white' : 'text-slate-300 hover:text-red-500'}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <h4 className={`text-sm font-black tracking-tight mb-1 truncate ${activeTripId === trip.id ? 'text-white' : 'text-slate-950'}`}>
                    {trip.name}
                  </h4>
                  <div className={`flex items-center space-x-3 text-[9px] font-bold uppercase tracking-widest ${activeTripId === trip.id ? 'text-white/40' : 'text-slate-400'}`}>
                    <span>{trip.destination}</span>
                    <div className="w-1 h-1 rounded-full bg-current opacity-30"></div>
                    <span>{trip.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAIN PANEL: Node Details */}
          <div className="lg:col-span-8 h-full">
            {activeTrip ? (
              <div className="bg-slate-50/50 rounded-[2.5rem] border border-slate-100 h-full p-8 flex flex-col relative overflow-hidden">
                {/* Accent Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px] -mr-32 -mt-32 opacity-60"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-3xl font-black text-slate-950 tracking-tighter mb-1">{activeTrip.name}</h3>
                      <div className="flex items-center space-x-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        <span className="flex items-center space-x-1"><MapPin size={12} className="text-agent-orange" /> <span>{activeTrip.destination}</span></span>
                        <span>•</span>
                        <span className="flex items-center space-x-1"><Calendar size={12} className="text-agent-pink" /> <span>{activeTrip.date}</span></span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                       <button onClick={() => setShowShareModal(true)} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm transition-all"><Share2 size={18} /></button>
                       <button onClick={() => setShowNewActivityModal(true)} className="bg-slate-950 text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center space-x-2 active:scale-95 transition-all">
                          <Plus size={16} strokeWidth={3} className="text-agent-orange" />
                          <span>Log Activity</span>
                       </button>
                    </div>
                  </div>

                  {/* Timeline Area */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                    {activeTrip.activities.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-slate-200 rounded-[2rem] bg-white/40">
                        <Clock size={40} className="text-slate-200 mb-4 animate-pulse" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node Agenda is Clear</p>
                      </div>
                    ) : (
                      activeTrip.activities.map(activity => (
                        <div key={activity.id} className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div className="w-16 text-center">
                              <span className="text-[11px] font-black text-agent-blue uppercase tracking-widest">{activity.time}</span>
                            </div>
                            <div className="w-px h-8 bg-slate-100"></div>
                            <span className="text-sm font-bold text-slate-800">{activity.text}</span>
                          </div>
                          <button onClick={() => removeActivity(activeTrip.id, activity.id)} className="p-2 text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><X size={16} /></button>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center text-[9px] font-black text-slate-300 uppercase tracking-widest">
                     <span>Last verified: {new Date().toLocaleTimeString()}</span>
                     <div className="flex items-center space-x-1 text-emerald-500">
                        <CheckCircle2 size={10} strokeWidth={3} />
                        <span>Cloud Encrypted</span>
                     </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full bg-slate-50/30 rounded-[2.5rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-12">
                 <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-xl border border-slate-50 mb-6">
                    <Send size={32} className="text-slate-200 -rotate-12" />
                 </div>
                 <h4 className="text-xl font-black text-slate-950 mb-2 tracking-tight">Select an Active Node</h4>
                 <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[240px]">Navigate existing travel clusters or initialize a new sequence.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal & Activity Modal kept as small floating panels */}
      {showShareModal && activeTrip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowShareModal(false)}></div>
          <div className="relative w-full max-w-sm bg-white rounded-[3rem] p-10 shadow-2xl">
            <h3 className="text-2xl font-black text-slate-950 tracking-tighter mb-6">Share Cluster</h3>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
               <p className="text-sm font-bold text-slate-900 mb-1">{activeTrip.name}</p>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{activeTrip.destination}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <button onClick={() => { navigator.clipboard.writeText(generateShareLink()); setCopySuccess(true); setTimeout(()=>setCopySuccess(false), 2000); }} className="flex flex-col items-center p-6 bg-white border border-slate-100 rounded-2xl hover:border-agent-blue transition-all">
                  <Copy size={24} className={copySuccess ? 'text-emerald-500' : 'text-agent-blue'} />
                  <span className="text-[10px] font-black uppercase tracking-widest mt-2">{copySuccess ? 'Copied' : 'Link'}</span>
               </button>
               <button className="flex flex-col items-center p-6 bg-white border border-slate-100 rounded-2xl hover:border-agent-pink transition-all">
                  <Mail size={24} className="text-agent-pink" />
                  <span className="text-[10px] font-black uppercase tracking-widest mt-2">Fleet</span>
               </button>
            </div>
          </div>
        </div>
      )}

      {showNewActivityModal && activeTrip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowNewActivityModal(false)}></div>
          <div className="relative w-full max-w-sm bg-white rounded-[3rem] p-10 shadow-2xl">
            <h3 className="text-2xl font-black text-slate-950 tracking-tighter mb-6">Log Activity</h3>
            <div className="space-y-4">
              <input 
                type="text" placeholder="Activity Title" 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-agent-blue/10"
                value={newActivityText} onChange={e => setNewActivityText(e.target.value)}
              />
              <div className="relative">
                <input 
                  type="time" 
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-agent-blue/10 appearance-none"
                  value={newActivityTime} onChange={e => setNewActivityTime(e.target.value)}
                />
                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              </div>
              <button onClick={submitActivity} className="w-full bg-slate-950 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Commit Event</button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default TripPlanner;
