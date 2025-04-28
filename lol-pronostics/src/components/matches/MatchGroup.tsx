import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Match } from '../../types';
import { MatchCard } from './MatchCard';

const GridLayout = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 24px;
  padding: 16px;
`;

const DateDivider = styled(Typography)`
  color: var(--text-color);
  padding: 16px;
  margin-top: 16px;
  font-weight: bold;
  text-transform: capitalize;
  border-bottom: 1px solid var(--secondary-color);
`;

interface MatchGroupProps {
  date: string;
  matches: Match[];
  onMatchSelect: (match: Match) => void;
  onStatsClick: (matchId: number) => void;
  isMobile: boolean;
}

export const MatchGroup = ({ date, matches, onMatchSelect, onStatsClick, isMobile }: MatchGroupProps) => (
  <Box>
    <DateDivider variant="h6">{date}</DateDivider>
    <GridLayout>
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          onBetClick={() => onMatchSelect(match)}
          onStatsClick={onStatsClick}
          isMobile={isMobile}
        />
      ))}
    </GridLayout>
  </Box>
);
