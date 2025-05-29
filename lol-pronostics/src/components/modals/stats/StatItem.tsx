import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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

interface StatItemProps {
  label: string;
  value: string;
}

export const StatItem = ({ label, value }: StatItemProps) => (
  <StatItemContainer>
    <StatLabel variant="body2">
      {label}
    </StatLabel>
    <StatValue variant="body1">
      {value}
    </StatValue>
  </StatItemContainer>
); 