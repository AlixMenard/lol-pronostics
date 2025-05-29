import { Box, Typography, Grid, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TeamLogo } from '../../common/TeamLogo';
import { StatItem } from './StatItem';

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

interface TeamStats {
  last_year: [number, number];
  bo1: [number, number];
  in_league: [number, number];
  bo3: {
    result: [number, number];
    score: [number, number];
  };
  bo5: {
    result: [number, number];
    score: [number, number];
  };
  last_5: Array<{
    tournament: string;
    team1: string;
    team2: string;
    score1: number;
    score2: number;
    bo: number;
  }>;
}

interface TeamStatsCardProps {
  teamCode: string;
  stats: TeamStats;
}

const formatStatValue = (wins: number, losses: number): string => {
  const total = wins + losses;
  if (total === 0) {
    return `${wins} V - ${losses} D`;
  }
  return `${wins} V - ${losses} D (${Math.round((wins / total) * 100)}%)`;
};

export const TeamStatsCard = ({ teamCode, stats }: TeamStatsCardProps) => (
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
          {stats.last_5.map((match, index) => (
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
