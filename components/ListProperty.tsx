'use client';


import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check,
  Clock, 
  CreditCard, 
  Globe, 
  Gift, 
  Network, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Star, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  FileText, 
  ArrowUpRight,
  TrendingUp,
  LayoutGrid,
  ArrowLeft,
  ChevronRight,
  DollarSign,
  ClipboardList,
  UploadCloud,
  Plus,
  CheckCircle,
  UtensilsCrossed,
  ChevronDown as ChevronDownIcon,
  Utensils,
  Ship,
  Navigation
} from 'lucide-react';
import type {
  Room,
  ListPropertyProps,
  RoomCategory,
  UploadedDocument,
  Benefit,
  Stat,
  SetupStep,
  ListPropertyFormData
} from './propertylisting-model/ListPropertyModels';
import { steps as wizardSteps, BuildingIcon } from './propertylisting-model/steps/steps';
import type { StepContent } from './propertylisting-model/steps/StepContent';
import { stepContents } from './propertylisting-model/steps/StepContent';
import PropertyDetailsStep from './propertylisting-model/steps/content/PropertyDetailsStep';
import RoomCategoriesStep from './propertylisting-model/steps/content/RoomCategoriesStep';
import AmenitiesStep from './propertylisting-model/steps/content/AmenitiesStep';
import MenuDetailsStep from './propertylisting-model/steps/content/MenuDetailsStep';
import PhotosStep from './propertylisting-model/steps/content/PhotosStep';
import ExtraServicesStep from './propertylisting-model/steps/content/ExtraServicesStep';
import TransferServiceStep from './propertylisting-model/steps/content/TransferServiceStep';
import RoomsPricingStep from './propertylisting-model/steps/content/RoomsPricingStep';
import UploadDocumentsStep from './propertylisting-model/steps/content/UploadDocumentsStep';
import ReviewStep from './propertylisting-model/steps/content/ReviewStep';

const ListProperty: React.FC<ListPropertyProps> = ({ onHome, onStartNow }) => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPropertyDetailsValid, setPropertyDetailsValid] = useState(false);
  const [isRoomCategoriesValid, setRoomCategoriesValid] = useState(false);
  const [isAmenitiesValid, setAmenitiesValid] = useState(false);
  const [isMenuDetailsValid, setMenuDetailsValid] = useState(false);
  const [isPhotosValid, setPhotosValid] = useState(false);
  const [isExtraServicesValid, setExtraServicesValid] = useState(false);
  const [isTransferServicesValid, setTransferServicesValid] = useState(false);
  const [isRoomsPricingValid, setRoomsPricingValid] = useState(false);
  const [isUploadDocumentsValid, setUploadDocumentsValid] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<ListPropertyFormData>({
    name: '',
    type: '',
    rating: '',
    address: '',
    description: '',
    amenities: [] as string[],
    mainImage: null as string | null,
    gallery: [] as string[],
    roomCategories: [] as RoomCategory[],
    menu: {
      breakfast: [] as string[],
      lunch: [] as string[],
      dinner: [] as string[]
    },
    menuPricing: {
      breakfast: '650',
      lunch: '1200',
      dinner: '1850'
    },
    menuIncluded: ['Full Spread', 'Beverages', 'Live Counters', 'Kids Menu'] as string[],
    rooms: [] as Room[],
    extraServices: ['Nature Walks', 'Kids Play Zone', 'Board Games & Bonfire'] as string[],
    transferServices: [] as string[],
    roomCategoryPhotos: {} as Record<string, string>,
    extraServicePhotos: {} as Record<string, string>,
    documents: [] as UploadedDocument[]
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'gallery' | 'category' | 'extraService', id?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (type === 'main') {
        setFormData(prev => ({ ...prev, mainImage: base64String }));
      } else if (type === 'gallery') {
        setFormData(prev => ({ ...prev, gallery: [...prev.gallery, base64String] }));
      } else if (type === 'category' && id) {
        setFormData(prev => ({
          ...prev,
          roomCategoryPhotos: { ...prev.roomCategoryPhotos, [id]: base64String }
        }));
      } else if (type === 'extraService' && id) {
        setFormData(prev => ({
          ...prev,
          extraServicePhotos: { ...prev.extraServicePhotos, [id]: base64String }
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // See propertylisting-model/steps/StepComments.md for the narrative explanation of each wizard step.
  const steps = wizardSteps;
  const stepContentMap = stepContents.reduce<Record<number, StepContent>>((acc, content) => {
    acc[content.id] = content;
    return acc;
  }, {} as Record<number, StepContent>);
  const currentStepContent = stepContentMap[currentStep] ?? { title: '', subtitle: '' };

  const isNextButtonDisabled = (currentStep === 1 && !isPropertyDetailsValid) || (currentStep === 2 && !isRoomCategoriesValid) || (currentStep === 3 && !isAmenitiesValid) || (currentStep === 4 && !isMenuDetailsValid) || (currentStep === 5 && !isPhotosValid) || (currentStep === 6 && !isExtraServicesValid) || (currentStep === 7 && !isTransferServicesValid) || (currentStep === 8 && !isRoomsPricingValid) || (currentStep === 9 && !isUploadDocumentsValid);

  const benefits: Benefit[] = [
    { icon: Clock, title: "Quick Booking", desc: "45% of hosts get their first booking within a week", accent: "text-agent-blue", bg: "hover:bg-blue-50/50" },
    { icon: CreditCard, title: "Payments", desc: "We’ll facilitate payments for you seamlessly", accent: "text-agent-orange", bg: "hover:bg-orange-50/50" },
    { icon: Globe, title: "Hyper-Refer Program", desc: "Expose your listing to referral rewards & nearby booking requests", accent: "text-agent-pink", bg: "hover:bg-pink-50/50" },
    { icon: Gift, title: "Guest Perks", desc: "Offer discounts or upgrades to grab bookings instantly", accent: "text-indigo-500", bg: "hover:bg-indigo-50/50" },
    { icon: Network, title: "Agent Network", desc: "Connect with top agent networks for stronger demand", accent: "text-emerald-500", bg: "hover:bg-emerald-50/50" }
  ];

  // Fix: Added missing definitions for stats and setupSteps arrays
  const stats: Stat[] = [
    { val: "29M+", label: "GLOBAL NODES" },
    { val: "140M+", label: "VERIFIED EXPLORERS" },
    { val: "₹1.2K Cr+", label: "HOST YIELD" }
  ];

  const setupSteps: SetupStep[] = [
    { step: 1, icon: UploadCloud, title: "Node Setup", desc: "Identify your property type and sync your existing inventory." },
    { step: 2, icon: RefreshCw, title: "AI Sync", desc: "Our negotiation engine begins mapping your yield against global demand." },
    { step: 3, icon: CheckCircle, title: "Go Live", desc: "Receive automated bookings with instant settlement protection." }
  ];

  if (showOnboarding) {
    return (
      <div className="pt-[88px] min-h-screen bg-[#F8FAFC] font-['Plus_Jakarta_Sans'] pb-20 animate-in fade-in duration-500">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
          
          {/* Header Section */}
          <div className="text-center py-4 lg:py-6">
            <h1 className="text-[28px] font-serif font-medium text-[#0F172A] tracking-tight leading-tight mb-1">
              List Your Property
            </h1>
            <p className="text-[#64748B] text-[13px] font-medium max-w-2xl mx-auto leading-relaxed opacity-80">
              Join the Cosmos network and start earning. Streamlined for speed.
            </p>
          </div>

          {/* Stepper Implementation */}
          <div className="max-w-5xl mx-auto mb-6 relative">
            <div className="bg-[#F0F9FA] rounded-[1.5rem] p-3 flex items-center justify-between relative overflow-visible">
               <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-[#E2E8F0] -translate-y-[14px] hidden md:block"></div>
               {steps.map((step, idx) => {
                 const isActive = currentStep === step.id;
                 const isCompleted = currentStep > step.id;
                 return (
                   <div key={step.id} className="relative z-10 flex flex-col items-center group w-full">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-500 mb-1.5 shadow-sm ${
                       isActive ? 'bg-gradient-agent text-white scale-110 shadow-lg shadow-pink-500/20' : 
                       isCompleted ? 'bg-[#009BB9] text-white' : 'bg-white text-[#CBD5E1] border border-slate-100'
                     }`}>
                       {isCompleted ? <Check size={14} strokeWidth={4} /> : step.id}
                     </div>
                     <span className={`text-[7px] font-black uppercase tracking-[0.2em] transition-colors duration-300 text-center max-w-[70px] leading-tight ${
                       isActive ? 'text-[#009BB9]' : 'text-[#94A3B8]'
                     }`}>
                       {step.label}
                     </span>
                   </div>
                 );
               })}
               
               {/* Voice Assistant Button */}
               <div className="absolute -right-4 -bottom-4">
                  <button className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#0F172A] hover:scale-110 transition-transform border border-slate-50">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                  </button>
               </div>
            </div>
          </div>

          {/* Main Form Container */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-6 duration-700">
               <div className="p-6 lg:p-8">
                  
                  {/* STEP 1: PROPERTY DETAILS */}
                  {currentStep === 1 && (
                    <PropertyDetailsStep
                      formData={formData}
                      setFormData={setFormData}
                      title={currentStepContent?.title}
                      subtitle={currentStepContent?.subtitle}
                      onValidityChange={setPropertyDetailsValid}
                    />
                  )}

                  {/* STEP 2: ROOM CATEGORIES */}
                  {currentStep === 2 && (
                    <RoomCategoriesStep formData={formData} setFormData={setFormData} onValidityChange={setRoomCategoriesValid} />
                  )}

                  {/* STEP 3: AMENITIES */}
                  {currentStep === 3 && (
                    <AmenitiesStep formData={formData} setFormData={setFormData} onValidityChange={setAmenitiesValid} />
                  )}

                  {/* STEP 4: MENU DETAILS */}
                  {currentStep === 4 && (
                    <MenuDetailsStep
                      formData={formData}
                      setFormData={setFormData}
                      title={currentStepContent?.title}
                      subtitle={currentStepContent?.subtitle}
                      onValidityChange={setMenuDetailsValid}
                    />
                  )}
                  {/* STEP 5: PHOTOS */}
                  {currentStep === 5 && (
                    <PhotosStep
                      formData={formData}
                      setFormData={setFormData}
                      handlePhotoUpload={handlePhotoUpload}
                      onValidityChange={setPhotosValid}
                      title={currentStepContent?.title}
                      subtitle={currentStepContent?.subtitle}
                    />
                  )}

                  {/* STEP 6: EXTRA SERVICES */}
                  {currentStep === 6 && (
                    <ExtraServicesStep
                      formData={formData}
                      setFormData={setFormData}
                      handlePhotoUpload={handlePhotoUpload}
                      onValidityChange={setExtraServicesValid}
                    />
                  )}

                  {/* STEP 7: TRANSFER SERVICE */}
                  {currentStep === 7 && (
                    <TransferServiceStep formData={formData} setFormData={setFormData} onValidityChange={setTransferServicesValid} />
                  )}

                  {/* STEP 8: ROOMS & PRICING */}
                  {currentStep === 8 && (
                    <RoomsPricingStep formData={formData} setFormData={setFormData} onValidityChange={setRoomsPricingValid} />
                  )}

                  {/* STEP 9: UPLOAD DOCUMENTS */}
                  {currentStep === 9 && (
                    <UploadDocumentsStep
                      formData={formData}
                      setFormData={setFormData}
                      title={currentStepContent?.title}
                      subtitle={currentStepContent?.subtitle}
                      onValidityChange={setUploadDocumentsValid}
                    />
                  )}

                  {/* STEP 10: REVIEW */}
                  {currentStep === 10 && (
                    <ReviewStep
                      formData={formData}
                      title={currentStepContent?.title}
                      subtitle={currentStepContent?.subtitle}
                    />
                  )}

                       {/* Actions Footer */}
                      <div className="mt-6 pt-4 border-t border-slate-50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                         <button 
                           onClick={() => currentStep === 1 ? setShowOnboarding(false) : setCurrentStep(prev => prev - 1)}
                           className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-[0.2em] text-slate-300 hover:text-slate-900 transition-all hover:bg-slate-50"
                         >
                           <ArrowLeft size={12} strokeWidth={3} />
                           <span>PREVIOUS</span>
                         </button>
                         
                         <button 
                           onClick={() => {
                             if (isNextButtonDisabled) return;
                             currentStep === 10 ? onHome() : setCurrentStep(prev => prev + 1);
                           }}
                           disabled={isNextButtonDisabled}
                           className={`bg-gradient-agent text-white px-8 py-2 rounded-lg font-black text-[9px] uppercase tracking-[0.2em] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2 group/next ${isNextButtonDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                         >
                           <span>{currentStep === 10 ? 'PUBLISH LISTING' : 'NEXT STEP'}</span>
                           <ChevronRight size={14} strokeWidth={4} className="transition-transform group-hover:translate-x-1" />
                         </button>
                      </div>
               </div>
            </div>
            
            <div className="mt-10 flex items-center justify-center space-x-3 text-slate-300">
               <ShieldCheck className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Partner Node Security Protocol v4.2.0</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[88px] font-['Plus_Jakarta_Sans'] bg-white overflow-hidden">
      
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=2400" 
            className="w-full h-full object-cover brightness-[0.4] scale-105" 
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-white"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2.5 rounded-full mb-10 shadow-2xl">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Join 29,279,209 other listings already live</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] mb-10 tracking-tighter drop-shadow-2xl">
            Host with <br />
            <span className="text-gradient">WanderWealth</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 font-semibold mb-14 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            The world's most intelligent B2C travel node. Earn yield, build authority, and reach millions of verified explorers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => setShowOnboarding(true)}
              className="w-full sm:w-auto bg-slate-950 text-white px-14 py-6 rounded-full font-black text-[13px] uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-4 group/hero"
            >
              <span>GET STARTED NOW</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover/hero:translate-x-2" strokeWidth={3} />
            </button>
            <button 
              onClick={() => setShowOnboarding(true)}
              className="w-full sm:w-auto bg-white/5 backdrop-blur-2xl border border-white/30 text-white px-14 py-6 rounded-full font-black text-[13px] uppercase tracking-[0.4em] hover:bg-white/15 transition-all flex items-center justify-center group/hero2"
            >
              <span>CONTINUE LOGIN</span>
              <ArrowUpRight className="w-5 h-5 ml-2 transition-transform group-hover/hero2:translate-x-1 group-hover/hero2:-translate-y-1" strokeWidth={3} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. REFINED SUB-NAVIGATION "TABS" */}
      <section className="py-10 bg-white border-b border-slate-100 sticky top-[88px] z-50 shadow-sm overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-center space-x-2 md:space-x-8 overflow-x-auto no-scrollbar py-2">
            {[
              { label: 'OPPORTUNITY', icon: TrendingUp, color: 'text-[#2E6BFF]' },
              { label: 'SYSTEM PERKS', icon: Gift, color: 'text-[#F23B7B]' },
              { label: 'NODE SETUP', icon: LayoutGrid, color: 'text-[#FF6B35]' },
              { label: 'FLEET PAYMENTS', icon: CreditCard, color: 'text-[#8B5CF6]' },
              { label: 'GLOBAL REACH', icon: Globe, color: 'text-[#10B981]' }
            ].map((tab, idx) => (
              <button 
                key={idx} 
                className="flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-500 hover:bg-slate-50 group shrink-0 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF4E00]/0 via-[#EC008C]/0 via-[#7B2CBF]/0 to-[#2E6BFF]/0 group-hover:from-[#FF4E00]/5 group-hover:via-[#EC008C]/5 group-hover:via-[#7B2CBF]/5 group-hover:to-[#2E6BFF]/5 rounded-full transition-all duration-500"></div>
                <tab.icon className={`w-4 h-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 ${tab.color}`} strokeWidth={3} />
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-slate-950 transition-colors relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BENEFITS SECTION */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-agent-blue/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
            {benefits.map((b, i) => (
              <div key={i} className={`group p-10 rounded-[3rem] bg-white border border-slate-100 transition-all duration-700 shadow-sm ${b.bg} hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 flex flex-col items-center text-center cursor-pointer`}>
                <div className={`w-16 h-16 rounded-[1.5rem] bg-white shadow-xl border border-slate-50 flex items-center justify-center mb-8 transition-all duration-700 group-hover:scale-110 group-hover:rotate-[15deg] group-hover:shadow-2xl ${b.accent}`}>
                  <b.icon size={32} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-black text-slate-950 mb-4 tracking-tighter leading-none">{b.title}</h3>
                <p className="text-[14px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOST WORRY-FREE */}
      <section className="py-24 bg-slate-50 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-agent-pink/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative group">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/40 rounded-full blur-[80px]"></div>
              <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-8 border-white transition-all duration-1000 group-hover:scale-[1.02]">
                <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200" alt="Host Welcoming Guests" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 hidden md:block animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
                <div className="flex items-center space-x-4">
                  <div className="bg-agent-orange/10 p-3 rounded-2xl text-agent-orange">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black tracking-tight leading-none mb-1">Fleet Guard</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Protection Protocol v2.4</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="inline-flex items-center space-x-3 bg-white px-5 py-2 rounded-full mb-8 shadow-sm border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-500" strokeWidth={3} />
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Security Protocol</span>
              </div>
              
              <h2 className="text-5xl lg:text-7xl font-black text-slate-950 mb-10 leading-[0.9] tracking-tighter">
                Secure hosting <br />
                <span className="text-gradient">is our standard.</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  { icon: MessageSquare, t: "Real-time Node Communication" },
                  { icon: Users, t: "Verified Explorer Intelligence" },
                  { icon: FileText, t: "Smart Settlement Contracts" },
                  { icon: ShieldCheck, t: "₹1 Crore Yield Protection" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-5 group cursor-default">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-12">
                      <item.icon size={18} className="text-agent-pink" strokeWidth={3} />
                    </div>
                    <p className="text-lg font-black text-slate-700 tracking-tight group-hover:text-agent-blue transition-colors">{item.t}</p>
                  </div>
                ))}
              </div>

              <button className="mt-14 bg-white border border-slate-200 text-slate-950 px-12 py-5 rounded-full font-black text-[13px] uppercase tracking-[0.4em] shadow-xl hover:bg-slate-950 hover:text-white transition-all flex items-center space-x-4 active:scale-95 group/btn">
                <span>HOST WITH US TODAY</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GLOBAL REACH SECTION */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-agent-orange/10 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl lg:text-6xl font-black mb-16 tracking-tighter leading-[0.9]">
            Reach a <span className="italic text-agent-orange">Unique</span> <br />
            <span className="text-white">Global Explorer Base</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center group">
                <span className="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter transition-all duration-700 group-hover:scale-110 group-hover:text-agent-pink group-hover:italic">{s.val}</span>
                <div className="h-0.5 w-10 bg-white/10 mb-4 transition-all duration-700 group-hover:w-20 group-hover:bg-agent-pink"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{s.label}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowOnboarding(true)}
            className="mt-16 group bg-white text-slate-950 px-12 py-5 rounded-full font-black text-[12px] uppercase tracking-[0.3em] shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:scale-105 transition-all flex items-center justify-center mx-auto space-x-4 active:scale-95"
          >
             <span>REACH NEW GUESTS TODAY</span>
             <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" strokeWidth={3} />
          </button>
        </div>
      </section>

      {/* 6. EASY SETUP SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-3 bg-slate-50 px-6 py-2.5 rounded-full mb-10 border border-slate-100">
             <Zap className="w-5 h-5 text-agent-pink" fill="currentColor" />
             <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">Setup Protocol 1.0</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-slate-950 mb-20 leading-[0.9] tracking-tighter">
            Simple to start, <br />
            <span className="text-gradient">impossible to ignore.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative">
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-px bg-slate-100 -z-10"></div>
            {setupSteps.map((s, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-32 h-32 bg-white border-2 border-slate-50 rounded-full flex items-center justify-center mb-10 shadow-2xl transition-all duration-700 group-hover:border-agent-pink relative group-hover:-translate-y-4">
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-slate-950 text-white rounded-full flex items-center justify-center font-black text-lg shadow-xl group-hover:bg-agent-pink transition-colors">
                    {s.step}
                  </div>
                  <s.icon size={44} strokeWidth={1.5} className="text-slate-950 group-hover:text-agent-pink transition-all duration-700 group-hover:scale-110" />
                </div>
                <h4 className="text-3xl font-black text-slate-950 mb-4 tracking-tighter">{s.title}</h4>
                <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest leading-relaxed max-w-[240px]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowOnboarding(true)}
            className="mt-28 bg-slate-950 text-white px-16 py-7 rounded-full font-black text-[14px] uppercase tracking-[0.4em] shadow-2xl hover:bg-agent-blue transition-all active:scale-95 transform group"
          >
            <span className="flex items-center space-x-6">
              <span>GET STARTED TODAY</span>
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" strokeWidth={3} />
            </span>
          </button>
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-950 rounded-[2.5rem] p-10 md:p-16 text-white text-center relative overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,107,255,0.15),transparent)]"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-agent rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
                 <Zap size={24} fill="currentColor" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-[0.9]">
                Start welcoming <br /> guests <span className="italic text-agent-pink">today.</span>
              </h2>
              <p className="text-base md:text-lg text-white/50 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                Connect your inventory to the world's first <span className="text-white font-black">Negotiation-Native</span> ecosystem.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => setShowOnboarding(true)}
                  className="w-full sm:w-auto bg-white text-slate-950 px-10 py-4 rounded-full font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all group/btn2"
                >
                  <span className="flex items-center justify-center space-x-3">
                    <span>REGISTER NOW</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn2:translate-x-2" strokeWidth={4} />
                  </span>
                </button>
                <button className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-10 py-4 rounded-full font-black text-[12px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ListProperty;
