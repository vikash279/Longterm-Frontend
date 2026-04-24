'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth-context';
import {
  Briefcase,
  Layers,
  ShieldCheck,
  FileText,
  Gauge,
  Sparkles,
  DollarSign,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';

type SectionId = 'overview' | 'b2b' | 'accounts' | 'revenue' | 'property' | 'profile' | 'settings';

const dummyProperties = [
  { name: 'Skyline Suites', city: 'Mumbai', status: 'Published', manager: 'Zara Mehta', revenue: '₹1.2 Cr', lastBooking: 'Today 10:45' },
  { name: 'Aurora Spaces', city: 'Bengaluru', status: 'Pending', manager: 'Rohan J.', revenue: '₹86L', lastBooking: 'Yesterday 19:03' },
  { name: 'Cascade Residency', city: 'Goa', status: 'Draft', manager: 'Priya Rana', revenue: '₹42L', lastBooking: '2 days ago' },
];

const adminPages = [
  {
    title: 'Property Oversight',
    desc: 'Track every listing, sync nightly availability, and surface approvals before publication.',
    badge: 'Live',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    title: 'Consumer Journeys',
    desc: 'Preview loyalty plays, curated bundles, and trending itineraries before they ship.',
    badge: 'Review',
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    title: 'Rate Desk',
    desc: 'See the latest B2B rate cards, spot manual overrides, and lock approvals.',
    badge: 'Locked',
    icon: <Gauge className="w-5 h-5" />,
  },
  {
    title: 'Security Audit',
    desc: 'Inspect admin sessions, API keys, and next-gen telemetry for peace of mind.',
    badge: 'Secure',
    icon: <ShieldCheck className="w-5 h-5" />,
  },
];

const b2bHighlights = [
  { label: 'Active desks', value: '12', detail: 'Live negotiations' },
  { label: 'Rate cards', value: '24', detail: 'Awaiting approval' },
  { label: 'Avg. ADR', value: '₹12.4K', detail: 'Corporate stays' },
];

const accountLists: Record<'b2b' | 'b2c', { name: string; email: string; status: string; quota: string; lastActivity: string }[]> = {
  b2b: [
    { name: 'Neeraj Corporate', email: 'neeraj@wanderwealth.com', status: 'Verified', quota: '₹3.2L/month', lastActivity: '2h ago' },
    { name: 'Nimbus Enterprise', email: 'enterprise@nimbus.travel', status: 'Pending docs', quota: '₹1.5L/month', lastActivity: 'Yesterday' },
  ],
  b2c: [
    { name: 'Aria Kapoor', email: 'aria@guest.com', status: 'Verified', quota: '₹1.2L/year', lastActivity: 'Today 08:30' },
    { name: 'Dev Explorer', email: 'dev@guest.com', status: 'Profile incomplete', quota: '₹60K/year', lastActivity: '3 days ago' },
  ],
};

const revenueMenu = [
  { label: 'Today', value: '₹4.6L', change: '+12% vs yesterday' },
  { label: 'This week', value: '₹32L', change: '+8% vs last week' },
  { label: 'Partner payouts', value: '₹9.2L', change: 'Pending approval' },
];

const adminSidebar: { id: SectionId; label: string; desc: string; icon: JSX.Element }[] = [
  { id: 'overview', label: 'Dashboard', desc: 'Live status & alerts', icon: <Gauge className="w-4 h-4 text-slate-500" /> },
  { id: 'b2b', label: 'B2B Cockpit', desc: 'Corporate rate controls', icon: <Briefcase className="w-4 h-4 text-agent-blue" /> },
  { id: 'accounts', label: 'Accounts', desc: 'B2B & B2C users', icon: <Users className="w-4 h-4 text-slate-600" /> },
  { id: 'revenue', label: 'Revenue menu', desc: 'Track payouts & flow', icon: <DollarSign className="w-4 h-4 text-agent-pink" /> },
  { id: 'property', label: 'Property Ops', desc: 'List approvals & sync', icon: <Layers className="w-4 h-4 text-agent-pink" /> },
  { id: 'profile', label: 'Profile Audit', desc: 'Session health', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
  { id: 'settings', label: 'Settings', desc: 'Logout + controls', icon: <Settings className="w-4 h-4 text-agent-blue" /> },
];

export default function AdminDashboard() {
  const router = useRouter();
  const auth = useAuth();
  const [activeSection, setActiveSection] = useState<SectionId>('overview');

  useEffect(() => {
    if (!auth.isLoggedIn) {
      router.push('/admin');
    }
  }, [auth.isLoggedIn, router]);

  const renderPropertyList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Property list</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Live assets</h3>
        </div>
        <Link href="/dashboard/list-property" className="text-[11px] font-black uppercase tracking-[0.4em] text-agent-blue">+ Add property</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {dummyProperties.map((property) => (
          <article key={property.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-baseline justify-between">
              <h4 className="text-lg font-black text-slate-900 dark:text-white">{property.name}</h4>
              <span
                className={`text-[11px] font-black uppercase tracking-[0.3em] ${
                  property.status === 'Published'
                    ? 'text-emerald-600'
                    : property.status === 'Pending'
                      ? 'text-agent-pink'
                      : 'text-slate-400'
                }`}
              >
                {property.status}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-300">{property.city}</p>
            <p className="text-[11px] font-semibold text-slate-400">Manager: {property.manager}</p>
            <p className="text-[11px] font-semibold text-slate-400">Revenue: {property.revenue}</p>
            <p className="text-[11px] font-semibold text-slate-400">Last booking: {property.lastBooking}</p>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => router.push(`/dashboard/list-property?property=${encodeURIComponent(property.name)}`)}
                className="inline-flex items-center gap-2 rounded-2xl border border-agent-blue px-3 py-2 text-[11px] font-black uppercase tracking-[0.4em] text-agent-blue"
              >
                View details
                <FileText className="w-4 h-4" />
              </button>
              <Link href="/dashboard/list-property" className="text-[11px] font-black uppercase tracking-[0.4em] text-agent-pink">Manage list</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderOverview = () => (
    <>
      <div className="text-center space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Admin Dashboard</p>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Welcome to the command deck</h1>
        <p className="text-slate-500 dark:text-slate-300 max-w-2xl mx-auto">
          Every dummy page below mirrors the flows you asked for—click through to explore the proof of concept and hook them up to real data when ready.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {adminPages.map((page) => (
          <article
            key={page.title}
            className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
          >
            <header className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">{page.badge}</span>
              <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-agent-blue dark:bg-slate-800">
                {page.icon}
              </div>
            </header>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">{page.title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-300 leading-relaxed">{page.desc}</p>
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => router.push('/admin')}
                className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-white"
              >
                <span>View</span>
                <FileText className="w-4 h-4" />
              </button>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Dummy</span>
            </div>
          </article>
        ))}
      </div>

      {renderPropertyList()}
    </>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'b2b':
        return (
          <>
            <div className="text-center space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">B2B Cockpit</p>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">Corporate command</h1>
              <p className="text-slate-500 dark:text-slate-300 max-w-2xl mx-auto">
                Monitor every corporate rate card, desk, and approval without leaving your cockpit.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {b2bHighlights.map((metric) => (
                <article key={metric.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">{metric.label}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{metric.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{metric.detail}</p>
                </article>
              ))}
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:justify-between">
              <button
                onClick={() => router.push('/admin/b2b')}
                className="w-full md:w-auto rounded-2xl border border-agent-blue bg-agent-blue/10 px-6 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-agent-blue"
              >
                Open desk
              </button>
              <button
                onClick={() => router.push('/dashboard/list-property')}
                className="w-full md:w-auto rounded-2xl border border-slate-900 bg-slate-900 px-6 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-white"
              >
                Sync property list
              </button>
            </div>
          </>
        );
      case 'accounts':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Account directory</p>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">B2B & B2C partners</h1>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(accountLists).map(([type, accounts]) => (
                <section key={type} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <header className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">{type.toUpperCase()} users</h2>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{type === 'b2b' ? 'Corporate' : 'Consumer'}</span>
                  </header>
                  <div className="mt-4 space-y-4">
                    {accounts.map((account) => (
                      <article key={account.email} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-black text-slate-900 dark:text-white">{account.name}</p>
                          <span className="text-[11px] uppercase tracking-[0.4em] text-slate-400">{account.status}</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-300">{account.email}</p>
                        <p className="text-[11px] font-semibold text-slate-400">Quota: {account.quota}</p>
                        <p className="text-[11px] font-semibold text-slate-400">Last activity: {account.lastActivity}</p>
                        <div className="mt-3 flex gap-3">
                          <button className="rounded-2xl border border-agent-blue px-3 py-2 text-[11px] font-black uppercase tracking-[0.4em] text-agent-blue">
                            Update details
                          </button>
                          <button className="rounded-2xl border border-slate-900 px-3 py-2 text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">
                            View history
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        );
      case 'revenue':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Revenue menu</p>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">Cashflow snapshots</h1>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {revenueMenu.map((item) => (
                <article key={item.label} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">{item.label}</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">{item.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{item.change}</p>
                  <button
                    onClick={() => router.push('/admin')}
                    className="mt-4 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.4em] text-agent-blue"
                  >
                    View ledger
                    <DollarSign className="w-4 h-4" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        );
      case 'property':
        return (
          <>
            <div className="text-center space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Property Operations</p>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">List & manage assets</h1>
              <p className="text-slate-500 dark:text-slate-300 max-w-2xl mx-auto">
                Approve, publish, or flag listings before they reach the consumer-facing feed.
              </p>
            </div>
            {renderPropertyList()}
          </>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)] dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Profile Audit</p>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Session health</h2>
              <p className="text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                Track admin logins, B2C partner sessions, and suspicious activity across the platform.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-center dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400">Active admins</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">4</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-center dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400">Pending reviews</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">8</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-center dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400">MFA enforced</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">100%</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push('/dashboard/profile')}
              className="w-full rounded-2xl border border-slate-900 bg-slate-900 px-6 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-white"
            >
              Review admin sessions
            </button>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Settings</p>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">Controls & logout</h1>
            </div>
            <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-300">Email notifications</p>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-300">Require MFA for new admins</p>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-300">Sandbox mode</p>
                <input type="checkbox" className="h-4 w-4" />
              </div>
            </div>
            <button
              onClick={() => {
                auth.logout();
                router.push('/');
              }}
              className="w-full rounded-2xl border border-red-500 bg-red-500/10 px-6 py-3 text-[11px] font-black uppercase tracking-[0.4em] text-red-500"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        );
      default:
        return renderOverview();
    }
  };

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
        <section className="max-w-6xl mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)] dark:border-slate-800 dark:bg-slate-900">
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Admin cockpit</p>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Quick links</h2>
                <p className="text-sm text-slate-500 dark:text-slate-300">Jump between dashboards, listings, and audits without leaving this page.</p>
              </div>
              <div className="space-y-3">
                {adminSidebar.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className={`group flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-black transition-all ${
                      activeSection === item.id
                        ? 'border-agent-blue bg-white text-agent-blue'
                        : 'border-slate-100 bg-slate-50/70 text-slate-900 hover:border-agent-blue hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white'
                    }`}
                    aria-pressed={activeSection === item.id}
                  >
                    <div className="space-y-1 text-left">
                      <p className="flex items-center gap-2 text-[12px] uppercase tracking-[0.35em] text-slate-500 dark:text-slate-300">
                        {item.icon}
                        {item.label}
                      </p>
                      <p className="text-[10px] font-semibold tracking-[0.3em] text-slate-400 dark:text-slate-500">{item.desc}</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-agent-blue group-hover:text-agent-pink">Go</span>
                  </button>
                ))}
              </div>
            </aside>
            <div className="space-y-10">
              {renderSection()}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
