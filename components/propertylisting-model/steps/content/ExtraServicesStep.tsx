import { useEffect, useState } from 'react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Activity, Camera, Gift, Heart, Mountain, Utensils } from 'lucide-react';
import type { ListPropertyFormData } from '../../ListPropertyModels';

interface ExtraServicesStepProps {
  formData: ListPropertyFormData;
  setFormData: Dispatch<SetStateAction<ListPropertyFormData>>;
  handlePhotoUpload: (event: ChangeEvent<HTMLInputElement>, type: 'main' | 'gallery' | 'category' | 'extraService', id?: string) => void;
  onValidityChange?: (isValid: boolean) => void;
}

const extraServiceCategories = [
  {
    id: 'complimentary',
    label: 'Complimentary',
    icon: Gift,
    services: [
      { name: 'Nature Walks', desc: 'Guided or self-paced walks around scenic trails', price: 'FREE' },
      { name: 'Kids Play Zone', desc: 'Indoor/outdoor play area for children', price: 'FREE' },
      { name: 'Board Games & Bonfire', desc: 'Casual entertainment for families', price: 'FREE' }
    ]
  },
  {
    id: 'romantic',
    label: 'Romantic',
    icon: Heart,
    services: [
      { name: 'Anniversary Decoration', desc: 'Special room decoration with flowers and balloons', price: '₹2,500' },
      { name: 'Honeymoon Package', desc: 'Romantic setup with personalized amenities', price: '₹3,500' },
      { name: 'Candlelight Dinner', desc: 'Private setup with curated menu', price: '₹4,500' }
    ]
  },
  {
    id: 'wellness',
    label: 'Wellness',
    icon: Activity,
    services: [
      { name: 'Aromatherapy Session', desc: '60-minute relaxing aromatherapy', price: '₹1,800' },
      { name: 'Swedish Massage', desc: 'Full body Swedish massage', price: '₹2,500' },
      { name: "Couple's Spa Package", desc: 'Spa experience for couples', price: '₹4,500' }
    ]
  },
  {
    id: 'adventure',
    label: 'Adventure',
    icon: Mountain,
    services: [
      { name: 'Paragliding', desc: 'Tandem paragliding with expert pilot', price: '₹3,500' },
      { name: 'Jungle Safari', desc: 'Guided wildlife safari experience', price: '₹2,500' },
      { name: 'Boating', desc: 'Scenic lake boating experience', price: '₹800' }
    ]
  },
  {
    id: 'dining',
    label: 'Dining',
    icon: Utensils,
    services: [
      { name: 'Local Cuisine Tasting', desc: 'Multi-course regional menu', price: '₹1,800' },
      { name: 'Cooking Class', desc: 'Learn to cook local dishes', price: '₹2,200' },
      { name: 'Wine Tasting', desc: 'Curated wine selection with pairings', price: '₹3,000' }
    ]
  }
];

export default function ExtraServicesStep({ formData, setFormData, handlePhotoUpload, onValidityChange }: ExtraServicesStepProps) {
  const [activeCategory, setActiveCategory] = useState(extraServiceCategories[0].id);

  const toggleExtraService = (serviceName: string, categoryId: string) => {
    if (categoryId === 'complimentary') return;
    setFormData(prev => {
      const contains = prev.extraServices.includes(serviceName);
      const next = contains 
        ? prev.extraServices.filter(s => s !== serviceName)
        : [...prev.extraServices, serviceName];
      return { ...prev, extraServices: next };
    });
  };

  const currentCategory = extraServiceCategories.find(c => c.id === activeCategory);

  const hasExtraServices = formData.extraServices.length > 0;
  const isValid = hasExtraServices;

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight mb-1">Extra Services</h2>
        <p className="text-[#64748B] text-sm font-medium">Enhance guest stay.</p>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
        {extraServiceCategories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center justify-center min-w-[90px] p-3 rounded-xl border transition-all relative ${
                isActive 
                  ? 'bg-gradient-agent text-white border-transparent shadow-md scale-105' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
              }`}
              type="button"
            >
              <cat.icon size={16} className={isActive ? 'text-white' : 'text-slate-300'} />
              <span className="text-[8px] font-black uppercase tracking-wider mt-1.5">{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[9px] font-black text-[#94A3B8] uppercase tracking-[0.3em] flex items-center">
            {currentCategory?.label}
            <span className="ml-3 h-px w-8 bg-slate-100"></span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {currentCategory?.services.map((service, idx) => {
            const isSelected = formData.extraServices.includes(service.name);
            const isComplimentary = currentCategory.id === 'complimentary';
            const servicePhoto = formData.extraServicePhotos[service.name];

            return (
              <div 
                key={service.name}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group relative overflow-hidden ${
                  isSelected 
                    ? isComplimentary 
                      ? 'border-emerald-500 bg-emerald-50/30' 
                      : 'border-agent-pink bg-pink-50/10' 
                    : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'
                }`}
              >
                <div 
                  onClick={() => toggleExtraService(service.name, currentCategory.id)}
                  className="flex items-center space-x-3.5 relative z-10 flex-1 cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all overflow-hidden ${
                    isSelected 
                      ? isComplimentary ? 'bg-emerald-500 text-white' : 'bg-agent-pink text-white' 
                      : 'bg-slate-50 text-slate-400 group-hover:bg-white border border-slate-100'
                  }`}>
                    {servicePhoto ? (
                      <img src={servicePhoto} alt={service.name} className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={16} />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-black tracking-tight leading-none mb-1.5 transition-colors ${
                      isSelected ? 'text-slate-900' : 'text-slate-700'
                    }`}>{service.name}</h4>
                    <div className="flex items-center space-x-2">
                      <p className={`text-[10px] font-black uppercase tracking-wider ${
                        service.price === 'FREE' ? 'text-emerald-500' : 'text-slate-400'
                      }`}>
                        {service.price}
                      </p>
                      {service.price === 'FREE' && (
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 relative z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById(`extra-service-photo-${idx}`)?.click();
                    }}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${
                      servicePhoto 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-500' 
                        : 'bg-white border-slate-100 text-slate-400 hover:text-[#009BB9] hover:border-[#009BB9]'
                    }`}
                  >
                    <Camera size={12} />
                    <input 
                      id={`extra-service-photo-${idx}`}
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, 'extraService', service.name)}
                    />
                  </button>

                  <div 
                    onClick={() => toggleExtraService(service.name, currentCategory.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? isComplimentary 
                          ? 'bg-emerald-500 border-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200' 
                          : 'bg-agent-pink border-agent-pink text-white scale-110 shadow-lg shadow-pink-200' 
                        : isComplimentary
                          ? 'border-emerald-200 bg-white group-hover:border-emerald-400'
                          : 'border-slate-200 bg-white group-hover:border-slate-400'
                    }`}
                  >
                    {isSelected ? (
                      <svg className="w-3 h-3 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <div className={`w-2 h-2 rounded-full transition-all ${
                        isComplimentary ? 'bg-emerald-100' : 'bg-slate-100 group-hover:bg-slate-200'
                      }`}></div>
                    )}
                  </div>
                </div>
                
                {isSelected && (
                  <div className={`absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full opacity-10 blur-xl transition-all pointer-events-none ${
                    isComplimentary ? 'bg-emerald-500' : 'bg-agent-pink'
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {!isValid && (
        <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] text-center">
          Select at least one extra service to continue.
        </p>
      )}
    </div>
  );
}
