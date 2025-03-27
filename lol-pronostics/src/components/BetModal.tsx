import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TeamCode, Match } from '../types';
import logosData from '../assets/logos.json';
import { BoNumber } from './common/BoNumber';
import { TeamLogo } from './common/TeamLogo';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    background-color: var(--primary-color);
    color: var(--text-color);
    border: 1px solid var(--secondary-color); 
  }
`;

const StyledButton = styled(Button)`
  background-color: var(--secondary-color);
  color: var(--text-color);
  &:hover {
    background-color: var(--primary-color);
  }
`;

const TeamContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const TitleContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface BetModalProps {
  open: boolean;
  onClose: () => void;
  match: Match;
  onSubmit: (score1: number, score2: number) => void;
}

const BetModal = ({ open, onClose, match, onSubmit }: BetModalProps) => {
  const [score1, setScore1] = useState<string>('');
  const [score2, setScore2] = useState<string>('');

  const handleScoreChange = (setValue: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    var maxValue = match.bo/2+0.5
    console.log(maxValue)
    if (isNaN(value) || value < 0) {
      setValue('0');
    } else if (value > maxValue) {
      setValue(maxValue.toString());
    } else {
      setValue(e.target.value);
    }
  };

  const handleSubmit = () => {
    const score1Num = parseInt(score1);
    const score2Num = parseInt(score2);
    
    if (!isNaN(score1Num) && !isNaN(score2Num)) {
      onSubmit(score1Num, score2Num);
      setScore1('');
      setScore2('');
      onClose();
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>
        <TitleContainer>
          Pronostiquer le match
          <BoNumber bo={match.bo} />
        </TitleContainer>
      </DialogTitle>
      <DialogContent>
        <TeamContainer>
          <TeamLogo teamCode={match.team1} />
          <TextField
            label={match.team1}
            type="number"
            value={score1}
            onChange={handleScoreChange(setScore1)}
            inputProps={{ min: 0, max: match.bo/2+0.5 }}
            fullWidth
          />
        </TeamContainer>
        <TeamContainer>
          <TeamLogo teamCode={match.team2} />
          <TextField
            label={match.team2}
            type="number"
            value={score2}
            onChange={handleScoreChange(setScore2)}
            inputProps={{ min: 0, max: match.bo }}
            fullWidth
          />
        </TeamContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Annuler</Button>
        <StyledButton onClick={handleSubmit} variant="contained">
          Valider
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default BetModal;
