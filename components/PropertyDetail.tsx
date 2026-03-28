'use client';


import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Coffee, 
  Utensils, 
  Zap, 
  Clock, 
  Mountain, 
  UtensilsCrossed, 
  Umbrella, 
  Plane, 
  Navigation, 
  ChevronRight, 
  Info, 
  Building, 
  Compass, 
  HeartHandshake, 
  Baby, 
  Maximize, 
  Bed, 
  Bath, 
  Home,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Train,
  Bus,
  Users,
  Car,
  Circle,
  CheckCircle,
  Waves,
  Grape,
  Plus,
  ShieldCheck,
  XCircle,
  X,
  Bell,
  CigaretteOff,
  Wifi,
  ParkingCircle,
  Egg,
  Wind,
  ExternalLink,
  Footprints,
  Flame,
  Gift,
  Trees,
  Anchor,
  ChefHat,
  User,
  RefreshCw,
  Music,
  LocateFixed
} from 'lucide-react';

interface PropertyDetailProps {
  hotel: any;
  onBack: () => void;
  onRequestToBook?: () => void;
}

const categorizedServices = [
  {
    category: "COMPLIMENTARY",
    items: [
      { icon: Trees, label: "Guided Nature Walk", price: "FREE", desc: "Explore local flora and fauna." },
      { icon: Baby, label: "Kids Play Zone", price: "FREE", desc: "Safe and engaging environment for young explorers." },
      { icon: Flame, label: "Board Games & Bonfire", price: "FREE", desc: "Cozy evening gatherings with classic entertainment." }
    ]
  },
  {
    category: "ROMANTIC",
    items: [
      { icon: Gift, label: "Anniversary Decoration", price: "₹2,500", desc: "Special room setup with floral arrangements." },
      { icon: Heart, label: "Honeymoon Package", price: "₹3,500", desc: "Premium suite enhancements for newlyweds." },
      { icon: Utensils, label: "Candlelight Dinner", price: "₹4,500", desc: "Private gourmet dining under the stars." }
    ]
  },
  {
    category: "WELLNESS",
    items: [
      { icon: Sparkles, label: "Aromatherapy Session", price: "₹1,800", desc: "Essential oil therapy for deep relaxation." },
      { icon: Waves, label: "Swedish Massage", price: "₹2,500", desc: "Classic full-body therapeutic massage." },
      { icon: Zap, label: "Couple's Spa Package", price: "₹4,500", desc: "Shared rejuvenation experience for two." }
    ]
  },
  {
    category: "ADVENTURE",
    items: [
      { icon: Wind, label: "Paragliding", price: "₹3,500", desc: "Aerial voyage over the scenic landscape." },
      { icon: Trees, label: "Jungle Safari", price: "₹2,500", desc: "Wildlife exploration in the nearby reserve." },
      { icon: Anchor, label: "Boating", price: "₹800", desc: "Serene lake excursion at sunset." }
    ]
  },
  {
    category: "DINING",
    items: [
      { icon: UtensilsCrossed, label: "Local Cuisine Tasting", price: "₹1,800", desc: "Curated sampling of regional delicacies." },
      { icon: ChefHat, label: "Cooking Class", price: "₹2,200", desc: "Master the art of local culinary traditions." },
      { icon: Music, label: "Cultural Evening", price: "₹1,800", desc: "Folk show and traditional music." }
    ]
  }
];

const transferCategories = [
  {
    id: 'airport',
    title: 'AIRPORT TRANSFER',
    distance: '45 KM',
    icon: Plane,
    desc: 'Luxury AC sedan transfer from/to the nearest airport. Enjoy a premium comfortable ride.',
    options: [
      { id: 'air-p', label: 'Pick-up only', price: '₹1,500', numeric: 1500, icon: User },
      { id: 'air-d', label: 'Drop only', price: '₹1,500', numeric: 1500, icon: Car },
      { id: 'air-pd', label: 'Pick-up + Drop', price: '₹2,800', numeric: 2800, icon: RefreshCw },
    ]
  },
  {
    id: 'railway',
    title: 'RAILWAY STATION TRANSFER',
    distance: '18 KM',
    icon: Train,
    desc: 'Convenient transfer from the nearest railway station. Enjoy a premium comfortable ride.',
    options: [
      { id: 'rail-p', label: 'Pick-up only', price: '₹900', numeric: 900, icon: User },
      { id: 'rail-d', label: 'Drop only', price: '₹900', numeric: 900, icon: Car },
      { id: 'rail-pd', label: 'Pick-up + Drop', price: '₹1,700', numeric: 1700, icon: RefreshCw },
    ]
  },
  {
    id: 'bus',
    title: 'BUS STAND TRANSFER',
    distance: '12 KM',
    icon: Bus,
    desc: 'Hassle-free transfer from the central bus stand. Enjoy a comfortable ride.',
    options: [
      { id: 'bus-p', label: 'Pick-up only', price: '₹900', numeric: 900, icon: User },
      { id: 'bus-d', label: 'Drop only', price: '₹900', numeric: 900, icon: Car },
      { id: 'bus-pd', label: 'Pick-up + Drop', price: '₹1,700', numeric: 1700, icon: RefreshCw },
    ]
  }
];

const allOfferings = categorizedServices.flatMap(c => c.items);

const PropertyDetail: React.FC<PropertyDetailProps> = ({ hotel, onBack, onRequestToBook }) => {
  const [liked, setLiked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(448); // 7:28
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedRateId, setSelectedRateId] = useState<string>('st-ro'); // Default to first room only rate
  const [selectedTransfers, setSelectedTransfers] = useState<Record<string, string>>({});
  const [showGallery, setShowGallery] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const galleryImages = [
    hotel?.mainImg || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const toggleService = (label: string) => {
    setSelectedServices(prev => 
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  const toggleTransfer = (catId: string, optId: string) => {
    setSelectedTransfers(prev => {
      if (prev[catId] === optId) {
        const next = { ...prev };
        delete next[catId];
        return next;
      }
      return { ...prev, [catId]: optId };
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getFeatureIcon = (feature: string) => {
    const f = feature.toLowerCase();
    if (f.includes('sq.ft')) return <Maximize className="w-3.5 h-3.5 text-slate-400" />;
    if (f.includes('view')) return <Compass className="w-3.5 h-3.5 text-slate-400" />;
    if (f.includes('bed')) return <Bed className="w-3.5 h-3.5 text-slate-400" />;
    if (f.includes('bath')) return <Bath className="w-3.5 h-3.5 text-slate-400" />;
    return <CheckCircle2 className="w-3.5 h-3.5 text-slate-200" />;
  };

  const popularFacilities = [
    { icon: Bus, label: "Airport shuttle" },
    { icon: Bell, label: "Room service" },
    { icon: Utensils, label: "Restaurant" },
    { icon: CigaretteOff, label: "Non-smoking" },
    { icon: ParkingCircle, label: "Free parking" },
    { icon: Wifi, label: "Free WiFi" },
    { icon: Users, label: "Family rooms" },
    { icon: Clock, label: "24-hour desk" },
    { icon: Coffee, label: "Tea/Coffee" },
    { icon: Egg, label: "Breakfast" },
    { icon: Wind, label: "Air conditioning" },
    { icon: Waves, label: "Swimming pool" },
  ];

  const roomTypes = [
    {
      id: 'Standard',
      name: "Standard Pod",
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=400",
      features: ["355 sq.ft", "City View", "2 x Single Bed", "1 Bathroom"],
      rates: [
        { id: 'st-ro', label: "Room Only", price: "₹6,990", taxes: "+ ₹1,240 taxes & fees", numeric: 6990 },
        { id: 'st-fb', label: "Free Breakfast", price: "₹8,590", taxes: "+ ₹1,240 taxes & fees", numeric: 8590 },
        { id: 'st-hb', label: "Breakfast & Lunch/Dinner", price: "₹11,200", taxes: "+ ₹1,240 taxes & fees", numeric: 11200 },
        { id: 'st-afb', label: "Full Board (All Meals)", price: "₹14,500", taxes: "+ ₹1,240 taxes & fees", numeric: 14500 },
      ]
    },
    {
      id: 'Deluxe',
      name: "Deluxe Orbit Suite",
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=400",
      features: ["450 sq.ft", "Galaxy View", "1 x King Bed", "1 Bath + S..."],
      rates: [
        { id: 'dl-ro', label: "Room Only", price: "₹12,500", taxes: "+ ₹1,240 taxes & fees", numeric: 12500 },
        { id: 'dl-fb', label: "Free Breakfast", price: "₹14,100", taxes: "+ ₹1,240 taxes & fees", numeric: 14100 },
        { id: 'dl-hb', label: "Breakfast & Lunch/Dinner", price: "₹16,800", taxes: "+ ₹1,240 taxes & fees", numeric: 16800 },
        { id: 'dl-afb', label: "Full Board (All Meals)", price: "₹19,500", taxes: "+ ₹1,240 taxes & fees", numeric: 19500 },
      ]
    },
    {
      id: 'Executive',
      name: "Nebula Executive Suite",
      img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=400",
      features: ["850 sq.ft", "Panoramic View", "1 x Super King", "Private Spa Bath"],
      rates: [
        { id: 'ex-ro', label: "Room Only", price: "₹22,400", taxes: "+ ₹2,240 taxes & fees", numeric: 22400 },
        { id: 'ex-fb', label: "Free Breakfast", price: "₹24,800", taxes: "+ ₹2,240 taxes & fees", numeric: 24800 },
        { id: 'ex-hb', label: "Breakfast & Lunch/Dinner", price: "₹28,200", taxes: "+ ₹2,240 taxes & fees", numeric: 28200 },
        { id: 'ex-afb', label: "Full Board (All Meals)", price: "₹32,000", taxes: "+ ₹2,240 taxes & fees", numeric: 32000 },
      ]
    }
  ];

  const currentSelectedRate = useMemo(() => {
    for (const room of roomTypes) {
      const rate = room.rates.find(r => r.id === selectedRateId);
      if (rate) return rate;
    }
    return roomTypes[0].rates[0];
  }, [selectedRateId]);

  const totalPrice = useMemo(() => {
    let base = currentSelectedRate.numeric;
    selectedServices.forEach(s => {
      const service = allOfferings.find(eo => eo.label === s);
      if (service) {
        if (service.price === "FREE") return;
        const p = parseInt(service.price.replace(/[^\d]/g, ''));
        if (!isNaN(p)) base += p;
      }
    });

    // Add transfers
    Object.entries(selectedTransfers).forEach(([catId, optId]) => {
      const cat = transferCategories.find(c => c.id === catId);
      const opt = cat?.options.find(o => o.id === optId);
      if (opt) {
        base += opt.numeric;
      }
    });

    return base;
  }, [currentSelectedRate, selectedServices, allOfferings, selectedTransfers, transferCategories]);

  const aboutFeatures = [
    { 
      title: "Historic Charm", 
      icon: Building, 
      desc: "Nebula Cloud Habitat is housed in a recently renovated historic building in Orion. The property features a sun terrace and lush gardens." 
    },
    { 
      title: "Comfortable Stays", 
      icon: Umbrella, 
      desc: "Rooms offer air-conditioning, private bathrooms, and stellar views. Soundproofing for a peaceful rest." 
    },
    { 
      title: "Dining Experience", 
      icon: UtensilsCrossed, 
      desc: "The family-friendly restaurant serves local and international cuisines. Breakfast options include continental, American, vegetarian, and Asian spreads." 
    },
    { 
      title: "Convenient Location", 
      icon: Navigation, 
      desc: "Located in the heart of Venus Upper Atmosphere, the hotel is near major attractions such as City Palace and the Central Science Hub.",
      badge: "Couples rated location 8.8"
    }
  ];

  // Helper to generate a Google Maps embed URL based on hotel name and location
  const getMapUrl = () => {
    const query = `${hotel?.name || 'Hotel'} ${hotel?.locationDetail || ''}`;
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="pt-[64px] min-h-screen bg-[#FDFDFD] font-['Plus_Jakarta_Sans'] pb-10">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-4">
        
        {/* Navigation */}
        <div className="mb-4">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Hero Section - Grid Gallery Style */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 group bg-white cursor-pointer" onClick={() => setShowGallery(true)}>
               <div className="grid grid-cols-12 gap-1 h-[400px] lg:h-[500px]">
                 {/* Main Large Image */}
                 <div className="col-span-8 relative overflow-hidden">
                   <img 
                     src={galleryImages[0]} 
                     className="w-full h-full object-cover transition-transform duration-[4s] hover:scale-105" 
                     alt="Hero Main" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                   
                   <div className="absolute bottom-6 left-8 right-8">
                      <div className="flex items-center space-x-2 mb-1 text-cyan-400">
                        <MapPin className="w-3 h-3" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{hotel?.locationDetail || 'Orion Cluster'}</span>
                      </div>
                      <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tighter mb-2 leading-none">{hotel?.name || 'Habitat Node'}</h1>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                           <Star className="w-3.5 h-3.5 text-agent-orange fill-agent-orange" />
                           <span className="text-sm font-black text-white">9.2</span>
                        </div>
                        <span className="bg-agent-blue/80 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white">Top Rated</span>
                      </div>
                   </div>
                 </div>

                 {/* Right Side Grid */}
                 <div className="col-span-4 grid grid-rows-2 gap-1">
                   <div className="grid grid-cols-2 gap-1">
                     <div className="overflow-hidden">
                       <img src={galleryImages[1]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Gallery 1" />
                     </div>
                     <div className="overflow-hidden">
                       <img src={galleryImages[2]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Gallery 2" />
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-1">
                     <div className="overflow-hidden">
                       <img src={galleryImages[3]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Gallery 3" />
                     </div>
                     <div className="overflow-hidden">
                       <img src={galleryImages[4]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Gallery 4" />
                     </div>
                   </div>
                 </div>
               </div>
               
               <button 
                 onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} 
                 className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full text-slate-400 hover:text-agent-pink transition-all shadow-2xl z-20 active:scale-90"
               >
                 <Heart className={`w-5 h-5 ${liked ? 'fill-agent-pink text-agent-pink' : ''}`} />
               </button>

               <button 
                 onClick={(e) => { e.stopPropagation(); setShowGallery(true); }}
                 className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-slate-900 font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-white transition-all z-20 flex items-center space-x-2"
               >
                 <Maximize className="w-3 h-3" />
                 <span>Show all photos</span>
               </button>
            </div>

            {/* About Property - Compact Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-950 tracking-tighter leading-none">About</h2>
                <div className="hidden sm:flex items-center space-x-2 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg shadow-sm">
                  <LocateFixed className="w-3 h-3 text-agent-blue" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Verified</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {aboutFeatures.map((card, i) => (
                  <div key={i} className="bg-white rounded-[1rem] p-4 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow group/card">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="p-1.5 bg-orange-50 rounded-lg group-hover/card:bg-agent-orange transition-colors">
                        <card.icon className="w-4 h-4 text-agent-orange group-hover/card:text-white transition-colors" strokeWidth={2.5} />
                      </div>
                      <h4 className="text-base font-black text-slate-900 tracking-tight leading-none">{card.title}</h4>
                    </div>
                    <p className="text-slate-500 text-[10px] font-medium leading-relaxed mb-2 flex-1">
                      {card.desc}
                    </p>
                    {card.badge && (
                      <div className="mt-auto">
                        <div className="inline-flex items-center space-x-1 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                          <Heart className="w-2.5 h-2.5 text-emerald-500 fill-emerald-500" />
                          <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest leading-none">{card.badge}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* VISUAL MAP CARD - Ultra Compact */}
                <div className="md:col-span-2 bg-white rounded-[1.5rem] border border-slate-100 shadow-lg overflow-hidden group/map relative flex flex-col lg:flex-row h-[240px]">
                   {/* Map Metadata Sidebar */}
                   <div className="w-full lg:w-[200px] p-4 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 bg-[#FDFDFD] flex flex-col justify-between relative z-10">
                      <div>
                        <div className="flex items-center space-x-2 mb-2 text-agent-pink">
                           <MapPin className="w-3 h-3 fill-agent-pink" />
                           <span className="text-[8px] font-black uppercase tracking-[0.2em]">Map</span>
                        </div>
                        <h3 className="text-lg font-black text-slate-950 tracking-tight leading-tight mb-1">Location</h3>
                        <p className="text-slate-500 text-[10px] font-medium leading-relaxed mb-2">
                          High-access zone. Experience {hotel?.locationDetail || 'the city'}.
                        </p>
                        
                        <div className="space-y-1">
                           <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-700">
                             <div className="w-1 h-1 rounded-full bg-agent-orange"></div>
                             <span>800m to Hub</span>
                           </div>
                           <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-700">
                             <div className="w-1 h-1 rounded-full bg-agent-blue"></div>
                             <span>15 min to Port</span>
                           </div>
                        </div>
                      </div>

                      <div className="pt-2">
                         <button className="flex items-center space-x-1.5 text-[8px] font-black text-slate-900 uppercase tracking-[0.2em] hover:text-agent-blue transition-colors">
                            <span>Satellite</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                         </button>
                      </div>
                   </div>

                   {/* Map Container */}
                   <div className="flex-1 relative bg-slate-50">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        style={{ border: 0 }} 
                        src={getMapUrl()} 
                        allowFullScreen
                        title="Property Map"
                        className="grayscale-[0.1] contrast-[1.1] opacity-90 transition-opacity hover:opacity-100"
                      />
                   </div>
                </div>
              </div>
            </div>

            {/* Facilities - Compact Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-950 tracking-tighter leading-none">Facilities</h2>
                <button className="text-[8px] font-black text-agent-orange uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
                  VIEW ALL
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {popularFacilities.slice(0, 8).map((facility, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-lg p-2 flex items-center space-x-2 hover:shadow-sm transition-all cursor-default">
                    <div className="shrink-0 w-6 h-6 rounded-md bg-emerald-50/50 flex items-center justify-center">
                      <facility.icon className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 truncate tracking-tight">{facility.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Availability - Compact List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-950 tracking-tighter">Availability</h2>
                <div className="flex items-center space-x-1.5 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                  <CheckCircle className="w-2 h-2 text-emerald-500" />
                  <span className="text-[7px] font-black uppercase tracking-widest text-slate-400">Full Board</span>
                </div>
              </div>
              <div className="space-y-2">
                {roomTypes.map((type) => (
                  <div key={type.id} className="bg-white rounded-[1rem] border border-slate-100 overflow-hidden shadow-sm flex flex-col sm:flex-row">
                    <div className="w-full sm:w-[140px] p-3 shrink-0 border-r border-slate-50 bg-slate-50/30">
                      <h4 className="text-[8px] font-black text-slate-900 uppercase tracking-[0.2em] mb-1.5">{type.name}</h4>
                      <div className="relative rounded-lg overflow-hidden aspect-[4/3] mb-2">
                        <img src={type.img} className="w-full h-full object-cover" />
                      </div>
                      <div className="grid grid-cols-1 gap-y-0.5">
                         {type.features.slice(0, 3).map((f, fi) => (
                             <div key={fi} className="flex items-center space-x-1 text-[8px] text-slate-400 font-bold">
                               {getFeatureIcon(f)}
                               <span className="truncate uppercase tracking-widest">{f}</span>
                             </div>
                         ))}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col p-3">
                      <div className="space-y-1.5">
                        {type.rates.map((rate, ri) => {
                          const isSelected = selectedRateId === rate.id;
                          return (
                            <label 
                              key={ri} 
                              className={`bg-white rounded-xl p-3 border transition-all cursor-pointer group flex items-center justify-between relative overflow-hidden ${
                                isSelected 
                                ? 'border-slate-950 ring-1 ring-slate-950 bg-slate-50' 
                                : 'border-slate-100 hover:border-slate-200'
                              }`}
                            >
                               <input 
                                 type="radio" 
                                 name="room-rate" 
                                 className="hidden" 
                                 checked={isSelected} 
                                 onChange={() => setSelectedRateId(rate.id)} 
                               />
                               
                               <div className="flex items-center space-x-3 relative z-10">
                                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                   isSelected ? 'border-slate-950 bg-white' : 'border-slate-200'
                                 }`}>
                                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${isSelected ? 'bg-slate-950 scale-100' : 'scale-0'}`}></div>
                                 </div>
 
                                 <div>
                                   <div className="flex items-center space-x-1.5">
                                     <p className={`font-black text-[13px] tracking-tight ${isSelected ? 'text-slate-950' : 'text-slate-700'}`}>{rate.label}</p>
                                   </div>
                                   <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">Free Cancellation</span>
                                 </div>
                               </div>
 
                               <div className="text-right relative z-10">
                                 <p className={`text-lg font-black tracking-tighter ${isSelected ? 'text-slate-950' : 'text-slate-700'}`}>{rate.price}</p>
                                 <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Inc. taxes</p>
                               </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra Services - Categorized */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-950 tracking-tighter">Extra Services</h2>
                <div className="bg-agent-pink/10 px-3 py-1 rounded-lg border border-agent-pink/20 flex items-center space-x-1.5">
                   <Sparkles className="w-3 h-3 text-agent-pink" />
                   <span className="text-[9px] font-black text-agent-pink uppercase tracking-widest">Member Perks</span>
                </div>
              </div>

              <div className="space-y-8">
                {categorizedServices.map((cat, cidx) => (
                  <div key={cidx} className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">{cat.category}</span>
                      <div className="h-px bg-slate-100 w-full"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cat.items.map((service, idx) => {
                        const isSelected = selectedServices.includes(service.label);
                        return (
                          <div 
                            key={idx}
                            onClick={() => toggleService(service.label)}
                            className={`group relative bg-white border rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer ${
                              isSelected 
                              ? 'border-agent-blue bg-blue-50/30' 
                              : 'border-slate-100 hover:border-slate-200'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                isSelected ? 'bg-agent-blue/10 text-agent-blue' : 'bg-slate-50 text-slate-400'
                              }`}>
                                <service.icon className="w-6 h-6" strokeWidth={2} />
                              </div>
                              <div>
                                <h4 className="text-sm font-black text-slate-950 tracking-tight leading-none mb-1.5">{service.label}</h4>
                                <p className="text-[11px] text-slate-400 font-medium leading-tight">{service.desc}</p>
                              </div>
                            </div>

                            <div className="flex flex-col items-end space-y-2 ml-4">
                              <p className={`text-sm font-black tracking-tighter ${isSelected ? 'text-agent-blue' : 'text-slate-950'}`}>
                                {service.price}
                              </p>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                isSelected ? 'bg-agent-blue text-white' : 'bg-slate-100 text-slate-300'
                              }`}>
                                <CheckCircle2 className="w-4 h-4" strokeWidth={3} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Services - Light Theme */}
            <div className="space-y-6 pt-4">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-950 tracking-tighter">Transfer Services</h2>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Preferred arrival options</p>
              </div>

              <div className="space-y-4">
                {transferCategories.map((cat) => (
                  <div key={cat.id} className="bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                          <cat.icon className="w-6 h-6 text-agent-blue" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-950 tracking-tight leading-none mb-1.5">{cat.title}</h3>
                          <div className="flex items-center space-x-2">
                            <LocateFixed className="w-3 h-3 text-agent-blue" />
                            <span className="text-[9px] font-black text-agent-blue uppercase tracking-widest">Distance: {cat.distance}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 max-w-2xl">
                      {cat.desc}
                    </p>

                    <div className="space-y-2">
                      {cat.options.map((opt) => {
                        const isSelected = selectedTransfers[cat.id] === opt.id;
                        return (
                          <div 
                            key={opt.id}
                            onClick={() => toggleTransfer(cat.id, opt.id)}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group relative z-10 ${
                              isSelected 
                              ? 'bg-blue-50/10 border-agent-blue shadow-sm' 
                              : 'bg-transparent border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected ? 'border-agent-blue bg-agent-blue' : 'border-slate-200 group-hover:border-slate-300'
                              }`}>
                                <div className={`w-2 h-2 rounded-full bg-white transition-all ${isSelected ? 'scale-100' : 'scale-0'}`}></div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-inner">
                                  <opt.icon className="w-5 h-5 text-slate-400" />
                                </div>
                                <span className={`text-sm font-bold transition-colors ${isSelected ? 'text-slate-950' : 'text-slate-500'}`}>{opt.label}</span>
                              </div>
                            </div>
                            <span className={`text-base font-black tracking-tighter ${isSelected ? 'text-slate-950' : 'text-slate-400'}`}>{opt.price}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR - More Compact */}
          <div className="lg:col-span-4 sticky top-[80px] z-40">
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-50 p-6 overflow-hidden relative">
              
              <div className="flex flex-col mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-slate-950 tracking-tighter">₹{totalPrice.toLocaleString()}</span>
                    <span className="text-slate-400 text-xs font-bold">/ night</span>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                    <Clock className="w-3 h-3 text-agent-pink" />
                    <span className="text-xs font-black text-slate-900 tracking-tight">{formatTime(timeLeft)}</span>
                  </div>
                </div>

                <div className="w-full bg-[#F8FAFC] rounded-xl p-4 border border-slate-100 flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">CHECK-IN</span>
                    <span className="text-slate-950 font-black text-xs">12-02-2026</span>
                  </div>
                  <Calendar className="w-4 h-4 text-slate-300" />
                </div>

                {selectedServices.length > 0 && (
                  <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">ADD-ONS ({selectedServices.length})</span>
                    <div className="space-y-1">
                       {selectedServices.map(s => (
                         <div key={s} className="flex justify-between items-center">
                           <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">{s}</span>
                           <button onClick={() => toggleService(s)} className="text-slate-300 hover:text-red-500">
                             <XCircle className="w-2.5 h-2.5 fill-current" />
                           </button>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {Object.keys(selectedTransfers).length > 0 && (
                  <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">TRANSFERS ({Object.keys(selectedTransfers).length})</span>
                    <div className="space-y-1">
                       {Object.entries(selectedTransfers).map(([catId, optId]) => {
                         const cat = transferCategories.find(c => c.id === catId);
                         const opt = cat?.options.find(o => o.id === optId);
                         return (
                           <div key={catId} className="flex justify-between items-center">
                             <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">{cat?.title.split(' ')[0]} - {opt?.label}</span>
                             <button 
                               onClick={() => setSelectedTransfers(prev => {
                                 const next = { ...prev };
                                 delete next[catId];
                                 return next;
                               })} 
                               className="text-slate-300 hover:text-red-500"
                             >
                               <XCircle className="w-2.5 h-2.5 fill-current" />
                             </button>
                           </div>
                         );
                       })}
                    </div>
                  </div>
                )}

                <button 
                  onClick={onRequestToBook}
                  className="w-full bg-slate-950 text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center space-x-2 group/book overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-agent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10">REQUEST TO BOOK</span>
                  <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform group-hover/book:translate-x-1" strokeWidth={3} />
                </button>
              </div>

              <div className="text-center pt-3 border-t border-slate-50">
                <div className="flex items-center justify-center space-x-1.5 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Price Protection</span>
                </div>
                <p className="text-slate-300 text-[7px] font-black uppercase tracking-[0.2em] leading-loose">
                  RATES SECURED BY AI • {timeLeft > 0 ? Math.floor(timeLeft/60) : 0} MIN LEFT
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Popup Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={() => setShowGallery(false)}></div>
          
          <div className="relative w-full max-w-7xl h-full max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 duration-300">
            
            {/* Left Side: Large Preview */}
            <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center">
              <img 
                src={galleryImages[activeImageIndex]} 
                className="w-full h-full object-contain animate-in fade-in duration-500" 
                alt="Gallery Preview" 
              />
              
              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <p className="text-white text-xs font-black uppercase tracking-widest">Photo {activeImageIndex + 1} of {galleryImages.length}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveImageIndex(prev => (prev > 0 ? prev - 1 : galleryImages.length - 1))}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/10"
                  >
                    <ChevronDown className="w-5 h-5 rotate-90" />
                  </button>
                  <button 
                    onClick={() => setActiveImageIndex(prev => (prev < galleryImages.length - 1 ? prev + 1 : 0))}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/10"
                  >
                    <ChevronDown className="w-5 h-5 -rotate-90" />
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setShowGallery(false)}
                className="absolute top-6 left-6 p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-all border border-white/10 lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Right Side: Scrollable List */}
            <div className="w-full lg:w-[380px] bg-white flex flex-col border-l border-slate-100">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div>
                  <h3 className="text-xl font-black text-slate-950 tracking-tighter">Property Gallery</h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none mt-1">{hotel?.name}</p>
                </div>
                <button 
                  onClick={() => setShowGallery(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-950 hidden lg:block"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                {galleryImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveImageIndex(idx)}
                    className={`group relative rounded-2xl overflow-hidden aspect-video cursor-pointer transition-all duration-300 ${
                      activeImageIndex === idx 
                      ? 'ring-4 ring-slate-950 ring-offset-2 scale-[0.98]' 
                      : 'opacity-60 hover:opacity-100 hover:scale-[1.02]'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx}`} />
                    {activeImageIndex === idx && (
                      <div className="absolute inset-0 bg-slate-950/10 flex items-center justify-center">
                        <div className="bg-white rounded-full p-1.5 shadow-lg">
                          <CheckCircle2 className="w-4 h-4 text-slate-950" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <button 
                  onClick={onRequestToBook}
                  className="w-full bg-slate-950 text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
                >
                  <span>REQUEST TO BOOK</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
