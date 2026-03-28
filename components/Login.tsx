'use client';


import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Github, Chrome, Zap, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

interface LoginProps {
  onSignUp: () => void;
  onHome: () => void;
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSignUp, onHome, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.includes('@')) newErrors.email = 'Invalid node address';
    if (formData.password.length < 6) newErrors.password = 'Pass-key too short';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    
    // Simulate high-fidelity authentication sequence
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onLoginSuccess?.();
      }, 1500);
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6 animate-in fade-in duration-700">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-agent-blue/20 rounded-full animate-ping"></div>
            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center border-4 border-agent-blue shadow-2xl">
              <CheckCircle2 className="w-16 h-16 text-agent-blue" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-slate-950 tracking-tighter mb-2">Node Access Verified</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Re-initializing your travel portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-white font-['Plus_Jakarta_Sans'] overflow-hidden relative">
      {/* Dynamic Mesh Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-agent-blue/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-agent-pink/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/4 animate-pulse duration-[5s]"></div>

      <div className="max-w-xl mx-auto relative z-10">
        <button 
          onClick={onHome}
          className="flex items-center space-x-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] hover:text-slate-950 transition-all group mb-12"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5" />
          <span>EXIT TO EXPLORER</span>
        </button>

        <div className="bg-white rounded-[4rem] border border-slate-100 p-10 lg:p-14 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.1)] relative overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-slate-50 border border-slate-100 px-5 py-2 rounded-full mb-8 shadow-sm">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agent-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-agent-pink"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Secure Node Sync</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-slate-950 tracking-tighter leading-[0.9] mb-4">Welcome Back</h1>
            <p className="text-slate-400 text-sm font-medium">Identify yourself to access locked rates.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-2 ml-4">Access Email</label>
              <div className="relative group">
                <Mail className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.email ? 'text-red-400' : 'text-slate-300 group-focus-within:text-agent-blue'}`} />
                <input 
                  required
                  type="email"
                  placeholder="name@nexus.com"
                  className={`w-full bg-slate-50 border-2 rounded-3xl px-14 py-5 font-bold text-slate-950 transition-all outline-none ${errors.email ? 'border-red-100 bg-red-50/30' : 'border-transparent focus:bg-white focus:border-agent-blue/20 focus:ring-8 focus:ring-agent-blue/5'}`}
                  value={formData.email}
                  onChange={e => {
                    setFormData({...formData, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                />
                {errors.email && <span className="absolute -bottom-6 left-4 text-[9px] font-black text-red-400 uppercase tracking-widest">{errors.email}</span>}
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <div className="flex justify-between items-center mb-2 ml-4 mr-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Pass-Key</label>
                <button type="button" className="text-[9px] font-black text-agent-blue uppercase tracking-widest hover:underline transition-all hover:tracking-[0.2em]">Lost Key?</button>
              </div>
              <div className="relative group">
                <Lock className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.password ? 'text-red-400' : 'text-slate-300 group-focus-within:text-agent-pink'}`} />
                <input 
                  required
                  type="password"
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border-2 rounded-3xl px-14 py-5 font-bold text-slate-950 transition-all outline-none ${errors.password ? 'border-red-100 bg-red-50/30' : 'border-transparent focus:bg-white focus:border-agent-pink/20 focus:ring-8 focus:ring-agent-pink/5'}`}
                  value={formData.password}
                  onChange={e => {
                    setFormData({...formData, password: e.target.value});
                    if (errors.password) setErrors({...errors, password: ''});
                  }}
                />
                {errors.password && <span className="absolute -bottom-6 left-4 text-[9px] font-black text-red-400 uppercase tracking-widest">{errors.password}</span>}
              </div>
            </div>

            <button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-slate-950 text-white py-6 rounded-[2.5rem] font-black text-[13px] uppercase tracking-[0.4em] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.2)] hover:bg-slate-900 transition-all active:scale-[0.97] group relative overflow-hidden mt-8 disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-agent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 flex items-center justify-center space-x-4">
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>DECRYPTING...</span>
                  </>
                ) : (
                  <>
                    <span>INITIALIZE ACCESS</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.5em]">
              <span className="px-6 bg-white text-slate-300">Third-Party Auth</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-3 py-5 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:border-slate-300 hover:shadow-xl transition-all font-black text-[11px] uppercase tracking-widest text-slate-900 group">
              <Chrome className="w-5 h-5 text-slate-400 group-hover:text-agent-orange transition-transform group-hover:scale-110" />
              <span>Google ID</span>
            </button>
            <button className="flex items-center justify-center space-x-3 py-5 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:border-slate-300 hover:shadow-xl transition-all font-black text-[11px] uppercase tracking-widest text-slate-900 group">
              <Github className="w-5 h-5 text-slate-400 group-hover:text-slate-950 transition-transform group-hover:scale-110" />
              <span>GitHub</span>
            </button>
          </div>

          <div className="mt-14 text-center">
            <p className="text-slate-400 text-sm font-medium">
              Not a member of the network?{' '}
              <button 
                onClick={onSignUp}
                className="text-agent-pink font-black uppercase tracking-widest ml-1 hover:underline hover:tracking-[0.2em] transition-all"
              >
                Join Now
              </button>
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-center space-x-3">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">AES-256 Quantum Shield Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
