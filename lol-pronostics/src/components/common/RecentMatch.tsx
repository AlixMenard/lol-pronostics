import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const MatchContainer = styled(Box)`
  padding: 8px;
  border-radius: 8px;
  background-color: rgba(255,255,255,0.05);
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255,255,255,0.08);
  }
`;

const TournamentName = styled(Typography)`
  color: #aaa;
  font-size: 0.75rem;
`;

const MatchScore = styled(Typography)`
  color: #fff;
  font-size: 0.85rem;
`;

const MatchFormat = styled('span')`
  color: #888;
  font-size: 0.75rem;
  margin-left: 8px;
`;

interface RecentMatchProps {
  tournament: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  bo: number;
  onClick?: () => void;
}

export const RecentMatch = ({ 
  tournament, 
  team1, 
  team2, 
  score1, 
  score2, 
  bo,
  onClick 
}: RecentMatchProps) => {
  return (
    <MatchContainer 
      onClick={onClick}
      sx={{ 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          backgroundColor: onClick ? 'rgba(255, 63, 9, 0.1)' : undefined
        }
      }}
    >
      <TournamentName variant="body2">
        {tournament}
      </TournamentName>
      <MatchScore>
        {team1} {score1} - {score2} {team2}
        <MatchFormat>
          (BO{bo})
        </MatchFormat>
      </MatchScore>
    </MatchContainer>
  );
}; 