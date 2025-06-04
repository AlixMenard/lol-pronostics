import axios, { AxiosError, AxiosInstance } from 'axios';

const TEST_API = process.env.REACT_APP_TEST_API;
const PROD_API = process.env.REACT_APP_PROD_API;

if (!TEST_API || !PROD_API) {
  throw new Error('Les variables d\'environnement REACT_APP_TEST_API et REACT_APP_PROD_API doivent être définies');
}

const API_BASE_URL = process.env.NODE_ENV === 'development' ? TEST_API : PROD_API;

// Configuration de base d'Axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour la gestion des erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      console.error('Erreur API:', error.response.status, error.response.data);
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.error('Pas de réponse du serveur:', error.request);
    } else {
      // Une erreur s'est produite lors de la configuration de la requête
      console.error('Erreur de configuration:', error.message);
    }
    return Promise.reject(error);
  }
);

export const api = {
  health: () => 
    axiosInstance.get('/health'),

  signin: (modo: string, password: string) => 
    axiosInstance.post('/signin', null, { 
      params: { modo, password }
    }),

  getCompetitions: () => 
    axiosInstance.get('/competitions/current'),

  getModoCompetitions: (modo: number) => 
    axiosInstance.get('/competitions/modo', { params: { modo } }),

  getMatches: (competition: number) => 
    axiosInstance.get('/matches', { params: { competition } }),

  placeBet: (modo: number, token: string, gameid: number, score1: number, score2: number) => 
    axiosInstance.post('/bet', null, { 
      params: {
        modo,
        token,
        gameid,
        score1,
        score2
      }
    }),

  getUser: (name: string) => 
    axiosInstance.get('/user', { params: { name } }),

  getBets: (modo: number, league?: string, team?: string) => 
    axiosInstance.get('/bets', { 
      params: { 
        modo,
        ...(league && { league }),
        ...(team && { team })
      } 
    }),

  getRanking: (tournament: number) => 
    axiosInstance.get('/ranking', { params: { competition } }),

  getTeamLogo: (team: string) =>
    axiosInstance.get('/team/logo', { params: { team } }),

  getMatchStats: (id: number) =>
    axiosInstance.get('/match/stats', { params: { id } }),

  getHint: (id: number) =>
    axiosInstance.get('/match/hint', { params: { id } }),

  getMatchBets: (id: number) =>
    axiosInstance.get('/match/bets', { params: { id } }),

  // Admin endpoints
  getUsers: () =>
    axiosInstance.get('/admin/users'),

  deleteUser: (id: number) =>
    axiosInstance.delete('/admin/user', { params: { id } }),

  cancelMatch: (id: number) =>
    axiosInstance.delete('/admin/cancel', { params: { id } }),

  deleteCompetition: (id: number) =>
    axiosInstance.delete('/admin/competition', { params: { id } }),

  deleteMatch: (id: number) =>
    axiosInstance.delete('/admin/match', { params: { id } })
};
