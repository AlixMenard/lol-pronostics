export interface Match {
  id: number;
  competition_id: number;
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
  date: string;
  bo: number;
  userBet?: {
    team1bet: number;
    team2bet: number;
  };
  prediction?: {
    score: [number, number];
    ratio: number;
  };
  stats?: MatchStats;
}

export interface MatchStats {
  [teamCode: string]: {
    last_year: [number, number];
    bo1: [number, number];
    bo3: {
      result: [number, number];
      score: [number, number];
    };
    bo5: {
      result: [number, number];
      score: [number, number];
    };
    in_league: [number, number];
    last_5: Array<{
      tournament: string;
      team1: string;
      team2: string;
      score1: number;
      score2: number;
      bo: number;
    }>;
  };
}
