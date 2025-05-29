export interface Prediction {
  id: number;
  team1: string;
  team2: string;
  team1bet: number;
  team2bet: number;
  score1: number;
  score2: number;
  date: string;
}

export interface PredictionData {
  score: [number, number];
  ratio: number;
}
