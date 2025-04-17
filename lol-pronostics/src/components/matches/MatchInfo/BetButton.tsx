import { styled } from '@mui/material/styles';
import { StyledButton } from '../../styled/StyledButton';

const Button = styled(StyledButton)<{ hasbet: 'true' | 'false'; disabled: boolean }>`
  min-width: 120px;
  text-transform: none;
  position: relative;
  height: 36px;

  background-color: ${props => {
    if (props.disabled) return '#666666';
    if (props.hasbet === 'true') return '#28a745';
    return 'var(--secondary-color)';
  }};

  .default-text,
  .hover-text {
    position: absolute;
    transition: opacity 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .hover-text {
    opacity: 0;
  }

  &:hover {
    background-color: ${props => {
      if (props.disabled) return '#666666';
      if (props.hasbet === 'true') return '#218838';
      return 'var(--primary-color)';
    }};

    .default-text {
      opacity: 0;
    }
    .hover-text {
      opacity: 1;
    }
  }
`;

interface BetButtonProps {
  isMatchStarted: boolean;
  hasBet: boolean;
  team1bet?: number;
  team2bet?: number;
  onClick: () => void;
}

export const BetButton = ({ isMatchStarted, hasBet, team1bet, team2bet, onClick }: BetButtonProps) => {
  const getContent = () => {
    if (isMatchStarted && team1bet) return `${team1bet} - ${team2bet}`;
    if (hasBet) {
      return (
        <>
          <span className="default-text">{`${team1bet} - ${team2bet}`}</span>
          <span className="hover-text">Changer prono ?</span>
        </>
      );
    }
    return "Pronostiquer";
  };

  return (
    <Button
      variant="contained"
      onClick={onClick}
      size="small"
      disabled={isMatchStarted}
      hasbet={hasBet ? 'true' : 'false'}
    >
      {getContent()}
    </Button>
  );
};
