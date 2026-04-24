'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AdminPanel from '@/components/AdminPanel';
import { useAuth } from '@/lib/auth-context';

export default function AdminPage() {
  const router = useRouter();
  const auth = useAuth();
  const handleAdminLoginSuccess = () => router.push('/admin/dashboard');

  return (
    <div className={`min-h-screen ${auth.theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <Navbar
        onHomeClick={() => router.push('/')}
        onLoginClick={() => router.push('/auth/login')}
        onSignUpClick={() => router.push('/auth/signup')}
        onProfileClick={() => router.push('/dashboard/profile')}
        onListPropertyClick={() => router.push('/dashboard/list-property')}
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
        onAdminClick={() => router.push('/admin')}
      />
      <main className="pt-[120px]">
        <AdminPanel auth={auth} onAdminLoginSuccess={handleAdminLoginSuccess} />
      </main>
    </div>
  );
}
