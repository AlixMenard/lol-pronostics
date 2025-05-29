import { Modal, Box, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { TeamStatsCard } from './stats/TeamStatsCard';
import { PredictionSection } from './stats/PredictionSection';
import { PredictionData, MatchStats } from '../../types';
import { Bet } from '../../types/bet';

interface Props {
  matchId: number | null;
  open: boolean;
  onClose: () => void;
}

const StyledModal = styled(Modal)``;

const ModalContent = styled(Box)`
  border: var(--secondary-color) solid 1px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 95%;
  max-width: 1200px;
  background-color: #1a1a1a;
  color: #fff;
  box-shadow: 24;
  padding: 16px;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 12px;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease-out;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    0% {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

export const StatsModal = ({ matchId, open, onClose }: Props) => {
  const [stats, setStats] = useState<MatchStats | null>(null);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (matchId && open) {
      setLoading(true);
      setError(null);
      
      Promise.all([
        api.getMatchStats(matchId).catch(() => ({ data: { data: null } })),
        api.getHint(matchId).catch(() => ({ data: null })),
        api.getMatchBets(matchId).catch(() => ({ data: [] }))
      ]).then(([statsResponse, hintResponse, betsResponse]) => {
        if (statsResponse.data?.data) {
          setStats(statsResponse.data.data);
        }
        if (hintResponse.data) {
          setPrediction(hintResponse.data);
        }
        if (betsResponse.data) {
          setBets(betsResponse.data);
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
  }, [matchId, open]);

  return (
    <StyledModal 
      open={open} 
      onClose={onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <ModalContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            p: 4, 
            color: 'error.main'
          }}>
            {error}
          </Box>
        ) : (
          <Box>
            {prediction && prediction.score && (              <PredictionSection 
                prediction={prediction} 
                bets={bets} 
                stats={stats || undefined}
              />
            )}
            {stats && (
              <Grid container spacing={3}>
                {Object.entries(stats).map(([teamCode, teamStats]) => (
                  <Grid item xs={12} md={6} key={teamCode}>
                    <TeamStatsCard teamCode={teamCode} stats={teamStats} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </ModalContent>
    </StyledModal>
  );
};
