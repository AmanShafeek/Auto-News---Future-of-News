import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { FeedItem } from '@/types';
import { MOCK_FEED } from '@/data/mockData';

type FeedContextType = {
  feed: FeedItem[];
  likedIds: Set<string>;
  dislikedIds: Set<string>;
  savedIds: Set<string>;
  likeItem: (id: string) => void;
  dislikeItem: (id: string) => void;
  saveItem: (id: string) => void;
  getItemById: (id: string) => FeedItem | undefined;
};

const FeedContext = createContext<FeedContextType | null>(null);

export function FeedProvider({ children }: { children: React.ReactNode }) {
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [dislikedIds, setDislikedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadPreferences();
  }, []);

  async function loadPreferences() {
    try {
      const liked = await AsyncStorage.getItem('neurofeed_liked');
      const disliked = await AsyncStorage.getItem('neurofeed_disliked');
      const saved = await AsyncStorage.getItem('neurofeed_saved');
      if (liked) setLikedIds(new Set(JSON.parse(liked)));
      if (disliked) setDislikedIds(new Set(JSON.parse(disliked)));
      if (saved) setSavedIds(new Set(JSON.parse(saved)));
    } catch (_) {}
  }

  function likeItem(id: string) {
    setLikedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      AsyncStorage.setItem('neurofeed_liked', JSON.stringify([...next])).catch(() => {});
      return next;
    });
    setDislikedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function dislikeItem(id: string) {
    setDislikedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      AsyncStorage.setItem('neurofeed_disliked', JSON.stringify([...next])).catch(() => {});
      return next;
    });
    setLikedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function saveItem(id: string) {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      AsyncStorage.setItem('neurofeed_saved', JSON.stringify([...next])).catch(() => {});
      return next;
    });
  }

  function getItemById(id: string) {
    return MOCK_FEED.find(item => item.id === id);
  }

  return (
    <FeedContext.Provider value={{
      feed: MOCK_FEED,
      likedIds,
      dislikedIds,
      savedIds,
      likeItem,
      dislikeItem,
      saveItem,
      getItemById,
    }}>
      {children}
    </FeedContext.Provider>
  );
}

export function useFeed() {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error('useFeed must be used within FeedProvider');
  return ctx;
}
