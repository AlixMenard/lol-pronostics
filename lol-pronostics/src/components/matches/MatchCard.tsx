import { styled } from '@mui/material/styles';
import { useMatchTime } from '../../hooks/useMatchTime';
import { MatchContent } from './MatchInfo/MatchContent';
import { BetButton } from './MatchInfo/BetButton';
import { Match } from '../../types';
import { MouseEvent } from 'react';

interface MatchCardProps {
  match: Match;
  onBetClick: (match: Match) => void;
  onStatsClick: (matchId: number) => void;
  isMobile: boolean;
  isFirstMatch?: boolean;
}

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

export const MatchCard = ({ match, onBetClick, onStatsClick, isMobile, isFirstMatch = false }: MatchCardProps) => {
  const { getAdjustedMatchTime } = useMatchTime();
  const isMatchStarted = getAdjustedMatchTime(match.date, match.bo, isFirstMatch) <= new Date();
  const hasBet = !!match.userBet;
  const isTbd = match.team1 === "TBD" || match.team2 === "TBD";

  const handleClick = () => {
    if (!isTbd) {
      onStatsClick(match.id);
    }
  };

  const handleBetClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isMatchStarted) {
      onBetClick(match);
    }
  };

  return (
    <MatchBox 
      isMobile={isMobile} 
      onClick={handleClick}
      style={{ cursor: isTbd ? 'default' : 'pointer' }}
    >
      <MatchContent match={match} isMobile={isMobile} />
      <BetButton 
        isMatchStarted={isMatchStarted || isTbd}
        hasBet={hasBet}
        team1bet={match.userBet?.team1bet}
        team2bet={match.userBet?.team2bet}
        onClick={handleBetClick}
      />
    </MatchBox>
  );
};