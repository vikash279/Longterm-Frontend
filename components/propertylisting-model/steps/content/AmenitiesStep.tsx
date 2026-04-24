'use client';

import { useEffect, useState } from 'react';
import { Check, Camera, Gift, Globe, Info, LayoutGrid, MapPin, RefreshCw, ShieldCheck, Star, Users, Zap } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import type { AmenityCategory, ListPropertyFormData } from '../../ListPropertyModels';

interface AmenitiesStepProps {
  formData: ListPropertyFormData;
  setFormData: Dispatch<SetStateAction<ListPropertyFormData>>;
  onValidityChange?: (isValid: boolean) => void;
}

const amenityCategories: AmenityCategory[] = [
  {
    id: 'popular',
    label: 'Most Popular',
    icon: Star,
    amenities: [
      'Outdoor swimming pool', 'Free parking', 'Room service', 'Restaurant',
      'Facilities for disabled guests', 'Free WiFi', 'Fitness centre',
      'Non-smoking rooms', 'Bar', 'Wonderful Breakfast'
    ]
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    icon: MapPin,
    amenities: ['Private bathroom', 'Toilet', 'Shower']
  },
  {
    id: 'outdoors',
    label: 'Outdoors',
    icon: MapPin,
    amenities: ['Outdoor furniture', 'Sun terrace', 'Garden']
  },
  {
    id: 'pets',
    label: 'Pets',
    icon: Users,
    amenities: ['Pets are allowed']
  },
  {
    id: 'media',
    label: 'Media & Tech',
    icon: Camera,
    amenities: ['Cable channels', 'Telephone', 'TV']
  },
  {
    id: 'food',
    label: 'Food & Drink',
    icon: Gift,
    amenities: [
      'Fruits', "Wine/champagne", 'Kids\' meals',
      'Special diet menus (on request)', 'Bar', 'Minibar', 'Restaurant'
    ]
  },
  {
    id: 'internet',
    label: 'Internet',
    icon: Globe,
    amenities: ['Free WiFi in all areas']
  },
  {
    id: 'parking',
    label: 'Parking',
    icon: MapPin,
    amenities: ['Free private parking', 'Parking garage', 'Accessible parking']
  },
  {
    id: 'services',
    label: 'Services',
    icon: RefreshCw,
    amenities: [
      'Pet bowls', 'Concierge service', 'Fax/photocopying', 'Laundry',
      'Business centre', '24-hour front desk', 'Meeting/banquet facilities', 'Room service'
    ]
  },
  {
    id: 'safety',
    label: 'Safety & Security',
    icon: ShieldCheck,
    amenities: ['Fire extinguishers', 'CCTV in common areas', 'Smoke alarms', 'Key card access', 'Safety deposit box']
  },
  {
    id: 'general',
    label: 'General',
    icon: LayoutGrid,
    amenities: ['Air conditioning', 'Family rooms', 'Facilities for disabled guests', 'Non-smoking rooms']
  },
  {
    id: 'pool',
    label: 'Pool Details',
    icon: Zap,
    amenities: ['Opening times', 'Open all year', 'All ages welcome', 'Shallow end', 'Pool/beach towels', 'Sun loungers or beach chairs', 'Sun umbrellas']
  },
  {
    id: 'wellness',
    label: 'Wellness',
    icon: Star,
    amenities: [
      'Yoga classes', 'Fitness', 'Full body massage', 'Hand massage', 'Head massage',
      'Foot massage', 'Neck massage', 'Back massage', 'Spa/wellness packages',
      'Spa lounge/relaxation area', 'Spa facilities', 'Sun umbrellas',
      'Sun loungers or beach chairs', 'Hot tub/Jacuzzi', 'Massage', 'Fitness centre'
    ]
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: Globe,
    amenities: ['English', 'Spanish', 'Portuguese']
  }
];

export default function AmenitiesStep({ formData, setFormData, onValidityChange }: AmenitiesStepProps) {
  const [activeAmenityCategory, setActiveAmenityCategory] = useState('popular');
  const hasAmenities = formData.amenities.length > 0;

  useEffect(() => {
    onValidityChange?.(hasAmenities);
  }, [hasAmenities, onValidityChange]);

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const currentCategory = amenityCategories.find(c => c.id === activeAmenityCategory);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight mb-1">Amenities</h2>
        <p className="text-[#64748B] text-sm font-medium">Select what applies.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 relative">
        <div className="lg:w-1/4 space-y-1.5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
          {amenityCategories.map((cat) => {
            const isActive = activeAmenityCategory === cat.id;
            const hasSelection = formData.amenities.some(a => cat.amenities.includes(a));
            return (
              <button
                key={cat.id}
                onClick={() => setActiveAmenityCategory(cat.id)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-all text-left border ${
                  isActive
                    ? 'bg-gradient-agent text-white border-transparent shadow-md'
                    : 'bg-white text-[#64748B] hover:bg-slate-50 border-slate-100'
                }`}
              >
                <cat.icon size={14} className={isActive ? 'text-white' : 'text-slate-300'} />
                <span className="text-[10px] font-black uppercase tracking-wider flex-1">{cat.label}</span>
                {hasSelection && (
                  <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-agent-pink'}`}></div>
                )}
              </button>
            );
          })}
        </div>

        <div className="lg:w-3/4">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm min-h-[400px]">
            <h3 className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.3em] mb-6 flex items-center">
              {currentCategory?.label}
              <span className="ml-4 h-px flex-1 bg-slate-100"></span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentCategory?.amenities.map((amenity) => {
                const isChecked = formData.amenities.includes(amenity);
                return (
                  <label
                    key={amenity}
                    className={`flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer group relative ${
                      isChecked
                        ? 'border-agent-pink bg-pink-50/10'
                        : 'border-slate-50 bg-[#F8FAFC] hover:bg-white hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isChecked ? 'bg-gradient-agent text-white' : 'bg-white border border-slate-100'
                    }`}>
                      {isChecked ? <Check size={14} strokeWidth={4} /> : <div className="w-4 h-4 rounded-full border border-slate-100"></div>}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isChecked}
                      onChange={() => toggleAmenity(amenity)}
                    />
                    <span className={`font-bold text-sm ${isChecked ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>{amenity}</span>
                  </label>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SELECTED</span>
                <span className="text-sm font-black text-slate-950">{formData.amenities.length}</span>
              </div>
            </div>
            {!hasAmenities && (
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] text-center mt-4">
                Choose at least one amenity to continue.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
