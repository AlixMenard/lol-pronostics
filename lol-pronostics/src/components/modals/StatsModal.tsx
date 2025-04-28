import { Modal, Box, Typography, Grid, Paper, Divider, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { api } from '../../services/api';
import { TeamLogo } from '../common/TeamLogo';

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

const StatItemContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 6px;
  background-color: rgba(255,255,255,0.03);
  border-radius: 6px;
  min-width: 160px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 63, 9, 0.1);
  }
`;

const StatLabel = styled(Typography)`
  color: #888;
  font-size: 0.8rem;
`;

const StatValue = styled(Typography)`
  color: #fff;
  font-weight: 500;
  font-size: 0.9rem;
`;

const TeamStatsPaper = styled(Paper)`
  padding: 12px;
  background-color: #2a2a2a;
  border-radius: 12px;
  min-width: 500px;

  & .MuiTypography-h5 {
    font-size: 1rem;
  }
  & .MuiTypography-body1 {
    font-size: 0.85rem;
  }
  & .MuiTypography-body2 {
    font-size: 0.75rem;
  }
`;

const PredictionContainer = styled(Box)`
  margin-bottom: 16px;
  padding: 12px;
  background-color: #2a2a2a;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PredictionScore = styled(Typography)`
  font-size: 1.3rem;
  font-weight: bold;
  color: #fff;
  margin: 6px 0;
`;

const PredictionConfidence = styled(Typography)`
  font-size: 0.9rem;
  color: rgba(255, 63, 9, 0.9);
`;

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <StatItemContainer>
    <StatLabel variant="body2">
      {label}
    </StatLabel>
    <StatValue variant="body1">
      {value}
    </StatValue>
  </StatItemContainer>
);

const formatStatValue = (wins: number, losses: number): string => {
  const total = wins + losses;
  if (total === 0) {
    return `${wins} V - ${losses} D`;
  }
  return `${wins} V - ${losses} D (${Math.round((wins / total) * 100)}%)`;
};

const TeamStats = ({ teamCode, stats }: any) => (
  <TeamStatsPaper>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <TeamLogo teamCode={teamCode} size="small" />
      <Typography variant="h5" sx={{ ml: 2, color: '#fff' }}>
        {teamCode}
      </Typography>
    </Box>

    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <StatItem 
            label="Performance Dernière Année" 
            value={formatStatValue(stats.last_year[0], stats.last_year[1])} 
          />
          <StatItem 
            label="BO1" 
            value={formatStatValue(stats.bo1[0], stats.bo1[1])} 
          />
          <StatItem 
            label="En Ligue" 
            value={formatStatValue(stats.in_league[0], stats.in_league[1])} 
          />
        </Box>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1 }}>
              BO3 Stats
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <StatItem 
                label="Matchs" 
                value={formatStatValue(stats.bo3.result[0], stats.bo3.result[1])} 
              />
              <StatItem 
                label="Maps" 
                value={formatStatValue(stats.bo3.score[0], stats.bo3.score[1])} 
              />
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1 }}>
              BO5 Stats
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <StatItem 
                label="Matchs" 
                value={formatStatValue(stats.bo5.result[0], stats.bo5.result[1])} 
              />
              <StatItem 
                label="Maps" 
                value={formatStatValue(stats.bo5.score[0], stats.bo5.score[1])} 
              />
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 1, bgcolor: '#444' }} />
        <Typography variant="subtitle1" sx={{ color: '#fff', mb: 1 }}>
          5 Derniers Matchs
        </Typography>
        <Box>
          {stats.last_5.map((match: any, index: number) => (
            <Box 
              key={index} 
              sx={{ 
                mb: 0.5,
                p: 1,
                borderRadius: 1,
                bgcolor: 'rgba(255,255,255,0.05)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
              }}
            >
              <Typography variant="body2" sx={{ color: '#aaa', fontSize: '0.75rem' }}>
                {match.tournament}
              </Typography>
              <Typography sx={{ color: '#fff', fontSize: '0.85rem' }}>
                {match.team1} {match.score1} - {match.score2} {match.team2}
                <Typography component="span" sx={{ color: '#888', ml: 1, fontSize: '0.75rem' }}>
                  (BO{match.bo})
                </Typography>
              </Typography>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  </TeamStatsPaper>
);

interface PredictionData {
  score: [number, number];
  ratio: number;
}

export const StatsModal = ({ matchId, open, onClose }: Props) => {
  const [stats, setStats] = useState<any>(null);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (matchId && open) {
      setLoading(true);
      setError(null);
      
      Promise.all([
        api.getMatchStats(matchId).catch(() => ({ data: { data: null } })),
        api.getHint(matchId).catch(() => ({ data: null }))
      ]).then(([statsResponse, hintResponse]) => {
        if (statsResponse.data?.data) {
          setStats(statsResponse.data.data);
        }
        if (hintResponse.data) {
          setPrediction(hintResponse.data);
        }
      }).catch(() => {
        setError('Erreur lors du chargement des données');
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setStats(null);
      setPrediction(null);
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
            {prediction && prediction.score && (
              <PredictionContainer>
                <Typography variant="h6" sx={{ color: '#fff' }}>
                  Prédiction statistique
                </Typography>
                <PredictionScore>
                  {prediction.score[0]} - {prediction.score[1]}
                </PredictionScore>
                <PredictionConfidence>
                  Confiance: {Math.round((prediction.ratio || 0) * 100)}%
                </PredictionConfidence>
              </PredictionContainer>
            )}
            {stats && (
              <Grid container spacing={3}>
                {Object.entries(stats).map(([teamCode, teamStats]) => (
                  <Grid item xs={12} md={6} key={teamCode}>
                    <TeamStats teamCode={teamCode} stats={teamStats} />
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
