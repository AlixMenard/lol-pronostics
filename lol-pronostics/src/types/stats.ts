export interface PredictionData {
  score: [number, number];
  ratio: number;
}

export interface Bet {
  id: number;
  team1bet: number;
  team2bet: number;
  name: string;
}

export interface TeamStats {
  last_year: [number, number];
  bo1: [number, number];
  in_league: [number, number];
  bo3: {
    result: [number, number];
    score: [number, number];
  };
  bo5: {
    result: [number, number];
    score: [number, number];
  };
  last_5: Array<{
    tournament: string;
    team1: string;
    team2: string;
    score1: number;
    score2: number;
    bo: number;
  }>;
} 