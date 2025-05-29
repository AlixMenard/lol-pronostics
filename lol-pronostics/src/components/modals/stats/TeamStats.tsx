import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TeamLogo } from '../../common/TeamLogo';
import { StatCard } from '../../common/StatCard';
import { StatSection } from '../../common/StatSection';
import { RecentMatch } from '../../common/RecentMatch';
import { TeamStats as TeamStatsType } from '../../../types/stats';

const TeamStatsPaper = styled(Box)`
  padding: 12px;
  background-color: #2a2a2a;
  border-radius: 12px;
  min-width: 500px;
`;

const formatStatValue = (wins: number, losses: number): string => {
  const total = wins + losses;
  if (total === 0) {
    return `${wins} V - ${losses} D`;
  }
  return `${wins} V - ${losses} D (${Math.round((wins / total) * 100)}%)`;
};

interface TeamStatsProps {
  teamCode: string;
  stats: TeamStatsType;
}

export const TeamStats = ({ teamCode, stats }: TeamStatsProps) => {
  return (
    <Box sx={{ flex: 1, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        {teamCode}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography>
          Win Rate: {Math.round(stats.last_year[0] / stats.last_year[1] * 100)}%
        </Typography>
        <Typography>
          BO1: {stats.bo1[0]}/{stats.bo1[1]}
        </Typography>
        <Typography>
          BO3: {stats.bo3.result[0]}/{stats.bo3.result[1]}
        </Typography>
        <Typography>
          BO5: {stats.bo5.result[0]}/{stats.bo5.result[1]}
        </Typography>
        <Typography>
          In League: {stats.in_league[0]}/{stats.in_league[1]}
        </Typography>
      </Box>
    </Box>
  );
}; 