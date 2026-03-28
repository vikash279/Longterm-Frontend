'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Briefcase, Check, Globe, Loader2, ShieldCheck, Sparkles, Users } from 'lucide-react';
import type { AuthContextType } from '@/lib/auth-context';
import Step1_PropertyDetails from '@/components/list-property-form/Step1_PropertyDetails';


const b2bHighlights = [
  { value: '82+', detail: 'Active enterprise rate cards' },
  { value: '₹1.8L', detail: 'Avg. corporate booking value' },
  { value: '12m', detail: 'Response SLA for negotiations' },
];

const b2cHighlights = [
  { value: '90K', detail: 'Loyalty members online' },
  { value: '18%', detail: 'Conversion uplift vs. baseline' },
  { value: '540', detail: 'Curated stays live hourly' },
];

interface AdminPanelProps {
  auth: AuthContextType;
  onAdminLoginSuccess?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ auth, onAdminLoginSuccess }) => {
  const router = useRouter();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const [b2bLogin, setB2bLogin] = useState({ email: '', password: '' });
  const [b2bStatus, setB2bStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [b2bSession, setB2bSession] = useState<{ email: string; company: string } | null>(null);
  const [b2bListingData, setB2bListingData] = useState({
    name: '',
    type: '',
    rating: '',
    address: '',
    description: '',
  });

  const [b2cLogin, setB2cLogin] = useState({ email: '', password: '' });
  const [b2cStatus, setB2cStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [b2cSession, setB2cSession] = useState<{ name: string; email: string } | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (formState.email === '' || formState.password === '') return;
    setStatus('loading');
    setTimeout(() => {
      auth.login({
        name: 'WanderWealth Admin',
        email: formState.email,
        avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=200',
      });
      setStatus('success');
      onAdminLoginSuccess?.();
    }, 900);
  };

  const handleLogout = () => {
    auth.logout();
    setStatus('idle');
    setFormState({ email: '', password: '' });
  };

  const handleB2BLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (b2bLogin.email === '' || b2bLogin.password === '') return;
    setB2bStatus('loading');
    setTimeout(() => {
      setB2bStatus('success');
      setB2bSession({ email: b2bLogin.email, company: 'B2B Travel Desk' });
      router.push('/admin/b2b');
    }, 900);
  };

  const handleB2BLogout = () => {
    setB2bStatus('idle');
    setB2bSession(null);
    setB2bLogin({ email: '', password: '' });
  };

  const handleB2CLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (b2cLogin.email === '' || b2cLogin.password === '') return;
    setB2cStatus('loading');
    setTimeout(() => {
      setB2cStatus('success');
      setB2cSession({ name: 'B2C Partner', email: b2cLogin.email });
    }, 800);
  };

  const handleB2CLogout = () => {
    setB2cStatus('idle');
    setB2cSession(null);
    setB2cLogin({ email: '', password: '' });
  };

  return (
    <section className="bg-[#F6F7FB] py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Admin Control Hub</p>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Operate B2B, B2C & secure admin logins from one cockpit.</h1>
          <p className="text-slate-500 leading-relaxed max-w-3xl mx-auto">
            Unlock bespoke experiences for partners and consumers, stay ahead of live negotiations and verify every session with built-in Next.js auth.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.5)] space-y-6">
            <div className="flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-agent-blue" />
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">B2B Cockpit</p>
                <h2 className="text-2xl font-black text-slate-900">Corporate Growth</h2>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Manage incentive tiers, desk-side negotiations, and private inventory for enterprise accounts. Every action gets captured in the auth ledger.
            </p>
            <div className="space-y-3">
              {b2bHighlights.map((metric) => (
                <div
                  key={metric.value}
                  className="flex items-center justify-between rounded-[1.5rem] border border-slate-100 bg-slate-50/70 px-5 py-3 text-sm font-black text-slate-900"
                >
                  <div>
                    <p className="text-lg font-black">{metric.value}</p>
                    <p className="uppercase tracking-[0.3em] text-[11px] text-slate-400">{metric.detail}</p>
                  </div>
                  <Check className="w-5 h-5 text-agent-blue" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 rounded-full border border-agent-blue/30 bg-gradient-to-r from-agent-blue to-agent-pink px-5 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-white transition-transform hover:-translate-y-0.5">
                <span>Open B2B cockpit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Sparkles className="w-5 h-5 text-agent-pink" />
            </div>
            {b2bSession ? (
              <div className="space-y-6">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-5 py-4">
                  <p className="text-sm font-black uppercase tracking-[0.4em] text-emerald-600">Session active</p>
                  <p className="text-lg font-black text-emerald-900">{b2bSession.company}</p>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-emerald-600">{b2bSession.email}</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50/80 p-6">
                  <Step1_PropertyDetails formData={b2bListingData} setFormData={setB2bListingData} />
                </div>
                <button className="w-full rounded-2xl border border-agent-blue/50 bg-agent-blue/10 px-4 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-agent-blue transition-all hover:bg-agent-blue/20">
                  Save property draft
                </button>
                <button
                  onClick={() => router.push('/dashboard/list-property')}
                  className="w-full rounded-2xl border border-slate-900 bg-slate-900 px-4 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-white transition-colors hover:bg-slate-800"
                >
                  List another property
                </button>
                <button
                  onClick={handleB2BLogout}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-900 px-4 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-white transition-colors hover:bg-slate-800"
                >
                  Sign out of B2B desk
                </button>
              </div>
            ) : (
              <form onSubmit={handleB2BLogin} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    Enterprise email
                  </label>
                  <input
                    type="email"
                    required
                    value={b2bLogin.email}
                    onChange={(event) => setB2bLogin((prev) => ({ ...prev, email: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-900 outline-none focus:border-agent-blue/50 focus:ring-2 focus:ring-agent-blue/10"
                    placeholder="corp@travelpartners.com"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    Shielded key
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={b2bLogin.password}
                    onChange={(event) => setB2bLogin((prev) => ({ ...prev, password: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-900 outline-none focus:border-agent-pink/50 focus:ring-2 focus:ring-agent-pink/10"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={b2bStatus === 'loading'}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-900 bg-slate-900 px-4 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-white transition-all hover:bg-slate-800 disabled:opacity-60"
                >
                  {b2bStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    'Unlock B2B desk'
                  )}
                </button>
                {b2bStatus === 'success' && (
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600">Desk unlocked.</p>
                )}
              </form>
            )}
          </article>

          <article className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.5)] space-y-6">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-agent-pink" />
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">B2C Studio</p>
                <h2 className="text-2xl font-black text-slate-900">Consumer Journeys</h2>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Orchestrate loyalty perks, curated stays, and dynamic packaging while you monitor real-time demand, conversions, and operator sentiment.
            </p>
            <div className="space-y-3">
              {b2cHighlights.map((metric) => (
                <div
                  key={metric.value}
                  className="flex items-center justify-between rounded-[1.5rem] border border-slate-100 bg-slate-50/70 px-5 py-3 text-sm font-black text-slate-900"
                >
                  <div>
                    <p className="text-lg font-black">{metric.value}</p>
                    <p className="uppercase tracking-[0.3em] text-[11px] text-slate-400">{metric.detail}</p>
                  </div>
                  <Check className="w-5 h-5 text-agent-pink" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button className="rounded-full border border-slate-900/10 bg-slate-900/5 px-5 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-900 transition-all hover:border-slate-400">
                Boost B2C reach
              </button>
              <Users className="w-5 h-5 text-agent-blue" />
            </div>
            {b2cSession ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 px-5 py-4">
                  <p className="text-sm font-black uppercase tracking-[0.4em] text-emerald-600">B2C partner</p>
                  <p className="text-lg font-black text-emerald-900">{b2cSession.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-emerald-600">{b2cSession.email}</p>
                </div>
                <button
                  onClick={() => router.push('/dashboard/list-property')}
                  className="w-full rounded-2xl border border-agent-blue/50 bg-agent-blue/10 px-4 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-agent-blue transition-all hover:bg-agent-blue/20"
                >
                  Add property
                </button>
                <button
                  onClick={handleB2CLogout}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-900 px-4 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-white transition-colors hover:bg-slate-800"
                >
                  Sign out of B2C
                </button>
              </div>
            ) : (
              <form onSubmit={handleB2CLogin} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    Traveler email
                  </label>
                  <input
                    type="email"
                    required
                    value={b2cLogin.email}
                    onChange={(event) => setB2cLogin((prev) => ({ ...prev, email: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-900 outline-none focus:border-agent-blue/50 focus:ring-2 focus:ring-agent-blue/10"
                    placeholder="hello@guest.com"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={b2cLogin.password}
                    onChange={(event) => setB2cLogin((prev) => ({ ...prev, password: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-900 outline-none focus:border-agent-pink/50 focus:ring-2 focus:ring-agent-pink/10"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={b2cStatus === 'loading'}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-900 bg-slate-900 px-4 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-white transition-all hover:bg-slate-800 disabled:opacity-60"
                >
                  {b2cStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    'B2C Login'
                  )}
                </button>
                {b2cStatus === 'success' && (
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600">Welcome aboard.</p>
                )}
              </form>
            )}
          </article>

          <article className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.5)] space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">Admin Access</p>
                <h2 className="text-2xl font-black text-slate-900">Panel Login</h2>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Protected by client-side Next.js auth. Only verified sessions can toggle B2B/B2C controls or redefine rate cards.
            </p>

            {auth.isLoggedIn ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-5 py-4">
                  <p className="text-sm font-black uppercase tracking-[0.4em] text-emerald-600">Session active</p>
                  <p className="text-lg font-black text-emerald-900">{auth.user?.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-emerald-600">{auth.user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-900 px-4 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-white transition-colors hover:bg-slate-800"
                >
                  Terminate session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    Admin email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-900 outline-none focus:border-agent-blue/50 focus:ring-2 focus:ring-agent-blue/10"
                    placeholder="admin@wanderwealth.com"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    Masked key
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={formState.password}
                    onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-900 outline-none focus:border-agent-pink/50 focus:ring-2 focus:ring-agent-pink/10"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-900 bg-slate-900 px-4 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-white transition-all hover:bg-slate-800 disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    'Unlock Panel'
                  )}
                </button>
                {status === 'success' && (
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600">Credentials accepted.</p>
                )}
              </form>
            )}
          </article>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
