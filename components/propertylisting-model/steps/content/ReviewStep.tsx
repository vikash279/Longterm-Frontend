'use client';

import { CheckCircle2 } from 'lucide-react';
import type { ListPropertyFormData } from '../../ListPropertyModels';

interface ReviewStepProps {
  formData: ListPropertyFormData;
  title?: string;
  subtitle?: string;
}

export default function ReviewStep({ formData, title, subtitle }: ReviewStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-center">
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 bg-emerald-50 rounded-full animate-ping opacity-25"></div>
        <div className="relative w-full h-full bg-[#E6F9FB] rounded-full flex items-center justify-center border-2 border-white shadow-lg">
          <CheckCircle2 size={32} className="text-[#009BB9]" strokeWidth={2.5} />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-serif font-medium text-[#0F172A] tracking-tight leading-none mb-2">
          {title ?? 'Ready to Launch?'}
        </h2>
        <p className="text-[#64748B] text-sm font-medium max-w-md mx-auto leading-relaxed">
          {subtitle ?? 'Your property listing is complete.'}
        </p>
      </div>

      <div className="max-w-md mx-auto bg-white border border-slate-100 rounded-xl p-4 shadow-sm text-left">
        <h4 className="text-[9px] font-black text-slate-950 uppercase tracking-[0.3em] mb-3 pb-1.5 border-b border-slate-50">SUMMARY</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-[#64748B]">Rooms Configured</span>
            <span className="font-bold text-slate-900 text-xs">{formData.rooms.length} Types</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-[#64748B]">Media Uploaded</span>
            <span className="font-bold text-slate-900 text-xs">5 Images</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-[#64748B]">Extra Services</span>
            <span className="font-bold text-slate-900 text-xs">{formData.extraServices.length} Selected</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-[#64748B]">Transfer Services</span>
            <span className="font-bold text-slate-900 text-xs">{formData.transferServices.length} Selected</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-[#64748B]">Documents</span>
            <span className="font-bold text-slate-900 text-xs">{formData.documents.length} Uploaded</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-[#64748B]">Completion</span>
            <span className="font-black text-[#00E676] uppercase tracking-widest text-xs">100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
