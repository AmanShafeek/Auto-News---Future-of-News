import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '@/types';

type AppContextType = {
  user: UserProfile;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  addReadCount: () => void;
  toggleInterest: (topic: string) => void;
};

const DEFAULT_USER: UserProfile = {
  name: 'Knowledge Seeker',
  xp: 1240,
  level: 5,
  streak: 12,
  totalRead: 87,
  joinedAt: 'Jan 2025',
  interests: ['AI Research', 'Startups', 'Finance'],
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const stored = await AsyncStorage.getItem('neurofeed_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (_) {}
  }

  async function saveUser(updated: UserProfile) {
    setUser(updated);
    try {
      await AsyncStorage.setItem('neurofeed_user', JSON.stringify(updated));
    } catch (_) {}
  }

  function addXP(amount: number) {
    setUser(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 500) + 1;
      const updated = { ...prev, xp: newXp, level: newLevel };
      AsyncStorage.setItem('neurofeed_user', JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }

  function incrementStreak() {
    setUser(prev => {
      const updated = { ...prev, streak: prev.streak + 1 };
      AsyncStorage.setItem('neurofeed_user', JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }

  function addReadCount() {
    setUser(prev => {
      const updated = { ...prev, totalRead: prev.totalRead + 1 };
      AsyncStorage.setItem('neurofeed_user', JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }

  function toggleInterest(topic: string) {
    setUser(prev => {
      const interests = prev.interests.includes(topic)
        ? prev.interests.filter(i => i !== topic)
        : [...prev.interests, topic];
      const updated = { ...prev, interests };
      AsyncStorage.setItem('neurofeed_user', JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }

  return (
    <AppContext.Provider value={{ user, addXP, incrementStreak, addReadCount, toggleInterest }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
