'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface User {
  name: string;
  avatar: string;
  email: string;
  phone?: string;
  token?: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  authToken: string | null;
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
  const [authToken, setAuthToken]   = useState<string | null>(null);
  const [theme, setTheme]           = useState<'light' | 'dark'>('light');
  const [bookingTimer, setBookingTimer] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // On mount: read saved theme from localStorage and apply .dark to <html>
  useEffect(() => {
    const savedTheme = localStorage.getItem('ww-theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme ?? 'light';
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const savedUser = localStorage.getItem('ww-auth-user');
    const savedToken = localStorage.getItem('ww-access-token');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as User;
        setUser(parsed);
      } catch {
        localStorage.removeItem('ww-auth-user');
      }
    }
    if (savedToken) {
      setAuthToken(savedToken);
      setIsLoggedIn(true);
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
    setAuthToken(userData.token ?? null);
    localStorage.setItem('ww-auth-user', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('ww-access-token', userData.token);
    } else {
      localStorage.removeItem('ww-access-token');
    }
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('ww-access-token');
    localStorage.removeItem('ww-auth-user');
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
      value={{ isLoggedIn, user, authToken, theme, bookingTimer, isTimerActive, login, logout, toggleTheme, startTimer }}
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
