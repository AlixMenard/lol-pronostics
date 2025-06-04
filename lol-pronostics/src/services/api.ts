import axios from 'axios';

const TEST_API = process.env.REACT_APP_TEST_API;
const PROD_API = process.env.REACT_APP_PROD_API;
const API_BASE_URL = process.env.NODE_ENV === 'development' ? TEST_API : PROD_API;

interface SignInResponse {
  id: number;
  name: string;
  token: string;
}

export const api = {
  // Authentication
  signin: (modo: string, password: string) => 
    axios.post(`${API_BASE_URL}/signin`, null, { 
      params: { modo, password }
    }),

  // Health check
  health: () => 
    axios.get(`${API_BASE_URL}/health`),

  // Competition endpoints
  getCompetitions: () => 
    axios.get(`${API_BASE_URL}/competitions/current`),

  getModoCompetitions: (modo: string) =>
    axios.get(`${API_BASE_URL}/competitions/modo`, { params: { modo } }),

  // Matches endpoints
  getMatches: (competition: number) => 
    axios.get(`${API_BASE_URL}/matches`, { params: { competition } }),

  getMatchBets: (matchId: number) =>
    axios.get(`${API_BASE_URL}/match/bets`, { params: { id: matchId } }),

  getMatchStats: (matchId: number) =>
    axios.get(`${API_BASE_URL}/match/stats`, { params: { id: matchId } }),

  // Bet endpoints
  placeBet: (modo: number, token: string, gameid: number, score1: number, score2: number) => 
    axios.post(`${API_BASE_URL}/bet`, null, { 
      params: { modo, token, gameid, score1, score2 } 
    }),

  getBets: (modo: number) => 
    axios.get(`${API_BASE_URL}/bets`, { params: { modo } }),

  // User endpoints
  getUser: (name: string) => 
    axios.get(`${API_BASE_URL}/user`, { params: { name } }),

  // Stats endpoints
  getRanking: (competition: number) => 
    axios.get(`${API_BASE_URL}/ranking`, { params: { competition } }),

  // Team endpoints
  getTeamLogo: (team: string) =>
    axios.get(`${API_BASE_URL}/team/logo`, { params: { team } }),

  // Game hint endpoint
  getHint: (matchId: number) =>
    axios.get(`${API_BASE_URL}/hint`, { params: { id: matchId } }),

};
