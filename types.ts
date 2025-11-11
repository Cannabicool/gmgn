export type TimePeriod = '1D' | '1W' | '1M' | '1Y';

export interface User {
  username: string;
  neynarScore: number;
}

export interface Reply {
  text: string;
  author: User;
}

export interface Cast {
  id: string;
  text: string;
  timestamp: string;
  replies: Reply[];
}

export interface AnalysisResult {
  totalCasts: number;
  counts: {
    ignored: number;
    botReplied: number;
    humanReplied: number;
  };
  period: TimePeriod;
  username: string;
  persona: string;
}

export interface PieChartData {
    name: string;
    value: number;
    color: string;
}
export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatarUrl: string;
  stat: string;
}

export interface LeaderboardData {
  mostIgnored: LeaderboardEntry[];
  mostHumanReplies: LeaderboardEntry[];
  mostBotReplies: LeaderboardEntry[];
}