'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Login from '@/components/Login';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, user, theme, toggleTheme, logout, bookingTimer, login } = useAuth();

  const handleLoginSuccess = () => {
    login({
      name: 'Ayush Bansal',
      email: 'ayush.bansal@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    });
    router.push('/');
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
        <Login
          onSignUp={() => router.push('/auth/signup')}
          onHome={() => router.push('/')}
          onLoginSuccess={handleLoginSuccess}
        />
      </main>
    </div>
  );
}
