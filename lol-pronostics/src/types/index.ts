export interface Competition {
  id: number;
  name: string;
}

export interface Match {
  id: number;
  team1: TeamCode;
  team2: TeamCode;
  date: string;
  competition_id: number;
  score1?: number;
  score2?: number;
  bo: number;
  status: string;
  userBet?: UserBet;
}

export interface RankingData {
  name: string;
  num_bets: number;
  score: number;
  rank?: number;
  competition_id?: number;
}

export interface TeamLogos {
  [key: string]: string;
}

export interface Prediction {
  id: number;
  team1: string;
  team2: string;
  team1bet: number;
  score1: number;
  team2bet: number;
  score2: number;
  date: string;
}

export interface UserBet {
  team1bet: number;
  team2bet: number;
}

export type TeamCode = 'TBD' | 'HRTS' | 'ZNT' | 'NBS' | 'LR' | 'SUP' | 'Z10' | 'TP' | 'IJC' | 
  'BIG' | 'CZV' | 'GK' | 'BAR' | 'KCB' | 'EWI' | 'MCK' | 'FLH' | 'FNC' | 'GX' | 
  'TH' | 'null' | 'G2' | 'MKOI' | 'VIT' | 'KC' | 'BDS' | 'SK' | 'HLE' | 'GEN' | 
  'DRX' | 'DNF' | 'NS' | 'BRO' | 'BFX' | 'DK' | 'KT' | 'T1';
