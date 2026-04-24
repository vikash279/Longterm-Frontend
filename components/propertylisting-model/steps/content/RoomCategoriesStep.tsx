'use client';

import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { ChevronDown, Info, Plus, Trash2 } from 'lucide-react';
import type { ListPropertyFormData } from '../../ListPropertyModels';

interface RoomCategoriesStepProps {
  formData: ListPropertyFormData;
  setFormData: Dispatch<SetStateAction<ListPropertyFormData>>;
  onValidityChange?: (isValid: boolean) => void;
}

export default function RoomCategoriesStep({ formData, setFormData, onValidityChange }: RoomCategoriesStepProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryMealPlan, setNewCategoryMealPlan] = useState('EP (Room Only)');
  const [newCategorySequence, setNewCategorySequence] = useState(1);
  const [showSequenceInfo, setShowSequenceInfo] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const hasRoomCategories = formData.roomCategories.length > 0;

  useEffect(() => {
    onValidityChange?.(hasRoomCategories);
  }, [hasRoomCategories, onValidityChange]);

  const addCategory = (name: string, mealPlan?: string, sequence?: number) => {
    if (!name.trim()) return;
    const seq = sequence || newCategorySequence;
    const newCat = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      sequence: seq,
      mealPlan: mealPlan || newCategoryMealPlan
    };

    setFormData(prev => ({
      ...prev,
      roomCategories: [...prev.roomCategories, newCat]
    }));

    setNewCategoryName('');
    setNewCategorySequence((prev) => prev + 1);
    setIsCreatingCategory(false);
  };

  const removeCategory = (id: string) => {
    setFormData(prev => ({
      ...prev,
      roomCategories: prev.roomCategories
        .filter(c => c.id !== id)
        .map((c, idx) => ({ ...c, sequence: idx + 1 }))
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight mb-1">Room Categories</h2>
        <p className="text-[#64748B] text-sm font-medium">Define your room types.</p>
      </div>

      {formData.roomCategories.length > 0 && (
        <div className="space-y-2">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">YOUR CATEGORIES</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formData.roomCategories.map((cat) => (
              <div key={cat.id} className="bg-white border border-slate-100 rounded-xl p-3 flex items-center justify-between shadow-sm animate-in slide-in-from-bottom-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-agent rounded-lg flex items-center justify-center text-white font-black text-xs shadow-md">
                    {cat.sequence}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs leading-none mb-1">{cat.name}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      {cat.mealPlan && <span className="text-agent-pink mr-2">{cat.mealPlan}</span>}
                    </p>
                  </div>
                </div>
                <button onClick={() => removeCategory(cat.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1.5">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasRoomCategories && (
        <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] text-center">
          Add at least one room category to continue.
        </p>
      )}

      <div className="pt-2">
        {!isCreatingCategory ? (
          <div className="flex justify-center">
            <button 
              onClick={() => setIsCreatingCategory(true)}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 hover:border-[#009BB9] hover:text-[#009BB9] transition-all group"
            >
              <Plus size={14} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add Category</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-4 border-2 border-[#009BB9] shadow-lg animate-in zoom-in-95 duration-300">
            <h3 className="text-xs font-black text-[#0F172A] tracking-tight mb-3 uppercase tracking-widest">New Custom Category</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">CATEGORY NAME</label>
                <input 
                  type="text" 
                  placeholder="e.g. Penthouse, Garden Villa..."
                  className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 focus:bg-white focus:border-[#2E6BFF]/40 outline-none transition-all text-sm"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">MEAL PLAN</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 focus:bg-white focus:border-[#2E6BFF]/40 outline-none transition-all appearance-none text-sm"
                      value={newCategoryMealPlan}
                      onChange={(e) => setNewCategoryMealPlan(e.target.value)}
                    >
                      <option>EP (Room Only)</option>
                      <option>CP (Room + Breakfast)</option>
                      <option>MAP (Room + Breakfast + Lunch/Dinner)</option>
                      <option>AP (Room + All Meals)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={12} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-1 mb-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block">Assign sequence</label>
                    <div className="relative">
                      <button 
                        onMouseEnter={() => setShowSequenceInfo(true)}
                        onMouseLeave={() => setShowSequenceInfo(false)}
                        onClick={() => setShowSequenceInfo(!showSequenceInfo)}
                        className="text-slate-400 hover:text-agent-pink transition-colors"
                        type="button"
                      >
                        <Info size={10} />
                      </button>
                      {showSequenceInfo && (
                        <div className="absolute bottom-full left-0 mb-2 w-48 bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                          <div className="relative">
                            You need to assign your first starting lowest category room with 1 and accordingly progress to higher tiers.
                            <div className="absolute top-full left-2 w-2 h-2 bg-slate-900 rotate-45 -translate-y-1"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <select 
                      className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 focus:bg-white focus:border-[#2E6BFF]/40 outline-none transition-all appearance-none text-sm"
                      value={newCategorySequence}
                      onChange={(e) => setNewCategorySequence(parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={12} />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <button 
                  onClick={() => setIsCreatingCategory(false)}
                  className="flex-1 py-2 rounded-lg font-black text-[9px] uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all"
                  type="button"
                >
                  CANCEL
                </button>
                <button 
                  onClick={() => addCategory(newCategoryName)}
                  className="flex-[2] bg-gradient-agent text-white py-2 rounded-lg font-black text-[9px] uppercase tracking-[0.2em] shadow-md hover:shadow-lg transition-all"
                  type="button"
                >
                  SAVE CATEGORY
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
