'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface User {
  name: string;
  avatar: string;
  email: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  theme: 'light' | 'dark';
  bookingTimer: number | null;
  isTimerActive: boolean;
  login: (user: User) => void;
  logout: () => void;
  toggleTheme: () => void;
  startTimer: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser]             = useState<User | null>(null);
  const [theme, setTheme]           = useState<'light' | 'dark'>('light');
  const [bookingTimer, setBookingTimer] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // On mount: read saved theme from localStorage and apply .dark to <html>
  useEffect(() => {
    const saved = localStorage.getItem('ww-theme') as 'light' | 'dark' | null;
    const initial = saved ?? 'light';
    setTheme(initial);
    if (initial === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Whenever theme state changes, sync .dark class on <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Booking countdown timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerActive && bookingTimer !== null && bookingTimer > 0) {
      interval = setInterval(() => {
        setBookingTimer((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (bookingTimer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, bookingTimer]);

  const login = useCallback((userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('ww-theme', next);
      return next;
    });
  }, []);

  const startTimer = useCallback(() => {
    setBookingTimer(600);
    setIsTimerActive(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, theme, bookingTimer, isTimerActive, login, logout, toggleTheme, startTimer }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
