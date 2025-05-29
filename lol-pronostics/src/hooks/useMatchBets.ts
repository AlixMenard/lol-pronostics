import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Bet } from '../types/bet';

interface UseMatchBetsResult {
  bets: Bet[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useMatchBets = (matchId: number): UseMatchBetsResult => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getMatchBets(matchId);
      setBets(response.data);
    } catch (err) {
      setError('Impossible de charger les paris. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBets();
  }, [matchId]);

  return {
    bets,
    loading,
    error,
    refetch: fetchBets
  };
}; 