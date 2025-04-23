import { Modal, Box, Typography, Grid, Paper, Divider, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { TeamLogo } from '../common/TeamLogo';

interface Props {
  matchId: number | null;
  open: boolean;
  onClose: () => void;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '95%',
  maxWidth: 1400,
  bgcolor: '#1a1a1a',
  color: '#fff',
  boxShadow: 24,
  p: 3,
  maxHeight: '90vh',
  overflowY: 'auto',
  borderRadius: 2,
  transform: 'translate(-50%, -50%)',
  transition: 'transform 0.3s ease-out',
  '@keyframes slideIn': {
    '0%': {
      transform: 'translate(-50%, 100%)',
      opacity: 0,
    },
    '100%': {
      transform: 'translate(-50%, -50%)',
      opacity: 1,
    }
  },
  animation: 'slideIn 0.3s ease-out',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.05)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.3)',
    },
  },
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    p: 1,
    bgcolor: 'rgba(255,255,255,0.03)',
    borderRadius: 1,
    minWidth: '180px',
    '&:hover': {
      bgcolor: 'rgba(255, 63, 9, 0.1)',
    },
    transition: 'background-color 0.2s'
  }}>
    <Typography variant="body2" sx={{ color: '#888' }}>
      {label}
    </Typography>
    <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
      {value}
    </Typography>
  </Box>
);

const calculateWinRate = (wins: number, losses: number): number => {
  const total = wins + losses;
  return total > 0 ? Math.round((wins / total) * 100) : 0;
};

const formatStatValue = (wins: number, losses: number): string => {
  const total = wins + losses;
  if (total === 0) {
    return `${wins} V - ${losses} D`;
  }
  return `${wins} V - ${losses} D (${Math.round((wins / total) * 100)}%)`;
};

const TeamStats = ({ teamCode, stats }: any) => (
  <Paper sx={{ 
    p: 2,  
    bgcolor: '#2a2a2a', 
    borderRadius: 2,
    minWidth: '600px',  
    '& .MuiTypography-h5': {
      fontSize: '1.1rem',  
    },
    '& .MuiTypography-body1': {
      fontSize: '0.9rem',  
    },
    '& .MuiTypography-body2': {
      fontSize: '0.8rem',  
    },
    '& .MuiTypography-subtitle2': {
      color: 'rgba(255, 63, 9, 0.9)',
      fontWeight: 500,
    }
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <TeamLogo teamCode={teamCode} />
      <Typography variant="h5" sx={{ ml: 2, color: '#fff' }}>
        {teamCode}
      </Typography>
    </Box>

    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1 }}>
              BO3 Stats
            </Typography>
            <Box>
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
            <Box>
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
        <Divider sx={{ my: 2, bgcolor: '#444' }} />
        <Typography variant="subtitle1" sx={{ color: '#fff', mb: 2 }}>
          5 Derniers Matchs
        </Typography>
        <Box sx={{ pl: 2 }}>
          {stats.last_5.map((match: any, index: number) => (
            <Box 
              key={index} 
              sx={{ 
                mb: 1,
                p: 1,
                borderRadius: 1,
                bgcolor: 'rgba(255,255,255,0.05)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
              }}
            >
              <Typography variant="body2" sx={{ color: '#aaa' }}>
                {match.tournament}
              </Typography>
              <Typography sx={{ color: '#fff' }}>
                {match.team1} {match.score1} - {match.score2} {match.team2}
                <Typography component="span" sx={{ color: '#888', ml: 1 }}>
                  (BO{match.bo})
                </Typography>
              </Typography>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  </Paper>
);

export const StatsModal = ({ matchId, open, onClose }: Props) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (matchId && open) {
      setLoading(true);
      api.getMatchStats(matchId)
        .then(response => setStats(response.data.data))
        .finally(() => setLoading(false));
    }
  }, [matchId, open]);

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <Box sx={modalStyle}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : stats ? (
          <Box>
            <Grid container spacing={3}>
              {Object.entries(stats).map(([teamCode, teamStats]) => (
                <Grid item xs={12} md={6} key={teamCode}>
                  <TeamStats teamCode={teamCode} stats={teamStats} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}
      </Box>
    </Modal>
  );
};
