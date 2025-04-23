import { useMemo } from 'react';
import { List, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Competition, Match } from '../../types';
import { CompetitionItem } from './CompetitionItem';
import { Loader } from '../common/Loader';

const StyledList = styled(List)<{ isMobile?: boolean }>`
  background-color: var(--primary-color);
  border-right: 1px solid var(--secondary-color);
  height: ${props => props.isMobile ? 'auto' : 'calc(100vh - 160px)'};
  overflow-y: auto;
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

interface CompetitionListProps {
  competitions: Competition[];
  matches: Match[];
  selectedCompetition: number | null;
  onSelectCompetition: (id: number) => void;
  isMobile?: boolean;
}

export const CompetitionList = ({
  competitions,
  matches,
  selectedCompetition,
  onSelectCompetition,
  isMobile,
}: CompetitionListProps) => {
  const sortedCompetitions = useMemo(() => {
    return [...competitions].sort((a, b) => {
      const nextMatchA = matches
        .filter(m => m.competition_id === a.id && new Date(m.date) > new Date())
        .sort((m1, m2) => new Date(m1.date).getTime() - new Date(m2.date).getTime())[0];
      
      const nextMatchB = matches
        .filter(m => m.competition_id === b.id && new Date(m.date) > new Date())
        .sort((m1, m2) => new Date(m1.date).getTime() - new Date(m2.date).getTime())[0];

      if (!nextMatchA && !nextMatchB) return 0;
      if (!nextMatchA) return 1;
      if (!nextMatchB) return -1;

      return new Date(nextMatchA.date).getTime() - new Date(nextMatchB.date).getTime();
    });
  }, [competitions, matches]);

  return (
    <>
      <Typography variant="h6" sx={{ my: 2 }}>
        Compétitions
      </Typography>
      <StyledList isMobile={isMobile}>
        {sortedCompetitions.map((competition) => (
          <CompetitionItem
            key={competition.id}
            competition={competition}
            isSelected={selectedCompetition === competition.id}
            onClick={() => onSelectCompetition(competition.id)}
          />
        ))}
      </StyledList>
    </>
  );
};
