'use client';

import React, { useState } from 'react';
import { X, ChevronDown, Info } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  options: any;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export interface FilterState {
  amenities: string[];
  propertyTypes: string[];
  hotelClass: string[];
  styles: string[];
  brands: string[];
  landmarks: string[];
  neighbourhoods: string[];
  priceRange: [number, number];
  ratings: number[];
  breakfastIncluded: boolean;
  fullyRefundable: boolean;
  noPrepayment: boolean;
}

export default function FilterModal({ isOpen, options, onClose, onApplyFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>({
    amenities: [],
    propertyTypes: [],
    hotelClass: [],
    styles: [],
    brands: [],
    landmarks: [],
    neighbourhoods: [],
    priceRange: [options?.minPrice || 0, options?.maxPrice || 42268],
    ratings: [],
    breakfastIncluded: false,
    fullyRefundable: false,
    noPrepayment: false,
  });
  const toggleAmenity = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const togglePropertyType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const toggleHotelClass = (hotelClass: string) => {
    setFilters(prev => ({
      ...prev,
      hotelClass: prev.hotelClass.includes(hotelClass)
        ? prev.hotelClass.filter(h => h !== hotelClass)
        : [...prev.hotelClass, hotelClass]
    }));
  };

  const toggleStyle = (style: string) => {
    setFilters(prev => ({
      ...prev,
      styles: prev.styles.includes(style)
        ? prev.styles.filter(s => s !== style)
        : [...prev.styles, style]
    }));
  };

  const toggleBrand = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const toggleLandmark = (landmark: string) => {
    setFilters(prev => ({
      ...prev,
      landmarks: prev.landmarks.includes(landmark)
        ? prev.landmarks.filter(l => l !== landmark)
        : [...prev.landmarks, landmark]
    }));
  };

  const toggleNeighbourhood = (area: string) => {
    setFilters(prev => ({
      ...prev,
      neighbourhoods: prev.neighbourhoods.includes(area)
        ? prev.neighbourhoods.filter(a => a !== area)
        : [...prev.neighbourhoods, area]
    }));
  };

  const toggleRating = (rating: number) => {
    setFilters(prev => ({
      ...prev,
      ratings: prev.ratings.includes(rating)
        ? prev.ratings.filter(r => r !== rating)
        : [...prev.ratings, rating]
    }));
  };

  const handleShowResults = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClearAll = () => {
    setFilters({
      amenities: [],
      propertyTypes: [],
      hotelClass: [],
      styles: [],
      brands: [],
      landmarks: [],
      neighbourhoods: [],
      priceRange: [0, 42268],
      ratings: [],
      breakfastIncluded: false,
      fullyRefundable: false,
      noPrepayment: false,
    });
  };

  const toggleDeal = (dealType: 'breakfastIncluded' | 'fullyRefundable' | 'noPrepayment') => {
    setFilters(prev => ({
      ...prev,
      [dealType]: !prev[dealType]
    }));
  };

  const FilterPill = ({ label, active, hasInfo, onClick, children }: any) => (
    <div 
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full border border-emerald-900/20 text-sm font-medium transition-all cursor-pointer ${active ? 'bg-emerald-50 border-emerald-900/40 text-emerald-950' : 'bg-white text-emerald-950 hover:bg-slate-50'}`}
    >
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h2 className="text-3xl font-black text-emerald-950 tracking-tight">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X className="w-6 h-6 text-emerald-950" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
          {/* Popular */}
          <section>
            <h3 className="text-lg font-bold text-emerald-950 mb-4">Popular</h3>
            <div className="flex flex-wrap gap-3">
              <FilterPill 
                label="Breakfast included" 
                active={filters.breakfastIncluded}
                onClick={() => toggleDeal('breakfastIncluded')}
              />
              <FilterPill 
                active={filters.ratings.includes(4)}
                onClick={() => toggleRating(4)}
              >
                <CircleRating count={4} andUp />
              </FilterPill>
              <FilterPill 
                label="4 Star" 
                active={filters.hotelClass.includes('4 Star')}
                onClick={() => toggleHotelClass('4 Star')}
              />
              <FilterPill 
                label="Mid-range" 
                active={filters.styles.includes('Mid-range')}
                onClick={() => toggleStyle('Mid-range')}
              />
            </div>
          </section>

          {/* Deals */}
          <section>
            <h3 className="text-lg font-bold text-emerald-950 mb-4">Deals</h3>
            <div className="flex flex-wrap gap-3">
              <FilterPill 
                label="Fully refundable" 
                hasInfo 
                active={filters.fullyRefundable}
                onClick={() => toggleDeal('fullyRefundable')}
              />
              <FilterPill 
                label="No prepayment needed" 
                hasInfo 
                active={filters.noPrepayment}
                onClick={() => toggleDeal('noPrepayment')}
              />
              <FilterPill label="Properties with special offers" />
            </div>
          </section>

          <div className="h-px bg-slate-100 w-full" />

          {/* Price Section with Histogram */}
          <section>
            <h3 className="text-lg font-bold text-emerald-950 mb-6">Price</h3>
            <div className="max-w-md">
              <div className="relative h-20 flex items-end justify-between px-2 mb-4">
                {[3, 5, 8, 12, 20, 35, 50, 60, 55, 70, 80, 65, 75, 90, 70, 60, 40, 25, 20, 22, 18, 20, 15, 12, 14, 10, 18, 45].map((h, i) => (
                  <div key={i} className="bg-emerald-950/90 w-[8px] rounded-full" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="relative h-1 bg-emerald-900 rounded-full mb-6">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={filters.priceRange[0]}
                  onChange={(e) => {
                    const newMin = Math.min(Number(e.target.value), filters.priceRange[1]);
                    setFilters(prev => ({
                      ...prev,
                      priceRange: [newMin, prev.priceRange[1]]
                    }));
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 appearance-none bg-transparent cursor-pointer z-10"
                  style={{
                    WebkitAppearance: 'none',
                    zIndex: filters.priceRange[0] > 25000 ? 5 : 3
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={filters.priceRange[1]}
                  onChange={(e) => {
                    const newMax = Math.max(Number(e.target.value), filters.priceRange[0]);
                    setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], newMax]
                    }));
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 appearance-none bg-transparent cursor-pointer z-10"
                  style={{
                    WebkitAppearance: 'none',
                    zIndex: filters.priceRange[1] < 25000 ? 3 : 5
                  }}
                />
                <style>{`
                  input[type="range"] {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    pointer-events: none;
                  }
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: white;
                    border: 2px solid #064e3b;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    pointer-events: auto;
                  }
                  input[type="range"]::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    background: white;
                    border: 2px solid #064e3b;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    pointer-events: auto;
                  }
                `}</style>
              </div>
              <p className="text-sm font-bold text-emerald-950 mb-6">₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()} +</p>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="w-6 h-6 rounded-full border-2 border-emerald-900 flex items-center justify-center transition-all group-hover:bg-emerald-50">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-900" />
                  </div>
                  <span className="text-base font-medium text-emerald-950">Price + taxes and fees</span>
                  <Info className="w-3.5 h-3.5 text-slate-300" />
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center transition-all group-hover:bg-emerald-50"></div>
                  <span className="text-base font-medium text-emerald-950">Total stay + taxes and fees</span>
                  <Info className="w-3.5 h-3.5 text-slate-300" />
                </label>
              </div>
            </div>
          </section>

          <div className="h-px bg-slate-100 w-full" />

          {/* Traveller Rating */}
          <section>
            <h3 className="text-lg font-bold text-emerald-950 mb-4">Traveller rating</h3>
            <div className="flex flex-wrap gap-3">
              <FilterPill 
                active={filters.ratings.includes(5)}
                onClick={() => toggleRating(5)}
              >
                <CircleRating count={5} />
              </FilterPill>
              <FilterPill 
                active={filters.ratings.includes(4)}
                onClick={() => toggleRating(4)}
              >
                <CircleRating count={4} andUp />
              </FilterPill>
              <FilterPill 
                active={filters.ratings.includes(3)}
                onClick={() => toggleRating(3)}
              >
                <CircleRating count={3} andUp />
              </FilterPill>
              <FilterPill 
                active={filters.ratings.includes(2)}
                onClick={() => toggleRating(2)}
              >
                <CircleRating count={2} andUp />
              </FilterPill>
            </div>
          </section>

          {/* Amenities */}
          <section>
            <h3 className="text-lg font-bold text-emerald-950 mb-4">Amenities</h3>
            <div className="space-y-4">
              {['Free Wifi', 'Breakfast included', 'Pool', 'Free parking'].map(item => (
                <label key={item} className="flex items-center space-x-4 cursor-pointer group">
                  <input 
                    type="checkbox"
                    checked={filters.amenities.includes(item)}
                    onChange={() => toggleAmenity(item)}
                    className="w-6 h-6 border-2 border-emerald-900/60 rounded-md transition-all group-hover:border-emerald-900 cursor-pointer"
                  />
                  <span className="text-[17px] font-medium text-emerald-950">{item}</span>
                </label>
              ))}
              <button className="text-emerald-950 font-black text-sm underline underline-offset-4 tracking-tight">Show all</button>
            </div>
          </section>

          {/* Property Types */}
          <section>
            <h3 className="text-lg font-bold text-emerald-950 mb-4">Property types</h3>
            <div className="flex flex-wrap gap-3">
              {['B&Bs & Inns', 'Hotels', 'Speciality lodgings', 'Condos', 'Hostels', 'Lodges'].map(type => (
                <FilterPill 
                  key={type}
                  label={type} 
                  active={filters.propertyTypes.includes(type)}
                  onClick={() => togglePropertyType(type)}
                />
              ))}
            </div>
            <button className="mt-4 text-emerald-950 font-bold text-xs flex items-center space-x-1">
              <span>Show more</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </section>

          <div className="h-px bg-slate-100 w-full" />

          {/* Hotel Class */}
          <section>
            <h3 className="text-lg font-bold text-emerald-950 mb-4">Hotel class</h3>
            <div className="flex flex-wrap gap-3">
              {['5 Star', '4 Star', '3 Star', '2 Star', '1.5 Star', '1 Star'].map(star => (
                <FilterPill 
                  key={star} 
                  label={star} 
                  active={filters.hotelClass.includes(star)}
                  onClick={() => toggleHotelClass(star)}
                />
              ))}
            </div>
          </section>

          {/* Style */}
          <section>
            <h3 className="text-lg font-bold text-emerald-950 mb-4">Style</h3>
            <div className="flex flex-wrap gap-3">
              {['Budget', 'Mid-range', 'Luxury', 'Family-friendly', 'Business', 'Romantic'].map(style => (
                <FilterPill 
                  key={style} 
                  label={style} 
                  active={filters.styles.includes(style)}
                  onClick={() => toggleStyle(style)}
                />
              ))}
            </div>
            <button className="mt-4 text-emerald-950 font-bold text-xs flex items-center space-x-1">
              <span>Show more</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </section>

          {/* Brands */}
          <section>
            <h3 className="text-lg font-bold text-emerald-950 mb-4">Brands</h3>
            <div className="space-y-4">
              {['Clayton Hotels', 'Staycity', 'Premier Inn', 'Maldron Hotels'].map(item => (
                <label key={item} className="flex items-center space-x-4 cursor-pointer group">
                  <input 
                    type="checkbox"
                    checked={filters.brands.includes(item)}
                    onChange={() => toggleBrand(item)}
                    className="w-6 h-6 border-2 border-emerald-900/60 rounded-md transition-all group-hover:border-emerald-900 cursor-pointer"
                  />
                  <span className="text-[17px] font-medium text-emerald-950">{item}</span>
                </label>
              ))}
              <button className="text-emerald-950 font-black text-sm underline underline-offset-4 tracking-tight">Show all</button>
            </div>
          </section>

          {/* Distance From */}
          <section>
            <h3 className="text-lg font-bold text-emerald-950 mb-4">Distance from</h3>
            <p className="text-sm font-medium text-emerald-950 mb-4">25 km</p>
            <div className="relative h-1 bg-emerald-900 rounded-full mb-8 max-w-sm">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-emerald-900 rounded-lg cursor-pointer shadow-md" />
            </div>
            <div className="grid grid-cols-2 gap-y-4 max-w-lg">
              {['Guinness Storehouse', 'Kilmainham Gaol Museum', 'The Book of Kells Experience', 'The Little Museum of Dublin'].map(landmark => (
                <label key={landmark} className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="checkbox"
                    checked={filters.landmarks.includes(landmark)}
                    onChange={() => toggleLandmark(landmark)}
                    className="w-6 h-6 rounded-full border-2 border-slate-300 cursor-pointer transition-all group-hover:border-slate-400"
                  />
                  <span className="text-sm font-medium text-emerald-950">{landmark}</span>
                </label>
              ))}
            </div>
            <button className="mt-6 text-emerald-950 font-bold text-xs flex items-center space-x-1">
              <span>Show more</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="mt-4 block text-slate-400 font-bold text-sm">Reset</button>
          </section>

          <div className="h-px bg-slate-100 w-full" />

          {/* Neighbourhoods */}
          <section className="pb-10">
            <h3 className="text-lg font-bold text-emerald-950 mb-4">Neighbourhoods</h3>
            <div className="flex flex-wrap gap-3">
              {['South City Centre', 'North City Centre', 'Temple Bar', 'Kilmainham', 'Rathfarnham'].map(area => (
                <FilterPill 
                  key={area} 
                  label={area} 
                  active={filters.neighbourhoods.includes(area)}
                  onClick={() => toggleNeighbourhood(area)}
                />
              ))}
            </div>
          </section>

        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <button onClick={handleClearAll} className="text-emerald-950 font-black text-sm underline underline-offset-4 tracking-tight">Clear all</button>
          <button onClick={handleShowResults} className="bg-emerald-950 text-white px-8 py-4 rounded-full font-black text-sm tracking-widest hover:bg-emerald-900 transition-all active:scale-95 shadow-xl">
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}
