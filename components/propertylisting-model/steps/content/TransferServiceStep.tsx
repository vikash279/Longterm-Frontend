'use client';

import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Bus, Car, Plane, Train } from 'lucide-react';
import type { ListPropertyFormData, TransferServiceOption } from '../../ListPropertyModels';

const transferServiceOptions: TransferServiceOption[] = [
  {
    id: 'airport',
    label: 'Airport Transfers',
    icon: Plane,
    options: [
      { name: 'Standard Airport Pickup', desc: 'One-way pickup from the nearest airport', price: '₹1,500' },
      { name: 'Luxury Airport Pickup', desc: 'Premium car pickup with refreshments', price: '₹3,500' },
      { name: 'Airport Drop-off', desc: 'Timely drop-off to the departure terminal', price: '₹1,200' }
    ]
  },
  {
    id: 'railway',
    label: 'Railway Transfers',
    icon: Train,
    options: [
      { name: 'Station Pickup', desc: 'One-way pickup from the railway station', price: '₹800' },
      { name: 'Station Drop-off', desc: 'One-way drop-off to the railway station', price: '₹700' }
    ]
  },
  {
    id: 'local',
    label: 'Local Transfers',
    icon: Car,
    options: [
      { name: 'Full Day Cab', desc: '8-hour chauffeur driven car for local sightseeing', price: '₹3,500' },
      { name: 'Half Day Cab', desc: '4-hour chauffeur driven car for quick trips', price: '₹2,000' },
      { name: 'Intercity Transfer', desc: 'One-way transfer to a nearby city', price: '₹5,500' }
    ]
  },
  {
    id: 'other',
    label: 'Other Transfers',
    icon: Bus,
    options: [
      { name: 'Bus Terminal Transfer', desc: 'Pickup/drop from the local bus stand', price: '₹500' },
      { name: 'Private Ferry Transfer', desc: 'Scenic boat transfer to the property', price: '₹2,500' }
    ]
  }
];

interface TransferServiceStepProps {
  formData: ListPropertyFormData;
  setFormData: Dispatch<SetStateAction<ListPropertyFormData>>;
  onValidityChange?: (isValid: boolean) => void;
}

export default function TransferServiceStep({ formData, setFormData, onValidityChange }: TransferServiceStepProps) {
  const [activeCategory, setActiveCategory] = useState<TransferServiceOption['id']>('airport');

  const toggleTransferService = (serviceName: string) => {
    setFormData(prev => ({
      ...prev,
      transferServices: prev.transferServices.includes(serviceName)
        ? prev.transferServices.filter(s => s !== serviceName)
        : [...prev.transferServices, serviceName]
    }));
  };

  const currentCategory = transferServiceOptions.find(c => c.id === activeCategory);
  const hasTransferServices = formData.transferServices.length > 0;
  const isValid = hasTransferServices;

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight mb-1">Transfer Service</h2>
        <p className="text-[#64748B] text-sm font-medium">Configure pickup/drop-off.</p>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
        {transferServiceOptions.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center justify-center min-w-[100px] p-3 rounded-xl border transition-all relative ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {currentCategory?.options.map((option) => {
            const isSelected = formData.transferServices.includes(option.name);
            return (
              <label 
                key={option.name}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer group ${
                  isSelected 
                    ? 'border-agent-pink bg-pink-50/10' 
                    : 'border-slate-50 bg-[#F8FAFC] hover:bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isSelected ? 'bg-agent-pink text-white' : 'bg-white text-slate-300 border border-slate-100'
                  }`}>
                    <Car size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#0F172A] tracking-tight leading-none mb-1">{option.name}</h4>
                    <p className="text-[10px] font-medium text-slate-400">{option.price}</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isSelected ? 'bg-agent-pink border-agent-pink text-white' : 'border-slate-200 bg-white'
                }`}>
                  {isSelected && <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={isSelected} 
                  onChange={() => toggleTransferService(option.name)} 
                />
              </label>
            );
          })}
        </div>
      </div>
      {!isValid && (
        <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] text-center mt-4">
          Select at least one transfer service to continue.
        </p>
      )}
    </div>
  );
}
