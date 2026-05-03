export type SourceType = 'YouTube' | 'Reddit' | 'Article';

export type FeedItem = {
  id: string;
  title: string;
  summary: string;
  insights: string[];
  source: SourceType;
  topic: string;
  readTime: number;
  publishedAt: string;
  thumbnail?: 'ai' | 'business' | null;
  author?: string;
  eli5?: string;
  businessImpact?: string;
  futurePrediction?: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export type TopicStat = {
  topic: string;
  count: number;
  percentage: number;
};

export type WeeklyReport = {
  weekLabel: string;
  totalRead: number;
  topTopics: TopicStat[];
  highlights: string[];
  learningStreak: number;
};

export type UserProfile = {
  name: string;
  xp: number;
  level: number;
  streak: number;
  totalRead: number;
  joinedAt: string;
  interests: string[];
};
