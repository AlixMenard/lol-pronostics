import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)`
  padding: 12px;
  background-color: #2a2a2a;
  border-radius: 12px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
`;

const StatValue = styled(Typography)`
  color: #fff;
  font-weight: 500;
  font-size: 0.9rem;
  text-align: center;
`;

const StatLabel = styled(Typography)`
  color: #888;
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 4px;
`;

interface StatCardProps {
  label: string;
  value: string | number;
  onClick?: () => void;
}

export const StatCard = ({ label, value, onClick }: StatCardProps) => {
  return (
    <StyledPaper 
      onClick={onClick}
      sx={{ 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          backgroundColor: onClick ? 'rgba(255, 63, 9, 0.1)' : undefined
        }
      }}
    >
      <StatLabel variant="body2">
        {label}
      </StatLabel>
      <StatValue variant="body1">
        {value}
      </StatValue>
    </StyledPaper>
  );
}; 