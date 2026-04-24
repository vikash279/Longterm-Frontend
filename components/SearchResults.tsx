'use client';


import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchBar from './SearchBarResult';
import FilterModal, { FilterState } from './FilterModal';
import { 
  ChevronRight, 
  ChevronDown,
  MapPin, 
  Heart, 
  Users, 
  Calendar, 
  Filter, 
  Search, 
  X,
  Plus,
  Minus,
  Navigation,
  CheckCircle2,
  Map as MapIcon,
  List as ListIcon,
  Tag,
  Star,
  Zap,
  Users2,
  TrendingDown,
  Users as UsersIcon,
  CalendarDays,
  ChevronRight as ChevronRightIcon,
  SlidersHorizontal,
  Info,
  Circle,
  DollarSign,
  Utensils
} from 'lucide-react';

interface Property {
  id: number;
  name: string;
  category: string;
  rating: number;
  totalRatings: string;
  score: string;
  price: string;
  originalPrice: string;
  locationDetail: string;
  mainImg: string;
  thumbs: string[];
  amenities: string[];
  highlights: {
    icon: any;
    text: string;
    color?: string;
  }[];
  eliteDeal?: string;
  sponsored?: boolean;
  coords: { top: string; left: string; price: string };
}

const properties: Property[] = [
  {
    id: 1,
    name: "The First Collection Dubai Marina",
    category: "4★ · Hotel",
    rating: 4.7,
    totalRatings: "8,620",
    score: "4.7/5",
    price: "₹16,911",
    originalPrice: "₹20,745",
    locationDetail: "Dubai Marina",
    mainImg: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200",
    thumbs: [],
    amenities: ["Spa", "Gym"],
    highlights: [
      { icon: CheckCircle2, text: "Green • Trendy • Great View", color: "text-emerald-500" },
      { icon: CheckCircle2, text: "Breakfast included", color: "text-emerald-500" }
    ],
    sponsored: true,
    coords: { top: '55%', left: '82%', price: '₹17T' }
  },
  {
    id: 2,
    name: "Radisson Blu Hotel Paschim Vihar",
    category: "5★ · Hotel",
    rating: 4.8,
    totalRatings: "3,546",
    score: "4.8/5",
    price: "₹18,200",
    originalPrice: "₹24,000",
    locationDetail: "West Delhi",
    mainImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
    thumbs: [],
    amenities: ["Spa", "Pool"],
    highlights: [
      { icon: Users2, text: "Couple Friendly", color: "text-orange-500" },
      { icon: CheckCircle2, text: "Free Cancellation", color: "text-emerald-500" }
    ],
    eliteDeal: "Elite Package: Priority check-in + Lounge",
    sponsored: false,
    coords: { top: '35%', left: '42%', price: '₹18T' }
  },
  {
    id: 3,
    name: "Address Beach Resort Dubai",
    category: "5★ · Hotel",
    rating: 4.9,
    totalRatings: "12,450",
    score: "4.9/5",
    price: "₹42,800",
    originalPrice: "₹55,200",
    locationDetail: "JBR, Dubai",
    mainImg: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200",
    thumbs: [],
    amenities: ["Infinity Pool", "Sky Spa"],
    highlights: [
      { icon: Users2, text: "Elite Privacy", color: "text-orange-500" },
      { icon: CheckCircle2, text: "Skyline Views", color: "text-emerald-500" }
    ],
    eliteDeal: "Titanium tier: 24/7 private node access.",
    sponsored: true,
    coords: { top: '48%', left: '86%', price: '₹43T' }
  },
  {
    id: 4,
    name: "SLS Dubai Hotel & Residences",
    category: "5★ · Residences",
    rating: 4.6,
    totalRatings: "1,204",
    score: "4.6/5",
    price: "₹28,500",
    originalPrice: "₹36,000",
    locationDetail: "Business Bay",
    mainImg: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200",
    thumbs: [],
    amenities: ["Rooftop Pool", "Lounge"],
    highlights: [
      { icon: CheckCircle2, text: "Trendy Atmosphere", color: "text-emerald-500" },
      { icon: Zap, text: "Ultra Fast Check-in", color: "text-agent-blue" }
    ],
    sponsored: false,
    coords: { top: '65%', left: '72%', price: '₹29T' }
  },
  {
    id: 5,
    name: "Palazzo Versace Dubai",
    category: "5★ · Luxury",
    rating: 4.9,
    totalRatings: "5,800",
    score: "4.9/5",
    price: "₹38,200",
    originalPrice: "₹48,000",
    locationDetail: "Jaddaf Waterfront",
    mainImg: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1200",
    thumbs: [],
    amenities: ["Designer Pool", "Italian Dining"],
    highlights: [
      { icon: CheckCircle2, text: "Opulent Decor", color: "text-emerald-500" },
      { icon: Users2, text: "Celebrity Favorite", color: "text-orange-500" }
    ],
    sponsored: false,
    coords: { top: '25%', left: '92%', price: '₹38T' }
  }
];

interface SearchResultsProps {
  onBack: () => void;
  onViewHotel: (hotel: Property) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ onBack, onViewHotel }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destination = searchParams.get('destination') || '';
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const rooms = parseInt(searchParams.get('rooms') || '1');
  const adults = parseInt(searchParams.get('adults') || '2');
  const children = parseInt(searchParams.get('children') || '0');

  // State for editing filters
  const [filterDest, setFilterDest] = useState(destination);
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(startDate ? new Date(startDate) : null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(endDate ? new Date(endDate) : null);
  const [filterRooms, setFilterRooms] = useState(rooms);
  const [filterAdults, setFilterAdults] = useState(adults);
  const [filterChildren, setFilterChildren] = useState(children);
  const [appliedFilters, setAppliedFilters] = useState<FilterState | null>(null);

  // Sync filter state with URL params when they change
  useEffect(() => {
    setFilterDest(destination);
    setFilterStartDate(startDate ? new Date(startDate) : null);
    setFilterEndDate(endDate ? new Date(endDate) : null);
    setFilterRooms(rooms);
    setFilterAdults(adults);
    setFilterChildren(children);
  }, [destination, startDate, endDate, rooms, adults, children]);

  // location autocomplete
  const dummyLocations = [
    'New York', 'London', 'Paris', 'Tokyo', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Dubai', 'Singapore'
  ];
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleDestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterDest(value);
    if (value) {
      const filtered = dummyLocations.filter(loc => loc.toLowerCase().includes(value.toLowerCase()));
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const filteredProperties = properties.filter(prop => {
    // Location filter
    const locationMatch = prop.locationDetail.toLowerCase().includes(filterDest.toLowerCase()) ||
      prop.name.toLowerCase().includes(filterDest.toLowerCase());
    
    if (!locationMatch) return false;
    
    // Apply modal filters if any
    if (appliedFilters) {
      // Price filter
      const priceValue = parseInt(prop.price.replace(/[₹,]/g, ''));
      if (priceValue < appliedFilters.priceRange[0] || priceValue > appliedFilters.priceRange[1]) {
        return false;
      }

      // Amenities filter
      if (appliedFilters.amenities.length > 0) {
        const hasAmenity = appliedFilters.amenities.some(amenity =>
          prop.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAmenity) return false;
      }

      // Breakfast included filter
      if (appliedFilters.breakfastIncluded) {
        const hasBreakfast = prop.highlights.some(h => h.text.toLowerCase().includes('breakfast'));
        if (!hasBreakfast) return false;
      }

      // Property types filter (hotels, residences, etc.)
      if (appliedFilters.propertyTypes.length > 0) {
        const matchesType = appliedFilters.propertyTypes.some(type =>
          prop.category.toLowerCase().includes(type.toLowerCase())
        );
        if (!matchesType) return false;
      }

      // Hotel class filter
      if (appliedFilters.hotelClass.length > 0) {
        const matchesClass = appliedFilters.hotelClass.some(hotelClass =>
          prop.category.includes(hotelClass)
        );
        if (!matchesClass) return false;
      }

      // Style filter
      if (appliedFilters.styles.length > 0) {
        const matchesStyle = appliedFilters.styles.some(style => {
          if (style === 'Budget' && prop.price < '₹25000') return true;
          if (style === 'Luxury' && prop.rating >= 4.5) return true;
          if (style === 'Family-friendly' && prop.amenities.length > 0) return true;
          return false;
        });
        if (!matchesStyle) return false;
      }

      // Ratings filter
      if (appliedFilters.ratings.length > 0) {
        const matchesRating = appliedFilters.ratings.some(rating =>
          prop.rating >= rating
        );
        if (!matchesRating) return false;
      }
    }

    return true;
  });

  const totalGuests = filterAdults + filterChildren;

  const formatDateParam = (iso: string | null) => {
    if (!iso) return 'Select';
    try {
      return format(new Date(iso), 'EEE, dd MMM');
    } catch {
      return 'Select';
    }
  };

  const checkInLabel = formatDateParam(filterStartDate?.toISOString() || startDate);
  const checkOutLabel = formatDateParam(filterEndDate?.toISOString() || endDate);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    params.set('destination', filterDest);
    if (filterStartDate) params.set('startDate', filterStartDate.toISOString());
    if (filterEndDate) params.set('endDate', filterEndDate.toISOString());
    params.set('rooms', filterRooms.toString());
    params.set('adults', filterAdults.toString());
    params.set('children', filterChildren.toString());
    router.push('/search?' + params.toString());
  };

  const handleFilterApply = (filters: FilterState) => {
    console.log('Filters applied:', filters);
    setAppliedFilters(filters);
  };

  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [isMapView, setIsMapView] = useState(false);
  const [hoveredHotel, setHoveredHotel] = useState<number | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<'checkin' | 'checkout' | null>(null);
  const [showGuestModal, setShowGuestModal] = useState(false);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const FilterPill = ({ label, icon: Icon, active, hasInfo, children }: any) => (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border border-emerald-900/20 text-sm font-medium transition-all cursor-pointer ${active ? 'bg-emerald-50 border-emerald-900/40 text-emerald-950' : 'bg-white text-emerald-950 hover:bg-slate-50'}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children || <span>{label}</span>}
      {hasInfo && <Info className="w-3.5 h-3.5 text-slate-300 ml-1" />}
    </div>
  );

  const CircleRating = ({ count, andUp }: { count: number; andUp?: boolean }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className={`w-3.5 h-3.5 rounded-full ${i <= count ? 'bg-emerald-600' : 'border border-emerald-600'}`} />
      ))}
      {andUp && <span className="ml-1">& up</span>}
    </div>
  );

  return (
    <div className="pt-[64px] min-h-screen bg-[#F8FAFC] font-['Plus_Jakarta_Sans']">
      
      {/* 1. HIGH FIDELITY SEARCH & FILTER BAR - SINGLE ROW */}
      <div className="sticky top-[64px] z-50 bg-white border-b border-slate-100 py-2 shadow-md overflow-visible">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 overflow-visible">
          <div className="flex items-center gap-2 overflow-visible">
            
            {/* SearchBar Component - Compact */}
            <div className="relative overflow-visible">
              <SearchBar 
                initialDestination={filterDest}
                initialStartDate={filterStartDate}
                initialEndDate={filterEndDate}
                initialRooms={filterRooms}
                initialAdults={filterAdults}
                initialChildren={filterChildren}
              />
            </div>

            {/* Filter Buttons - Inline */}
            <div className="flex items-center gap-2 ml-auto flex-shrink-0">
              <button 
                onClick={() => setShowFilterModal(true)}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-full transition-all text-xs font-medium whitespace-nowrap"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
              <button className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-full transition-all text-xs font-medium whitespace-nowrap">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Price</span>
              </button>
              <button className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-full transition-all text-xs font-medium whitespace-nowrap">
                <Star className="w-3.5 h-3.5" />
                <span>Amenities</span>
              </button>
              <button className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-full transition-all text-xs font-medium whitespace-nowrap">
                <Utensils className="w-3.5 h-3.5" />
                <span>Breakfast</span>
              </button>
              <button 
                onClick={handleApplyFilters}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all shadow-sm whitespace-nowrap"
              >
                 <Search className="w-3.5 h-3.5" />
                 <span className="text-xs font-bold">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER MODAL - Extracted to separate component */}
      <FilterModal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} onApplyFilters={handleFilterApply} />

      <div className="max-w-[1440px] mx-auto flex h-[calc(100vh-120px)]">
        
        {/* 2. COMPACT DENSE LIST VIEW - Standardized Cards */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar px-4 lg:px-6 py-4 ${isMapView ? 'hidden lg:block' : 'block'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{properties.length * 280}+ properties found</h2>
            <div className="flex items-center space-x-2 text-[10px] font-bold">
              <span className="text-slate-400 uppercase tracking-widest">Sort:</span>
              <div className="flex items-center space-x-1 cursor-pointer text-slate-900">
                <span>Best Match</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredProperties.map(hotel => (
              <div 
                key={hotel.id}
                onMouseEnter={() => setHoveredHotel(hotel.id)}
                onMouseLeave={() => setHoveredHotel(null)}
                className={`group flex flex-col md:flex-row bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 md:h-[250px] w-full ${hoveredHotel === hotel.id ? 'border-agent-blue/30 ring-1 ring-agent-blue/5' : ''}`}
              >
                {/* Image Section */}
                <div className="relative w-full md:w-[280px] h-[180px] md:h-full shrink-0 overflow-hidden">
                  <img src={hotel.mainImg} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <button 
                    onClick={(e) => toggleLike(hotel.id, e)}
                    className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg text-slate-300 hover:text-agent-pink transition-all active:scale-90"
                  >
                    <Heart className={`w-3.5 h-3.5 ${liked[hotel.id] ? 'fill-current text-agent-pink' : ''}`} />
                  </button>
                  
                  {hotel.sponsored && (
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-[7px] font-black uppercase tracking-[0.2em]">
                      Sponsored
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 flex items-center space-x-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                     <div className="bg-emerald-500/90 backdrop-blur-md text-white px-2 py-1 rounded-lg shadow-xl flex items-center space-x-1 border border-white/10">
                        <TrendingDown className="w-3 h-3" />
                        <span className="text-[8px] font-black uppercase">SAVE 22%</span>
                     </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="flex-1 p-5 lg:p-6 flex flex-col justify-between min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[9px] font-black text-agent-blue uppercase tracking-widest">{hotel.category}</span>
                        <div className="h-1 w-1 rounded-full bg-slate-200" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{hotel.locationDetail}</span>
                      </div>
                      
                      <h3 className="text-lg lg:text-xl font-black text-slate-950 tracking-tighter leading-tight mb-2 group-hover:text-agent-blue transition-colors line-clamp-1">
                        {hotel.name}
                      </h3>
                      
                      <div className="flex items-center space-x-3 mb-3 bg-slate-50/50 p-1.5 rounded-xl border border-slate-100/50 w-fit">
                        <div className="bg-white text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-lg leading-none shadow-sm border border-slate-100 flex items-center">
                          <Star className="w-3 h-3 text-agent-orange fill-agent-orange mr-1" />
                          {hotel.rating}
                        </div>
                        <div className="flex space-x-0.5">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= 4 ? 'bg-[#00E676]' : 'bg-slate-200'}`} />
                          ))}
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest opacity-70 leading-none">{hotel.totalRatings} reviews</span>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {hotel.highlights.slice(0, 2).map((h, hi) => (
                          <div key={hi} className="flex items-center space-x-1.5 text-[9px] text-slate-500 font-black uppercase tracking-tight">
                            <h.icon className={`w-3.5 h-3.5 shrink-0 ${h.color || 'text-slate-400'}`} />
                            <span className="truncate">{h.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Block */}
                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-slate-300 line-through font-bold mb-0.5">{hotel.originalPrice}</div>
                      <div className="text-2xl font-black text-slate-950 tracking-tighter leading-none">{hotel.price}</div>
                      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-60 mt-1">per night</div>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-agent-pink bg-pink-50/50 px-3 py-1.5 rounded-xl border border-pink-100/50">
                      <Tag className="w-3.5 h-3.5 fill-current" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Offers Unlocked</span>
                    </div>
                    
                    <button 
                      onClick={() => onViewHotel(hotel)}
                      className="bg-slate-950 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg transition-all transform hover:scale-[1.03] active:scale-95 flex items-center space-x-2 group/btn relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-agent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative z-10">Check Details</span>
                      <ChevronRight className="relative z-10 w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. MAP VIEW */}
        <div className={`hidden lg:block w-[400px] xl:w-[450px] border-l border-slate-100 bg-[#EEF2F6] overflow-hidden`}>
          <div className="relative w-full h-full bg-[url('https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-90 mix-blend-multiply bg-center grayscale-[0.2]">
            
            {/* Map Header Overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
               <div className="pointer-events-auto flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xl hover:bg-slate-50 cursor-pointer transition-all">
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Dubai Marina Area</span>
                  <ChevronDown className="w-3 h-3 ml-2 text-slate-400" />
               </div>
               <button onClick={() => setIsMapView(false)} className="pointer-events-auto p-2.5 bg-white rounded-xl shadow-xl text-slate-950 hover:bg-slate-50 transition-all border border-slate-100">
                  <X className="w-4 h-4" strokeWidth={2.5} />
               </button>
            </div>

            {/* Price Pins and Navigation */}
            {filteredProperties.map(hotel => (
              <div 
                key={hotel.id}
                className={`absolute transition-all duration-300 ${hoveredHotel === hotel.id ? 'z-50 scale-110' : 'z-10'}`}
                style={{ top: hotel.coords.top, left: hotel.coords.left }}
                onMouseEnter={() => setHoveredHotel(hotel.id)}
                onMouseLeave={() => setHoveredHotel(null)}
              >
                <div className="relative cursor-pointer group/pin">
                  <div className={`bg-white text-slate-950 px-2.5 py-1.5 rounded-lg text-[10px] font-black shadow-2xl flex items-center space-x-1.5 border border-slate-100 transition-all ${hoveredHotel === hotel.id ? 'bg-slate-950 text-white border-slate-800 ring-4 ring-slate-950/10' : ''}`}>
                    <span>{hotel.coords.price}</span>
                  </div>
                  <div className={`w-0.5 h-2 bg-white mx-auto transition-all ${hoveredHotel === hotel.id ? 'bg-slate-950' : ''}`} />
                </div>
              </div>
            ))}

            <div className="absolute bottom-6 right-6 flex flex-col space-y-2">
              <div className="bg-white rounded-xl shadow-xl border border-slate-100 flex flex-col overflow-hidden">
                <button className="p-2.5 border-b border-slate-100 text-slate-400 hover:text-slate-950 transition-all"><Plus className="w-4 h-4" /></button>
                <button className="p-2.5 text-slate-400 hover:text-slate-950 transition-all"><Minus className="w-4 h-4" /></button>
              </div>
              <button className="p-2.5 bg-slate-950 rounded-xl shadow-xl text-white hover:bg-agent-blue transition-all border border-white/10 group">
                <Navigation className="w-4 h-4 group-hover:animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DATE PICKER MODAL */}
      {showDatePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 shadow-2xl max-h-[90vh] overflow-auto">
            <h3 className="text-lg font-bold mb-4">{showDatePicker === 'checkin' ? 'Select Check-In Date' : 'Select Check-Out Date'}</h3>
            <DatePicker
              selected={showDatePicker === 'checkin' ? filterStartDate : filterEndDate}
              onChange={(date: Date | null) => {
                if (showDatePicker === 'checkin') {
                  setFilterStartDate(date);
                } else {
                  setFilterEndDate(date);
                }
                setShowDatePicker(null);
              }}
              inline
              minDate={new Date()}
              className="border-0 shadow-none"
            />
            <button
              onClick={() => setShowDatePicker(null)}
              className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* GUEST MODAL */}
      {showGuestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 shadow-2xl w-80">
            <h3 className="text-lg font-bold mb-6">Update Guests & Rooms</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Rooms</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setFilterRooms(Math.max(1, filterRooms - 1))} className="px-3 py-1 border rounded">-</button>
                  <span>{filterRooms}</span>
                  <button onClick={() => setFilterRooms(filterRooms + 1)} className="px-3 py-1 border rounded">+</button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Adults</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setFilterAdults(Math.max(1, filterAdults - 1))} className="px-3 py-1 border rounded">-</button>
                  <span>{filterAdults}</span>
                  <button onClick={() => setFilterAdults(filterAdults + 1)} className="px-3 py-1 border rounded">+</button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Children</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setFilterChildren(Math.max(0, filterChildren - 1))} className="px-3 py-1 border rounded">-</button>
                  <span>{filterChildren}</span>
                  <button onClick={() => setFilterChildren(filterChildren + 1)} className="px-3 py-1 border rounded">+</button>
                </div>
              </div>
            </div>
            <button onClick={() => setShowGuestModal(false)} className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Done</button>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default SearchResults;
