import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, styled } from '@mui/material';
import { useMatchStats } from '../hooks/useMatchStats';

const StatsContainer = styled(Box)`
  padding: 24px;
  background-color: rgb(46, 46, 46);
  border-radius: 8px;
  margin: 16px 0;
`;

const StatCard = styled(Box)`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 63, 9, 0.1);
    transform: translateX(4px);
  }
`;

const StatLabel = styled(Typography)`
  color: var(--text-color);
  font-weight: bold;
  text-transform: capitalize;
`;

const StatValue = styled(Typography)`
  color: var(--primary-color);
  font-weight: bold;
`;

const formatStatKey = (key: string) => {
  return key
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, l => l.toUpperCase());
};

const formatStatValue = (value: any) => {
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  if (typeof value === 'number') return value.toLocaleString();
  return value;
};

export const MatchStats = () => {
  const { matchId } = useParams();
  const { data: stats, isLoading } = useMatchStats(Number(matchId));

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography 
        variant="h4" 
        sx={{ 
          color: 'var(--text-color)',
          borderBottom: '2px solid var(--primary-color)',
          paddingBottom: '8px',
          marginBottom: '24px'
        }}
      >
        Statistiques du Match
      </Typography>
      
      <StatsContainer>
        {stats && Object.entries(stats).map(([key, value]) => (
          <StatCard key={key}>
            <StatLabel variant="h6">
              {formatStatKey(key)}
            </StatLabel>
            <StatValue variant="h6">
              {formatStatValue(value)}
            </StatValue>
          </StatCard>
        ))}
      </StatsContainer>
    </Box>
  );
};

export default MatchStats;