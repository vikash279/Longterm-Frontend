'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import { Search, ArrowRight } from 'lucide-react';

const SECTION_META: Record<string, { title: string; emoji: string; description: string; color: string }> = {
  hotels:   { title: 'Hotels',   emoji: '🏨', description: 'Discover world-class hotels at algorithmic prices', color: 'from-agent-blue to-agent-purple' },
  holidays: { title: 'Holidays', emoji: '🌴', description: 'Curated holiday packages negotiated by AI agents', color: 'from-agent-orange to-agent-pink' },
  flights:  { title: 'Flights',  emoji: '✈️',  description: 'Real-time flight deals across 500+ airlines worldwide', color: 'from-agent-teal to-agent-blue' },
  offers:   { title: 'Offers',   emoji: '🏷️',  description: 'Exclusive platform-only deals — refreshed every hour', color: 'from-agent-pink to-agent-purple' },
};

export default function Page() {
  const router = useRouter();
  const { isLoggedIn, user, theme, toggleTheme, logout, bookingTimer } = useAuth();
  const key = 'holidays';
  const meta = SECTION_META[key];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <Navbar
        onHomeClick={() => router.push('/')}
        onLoginClick={() => router.push('/auth/login')}
        onSignUpClick={() => router.push('/auth/signup')}
        onProfileClick={() => router.push('/dashboard/profile')}
        onListPropertyClick={() => router.push('/dashboard/list-property')}
        onLogout={() => { logout(); router.push('/'); }}
        isLoggedIn={isLoggedIn}
        user={user}
        scrolledOverride={true}
        theme={theme}
        onToggleTheme={toggleTheme}
        timer={bookingTimer}
        onAdminClick={() => router.push('/admin')}
      />
      <main className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-gradient-to-br ${meta.color} mb-8 shadow-2xl text-5xl`}>
            {meta.emoji}
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-6">
            {meta.title}
          </h1>
          <p className={`text-xl font-medium mb-12 max-w-2xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {meta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/search')}
              className={`inline-flex items-center space-x-3 bg-gradient-to-r ${meta.color} text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:opacity-90 transition-all active:scale-95`}
            >
              <Search className="w-5 h-5" />
              <span>Search {meta.title}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => router.push('/')}
              className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest border transition-all active:scale-95 ${theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <span>Back to Home</span>
            </button>
          </div>
          <div className={`mt-20 p-8 rounded-3xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
            <p className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              🚧 Full {meta.title} listings coming soon — connect your backend to <code className="text-agent-blue">/api/proxy/holidays</code>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
