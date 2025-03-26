import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Match } from '../../types';
import { MatchCard } from './MatchCard';

interface MatchListProps {
  matches: Match[];
  onMatchSelect: (match: Match, team1Logo: string | null, team2Logo: string | null) => void;
}

const ScrollableBox = styled(Box)`
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 0 16px;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: var(--primary-color);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--secondary-color);
    border-radius: 4px;
  }
`;

const GridLayout = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 24px;
  padding: 16px;
`;

type GroupedMatches = {
  [key: string]: Match[];
};

const groupMatchesByDate = (matches: Match[]): GroupedMatches => {
  return matches.reduce((groups: GroupedMatches, match) => {
    const date = new Date(match.date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(match);
    return groups;
  }, {});
};

const DateDivider = styled(Typography)`
  color: var(--text-color);
  padding: 16px;
  margin-top: 16px;
  font-weight: bold;
  text-transform: capitalize;
  border-bottom: 1px solid var(--secondary-color);
`;

export const MatchList = ({ matches, onMatchSelect }: MatchListProps) => {
  const groupedMatches = groupMatchesByDate(matches);

  return (
    <>
      <Typography variant="h6" sx={{ my: 2, px: 2 }}>
        Matches
      </Typography>
      <ScrollableBox>
        {Object.entries(groupedMatches).map(([date, dateMatches]) => (
          <Box key={date}>
            <DateDivider variant="h6">{date}</DateDivider>
            <GridLayout>
              {dateMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onBetClick={(team1Logo, team2Logo) => onMatchSelect(match, team1Logo, team2Logo)}
                />
              ))}
            </GridLayout>
          </Box>
        ))}
      </ScrollableBox>
    </>
  );
};
