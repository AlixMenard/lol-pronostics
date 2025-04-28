import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Match} from '../../../types';
import { BoNumber } from '../../common/BoNumber';
import { TeamLogo } from '../../common/TeamLogo';
import { MatchTime } from '../MatchInfo/MatchTime';

const LogoContainer = styled('div')`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const MatchInfo = styled('div')`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
  width: 100%;
`;

const MatchTitleContainer = styled('div')<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${props => props.isMobile ? '70px' : '100px'};
  flex-shrink: 0;
`;

const MatchScore = styled(Typography)`
  color: var(--secondary-color);
  font-size: 1.2rem;
  opacity: 0.9;
  text-align: center;
  margin-top: 2px;
`;

const MatchTitle = styled(Typography)`
  text-align: center;
  flex-shrink: 0;
  font-size: 0.9rem;
`;


export interface MatchCardProps {
    match: Match;
    onBetClick: (match: Match) => void;
    isMobile: boolean;
    isFirstMatch?: boolean;
  }
  
export interface MatchContentProps {
    match: Match;
    isMobile: boolean;
  }
  
export const MatchContent = ({ match, isMobile }: MatchContentProps) => {
    const hasScore = match.score1 !== undefined && 
                    match.score2 !== undefined && 
                    (match.score1 > 0 || match.score2 > 0);
  
    return (
      <MatchInfo>
        <MatchTime date={match.date} />
        <LogoContainer>
          <TeamLogo teamCode={match.team1} />
        </LogoContainer>
        <MatchTitleContainer isMobile={isMobile}>
          <MatchTitle>{match.team1} vs {match.team2}</MatchTitle>
          {hasScore && <MatchScore>{match.score1} - {match.score2}</MatchScore>}
        </MatchTitleContainer>
        <LogoContainer>
          <TeamLogo teamCode={match.team2} />
        </LogoContainer>
        <BoNumber bo={match.bo} />
      </MatchInfo>
    );
  };