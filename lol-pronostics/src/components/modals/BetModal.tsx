import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Match } from '../../types';
import { BoNumber } from '../common/BoNumber';
import { TeamLogo } from '../common/TeamLogo';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    background-color: var(--primary-color);
    color: var (--text-color);
    border: 1px solid var(--secondary-color);
    animation: slideIn 0.3s ease-out;
    width: 400px;
    max-width: 90vw;
  }

  .MuiDialogContent-root {
    overflow: hidden;
  }

  @keyframes slideIn {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;


const TitleContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TeamSelectionContainer = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 8px 0;
`;

const TeamButton = styled(Button)<{ selected?: boolean }>`
  padding: 16px;
  border-radius: 8px;
  transition: all 0.2s;
  background-color: ${props => props.selected ? 'rgba(255, 63, 9, 0.2)' : 'transparent'};
  border: 2px solid ${props => props.selected ? 'rgba(255, 63, 9, 0.7)' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 63, 9, 0.1);
  }
`;

const ScoreButton = styled(Button)`
  margin: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  
  &:hover {
    background-color: rgba(255, 63, 9, 0.2);
  }
`;

const ScoreOptionsContainer = styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 12px;
  animation: expandHeight 0.3s ease-out;
  overflow: hidden;

  @keyframes expandHeight {
    0% {
      max-height: 0;
      opacity: 0;
    }
    100% {
      max-height: 120px;
      opacity: 1;
    }
  }
`;

interface DialogContentStyledProps {
  hasselection?: boolean;
}

const DialogContentStyled = styled(DialogContent)<DialogContentStyledProps>`
  transition: min-height 0.3s ease-out;
  min-height: ${props => props.hasselection ? '180px' : '100px'}; 
  padding: 16px 16px 8px 16px; 
  display: flex;
  flex-direction: column;
`;

const StyledDialogActions = styled(DialogActions)`
  padding: 8px; 
  min-height: 42px; 
`;

export interface BetModalProps {
  open: boolean;
  onClose: () => void;
  match: Match;
  onSubmit: (score1: number, score2: number) => void;
}

export const BetModal = ({ open, onClose, match, onSubmit }: BetModalProps) => {
  const [selectedTeam, setSelectedTeam] = useState<1 | 2 | null>(null);

  const getScoreOptions = (bo: number) => {
    const maxWins = Math.floor((bo - 1) / 2) + 1; 
    const options = [];
    
    for (let loserScore = 0; loserScore < maxWins; loserScore++) {
      options.push({ 
        winner: maxWins,
        loser: loserScore 
      });
    }
    
    return options;
  };

  const handleTeamSelect = (team: 1 | 2) => {
    setSelectedTeam(team);
  };

  const handleScoreSelect = (winnerScore: number, loserScore: number) => {
    if (!selectedTeam) return;

    const score1 = selectedTeam === 1 ? winnerScore : loserScore;
    const score2 = selectedTeam === 1 ? loserScore : winnerScore;
    
    onSubmit(score1, score2);
    setSelectedTeam(null);
    onClose();
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      closeAfterTransition
      TransitionProps={{ timeout: 300 }}
    >
      <DialogTitle>
        <TitleContainer>
          Choisir le vainqueur
          <BoNumber bo={match.bo} />
        </TitleContainer>
      </DialogTitle>
      
      <DialogContentStyled hasselection={!!selectedTeam}>
        <TeamSelectionContainer>
          <TeamButton
            onClick={() => handleTeamSelect(1)}
            selected={selectedTeam === 1}
          >
            <TeamLogo teamCode={match.team1} />
          </TeamButton>
          <TeamButton
            onClick={() => handleTeamSelect(2)}
            selected={selectedTeam === 2}
          >
            <TeamLogo teamCode={match.team2} />
          </TeamButton>
        </TeamSelectionContainer>

        {selectedTeam && (
          <ScoreOptionsContainer>
            {getScoreOptions(match.bo).map(({winner, loser}) => (
              <ScoreButton
                key={`${winner}-${loser}`}
                onClick={() => handleScoreSelect(winner, loser)}
                variant="contained"
              >
                {winner} - {loser}
              </ScoreButton>
            ))}
          </ScoreOptionsContainer>
        )}
      </DialogContentStyled>

      <StyledDialogActions>
        <Button onClick={onClose} color="inherit">Annuler</Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default BetModal;
