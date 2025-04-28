import { ListItem, ListItemText, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Competition } from '../../types';
import { CompetitionLogo } from '../common/CompetitionLogo';

const StyledListItem = styled(ListItemButton)`
  &.Mui-selected {
    background-color: var(--secondary-color);
    &:hover {
      background-color: var(--secondary-color);
    }
  }
  &:hover {
    background-color: rgba(255, 63, 9, 0.1);
  }
  padding: 0;
  height: 60px;
`;

interface CompetitionItemProps {
  competition: Competition;
  isSelected: boolean;
  onClick: () => void;
}

export const CompetitionItem = ({ competition, isSelected, onClick }: CompetitionItemProps) => {
  return (
    <ListItem disablePadding>
      <StyledListItem selected={isSelected} onClick={onClick}>
        <CompetitionLogo name={competition.name} />
        <ListItemText 
          primary={competition.name}
          primaryTypographyProps={{ style: { fontSize: '1.1rem' } }}
        />
      </StyledListItem>
    </ListItem>
  );
};
