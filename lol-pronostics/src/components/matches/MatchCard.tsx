import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Match, TeamCode } from '../../types';
import { StyledButton } from '../styled/StyledButton';
import logosData from '../../assets/logos.json';
import { BoNumber } from '../common/BoNumber';
import { TeamLogo } from '../common/TeamLogo';
import { MatchTime } from './MatchInfo/MatchTime';
import { BetButton } from './MatchInfo/BetButton';

const MatchBox = styled(Box)<{ isMobile: boolean }>`
  padding: ${props => props.isMobile ? '12px' : '16px'};
  margin-bottom: 8px;
  background-color:rgb(46, 46, 46);
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

const TeamInfo = styled('div')`
  display: flex;
  align-items: center;
  flex: 1;
`;

const MatchInfo = styled('div')`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
  width: 100%;
`;

const LogoContainer = styled('div')`
  width: 40px; // Réduit de 48px à 40px
  height: 40px; // Réduit de 48px à 40px
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const BetDisplay = styled('div')`
  padding: 6px 16px;
  background-color: var(--secondary-color);
  border-radius: 4px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  font-size: 0.875rem;
`;

const MatchScore = styled(Typography)`
  color: var(--text-color);
  font-size: 0.9rem;
  opacity: 0.9;
  text-align: center;
  margin-top: 4px;
`;

const MatchTitle = styled(Typography)`
  text-align: center;
  flex-shrink: 0;
`;

const MatchTitleContainer = styled('div')<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${props => props.isMobile ? '80px' : '120px'};
  flex-shrink: 0;
`;

interface MatchCardProps {
  match: Match;
  onBetClick: (match: Match) => void;
  isMobile: boolean;
}

type LogosType = Record<TeamCode, string>;
const teamLogos = logosData as LogosType;

export const MatchCard = ({ match, onBetClick, isMobile }: MatchCardProps) => {
  const getAdjustedMatchTime = (dateString: string) => {
    const matchDate = new Date(dateString);
    matchDate.setHours(matchDate.getHours() + 1);
    return matchDate;
  };

  const isMatchStarted = getAdjustedMatchTime(match.date) <= new Date();
  const hasBet = !!match.userBet;
  const hasScore = match.score1 !== undefined && 
                  match.score2 !== undefined && 
                  (match.score1 > 0 || match.score2 > 0);

  return (
    <MatchBox isMobile={isMobile}>
      <MatchInfo>
        <MatchTime date={match.date} />
        <LogoContainer>
          <TeamLogo teamCode={match.team1} />
        </LogoContainer>
        <MatchTitleContainer isMobile={isMobile}>
          <MatchTitle>{match.team1} vs {match.team2}</MatchTitle>
          {hasScore && match.score1 !== undefined && match.score2 !== undefined && (
            <MatchScore>{match.score1} - {match.score2}</MatchScore>
          )}
        </MatchTitleContainer>
        <LogoContainer>
          <TeamLogo teamCode={match.team2} />
        </LogoContainer>
        <BoNumber bo={match.bo} />
      </MatchInfo>
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
