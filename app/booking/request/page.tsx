'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import RequestToBook from '@/components/RequestToBook';
import { useAuth } from '@/lib/auth-context';

export default function RequestToBookPage() {
  const router = useRouter();
  const { isLoggedIn, user, theme, toggleTheme, logout, bookingTimer, startTimer } = useAuth();
  const [hotel, setHotel] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('selectedHotel');
      if (stored) setHotel(JSON.parse(stored));
    }
  }, []);

  const handleConfirm = () => {
    startTimer();
    router.push('/booking/status');
  };

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
        {hotel && (
          <RequestToBook
            hotel={hotel}
            onCancel={() => router.back()}
            onConfirm={handleConfirm}
          />
        )}
      </main>
    </div>
  );
}
