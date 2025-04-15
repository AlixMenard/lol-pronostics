import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Match} from '../../../types';
import { BoNumber } from '../../common/BoNumber';
import { TeamLogo } from '../../common/TeamLogo';
import { MatchTime } from '../MatchInfo/MatchTime';


const LogoContainer = styled('div')`
  width: 40px; // Réduit de 48px à 40px
  height: 40px; // Réduit de 48px à 40px
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
  width: ${props => props.isMobile ? '80px' : '120px'};
  flex-shrink: 0;
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