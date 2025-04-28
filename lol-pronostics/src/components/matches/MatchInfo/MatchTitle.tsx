import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TitleContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  flex-shrink: 0;
`;

const Title = styled(Typography)<{ isMobile: boolean }>`
  width: ${props => props.isMobile ? '80px' : '120px'};
  text-align: center;
  flex-shrink: 0;
  margin: 0;
  font-size: ${props => props.isMobile ? '0.9rem' : '1rem'};
`;

interface MatchTitleProps {
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
  hasScore: boolean;
  isMobile: boolean;
}

export const MatchTitle = ({ team1, team2, score1, score2, hasScore, isMobile }: MatchTitleProps) => (
  <TitleContainer>
    <Title isMobile={isMobile}>{team1} vs {team2}</Title>
  </TitleContainer>
);
