import { Box, Grid } from '@mui/material';
import { LoadingState } from '../../common/LoadingState';
import { ErrorState } from '../../common/ErrorState';
import { PredictionSection } from './PredictionSection';
import { TeamStats } from './TeamStats';
import { PredictionData } from '../../../types/prediction';
import { Bet } from '../../../types/bet';
import { MatchStats } from '../../../types/match';

interface StatsModalContentProps {
  loading: boolean;
  error: string | null;
  prediction: PredictionData | null;
  bets: Bet[];
  stats: MatchStats;
  onRetry: () => void;
}

export const StatsModalContent = ({
  loading,
  error,
  prediction,
  bets,
  stats,
  onRetry
}: StatsModalContentProps) => {
  if (loading) {
    return <LoadingState message="Chargement des statistiques..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  return (
    <Box>
      {(prediction || bets.length > 0) && (
        <PredictionSection prediction={prediction} bets={bets} stats={stats} />
      )}
      {stats && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TeamStats teamCode="team1" stats={stats.team1} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TeamStats teamCode="team2" stats={stats.team2} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}; 