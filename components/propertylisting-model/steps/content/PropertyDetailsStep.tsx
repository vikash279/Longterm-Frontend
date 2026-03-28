'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import type { ListPropertyFormData } from '../../ListPropertyModels';

interface PropertyDetailsStepProps {
  formData: ListPropertyFormData;
  setFormData: Dispatch<SetStateAction<ListPropertyFormData>>;
  title?: string;
  subtitle?: string;
  onValidityChange?: (isValid: boolean) => void;
}

export default function PropertyDetailsStep({ formData, setFormData, title, subtitle, onValidityChange }: PropertyDetailsStepProps) {
  const update = <K extends keyof ListPropertyFormData>(field: K, value: ListPropertyFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const [touched, setTouched] = useState({
    name: false,
    type: false,
    rating: false,
    address: false,
    description: false
  });

  const validators = useMemo(
    () => ({
      name: (value: string) => value.trim().length > 0,
      type: (value: string) => value.trim().length > 0,
      rating: (value: string) => value.trim().length > 0,
      address: (value: string) => value.trim().length > 0,
      description: (value: string) => value.trim().length > 10
    }),
    []
  );

  const isValid = useMemo(() => {
    return Object.entries(validators).every(([field, validate]) => {
      const value = formData[field as keyof ListPropertyFormData];
      if (typeof value !== 'string') return true;
      return validate(value);
    });
  }, [formData, validators]);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const showError = (field: keyof typeof touched) =>
    touched[field] && !validators[field](formData[field as keyof ListPropertyFormData] as string);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight mb-1">
          {title ?? 'Property Details'}
        </h2>
        <p className="text-[#64748B] text-sm font-medium">
          {subtitle ?? 'Start with the basics.'}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">PROPERTY NAME</label>
          <input
            type="text"
            placeholder="e.g. Grand Orbital Hotel"
            className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 focus:bg-white focus:border-[#2E6BFF]/40 outline-none transition-all placeholder:text-slate-200 text-sm"
            value={formData.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
          />
          {showError('name') && (
            <p className="text-[11px] text-rose-500 mt-1">Please enter a property name.</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">PROPERTY TYPE</label>
            <div className="relative">
              <select
                className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 focus:bg-white focus:border-[#2E6BFF]/40 outline-none transition-all appearance-none text-sm"
                value={formData.type}
                onChange={(e) => update('type', e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, type: true }))}
              >
                <option value="">Hotel, Resort, Villa...</option>
                <option value="hotel">Hotel</option>
                <option value="resort">Resort</option>
                <option value="villa">Villa</option>
                <option value="homestay">Homestay</option>
                <option value="unique_stay">Unique Stay</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={12} />
            </div>
            {showError('type') && (
              <p className="text-[11px] text-rose-500 mt-1">Select a property type.</p>
            )}
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">STAR RATING</label>
            <div className="relative">
              <select
                className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 focus:bg-white focus:border-[#2E6BFF]/40 outline-none transition-all appearance-none text-sm"
                value={formData.rating}
                onChange={(e) => update('rating', e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, rating: true }))}
              >
                <option value="">Select Rating</option>
                <option value="5">5 Star</option>
                <option value="4">4 Star</option>
                <option value="3">3 Star</option>
                <option value="2">2 Star</option>
                <option value="1">1 Star</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={12} />
            </div>
            {showError('rating') && (
              <p className="text-[11px] text-rose-500 mt-1">Please pick a rating.</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">ADDRESS / LOCATION</label>
          <div className="relative group">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-agent-blue transition-colors" size={14} />
            <input
              type="text"
              placeholder="Full Address"
              className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg pl-9 pr-3 py-2 font-bold text-slate-900 focus:bg-white focus:border-[#2E6BFF]/40 outline-none transition-all placeholder:text-slate-200 text-sm"
              value={formData.address}
              onChange={(e) => update('address', e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, address: true }))}
            />
          </div>
          {showError('address') && (
            <p className="text-[11px] text-rose-500 mt-1">Address is required.</p>
          )}
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">DESCRIPTION</label>
          <textarea
            rows={3}
            placeholder="Describe the unique experience guests will have..."
            className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 focus:bg-white focus:border-[#2E6BFF]/40 outline-none transition-all placeholder:text-slate-200 resize-none text-sm"
            value={formData.description}
            onChange={(e) => update('description', e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, description: true }))}
          ></textarea>
          {showError('description') && (
            <p className="text-[11px] text-rose-500 mt-1">Description should be at least 10 characters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
