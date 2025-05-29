import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { PredictionData, Bet, TeamStats } from '../types/stats';

interface UseStatsResult {
  stats: Record<string, TeamStats> | null;
  prediction: PredictionData | null;
  bets: Bet[];
  loading: boolean;
  error: string | null;
}

export const useStats = (matchId: number | null): UseStatsResult => {
  const [stats, setStats] = useState<Record<string, TeamStats> | null>(null);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (matchId) {
      setLoading(true);
      setError(null);
      
      Promise.all([
        api.getMatchStats(matchId).catch(() => ({ data: { data: null } })),
        api.getHint(matchId).catch(() => ({ data: null })),
        api.getMatchBets(matchId).catch(() => ({ data: { data: [] } }))
      ]).then(([statsResponse, hintResponse, betsResponse]) => {
        if (statsResponse.data?.data) {
          setStats(statsResponse.data.data);
        }
        if (hintResponse.data) {
          setPrediction(hintResponse.data);
        }
        if (betsResponse.data?.data) {
          setBets(betsResponse.data.data);
        }
      }).catch(() => {
        setError('Erreur lors du chargement des données');
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setStats(null);
      setPrediction(null);
      setBets([]);
      setError(null);
    }
  }, [matchId]);

  return { stats, prediction, bets, loading, error };
}; 