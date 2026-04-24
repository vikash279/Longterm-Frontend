'use client';

import { useEffect } from 'react';
import type { ComponentType, Dispatch, KeyboardEvent, SetStateAction } from 'react';
import { Check, Coffee, Moon, Plus, Sparkles, Sun, X } from 'lucide-react';
import type { ListPropertyFormData } from '../../ListPropertyModels';

interface MealDefinition {
  id: keyof ListPropertyFormData['menu'];
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
  bg: string;
  options: string[];
}

const meals: MealDefinition[] = [
  {
    id: 'breakfast',
    label: 'BREAKFAST',
    icon: Coffee,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    options: ['Morning Brews', 'Fresh Juices', 'South Indian Classics', 'North Indian Favorites', 'Eggs to Order', 'Bakery Basket', 'Healthy Start', 'Griddle & Fry', 'Sweet Treats']
  },
  {
    id: 'lunch',
    label: 'LUNCH',
    icon: Sun,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    options: ['Garden Fresh Salads', 'Soup of the Day', 'Local Delicacies', 'Global Flavors', 'Steamed Rice & Breads', 'Potato Specials', 'Sweet Endings']
  },
  {
    id: 'dinner',
    label: 'DINNER',
    icon: Moon,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    options: ['Live Grill', 'Assorted Platters', 'Curry Station', 'Interstellar Mains', 'Pasta & Pizza', 'Asian Stir-fry', "Chef's Signature"]
  }
];

const includedFeatures = ['Full Spread', 'Beverages', 'Live Counters', 'Kids Menu', 'Vegan Options', 'Gluten Free'];

interface MenuDetailsStepProps {
  formData: ListPropertyFormData;
  setFormData: Dispatch<SetStateAction<ListPropertyFormData>>;
  title?: string;
  subtitle?: string;
  onValidityChange?: (isValid: boolean) => void;
}

export default function MenuDetailsStep({ formData, setFormData, title, subtitle, onValidityChange }: MenuDetailsStepProps) {
  const handlePriceChange = (mealId: keyof ListPropertyFormData['menu'], value: string) => {
    setFormData(prev => ({
      ...prev,
      menuPricing: { ...prev.menuPricing, [mealId]: value }
    }));
  };

  const toggleMenuOption = (mealId: keyof ListPropertyFormData['menu'], option: string) => {
    setFormData(prev => {
      const current = prev.menu[mealId];
      const next = current.includes(option) ? current.filter(i => i !== option) : [...current, option];
      return { ...prev, menu: { ...prev.menu, [mealId]: next } };
    });
  };

  const addCustomMenuItem = (mealId: keyof ListPropertyFormData['menu'], value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setFormData(prev => {
      const current = prev.menu[mealId];
      if (current.includes(trimmed)) return prev;
      return { ...prev, menu: { ...prev.menu, [mealId]: [...current, trimmed] } };
    });
  };

  const removeMenuItem = (mealId: keyof ListPropertyFormData['menu'], index: number) => {
    setFormData(prev => {
      const current = prev.menu[mealId];
      const next = current.filter((_, idx) => idx !== index);
      return { ...prev, menu: { ...prev.menu, [mealId]: next } };
    });
  };

  const toggleIncludedFeature = (feature: string) => {
    setFormData(prev => {
      const included = prev.menuIncluded.includes(feature)
        ? prev.menuIncluded.filter(i => i !== feature)
        : [...prev.menuIncluded, feature];
      return { ...prev, menuIncluded: included };
    });
  };

  const handleEnterKey = (mealId: keyof ListPropertyFormData['menu']) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    addCustomMenuItem(mealId, event.currentTarget.value);
    event.currentTarget.value = '';
  };

  const hasMenuItems = meals.every(meal => formData.menu[meal.id].length > 0);
  const hasPrices = meals.every(meal => formData.menuPricing[meal.id].trim().length > 0);
  const isValid = hasMenuItems && hasPrices;

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight mb-1">
          {title ?? 'Daily Menu'}
        </h2>
        <p className="text-[#64748B] text-sm font-medium">
          {subtitle ?? 'Curated selection for guests.'}
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm group flex flex-col h-full">
              <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 ${meal.bg} rounded-xl flex items-center justify-center ${meal.color} group-hover:scale-110 transition-transform`}>
                <meal.icon size={20} />
              </div>
              <h3 className="text-[10px] font-black text-slate-950 uppercase tracking-[0.2em]">{meal.label}</h3>
            </div>

            <div className="space-y-4 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">PRICE PER PERSON</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                    <input 
                      type="text"
                      value={formData.menuPricing[meal.id]}
                      onChange={(e) => handlePriceChange(meal.id, e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-6 pr-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#009BB9]/40 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex items-end space-x-2 pb-1">
                  <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md border border-emerald-100">
                    <Check size={10} strokeWidth={3} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Buffet</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md border border-emerald-100">
                    <Check size={10} strokeWidth={3} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Live</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">QUICK SELECT</label>
                <div className="flex flex-wrap gap-1.5">
                  {meal.options.map((option) => {
                    const isSelected = formData.menu[meal.id].includes(option);
                    return (
                      <button
                        key={option}
                        onClick={() => toggleMenuOption(meal.id, option)}
                        className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border flex items-center space-x-1.5 ${
                          isSelected 
                            ? 'bg-gradient-agent text-white border-transparent shadow-sm' 
                            : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected && <X size={10} strokeWidth={3} className="animate-in zoom-in-50 duration-200" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">ADD CUSTOM ITEM</label>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Type and press Enter..."
                    className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2.5 text-[11px] font-bold text-slate-900 focus:bg-white focus:border-[#009BB9]/40 outline-none transition-all placeholder:text-slate-300"
                    onKeyDown={handleEnterKey(meal.id)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">
                    <Plus size={14} />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-50 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">CURRENT MENU</label>
                  <span className="text-[10px] font-black text-slate-950">{formData.menu[meal.id].length}</span>
                </div>
                <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1 custom-scrollbar">
                  {formData.menu[meal.id].length === 0 ? (
                    <p className="text-[10px] text-slate-300 italic py-2">No items selected yet</p>
                  ) : (
                    formData.menu[meal.id].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white border border-slate-100 rounded-lg px-3 py-2 group/item hover:shadow-sm transition-all animate-in slide-in-from-left-2 duration-200">
                        <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-agent-pink/40"></div>
                          <span className="text-[10px] font-bold text-slate-700">{item}</span>
                        </div>
                        <button 
                          onClick={() => removeMenuItem(meal.id, idx)}
                          className="text-slate-300 hover:text-red-500 transition-all p-1 hover:bg-red-50 rounded-md"
                        >
                          <X size={12} strokeWidth={3} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            </div>
        ))}
        </div>

        {!isValid && (
          <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] text-center">
            Set a price and at least one menu item for every meal to continue.
          </p>
        )}

        <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest">WHAT'S INCLUDED</h3>
              <p className="text-[10px] text-slate-400 font-medium">Global features for all meals</p>
            </div>
            <Sparkles className="text-agent-pink" size={16} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {includedFeatures.map((item) => {
              const isIncluded = formData.menuIncluded.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleIncludedFeature(item)}
                  className={`flex items-center space-x-3 p-3 rounded-xl border transition-all ${
                    isIncluded
                      ? 'bg-white border-[#009BB9] shadow-sm'
                      : 'bg-transparent border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isIncluded ? 'bg-[#009BB9] text-white' : 'bg-slate-100 text-slate-300'
                  }`}>
                    <Check size={10} strokeWidth={4} />
                  </div>
                  <span className={`text-[10px] font-bold ${isIncluded ? 'text-slate-900' : 'text-slate-400'}`}>
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
