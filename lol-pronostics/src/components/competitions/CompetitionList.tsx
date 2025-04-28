import { useMemo } from 'react';
import { List, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Competition, Match } from '../../types';
import { CompetitionItem } from './CompetitionItem';

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
    const now = new Date().getTime();
    return [...competitions].sort((a, b) => {
      const startA = new Date(a.start).getTime();
      const startB = new Date(b.start).getTime();
      
      const isRunningA = startA <= now;
      const isRunningB = startB <= now;
      
      if (isRunningA && !isRunningB) return -1;
      if (!isRunningA && isRunningB) return 1;
      
      return startA - startB;
    });
  }, [competitions]);

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
