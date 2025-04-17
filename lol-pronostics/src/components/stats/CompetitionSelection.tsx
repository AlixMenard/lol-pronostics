import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Competition } from '../../types';
import { CompetitionLogo } from '../common/CompetitionLogo';

const StyledFormControl = styled(FormControl)`
  margin-bottom: 24px;
  min-width: 200px;
`;

const MenuItemContent = styled('div')`
  display: flex;
  align-items: center;
  gap: 12px;
  
  img {
    width: 46px !important;
    height: 32px !important;
    padding: 0;
  }
`;

interface CompetitionSelectionProps {
  competitions: Competition[];
  selectedCompetition: number | null;
  onSelectCompetition: (id: number) => void;
}

export const CompetitionSelection = ({
  competitions,
  selectedCompetition,
  onSelectCompetition
}: CompetitionSelectionProps) => {
  return (
    <StyledFormControl>
      <InputLabel>Compétition</InputLabel>
      <Select
        value={selectedCompetition || ''}
        label="Compétition"
        onChange={(e) => onSelectCompetition(e.target.value as number)}
      >
        {competitions.map((comp) => (
          <MenuItem key={comp.id} value={comp.id}>
            <MenuItemContent>
              <CompetitionLogo name={comp.name}  />
              {comp.name}
            </MenuItemContent>
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};