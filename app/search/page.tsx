'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import SearchResults from '@/components/SearchResults';
import { useAuth } from '@/lib/auth-context';

export default function SearchPage() {
  const router = useRouter();
  const { isLoggedIn, user, theme, toggleTheme, logout, bookingTimer } = useAuth();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
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
      <main>
        <SearchResults
          onBack={() => router.push('/')}
          onViewHotel={(hotel: any) => {
            // Store hotel in sessionStorage for the detail page
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('selectedHotel', JSON.stringify(hotel));
            }
            router.push(`/property/${hotel.id}`);
          }}
        />
      </main>
    </div>
  );
}
