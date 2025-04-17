import { styled } from '@mui/material/styles';
import { useMatchTime } from '../../hooks/useMatchTime';
import { MatchContent, MatchCardProps } from './MatchInfo/MatchContent';
import { BetButton } from './MatchInfo/BetButton';

const MatchBox = styled('div')<{ isMobile: boolean }>`
  padding: ${props => props.isMobile ? '12px' : '16px'};
  margin-bottom: 8px;
  background-color: rgb(46, 46, 46);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: ${props => props.isMobile ? '80px' : '100px'};
  box-sizing: border-box;
  &:hover {
    background-color: rgba(255, 63, 9, 0.1);
  }
`;

export const MatchCard = ({ match, onBetClick, isMobile, isFirstMatch = false }: MatchCardProps) => {
  const { getAdjustedMatchTime } = useMatchTime();
  const isMatchStarted = getAdjustedMatchTime(match.date, match.bo, isFirstMatch) <= new Date();
  const hasBet = !!match.userBet;

  return (
    <MatchBox isMobile={isMobile}>
      <MatchContent match={match} isMobile={isMobile} />
      <BetButton 
        isMatchStarted={isMatchStarted}
        hasBet={hasBet}
        team1bet={match.userBet?.team1bet}
        team2bet={match.userBet?.team2bet}
        onClick={() => !isMatchStarted && onBetClick(match)}
      />
    </MatchBox>
  );
};