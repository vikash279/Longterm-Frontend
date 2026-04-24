
import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

interface Step1Props {
  formData: {
    name: string;
    type: string;
    rating: string;
    address: string;
    description: string;
  };
  setFormData: (data: any) => void;
}

const Step1_PropertyDetails: React.FC<Step1Props> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight mb-1">Property Details</h2>
        <p className="text-[#64748B] text-sm font-medium">Start with the basics.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">PROPERTY NAME</label>
          <input
            type="text"
            placeholder="e.g. Grand Orbital Hotel"
            className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 focus:bg-white focus:border-[#2E6BFF]/40 outline-none transition-all placeholder:text-slate-200 text-sm"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">PROPERTY TYPE</label>
            <div className="relative">
              <select
                className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 focus:bg-white focus:border-[#2E6BFF]/40 outline-none transition-all appearance-none text-sm"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">STAR RATING</label>
            <div className="relative">
              <select
                className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 focus:bg-white focus:border-[#2E6BFF]/40 outline-none transition-all appearance-none text-sm"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1.5">DESCRIPTION</label>
          <textarea
            rows={3}
            placeholder="Describe the unique experience guests will have..."
            className="w-full bg-[#F8FAFC] border border-slate-100 rounded-lg px-3 py-2 font-bold text-slate-900 focus:bg-white focus:border-[#2E6BFF]/40 outline-none transition-all placeholder:text-slate-200 resize-none text-sm"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Step1_PropertyDetails;
