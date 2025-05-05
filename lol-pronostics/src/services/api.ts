import axios from 'axios';

const TEST_API = process.env.REACT_APP_TEST_API;
const PROD_API = process.env.REACT_APP_PROD_API;
const API_BASE_URL = process.env.NODE_ENV === 'development' ? TEST_API : PROD_API;


export const api = {
  signin: (modo: string, password: string) => 
    axios.post(`${API_BASE_URL}/signin`, null, { 
      params: { modo, password }
    }),

  getCompetitions: () => 
    axios.get(`${API_BASE_URL}/competitions/current`),

  getMatches: (competition: number) => 
    axios.get(`${API_BASE_URL}/matches`, { params: { competition } }),

  placeBet: (modo: number, token: string, gameid: number, score1: number, score2: number) => 
    axios.post(`${API_BASE_URL}/bet`, null, { 
      params: {
        modo,
        token,
        gameid,
        score1,
        score2
      }
    }),

  getUser: (username: string) => 
    axios.get(`${API_BASE_URL}/user`, { params: { username } }),

  getBets: (modo: number) => 
    axios.get(`${API_BASE_URL}/bets`, { params: { modo } }),

  getRanking: (competition: number) => 
    axios.get(`${API_BASE_URL}/ranking`, { params: { competition } }),

  getTeamLogo: (team: string) =>
    axios.get(`${API_BASE_URL}/team/logo`, { params: { team } }),

  getMatchStats: (matchId: number) =>
    axios.get(`${API_BASE_URL}/match/stats`, { params: { id: matchId } }),

  getHint: (matchId: number) =>
    axios.get(`${API_BASE_URL}/match/hint`, { params: { id: matchId } })
};
