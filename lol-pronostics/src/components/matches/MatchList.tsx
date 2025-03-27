import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Match } from '../../types';
import { MatchCard } from './MatchCard';

interface MatchListProps {
  matches: Match[];
  onMatchSelect: (match: Match) => void;
  isMobile: boolean;
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

const GridLayout = styled('div')<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.isMobile ? '1fr' : 'repeat(auto-fill, minmax(450px, 1fr))'};
  gap: ${props => props.isMobile ? '12px' : '24px'};
  padding: ${props => props.isMobile ? '8px' : '16px'};
`;

type GroupedMatches = {
  [key: string]: Match[];
};

const groupMatchesByDate = (matches: Match[]): GroupedMatches => {
  const sorted = matches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return sorted.reduce((groups: GroupedMatches, match) => {
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

const filterDuplicateTBDMatches = (matches: Match[]): Match[] => {
  return matches.filter(match => {
    if (match.team1 !== 'TBD' && match.team2 !== 'TBD') {
      return true;
    }

    const sameTimeMatches = matches.filter(m => {
      const matchTime = new Date(match.date).getTime();
      const mTime = new Date(m.date).getTime();
      return matchTime === mTime && m !== match;
    });

    return !sameTimeMatches.some(m => {
      const currentTeam = match.team1 !== 'TBD' ? match.team1 : match.team2;
      return m.team1 === currentTeam || m.team2 === currentTeam;
    });
  });
};

const nokaVeutPasAfficherTropDeMatchs = (matches: Match[]): Match[] => {
  const sortedMatches = [...matches].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const now = new Date();
  const firstUpcomingMatch = sortedMatches.find(match => new Date(match.date) > now);
  
  if (!firstUpcomingMatch) return matches;

  const firstMatchDate = new Date(firstUpcomingMatch.date);
  const cutoffDate = new Date(firstMatchDate);
  cutoffDate.setDate(cutoffDate.getDate() + 6);

  return sortedMatches.filter(match => {
    const matchDate = new Date(match.date);
    return matchDate >= firstMatchDate && matchDate <= cutoffDate;
  });
};

const DateDivider = styled(Typography)`
  color: var(--text-color);
  padding: 16px;
  margin-top: 16px;
  font-weight: bold;
  text-transform: capitalize;
  border-bottom: 1px solid var(--secondary-color);
`;

export const MatchList = ({ matches, onMatchSelect, isMobile }: MatchListProps) => {
  const timeFilteredMatches = nokaVeutPasAfficherTropDeMatchs(matches);
  const filteredMatches = filterDuplicateTBDMatches(timeFilteredMatches);
  const groupedMatches = groupMatchesByDate(filteredMatches);

  return (
    <>
      <Typography variant="h6" sx={{ my: 2, px: 2 }}>
        Matches
      </Typography>
      <ScrollableBox>
        {Object.entries(groupedMatches).map(([date, dateMatches]) => (
          <Box key={date}>
            <DateDivider variant="h6">{date}</DateDivider>
            <GridLayout isMobile={isMobile}>
              {dateMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onBetClick={() => onMatchSelect(match)}
                  isMobile={isMobile}
                />
              ))}
            </GridLayout>
          </Box>
        ))}
      </ScrollableBox>
    </>
  );
};
