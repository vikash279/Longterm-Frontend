'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import UserProfile from '@/components/UserProfile';
import { useAuth } from '@/lib/auth-context';

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, user, theme, toggleTheme, logout, bookingTimer } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) router.push('/auth/login');
  }, [isLoggedIn, router]);

  if (!user) return null;

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
        <UserProfile
          user={user}
          onLogout={() => { logout(); router.push('/'); }}
        />
      </main>
    </div>
  );
}
