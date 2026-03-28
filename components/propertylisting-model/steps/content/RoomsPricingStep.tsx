'use client';

import { useEffect, useState } from 'react';
import { BuildingIcon, ChevronDown, Plus, Trash2, Utensils } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import type { ListPropertyFormData, Room } from '../../ListPropertyModels';

interface RoomsPricingStepProps {
  formData: ListPropertyFormData;
  setFormData: Dispatch<SetStateAction<ListPropertyFormData>>;
  onValidityChange?: (isValid: boolean) => void;
}

export default function RoomsPricingStep({ formData, setFormData, onValidityChange }: RoomsPricingStepProps) {
  const [roomForm, setRoomForm] = useState<Room>({
    name: '',
    type: 'Standard',
    capacity: '2',
    price: '0',
    mealPlan: 'EP (Room Only)',
    mealPlanPrices: {
      'EP (Room Only)': '2000',
      'CP (Room + Breakfast)': '2500',
      'MAP (Room + Breakfast + Lunch/Dinner)': '3500',
      'AP (Room + All Meals)': '4500'
    }
  });

  const addRoom = () => {
    if (!roomForm.name) return;
    setFormData(prev => ({
      ...prev,
      rooms: [...prev.rooms, roomForm]
    }));
    setRoomForm({
      name: '',
      type: 'Standard',
      capacity: '2',
      price: '0',
      mealPlan: 'EP (Room Only)',
      mealPlanPrices: {
        'EP (Room Only)': '2000',
        'CP (Room + Breakfast)': '2500',
        'MAP (Room + Breakfast + Lunch/Dinner)': '3500',
        'AP (Room + All Meals)': '4500'
      }
    });
  };

  const removeRoom = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    onValidityChange?.(formData.rooms.length > 0);
  }, [formData.rooms, onValidityChange]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight mb-1">Rooms & Pricing</h2>
        <p className="text-[#64748B] text-sm font-medium">Inventory and rates.</p>
      </div>

      <div className="w-full min-h-[80px] border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center p-3 bg-slate-50/30">
        {formData.rooms.length === 0 ? (
          <p className="text-slate-300 text-xs font-medium italic">No rooms added yet.</p>
        ) : (
          <div className="w-full space-y-1.5">
            {formData.rooms.map((room, idx) => (
              <div key={idx} className="bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between shadow-sm animate-in slide-in-from-left-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 bg-[#E6F9FB] rounded-md flex items-center justify-center text-[#009BB9]">
                    <BuildingIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-[11px] leading-none mb-1">{room.name}</h4>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                      {room.mealPlan && <span className="text-agent-pink mr-1.5">{room.mealPlan}</span>}
                      {room.type} • {room.capacity} Guests
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-black text-[#0F172A]">₹{room.price}</span>
                  <button onClick={() => removeRoom(idx)} className="text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-[0.2em]">ADD NEW ROOM</h4>
        </div>

        <div className="bg-slate-50/50 rounded-lg p-3 border border-slate-100 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-900 shadow-sm">
              <Utensils size={14} />
            </div>
            <div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-wider leading-none mb-1">MEAL PLAN</h4>
            </div>
          </div>
          <div className="relative w-full md:w-56">
            <select 
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 font-bold text-slate-900 outline-none focus:border-agent-pink appearance-none transition-all text-xs"
              value={roomForm.mealPlan}
              onChange={(e) => setRoomForm({ ...roomForm, mealPlan: e.target.value })}
            >
              <option>EP (Room Only)</option>
              <option>CP (Room + Breakfast)</option>
              <option>MAP (Room + Breakfast + Lunch/Dinner)</option>
              <option>AP (Room + All Meals)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={12} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">ROOM NAME</label>
            <input 
              type="text" 
              placeholder="e.g. Deluxe Suite"
              className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 outline-none focus:bg-white focus:border-[#2E6BFF]/40 transition-all text-sm"
              value={roomForm.name}
              onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">ROOM TYPE</label>
            <div className="relative">
              <select 
                className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 outline-none focus:bg-white focus:border-[#2E6BFF]/40 appearance-none transition-all text-sm"
                value={roomForm.type}
                onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })}
              >
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Executive</option>
                <option>Suite</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">BASE PRICE (₹)</label>
            <input 
              type="number" 
              placeholder="0.00"
              className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 outline-none focus:bg-white focus:border-[#2E6BFF]/40 transition-all text-sm"
              value={roomForm.price}
              onChange={(e) => setRoomForm({ ...roomForm, price: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">CAPACITY</label>
            <input 
              type="number" 
              className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 outline-none focus:bg-white focus:border-[#2E6BFF]/40 transition-all text-sm"
              value={roomForm.capacity}
              onChange={(e) => setRoomForm({ ...roomForm, capacity: e.target.value })}
            />
          </div>
        </div>

        <button 
          onClick={addRoom}
          className="w-full bg-gradient-agent text-white py-3 rounded-lg font-black text-[9px] uppercase tracking-[0.2em] shadow-md hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
        >
          <Plus size={14} strokeWidth={3} />
          <span>ADD ROOM TO LIST</span>
        </button>
      </div>
    </div>
  );
}
