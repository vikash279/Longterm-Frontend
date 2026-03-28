'use client';

import { useEffect } from 'react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Camera, Plus, Trash2, UploadCloud } from 'lucide-react';
import type { ListPropertyFormData } from '../../ListPropertyModels';

interface PhotosStepProps {
  formData: ListPropertyFormData;
  setFormData: Dispatch<SetStateAction<ListPropertyFormData>>;
  handlePhotoUpload: (event: ChangeEvent<HTMLInputElement>, type: 'main' | 'gallery' | 'category' | 'extraService', id?: string) => void;
  title?: string;
  subtitle?: string;
  onValidityChange?: (isValid: boolean) => void;
}

export default function PhotosStep({ formData, setFormData, handlePhotoUpload, title, subtitle, onValidityChange }: PhotosStepProps) {
  const roomCategories = [
    { name: 'Standard Room', desc: 'Basic comfort' },
    { name: 'Deluxe Room', desc: 'Premium space' },
    { name: 'Executive Suite', desc: 'Business luxury' },
    { name: 'Presidential Suite', desc: 'Ultimate experience' }
  ];

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, idx) => idx !== index)
    }));
  };

  const renderCategoryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {roomCategories.map((cat, i) => {
        const photo = formData.roomCategoryPhotos[cat.name];
        return (
          <div 
            key={cat.name}
            onClick={() => document.getElementById(`category-input-${i}`)?.click()}
            className="bg-[#F8FAFC] border border-slate-100 rounded-lg p-2.5 flex items-center space-x-3 group hover:bg-white hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="w-10 h-10 bg-white rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-slate-300 group-hover:border-[#009BB9] group-hover:text-[#009BB9] transition-all shrink-0 overflow-hidden">
              {photo ? (
                <img src={photo} alt={cat.name} className="w-full h-full object-cover" />
              ) : (
                <Camera size={14} />
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-[11px] font-black text-[#0F172A] tracking-tight leading-none mb-1">{cat.name}</h4>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{cat.desc}</p>
            </div>
            <div className="w-7 h-7 bg-white rounded-full shadow-sm border border-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-gradient-agent group-hover:text-white transition-all">
              <Plus size={12} strokeWidth={3} />
            </div>
            <input 
              id={`category-input-${i}`}
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 'category', cat.name)}
            />
          </div>
        );
      })}
    </div>
  );

  const hasMainImage = Boolean(formData.mainImage);
  const hasGalleryImages = formData.gallery.length > 0;
  const isValid = hasMainImage && hasGalleryImages;

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-medium text-[#0F172A] tracking-tight mb-1">
          {title ?? 'Photos'}
        </h2>
        <p className="text-[#64748B] text-sm font-medium">
          {subtitle ?? 'Showcase your property.'}
        </p>
      </div>

      <div className="space-y-4">
        <div 
          onClick={() => document.getElementById('main-image-input')?.click()}
          className="w-full aspect-[3/1] border-2 border-dashed border-slate-200 rounded-xl bg-[#F8FAFC] flex flex-col items-center justify-center group hover:border-[#009BB9] hover:bg-[#E6F9FB]/10 transition-all cursor-pointer relative overflow-hidden"
        >
          {formData.mainImage ? (
            <img src={formData.mainImage} alt="Main" className="w-full h-full object-cover" />
          ) : (
          <>
            <div className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-[#009BB9] transition-all mb-2">
              <UploadCloud size={18} />
            </div>
            <p className="text-xs font-black text-[#0F172A] tracking-tight">Click to upload main image</p>
          </>
        )}
        <input 
          id="main-image-input"
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={(e) => handlePhotoUpload(e, 'main')}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">GALLERY IMAGES</label>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {formData.gallery.map((img, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden border border-slate-100 relative group">
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeGalleryImage(i);
                }}
                className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={10} />
              </button>
            </div>
          ))}
          <div 
            onClick={() => document.getElementById('gallery-image-input')?.click()}
            className="aspect-square border-2 border-dashed border-slate-100 rounded-lg flex items-center justify-center text-slate-200 hover:border-slate-300 hover:text-slate-400 transition-all cursor-pointer"
          >
            <Plus size={16} strokeWidth={3} />
            <input 
              id="gallery-image-input"
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 'gallery')}
            />
          </div>
        </div>
      </div>

      {!isValid && (
        <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] text-center">
          Upload a main image plus at least one gallery photo to proceed.
        </p>
      )}

      <div className="space-y-2 pt-3 border-t border-slate-50">
        <div className="flex items-center justify-between">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">ROOM CATEGORY PHOTOS</label>
        </div>
        {renderCategoryCards()}
      </div>
    </div>
  </div>
  );
}
