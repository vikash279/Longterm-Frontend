'use client';


import React, { useState } from 'react';
import { 
  Briefcase, 
  User, 
  Users,
  Bed,
  CreditCard, 
  DollarSign, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Clock, 
  XCircle, 
  CheckCircle2, 
  MapPin, 
  Coffee, 
  FileText,
  Download,
  Calendar,
  ChevronDown,
  ArrowLeft,
  Pencil,
  X,
  Building,
  Globe,
  Plus,
  Lock,
  TrendingUp,
  Wallet,
  Bell,
  MessageSquare
} from 'lucide-react';

interface UserProfileProps {
  user: { name: string; avatar: string; email: string };
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'CANCELLED' | 'COMPLETED'>('COMPLETED');
  const [activeMenu, setActiveMenu] = useState('My Bookings');
  
  // Profile Form State
  const [profileName, setProfileName] = useState(user.name);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [profilePhone, setProfilePhone] = useState('+1 (555) 123-4567');
  const [profileAddress, setProfileAddress] = useState('123 Luxury Lane, Metropolis, 90210');
  const [interests, setInterests] = useState(['Mars', 'Titan']);

  // Settings State
  const [notifBooking, setNotifBooking] = useState(true);
  const [notifCancellations, setNotifCancellations] = useState(true);
  const [notifMessages, setNotifMessages] = useState(false);

  const menuItems = [
    { name: 'My Bookings', icon: Briefcase },
    { name: 'Personal Information', icon: User },
    { name: 'Payment Methods', icon: CreditCard },
    { name: 'Earnings', icon: DollarSign },
    { name: 'Settings', icon: Settings },
  ];

  const bookings = [
    {
      id: 'NH78160420498460',
      hotel: "Titan Methane Lakes Lodge",
      status: "Completed",
      location: "Saturn",
      img: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=400",
      checkIn: "10 Jan 2024",
      checkInTime: "01:00 PM",
      checkOut: "12 Jan 2024",
      checkOutTime: "11:00 AM",
      guest: "Jordan Smith",
      guestFrom: "London, Earth",
      guestTotal: "1 Adult",
      accommodation: "Cryo-Protected Suite",
      rooms: "1 Room(s)",
      amenities: ["Breakfast"]
    },
    {
      id: 'NH998877665544',
      hotel: "Orbital Ring Hotel",
      status: "Completed",
      location: "Low",
      img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=400",
      checkIn: "05 Nov 2023",
      checkInTime: "02:00 PM",
      checkOut: "08 Nov 2023",
      checkOutTime: "10:00 AM",
      guest: "Jordan Smith",
      guestFrom: "Tokyo, Earth",
      guestTotal: "2 Adults, 1 Child",
      accommodation: "Zero-G Family Suite",
      rooms: "1 Room(s)",
      amenities: ["All Inclusive"]
    }
  ];

  const payoutMethods = [
    { id: 1, type: 'Bank', name: 'Bank of America', account: '•••• 1234', isDefault: true, icon: Building },
    { id: 2, type: 'Bank', name: 'Chase Bank', account: '•••• 5678', isDefault: false, subtext: 'Bank Account', icon: Building },
    { id: 3, type: 'PayPal', name: 'PayPal Account', account: 'hotelier@email.com', isDefault: false, icon: Globe }
  ];

  const payoutHistory = [
    { id: 'p1', amount: '$1,250.00', date: 'Oct 15, 2023', status: 'Sent' },
    { id: 'p2', amount: '$980.50', date: 'Oct 01, 2023', status: 'Sent' },
    { id: 'p3', amount: '$2,112.75', date: 'Sep 15, 2023', status: 'Sent' },
  ];

  const removeInterest = (val: string) => {
    setInterests(interests.filter(i => i !== val));
  };

  const Toggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <div className="flex items-center space-x-3">
      <span className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-300 w-12 text-right ${active ? 'text-[#00BCD4]' : 'text-slate-300'}`}>
        {active ? 'Active' : 'Muted'}
      </span>
      <button 
        onClick={onClick}
        className={`w-12 h-6 rounded-full relative transition-all duration-500 flex items-center p-1 ${active ? 'bg-[#00BCD4] shadow-lg shadow-[#00BCD4]/20' : 'bg-slate-200'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full absolute transition-all duration-500 shadow-sm transform ${active ? 'translate-x-6 scale-110' : 'translate-x-0'}`} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pt-[88px] bg-slate-50 pb-20 font-['Plus_Jakarta_Sans']">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR */}
        <div className="lg:w-[320px] shrink-0">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
            <div className="p-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 ring-8 ring-blue-50/50">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-1">{user.name}</h2>
              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{user.email}</p>
            </div>

            <div className="px-4 pb-10 space-y-1">
              {menuItems.map((item) => {
                const isActive = activeMenu === item.name;
                return (
                  <button 
                    key={item.name}
                    onClick={() => setActiveMenu(item.name)}
                    className={`w-full group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                      isActive 
                      ? 'bg-slate-950 text-white shadow-xl shadow-slate-950/20' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2.5 rounded-xl transition-colors ${
                        isActive ? 'bg-white/10' : 'bg-slate-100 text-slate-400 group-hover:bg-white'
                      }`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[14px] font-bold tracking-tight ${isActive ? 'text-white' : 'text-slate-500'}`}>
                        {item.name}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                  </button>
                );
              })}

              <div className="pt-10 px-4">
                <button 
                  onClick={onLogout}
                  className="w-full bg-[#FEF2F2] text-[#EF4444] py-4 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-[#FEE2E2] transition-colors shadow-sm active:scale-95 transform"
                >
                  <LogOut className="w-4 h-4" />
                  <span>LOG OUT</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1">
          {activeMenu === 'My Bookings' && (
            <div className="space-y-8">
              <div className="bg-slate-100 p-1.5 rounded-[1.5rem] inline-flex items-center w-full md:w-auto">
                {[
                  { id: 'UPCOMING', icon: Briefcase },
                  { id: 'CANCELLED', icon: XCircle },
                  { id: 'COMPLETED', icon: CheckCircle2 }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 md:flex-none flex items-center justify-center space-x-3 px-10 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all duration-300 ${
                        isActive 
                        ? 'bg-white text-slate-900 shadow-xl' 
                        : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <tab.icon size={14} className={isActive ? 'text-slate-900' : 'text-slate-300'} />
                      <span>{tab.id}</span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-[1.5rem] border border-[#EEF2F6] shadow-sm overflow-hidden flex flex-col group">
                    <div className="p-8 pb-4 flex items-start justify-between">
                      <div className="flex items-center space-x-5">
                        <div className="w-16 h-16 rounded-[1rem] overflow-hidden shadow-sm shrink-0 border border-slate-100">
                          <img src={booking.img} className="w-full h-full object-cover" alt="hotel" />
                        </div>
                        <div>
                          <h3 className="text-[26px] font-serif font-medium text-[#0F172A] tracking-tight leading-none mb-2">{booking.hotel}</h3>
                          <div className="flex items-center space-x-3">
                            <span className="bg-blue-50 text-agent-blue px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100">
                              {booking.status}
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                            <span className="text-[13px] font-medium text-slate-400">{booking.location}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                            <span className="text-[13px] font-medium text-slate-300">#{booking.id}</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-white border border-slate-200 px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all">
                        DETAILS
                      </button>
                    </div>

                    <div className="px-10 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-slate-50">
                      <div className="md:col-span-3 flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">CHECK-IN</p>
                          <h4 className="text-[20px] font-bold text-[#0F172A] leading-none mb-1">{booking.checkIn}</h4>
                          <p className="text-[13px] font-medium text-slate-400">{booking.checkInTime}</p>
                        </div>
                        <div className="mt-8">
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">CHECK-OUT</p>
                          <h4 className="text-[20px] font-bold text-[#0F172A] leading-none mb-1">{booking.checkOut}</h4>
                          <p className="text-[13px] font-medium text-slate-400">{booking.checkOutTime}</p>
                        </div>
                      </div>

                      <div className="hidden md:block w-px bg-slate-100 h-full mx-auto" />

                      <div className="md:col-span-4">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-6">GUEST DETAILS</p>
                        <div className="flex items-start space-x-4">
                          <div className="p-1 text-agent-blue">
                            <User size={20} strokeWidth={2.5} />
                          </div>
                          <div>
                            <h4 className="text-[22px] font-bold text-[#0F172A] leading-tight mb-2 tracking-tight">{booking.guest}</h4>
                            <div className="space-y-1.5">
                              <p className="text-[13px] font-medium text-slate-400 flex items-center">
                                <MapPin size={13} className="mr-2 opacity-50" /> From: {booking.guestFrom}
                              </p>
                              <p className="text-[13px] font-medium text-slate-400 flex items-center">
                                <Users size={13} className="mr-2 opacity-50" /> Total: {booking.guestTotal}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:block w-px bg-slate-100 h-full mx-auto" />

                      <div className="md:col-span-4 flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-6">ACCOMMODATION</p>
                          <div className="mb-6">
                            <h4 className="text-[22px] font-bold text-[#0F172A] leading-tight mb-2 tracking-tight">{booking.accommodation}</h4>
                            <p className="text-[13px] font-medium text-slate-400 flex items-center">
                              <Bed size={15} className="mr-2 opacity-50" /> {booking.rooms}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {booking.amenities.map((amenity, idx) => (
                              <div key={idx} className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl flex items-center space-x-2 shadow-sm">
                                <Coffee className="w-4 h-4 text-agent-blue" />
                                <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-8 pt-4">
                          <button className="flex items-center space-x-3 text-[11px] font-black text-agent-blue uppercase tracking-[0.3em] hover:text-blue-700 transition-colors group">
                            <Download size={16} strokeWidth={3} className="transition-transform group-hover:translate-y-0.5" />
                            <span>INVOICE</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMenu === 'Personal Information' && (
            <div className="bg-white rounded-[2rem] border border-[#EEF2F6] shadow-sm overflow-hidden animate-in fade-in duration-500">
              <div className="p-8 pb-4 flex items-center space-x-4 border-b border-slate-50 mb-8">
                <button 
                  onClick={() => setActiveMenu('My Bookings')}
                  className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all"
                >
                  <ArrowLeft size={20} />
                </button>
                <h3 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight leading-none">Edit Personal Profile</h3>
              </div>

              <div className="max-w-2xl mx-auto px-8 pb-12">
                <div className="flex flex-col items-center mb-12">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-agent-blue shadow-xl p-1">
                      <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="Profile" />
                    </div>
                    <button className="absolute bottom-1 right-1 w-8 h-8 bg-agent-blue rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg transform hover:scale-110 transition-transform">
                      <Pencil size={14} fill="currentColor" />
                    </button>
                  </div>
                  <button className="px-6 py-2 border border-[#EEF2F6] rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-slate-300 transition-all">
                    CHANGE PHOTO
                  </button>
                </div>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">FULL NAME</label>
                      <input 
                        type="text" 
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#EEF2F6] rounded-xl p-4 text-[15px] font-bold text-slate-600 outline-none focus:border-agent-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">CONTACT EMAIL</label>
                      <input 
                        type="email" 
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#EEF2F6] rounded-xl p-4 text-[15px] font-bold text-slate-600 outline-none focus:border-agent-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">PHONE NUMBER</label>
                      <input 
                        type="tel" 
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#EEF2F6] rounded-xl p-4 text-[15px] font-bold text-slate-600 outline-none focus:border-agent-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">HOME ADDRESS</label>
                      <input 
                        type="text" 
                        value={profileAddress}
                        onChange={(e) => setProfileAddress(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#EEF2F6] rounded-xl p-4 text-[15px] font-bold text-slate-600 outline-none focus:border-agent-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">DESTINATION INTERESTS</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {interests.map(interest => (
                          <div key={interest} className="flex items-center space-x-1.5 bg-blue-50 text-agent-blue px-3 py-1.5 rounded-full border border-blue-100 animate-in fade-in zoom-in-95">
                            <span className="text-[11px] font-bold">{interest}</span>
                            <button onClick={() => removeInterest(interest)} className="hover:text-red-500 transition-colors">
                              <X size={12} strokeWidth={3} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        <select className="w-full bg-[#F8FAFC] border border-[#EEF2F6] rounded-xl pl-11 pr-10 py-4 text-[14px] font-medium text-slate-400 appearance-none outline-none focus:border-agent-blue transition-colors">
                          <option>Select destinations to add...</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-agent-blue text-white py-5 rounded-xl font-black text-[13px] uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 hover:bg-blue-600 active:scale-[0.98] transition-all transform mt-8">
                    SAVE CHANGES
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeMenu === 'Payment Methods' && (
            <div className="bg-white rounded-[2rem] border border-[#EEF2F6] shadow-sm overflow-hidden animate-in fade-in duration-500">
              <div className="p-8 flex items-center space-x-4 border-b border-slate-50 mb-8">
                <button 
                  onClick={() => setActiveMenu('My Bookings')}
                  className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all"
                >
                  <ArrowLeft size={20} />
                </button>
                <h3 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight leading-none">Payout Methods</h3>
              </div>

              <div className="max-w-2xl mx-auto px-8 pb-12">
                <div className="space-y-4 mb-10">
                  {payoutMethods.map((method) => (
                    <div key={method.id} className="bg-white border border-[#EEF2F6] rounded-[1.8rem] p-5 flex items-center justify-between group hover:border-slate-300 transition-all">
                      <div className="flex items-center space-x-5">
                        <div className="w-14 h-14 bg-[#E0EDFF] rounded-2xl flex items-center justify-center text-agent-blue shrink-0">
                          <method.icon size={28} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-0.5">
                            <h4 className="text-[17px] font-black text-slate-900 tracking-tighter leading-none">{method.name} {method.account}</h4>
                            {method.isDefault && (
                              <span className="bg-blue-50 text-agent-blue px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                Default
                              </span>
                            )}
                          </div>
                          {method.subtext && (
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{method.subtext}</p>
                          )}
                          {method.type === 'PayPal' && (
                            <p className="text-[12px] font-bold text-slate-400 lowercase tracking-tight">{method.account}</p>
                          )}
                        </div>
                      </div>
                      <button className="p-3 text-slate-300 hover:text-slate-900 transition-colors">
                        <Settings size={20} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center space-y-10">
                  <div className="flex items-center space-x-3 text-slate-400">
                    <Lock size={14} className="opacity-50" />
                    <p className="text-[11px] font-medium tracking-tight">Your financial information is encrypted and stored securely.</p>
                  </div>
                  <button className="w-full bg-agent-blue text-white py-5 rounded-[1.5rem] font-black text-[13px] uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 hover:bg-blue-600 active:scale-[0.98] transition-all transform flex items-center justify-center space-x-3">
                    <Plus size={18} strokeWidth={3} />
                    <span>ADD NEW PAYOUT METHOD</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'Earnings' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center space-x-4 mb-2">
                <button 
                  onClick={() => setActiveMenu('My Bookings')}
                  className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-full transition-all"
                >
                  <ArrowLeft size={20} />
                </button>
                <h3 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight leading-none">My Earnings</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-[1.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[160px]">
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">TOTAL REVENUE</p>
                   <div className="flex items-baseline space-x-2">
                      <h4 className="text-[42px] font-serif font-medium text-slate-900 tracking-tighter leading-none">$12,450</h4>
                   </div>
                   <p className="text-[12px] font-black text-emerald-500 mt-2 tracking-widest">+12.5%</p>
                </div>
                <div className="bg-white rounded-[1.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[160px]">
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">BOOKINGS</p>
                   <div className="flex items-baseline space-x-2">
                      <h4 className="text-[42px] font-serif font-medium text-slate-900 tracking-tighter leading-none">82</h4>
                   </div>
                   <p className="text-[12px] font-black text-emerald-500 mt-2 tracking-widest">+8.2%</p>
                </div>
                <div className="bg-white rounded-[1.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[160px]">
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">BOOKING REFERRED</p>
                   <div className="flex items-baseline space-x-2">
                      <h4 className="text-[42px] font-serif font-medium text-slate-900 tracking-tighter leading-none">145</h4>
                   </div>
                   <p className="text-[12px] font-black text-emerald-500 mt-2 tracking-widest">+15.2%</p>
                </div>
                <div className="bg-white rounded-[1.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[160px]">
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">BOOKING CONVERTED</p>
                   <div className="flex items-baseline space-x-2">
                      <h4 className="text-[42px] font-serif font-medium text-slate-900 tracking-tighter leading-none">64</h4>
                   </div>
                   <p className="text-[12px] font-black text-emerald-500 mt-2 tracking-widest">+4.8%</p>
                </div>
              </div>

              <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-8 overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xl font-black text-slate-900 tracking-tight">Revenue Trend</h4>
                  <div className="flex items-center space-x-4">
                     <span className="text-[32px] font-serif font-medium text-slate-900 tracking-tighter">$12,450</span>
                     <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest">Last 30 Days +12.5%</span>
                  </div>
                </div>

                <div className="relative h-64 w-full">
                   <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                      <line x1="0" y1="50" x2="1000" y2="50" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="100" x2="1000" y2="100" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="150" x2="1000" y2="150" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                      <path d="M 0 150 C 100 120, 150 50, 200 80 C 250 110, 300 160, 400 150 C 500 140, 550 80, 600 100 C 650 120, 700 170, 800 140 C 900 110, 950 80, 1000 70 L 1000 200 L 0 200 Z" fill="rgba(46, 107, 255, 0.05)" />
                      <path d="M 0 150 C 100 120, 150 50, 200 80 C 250 110, 300 160, 400 150 C 500 140, 550 80, 600 100 C 650 120, 700 170, 800 140 C 900 110, 950 80, 1000 70" fill="none" stroke="#2E6BFF" strokeWidth="3" strokeLinecap="round" />
                   </svg>
                   <div className="flex justify-between items-center mt-4 px-2">
                      {['W1', 'W2', 'W3', 'W4'].map(w => (
                        <span key={w} className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{w}</span>
                      ))}
                   </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                 <h4 className="text-xl font-serif text-[#0F172A] font-medium tracking-tight">Payout History</h4>
                 <div className="space-y-3">
                   {payoutHistory.map(payout => (
                     <div key={payout.id} className="bg-white border border-[#EEF2F6] rounded-[1.5rem] p-6 flex items-center justify-between shadow-sm group hover:border-slate-300 transition-all">
                        <div className="flex items-center space-x-5">
                           <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                              <Wallet size={20} strokeWidth={2.5} />
                           </div>
                           <div>
                              <h5 className="text-[17px] font-black text-slate-900 tracking-tight leading-none mb-1.5">{payout.amount}</h5>
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{payout.date}</p>
                           </div>
                        </div>
                        <div className="bg-blue-50 text-agent-blue px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border border-blue-100">
                           {payout.status}
                        </div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          )}

          {activeMenu === 'Settings' && (
            <div className="bg-white rounded-[2rem] border border-[#EEF2F6] shadow-sm overflow-hidden animate-in fade-in duration-500">
              <div className="p-8 flex items-center space-x-4 border-b border-slate-50 mb-8">
                <button 
                  onClick={() => setActiveMenu('My Bookings')}
                  className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all"
                >
                  <ArrowLeft size={20} />
                </button>
                <h3 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight leading-none">Settings</h3>
              </div>

              <div className="max-w-2xl mx-auto px-8 pb-12 space-y-12">
                
                {/* ACCOUNT INFORMATION */}
                <section>
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">ACCOUNT INFORMATION</h4>
                   <div className="bg-white border border-[#EEF2F6] rounded-[1.5rem] overflow-hidden">
                      <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                         <div className="flex items-center space-x-5">
                            <div className="w-11 h-11 bg-[#E0F7FA] rounded-xl flex items-center justify-center text-[#00BCD4]">
                               <Building size={22} />
                            </div>
                            <span className="text-[15px] font-bold text-slate-700">Edit Business Profile</span>
                         </div>
                         <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <div className="h-px bg-[#EEF2F6] mx-5" />
                      <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                         <div className="flex items-center space-x-5">
                            <div className="w-11 h-11 bg-[#E0F7FA] rounded-xl flex items-center justify-center text-[#00BCD4]">
                               <Lock size={20} />
                            </div>
                            <span className="text-[15px] font-bold text-slate-700">Change Password</span>
                         </div>
                         <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                </section>

                {/* NOTIFICATIONS */}
                <section>
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">NOTIFICATIONS</h4>
                   <div className="bg-white border border-[#EEF2F6] rounded-[1.5rem] overflow-hidden">
                      <div className="p-5 flex items-center justify-between">
                         <div className="flex items-center space-x-5">
                            <div className="w-11 h-11 bg-[#E8F5E9] rounded-xl flex items-center justify-center text-[#4CAF50]">
                               <Briefcase size={20} />
                            </div>
                            <span className="text-[15px] font-bold text-slate-700">New Booking Requests</span>
                         </div>
                         <Toggle active={notifBooking} onClick={() => setNotifBooking(!notifBooking)} />
                      </div>
                      <div className="h-px bg-[#EEF2F6] mx-5" />
                      <div className="p-5 flex items-center justify-between">
                         <div className="flex items-center space-x-5">
                            <div className="w-11 h-11 bg-[#FFEBEE] rounded-xl flex items-center justify-center text-[#F44336]">
                               <XCircle size={20} />
                            </div>
                            <span className="text-[15px] font-bold text-slate-700">Cancellations</span>
                         </div>
                         <Toggle active={notifCancellations} onClick={() => setNotifCancellations(!notifCancellations)} />
                      </div>
                      <div className="h-px bg-[#EEF2F6] mx-5" />
                      <div className="p-5 flex items-center justify-between">
                         <div className="flex items-center space-x-5">
                            <div className="w-11 h-11 bg-[#E3F2FD] rounded-xl flex items-center justify-center text-[#2196F3]">
                               <Bell size={20} />
                            </div>
                            <span className="text-[15px] font-bold text-slate-700">New Messages</span>
                         </div>
                         <Toggle active={notifMessages} onClick={() => setNotifMessages(!notifMessages)} />
                      </div>
                   </div>
                </section>

                {/* PAYOUT METHODS */}
                <section>
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">PAYOUT METHODS</h4>
                   <div className="bg-white border border-[#EEF2F6] rounded-[1.5rem] overflow-hidden">
                      <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                         <div className="flex items-center space-x-5">
                            <div className="w-11 h-11 bg-[#E8F5E9] rounded-xl flex items-center justify-center text-[#4CAF50]">
                               <CreditCard size={20} />
                            </div>
                            <span className="text-[15px] font-bold text-slate-700">Manage Payout Methods</span>
                         </div>
                         <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                </section>

              </div>
            </div>
          )}
          
          {activeMenu !== 'My Bookings' && 
           activeMenu !== 'Personal Information' && 
           activeMenu !== 'Payment Methods' && 
           activeMenu !== 'Earnings' && 
           activeMenu !== 'Settings' && (
            <div className="bg-white rounded-[2rem] border border-slate-200 p-20 text-center flex flex-col items-center">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                 <Settings size={40} />
               </div>
               <h3 className="text-2xl font-serif text-slate-900 mb-2">{activeMenu} module under maintenance</h3>
               <p className="text-slate-400 max-w-sm">This system node is currently being updated for high-fidelity sync. Please check back later.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
