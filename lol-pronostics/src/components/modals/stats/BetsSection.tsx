import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TeamLogo } from '../../common/TeamLogo';

const BetsContainer = styled(Box)`
  margin-left: 16px;
  padding: 12px;
  background-color: #2a2a2a;
  border-radius: 12px;
  min-width: 200px;
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

const BetItem = styled(Box)`
  padding: 8px;
  margin-bottom: 8px;
  background-color: rgba(255,255,255,0.03);
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 63, 9, 0.1);
  }
`;

interface BetsSectionProps {
  bets: any[];
  stats: any;
}

export const BetsSection = ({ bets, stats }: BetsSectionProps) => (
  <BetsContainer>
    <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
      Paris des modos
    </Typography>
    {bets.map((bet, index) => (
      <BetItem key={bet.id}>
        <Typography variant="body2" sx={{ color: '#888', fontSize: '0.75rem' }}>
          {bet.name}
        </Typography>
        <Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>
          {bet.team1bet} - {bet.team2bet}
        </Typography>
      </BetItem>
    ))}
  </BetsContainer>
); 