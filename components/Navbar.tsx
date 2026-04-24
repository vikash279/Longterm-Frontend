'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, Plane, Heart, User, Briefcase, Tag, GraduationCap,
  Coins, Sparkles, LogOut, Settings, Moon, Sun,
  Clock, ArrowUpRight, ArrowRight, Zap,
} from 'lucide-react';

interface NavbarProps {
  onHomeClick?: () => void;
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
  onProfileClick?: () => void;
  onListPropertyClick?: () => void;
  onAdminClick?: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
  user?: { name: string; avatar: string } | null;
  scrolledOverride?: boolean;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  timer?: number | null;
}

const NAV_LINKS = [
  { label: 'Hotels',   href: '/hotels' },
  { label: 'Holidays', href: '/holidays' },
  { label: 'Flights',  href: '/flights' },
  { label: 'Offers',   href: '/offers' },
];

const Navbar: React.FC<NavbarProps> = ({
  onHomeClick,
  onLoginClick,
  onSignUpClick,
  onProfileClick,
  onListPropertyClick,
  onAdminClick,
  onLogout,
  isLoggedIn,
  user,
  scrolledOverride,
  theme = 'light',
  onToggleTheme,
  timer,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen]     = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const loginBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only listen for outside clicks when the menu IS open
  // Use mousedown so it fires before any click handlers on the document
  // But explicitly ignore clicks on the login button itself (it handles its own toggle)
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      // If click is inside dropdown panel, do nothing — let links/buttons handle it
      if (dropdownRef.current && dropdownRef.current.contains(target)) return;
      // If click is on the login button, do nothing — the button's onClick will toggle
      if (loginBtnRef.current && loginBtnRef.current.contains(target)) return;
      // Otherwise close
      setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  const isActuallyScrolled = scrolled || scrolledOverride;

  const menuItems = [
    { title: 'goTribe',         icon: <Sparkles className="w-3.5 h-3.5" />, href: '/gotribe' },
    { title: 'Offers',          icon: <Tag className="w-3.5 h-3.5" />,      href: '/offers' },
    { title: 'Student Go Pass', icon: <GraduationCap className="w-3.5 h-3.5" />, href: '/student-pass' },
    { title: 'My Trips',        icon: <Briefcase className="w-3.5 h-3.5" />, href: '/dashboard/profile' },
    { title: 'goCash',          icon: <Coins className="w-3.5 h-3.5" />,    href: '/gocash' },
  ];

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const navBg = isActuallyScrolled
    ? theme === 'dark'
      ? 'bg-slate-900 shadow-lg border-b border-slate-800'
      : 'bg-white shadow-lg border-b border-gray-100'
    : 'bg-transparent';

  const linkColor = isActuallyScrolled
    ? theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-agent-blue'
    : 'text-white/80 hover:text-white';

  const logoTextColor = isActuallyScrolled
    ? theme === 'dark' ? 'text-white' : 'text-slate-900'
    : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isActuallyScrolled ? 'py-2' : 'py-6'} ${navBg}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center">

          {/* Logo + Desktop Nav */}
          <div className="flex items-center space-x-12">
            <Link href="/" onClick={onHomeClick} className="flex items-center space-x-2 group">
              <div className="bg-gradient-agent p-2.5 rounded-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className={`text-2xl font-black tracking-tighter ${logoTextColor}`}>
                Wander<span className="text-gradient">Wealth</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`text-[13px] font-black uppercase tracking-widest transition-colors relative ${linkColor} ${
                      isActive ? 'after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-agent after:rounded-full' : ''
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}

              <Link
                href="/dashboard/list-property"
                onClick={onListPropertyClick}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all px-6 py-2.5 rounded-full border shadow-sm group/host ${
                  isActuallyScrolled
                    ? theme === 'dark'
                      ? 'border-slate-700 text-agent-orange bg-slate-800/50 hover:bg-agent-orange hover:text-white'
                      : 'border-slate-200 text-slate-950 bg-white hover:border-slate-950'
                    : 'border-white/40 text-white bg-white/10 backdrop-blur-md hover:bg-white hover:text-slate-950'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>HOST WITH US</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/host:translate-x-0.5 group-hover/host:-translate-y-0.5" strokeWidth={3} />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center space-x-6 relative overflow-visible">

            {/* Booking Timer */}
            {timer !== null && timer !== undefined && timer > 0 && (
              <div className="flex items-center space-x-2 bg-agent-pink/10 border border-agent-pink/20 px-4 py-1.5 rounded-xl animate-pulse">
                <Clock className="w-4 h-4 text-agent-pink" />
                <span className="text-[12px] font-black text-agent-pink uppercase tracking-widest">{formatTimer(timer)}</span>
              </div>
            )}

            {/* Admin access */}
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                className={`text-[11px] font-black uppercase tracking-[0.2em] rounded-full px-5 py-2.5 transition-all border ${
                  isActuallyScrolled
                    ? theme === 'dark' ? 'border-slate-700 text-slate-300 hover:text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                    : 'border-white/30 text-white/80 hover:bg-white/10'
                }`}
              >
                Admin
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className={`p-2.5 rounded-xl transition-all border ${
                isActuallyScrolled
                  ? theme === 'dark'
                    ? 'border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                  : 'border-white/30 text-white/80 hover:bg-white/10'
              }`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Wishlist */}
            <button
              aria-label="Wishlist"
              className={`p-2 transition-colors ${
                isActuallyScrolled
                  ? theme === 'dark' ? 'text-slate-400 hover:text-pink-500' : 'text-slate-600 hover:text-pink-500'
                  : 'text-white/80 hover:text-pink-400'
              }`}
            >
              <Heart className="w-5 h-5" />
            </button>

            {/* Auth — logged in shows profile pill, else shows login button + dropdown */}
            {isLoggedIn && user ? (
              <button
                onClick={() => onProfileClick?.()}
                className={`flex items-center space-x-3 pl-1.5 pr-6 py-1.5 rounded-full border transition-all active:scale-95 shadow-sm ${
                  isActuallyScrolled
                    ? theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-[#F0F6FF]'
                    : 'border-white/20 bg-white/10 backdrop-blur-md'
                }`}
              >
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <span className={`text-[15px] font-black tracking-tight ${
                  isActuallyScrolled ? (theme === 'dark' ? 'text-white' : 'text-agent-blue') : 'text-white'
                }`}>
                  {user.name}
                </span>
              </button>
            ) : (
              <div className="relative overflow-visible">
                {/* Login button — ref prevents outside-click from firing on this element */}
                <button
                  ref={loginBtnRef}
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className={`flex items-center space-x-3 border rounded-full px-6 py-2.5 transition-all active:scale-95 shadow-sm ${
                    isActuallyScrolled
                      ? theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-agent-blue bg-white'
                      : 'border-white bg-white/10 backdrop-blur-md'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isActuallyScrolled ? (theme === 'dark' ? 'bg-slate-700' : 'bg-[#EBF1FF]') : 'bg-white/20'
                  }`}>
                    <User
                      className={`w-3.5 h-3.5 ${
                        isActuallyScrolled ? (theme === 'dark' ? 'text-white' : 'text-agent-blue') : 'text-white'
                      }`}
                      fill="currentColor"
                    />
                  </div>
                  <span className={`text-[13px] font-black uppercase tracking-[0.2em] whitespace-nowrap ${
                    isActuallyScrolled ? (theme === 'dark' ? 'text-white' : 'text-agent-blue') : 'text-white'
                  }`}>
                    Login
                  </span>
                </button>

                {/* Dropdown panel — ref used to detect inside-clicks */}
                {isMenuOpen && (
                  <div
                    ref={dropdownRef}
                    className={`absolute top-[calc(100%+12px)] right-0 w-[300px] rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] border z-[70] ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100'
                    }`}
                  >
                    <div className="p-6">
                      {/* Identity banner */}
                      <div className={`mb-4 p-4 rounded-[1.5rem] border text-center ${
                        theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'
                      }`}>
                        <div className={`w-8 h-8 rounded-xl mx-auto mb-2.5 flex items-center justify-center shadow-sm ${
                          theme === 'dark' ? 'bg-slate-800 text-agent-blue' : 'bg-white text-agent-blue'
                        }`}>
                          <Zap size={14} strokeWidth={3} />
                        </div>
                        <h4 className={`text-lg font-black tracking-tighter leading-none mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-slate-950'
                        }`}>
                          Identity Sync
                        </h4>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.1em]">Establish explorer node</p>
                      </div>

                      {/* Sign Up */}
                      <button
                        onClick={() => { setIsMenuOpen(false); onSignUpClick?.(); }}
                        className="w-full bg-agent-blue text-white py-3 rounded-full font-black text-[11px] uppercase tracking-[0.15em] shadow-lg hover:bg-blue-600 transition-all active:scale-[0.98] mb-2 flex items-center justify-center group"
                      >
                        <span>Join Network</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
                      </button>

                      {/* Login */}
                      <button
                        onClick={() => { setIsMenuOpen(false); onLoginClick?.(); }}
                        className={`w-full py-3 rounded-full font-black text-[11px] uppercase tracking-[0.15em] mb-4 border transition-all active:scale-[0.98] ${
                          theme === 'dark'
                            ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Already a member? Login
                      </button>

                      {onAdminClick && (
                        <button
                          onClick={() => { setIsMenuOpen(false); onAdminClick?.(); }}
                          className='w-full py-3 rounded-full font-black text-[11px] uppercase tracking-[0.15em] border border-slate-200 text-slate-900 hover:bg-slate-50 transition-all active:scale-[0.98]'
                        >
                          Admin Console
                        </button>
                      )}

                      {/* Menu links */}
                      <div className="space-y-1">
                        {menuItems.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center space-x-3 py-2 px-3 -mx-1 rounded-xl transition-colors ${
                              theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {item.icon}
                            </div>
                            <span className={`text-[11px] font-black uppercase tracking-widest ${
                              theme === 'dark' ? 'text-white' : 'text-slate-900'
                            }`}>
                              {item.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              isActuallyScrolled
                ? theme === 'dark' ? 'text-white' : 'text-slate-900'
                : 'text-white'
            }`}
            aria-label="Toggle mobile menu"
          >
            {isMobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className={`lg:hidden mt-4 rounded-3xl border p-5 space-y-2 ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'
          }`}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`block py-3 px-4 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-colors ${
                  pathname === href
                    ? 'bg-agent-blue text-white'
                    : theme === 'dark' ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {label}
              </Link>
            ))}
            {onAdminClick && (
              <button
                onClick={() => { onAdminClick?.(); setIsMobileOpen(false); }}
                className="w-full text-left py-3 px-4 rounded-2xl font-black text-[12px] uppercase tracking-widest border border-slate-200 text-slate-900 hover:bg-slate-50 transition-all"
              >
                Admin Dashboard
              </button>
            )}
            <div className={`pt-3 mt-1 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard/profile"
                    className={`block py-3 px-4 rounded-2xl font-black text-[12px] uppercase tracking-widest mb-2 ${
                      theme === 'dark' ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => { onLogout?.(); setIsMobileOpen(false); }}
                    className="w-full py-3 px-4 rounded-2xl font-black text-[12px] uppercase tracking-widest text-red-500 hover:bg-red-50 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link href="/auth/login" className="flex-1 py-3 text-center rounded-2xl font-black text-[11px] uppercase tracking-widest border border-agent-blue text-agent-blue">
                    Login
                  </Link>
                  <Link href="/auth/signup" className="flex-1 py-3 text-center rounded-2xl font-black text-[11px] uppercase tracking-widest bg-agent-blue text-white">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
