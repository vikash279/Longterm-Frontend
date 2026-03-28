'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth-context';
import { Building, Briefcase, Layers, ShieldCheck, FileText } from 'lucide-react';

const b2bHighlights = [
  { title: 'Enterprise arrivals', value: '1,250', badge: 'Live' },
  { title: 'Contracted suites', value: '320+', badge: 'Secured' },
  { title: 'Avg. ADR', value: '₹12.6K', badge: 'Stable' },
];

const b2bActions = [
  { label: 'Rate desk', desc: 'Review negotiated contracts and mark approvals.', icon: <Briefcase className="w-5 h-5" /> },
  { label: 'Partner inventory', desc: 'Map every tower, villa and serviced apartment.', icon: <Layers className="w-5 h-5" /> },
  { label: 'Security audit', desc: 'Validate sessions and API controls.', icon: <ShieldCheck className="w-5 h-5" /> },
];

const propertySamples = [
  { name: 'Pulse Heights Suites', city: 'Mumbai', status: 'Draft' },
  { name: 'Vela Retreat', city: 'Goa', status: 'Live' },
  { name: 'Northstar Apartments', city: 'Bengaluru', status: 'Under review' },
];

export default function B2BDashboard() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      router.push('/admin');
    }
  }, [auth.isLoggedIn, router]);

  return (
    <div className={`min-h-screen ${auth.theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <Navbar
        onHomeClick={() => router.push('/')}
        onLoginClick={() => router.push('/auth/login')}
        onSignUpClick={() => router.push('/auth/signup')}
        onProfileClick={() => router.push('/dashboard/profile')}
        onListPropertyClick={() => router.push('/dashboard/list-property')}
        onAdminClick={() => router.push('/admin')}
        onLogout={() => {
          auth.logout();
          router.push('/');
        }}
        isLoggedIn={auth.isLoggedIn}
        user={auth.user}
        scrolledOverride={true}
        theme={auth.theme}
        onToggleTheme={auth.toggleTheme}
        timer={auth.bookingTimer}
      />
      <main className="pt-[120px] pb-16">
        <section className="max-w-6xl mx-auto px-6 space-y-10">
          <div className="space-y-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">B2B Command</p>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white">Corporate cockpit</h1>
            <p className="text-slate-500 dark:text-slate-300 max-w-2xl mx-auto">
              Mirror the B2C journeys but focus on contracts, rate desks and the property mix you syndicate to corporate partners.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {b2bHighlights.map((metric) => (
              <article key={metric.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
                <header className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{metric.badge}</span>
                  <Building className="w-6 h-6 text-agent-blue" />
                </header>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">{metric.value}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-300">{metric.title}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {b2bActions.map((action) => (
              <article key={action.label} className="space-y-3 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)] dark:border-slate-800 dark:bg-slate-900">
                <header className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{action.label}</h3>
                  {action.icon}
                </header>
                <p className="text-sm text-slate-500 dark:text-slate-300 leading-relaxed">{action.desc}</p>
                <button
                  onClick={() => router.push('/dashboard/list-property')}
                  className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.4em] text-agent-blue"
                >
                  Prep property <FileText className="w-4 h-4" />
                </button>
              </article>
            ))}
          </div>

          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.5)] space-y-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Property operations</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">List & manage assets</h3>
              </div>
              <Link href="/dashboard/list-property" className="text-[11px] font-black uppercase tracking-[0.4em] text-agent-blue">+ Add property</Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {propertySamples.map((property) => (
                <article key={property.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">{property.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-300">{property.city}</p>
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">{property.status}</p>
                  <button
                    onClick={() => router.push('/dashboard/list-property')}
                    className="mt-3 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-agent-pink"
                  >
                    Start wizard <FileText className="w-4 h-4" />
                  </button>
                </article>
              ))}
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
