import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useMatchStats = (matchId: number) => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.getMatchStats(matchId);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching match stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (matchId) {
      fetchStats();
    }
  }, [matchId]);

  return { data: stats, isLoading };
};
