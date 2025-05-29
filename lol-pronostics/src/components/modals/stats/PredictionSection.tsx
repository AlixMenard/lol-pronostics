import { Box, Typography, Paper, Divider, Avatar, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PredictionData } from '../../../types/prediction';
import { Bet } from '../../../types/bet';
import { MatchStats } from '../../../types/match';
import { CompareArrows, Person } from '@mui/icons-material';

const StyledPaper = styled(Paper)`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

const PredictionBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
`;

const ScoreBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 63, 9, 0.1);
  border-radius: 8px;
  padding: 12px 24px;
`;

const Score = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
`;

const ConfidenceIndicator = styled(Box)<{ confidence: number }>`
  width: 100%;
  height: 4px;
  background: linear-gradient(
    to right,
    rgba(255, 63, 9, 0.8) 0%,
    rgba(255, 63, 9, 0.8) ${props => props.confidence}%,
    rgba(255, 255, 255, 0.1) ${props => props.confidence}%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 2px;
  margin-top: 8px;
`;

const BetGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 16px;
`;

const BetCard = styled(Box)`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

const ModeratorAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
  background-color: rgba(255, 63, 9, 0.8);
  font-size: 0.9rem;
`;

const ModeratorName = styled(Typography)`
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;

interface PredictionSectionProps {
  prediction: PredictionData | null;
  bets: Bet[];
  stats?: MatchStats;
}

const getModerator = (name?: string): string => {
  if (!name) return 'Modérateur';
  
  switch (name.toLowerCase()) {
    case 'tom':
      return 'Tom (Développeur)';
    case 'nokatir':
      return 'Nokatir (Mastermind)';
    case 'valentin':
      return 'Valentin (En recherche de douche)';
    default:
      return name;
  }
};

export const PredictionSection = ({ prediction, bets, stats }: PredictionSectionProps) => {
  if (!prediction && bets.length === 0) {
    return null;
  }

  const averageBet = bets.length > 0 ? {
    team1: Math.round(bets.reduce((sum, bet) => sum + bet.team1bet, 0) / bets.length),
    team2: Math.round(bets.reduce((sum, bet) => sum + bet.team2bet, 0) / bets.length)
  } : null;

  return (
    <Box>
      {prediction && (
        <StyledPaper elevation={0}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CompareArrows sx={{ color: 'rgba(255, 63, 9, 0.8)' }} />
              Prédiction IA
            </Box>
          </Typography>
          <PredictionBox>
            <ScoreBox>
              <Score>
                {prediction.score[0]} - {prediction.score[1]}
              </Score>
            </ScoreBox>
          </PredictionBox>
          <Box sx={{ px: 2 }}>
            <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', mb: 1 }}>
              {Math.round(prediction.ratio * 100)}% de confiance
            </Typography>
            <ConfidenceIndicator confidence={Math.round(prediction.ratio * 100)} />
          </Box>
        </StyledPaper>
      )}

      {bets.length > 0 && (
        <StyledPaper elevation={0}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff' }}>
              Paris des modérateurs ({bets.length})
            </Typography>
            {averageBet && (
              <Tooltip title="Moyenne des paris" arrow placement="top">
                <Box sx={{ 
                  textAlign: 'right', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '4px 12px',
                  borderRadius: '4px'
                }}>
                  <Typography sx={{ color: '#fff', fontWeight: 500 }}>
                    {averageBet.team1} - {averageBet.team2}
                  </Typography>
                </Box>
              </Tooltip>
            )}
          </Box>
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />
          <BetGrid>
            {bets.map((bet) => (              <BetCard key={bet.id}>
                <ModeratorAvatar>
                  {bet.name ? <>{bet.name.substring(0, 2).toUpperCase()}</> : <Person />}
                </ModeratorAvatar>
                <Box>
                  <ModeratorName>
                    {getModerator(bet.name)}
                  </ModeratorName>
                  <Typography sx={{ color: '#888', fontSize: '0.9rem' }}>
                    {bet.team1bet} - {bet.team2bet}
                  </Typography>
                </Box>
              </BetCard>
            ))}
          </BetGrid>
        </StyledPaper>
      )}
    </Box>
  );
};