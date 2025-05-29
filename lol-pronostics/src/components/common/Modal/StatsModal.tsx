import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { BaseModal } from './BaseModal';
import { LoadingState } from '../LoadingState';
import { ErrorState } from '../ErrorState';
import { TeamStats } from '../../modals/stats/TeamStats';
import { PredictionSection } from '../../modals/stats/PredictionSection';
import { api } from '../../../services/api';
import { Match, MatchStats } from '../../../types/match';
import { Bet } from '../../../types/bet';
import { PredictionData } from '../../../types/prediction';

interface StatsModalProps {
  open: boolean;
  onClose: () => void;
  match: Match;
}

export const StatsModal = ({ open, onClose, match }: StatsModalProps) => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBets = async () => {
    if (!match?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await api.getMatchBets(match.id);
      setBets(response.data);
    } catch (err) {
      setError('Impossible de charger les paris. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && match?.id) {
      fetchBets();
    }
  }, [open, match?.id]);

  const handleRetry = () => {
    if (!match?.id) return;
    setError(null);
    setLoading(true);
    fetchBets();
  };

  const prediction: PredictionData | null = match?.prediction || null;

  const renderContent = () => {
    if (!match?.team1 || !match?.team2) {
      return <LoadingState message="Chargement des données du match..." />;
    }

    if (loading) {
      return <LoadingState message="Chargement des statistiques..." />;
    }

    if (error) {
      return <ErrorState message={error} onRetry={handleRetry} />;
    }

    if (!match.stats) {
      return <ErrorState message="Les statistiques ne sont pas disponibles pour ce match." />;
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TeamStats teamCode={match.team1} stats={match.stats.team1} />
          <TeamStats teamCode={match.team2} stats={match.stats.team2} />
        </Box>
        <PredictionSection
          prediction={prediction}
          bets={bets}
          stats={match.stats}
        />
      </Box>
    );
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Statistiques du Match"
      maxWidth="lg"
    >
      <Box sx={{ p: 2 }}>
        {renderContent()}
      </Box>
    </BaseModal>
  );
}; 