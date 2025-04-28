import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { api } from '../services/api';
import { Prediction } from '../types';
import { Loader } from '../components/common/Loader';
import { TeamLogo } from '../components/common/TeamLogo';

const StyledPaper = styled(Paper)`
  background-color: var(--primary-color);
  color: var(--text-color);
  margin-top: 24px;
`;

const StyledTableCell = styled(TableCell)`
  color: var(--text-color);
  border-bottom: 1px solid var(--secondary-color);
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: rgba(255, 63, 9, 0.1);
  }
`;

const MatchCell = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: flex-start;
  min-width: 250px;
`;

const MatchTitle = styled(Typography)`
  width: 120px;
  text-align: center;
  flex-shrink: 0;
`;

const LogoContainer = styled('div')`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const UserPredictions = () => {
  const { username } = useParams();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!username) return;
      
      try {
        const userResponse = await api.getUser(username);
        if (userResponse.status === 200 && userResponse.data.id) {
          const predictionsResponse = await api.getBets(userResponse.data.id);
          setPredictions(predictionsResponse.data);
        }
      } catch (error) {
        // Error silently handled
      } finally {
        setLoading(false);
      }
    };
    fetchPredictions();
  }, [username]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4, color: 'var(--text-color)' }}>
        Prédictions de {username} 
        {username === 'Tom' ? ' (Il est trop beau et il a aussi fait ce site)' : ''}
        {username === 'Nokatir' ? " (Le mastermind de cette application)" : ''}
        {username === 'Valentin' ? "(Sachez qu'il s'est pas douché de la semaine)" : ''}
      </Typography>
      <TableContainer component={StyledPaper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Date du match</StyledTableCell>
              <StyledTableCell>Match</StyledTableCell>
              <StyledTableCell align="center">Pronostic</StyledTableCell>
              <StyledTableCell align="center">Score Final</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell colSpan={4}>Chargement...</StyledTableCell>
              </StyledTableRow>
            ) : (
              predictions.map((prediction) => (
                <StyledTableRow key={prediction.id}>
                  <StyledTableCell>{formatDate(prediction.date)}</StyledTableCell>
                  <StyledTableCell>
                    <MatchCell>
                      <LogoContainer>
                        <TeamLogo teamCode={prediction.team1} size="small" />
                      </LogoContainer>
                      <MatchTitle>{prediction.team1} vs {prediction.team2}</MatchTitle>
                      <LogoContainer>
                        <TeamLogo teamCode={prediction.team2} size="small" />
                      </LogoContainer>
                    </MatchCell>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {prediction.team1bet} - {prediction.team2bet}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {prediction.score1} - {prediction.score2}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserPredictions;
