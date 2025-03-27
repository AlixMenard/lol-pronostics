import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TimeDisplay = styled(Typography)`
  color: var(--text-color);
  opacity: 0.8;
  font-size: 1.2rem;
  margin-right: 30px;
  min-width: 45px;
`;

interface MatchTimeProps {
  date: string;
}

export const MatchTime = ({ date }: MatchTimeProps) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return <TimeDisplay>{formatTime(date)}</TimeDisplay>;
};
