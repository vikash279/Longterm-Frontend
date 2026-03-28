'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyBookWithUs from '@/components/WhyBookWithUs';
import PartnerProgram from '@/components/PartnerProgram';
import ExclusiveOffers from '@/components/ExclusiveOffers';
import FeaturedHotels from '@/components/FeaturedHotels';
import HolidayPackages from '@/components/HolidayPackages';
import FlightDeals from '@/components/FlightDeals';
import CuratedStays from '@/components/CuratedStays';
import TripPlanner from '@/components/TripPlanner';
import NegotiationEngine from '@/components/NegotiationEngine';
import DestinationHighlights from '@/components/DestinationHighlights';
import Testimonials from '@/components/Testimonials';
import AppPromotion from '@/components/AppPromotion';
import Footer from '@/components/Footer';
import VoiceAssistant from '@/components/VoiceAssistant';
import { useAuth } from '@/lib/auth-context';

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn, user, theme, toggleTheme, logout, bookingTimer } = useAuth();

  const handleSearch = (data?: { destination: string; startDate: Date | null; endDate: Date | null }) => {
    const params = new URLSearchParams();
    if (data?.destination) params.set('destination', data.destination);
    if (data?.startDate)   params.set('from', data.startDate.toISOString());
    if (data?.endDate)     params.set('to',   data.endDate.toISOString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <>
      <Navbar
        onHomeClick={() => router.push('/')}
        onLoginClick={() => router.push('/auth/login')}
        onSignUpClick={() => router.push('/auth/signup')}
        onProfileClick={() => router.push('/dashboard/profile')}
        onListPropertyClick={() => router.push('/dashboard/list-property')}
        onLogout={() => { logout(); router.push('/'); }}
        isLoggedIn={isLoggedIn}
        user={user}
        scrolledOverride={false}
        theme={theme}
        onToggleTheme={toggleTheme}
        timer={bookingTimer}
        onAdminClick={() => router.push('/admin')}
      />
      <main>
        <Hero onSearch={handleSearch} />
        <WhyBookWithUs />
        <PartnerProgram />
        <ExclusiveOffers />
        <FeaturedHotels />
        <HolidayPackages />
        <FlightDeals />
        <CuratedStays />
        <TripPlanner />
        <NegotiationEngine />
        <DestinationHighlights />
        <Testimonials />
        <AppPromotion />
        <Footer />
      </main>
      <VoiceAssistant
        onCommand={(cmd: string) => {
          if (cmd === 'search')  router.push('/search');
          if (cmd === 'home')    router.push('/');
          if (cmd === 'profile') router.push('/dashboard/profile');
        }}
      />
    </>
  );
}
