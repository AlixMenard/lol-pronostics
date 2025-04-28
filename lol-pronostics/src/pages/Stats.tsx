import { useState, useEffect } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Collapse, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { api } from '../services/api';
import { Loader } from '../components/common/Loader';
import { CompetitionSelection } from '../components/stats/CompetitionSelection';
import { Competition } from '../types';

const StyledTableContainer = styled(TableContainer)`
  background-color: var(--primary-color);
  color: var(--text-color);
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

const StyledPaper = styled(Paper)`
  background-color: var(--primary-color);
  color: var(--text-color);
`;

const PseudoLink = styled(Link)`
  color: var(--secondary-color);
  
  &:hover {
    text-decoration: underline;
  }
`;

interface RankingData {
  name: string;
  num_bets: number;
  score: number;
  rating: number;
  accuracy: number;
}

interface UserStatsRow {
  name: string;
  total_bets: number;
  total_score: number;
  details: Record<string, { num_bets: number; score: number }>;
}

const DetailRow = styled(TableRow)`
  background-color: rgba(255, 63, 9, 0.05);
`;

const Row = ({ user, competitions }: { user: UserStatsRow; competitions: Competition[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledTableRow>
        <StyledTableCell>
          <IconButton size="small" onClick={() => setOpen(!open)} sx={{ color: 'var(--text-color)' }}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell>
          <Link 
            to={`/predictions/${user.name}`}
            style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}
          >
            {user.name}
          </Link>
        </StyledTableCell>
        <StyledTableCell align="center">{user.total_bets}</StyledTableCell>
        <StyledTableCell align="center">{user.total_score}</StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <StyledTableCell style={{ padding: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableBody>
                  {competitions.map((comp) => (
                    <DetailRow key={comp.id}>
                      <StyledTableCell sx={{ pl: 4 }}>{comp.name}</StyledTableCell>
                      <StyledTableCell align="center">
                        {user.details[comp.name]?.num_bets || 0}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.details[comp.name]?.score || 0}
                      </StyledTableCell>
                    </DetailRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </>
  );
};

const Stats = () => {
  const [stats, setStats] = useState<RankingData[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await api.getCompetitions();
        setCompetitions(response.data);
        if (response.data.length > 0) {
          setSelectedCompetition(response.data[0].id);
        }
      } catch {
        // Error silently handled
      }
    };
    fetchCompetitions();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      if (!selectedCompetition) return;
      try {
        const response = await api.getRanking(selectedCompetition);
        setStats(response.data);
      } catch {
        // Error silently handled
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [selectedCompetition]);

  if (loading) return <Loader />;

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4, color: 'var(--text-color)' }}>
        Ranking
      </Typography>
      <CompetitionSelection
        competitions={competitions}
        selectedCompetition={selectedCompetition}
        onSelectCompetition={setSelectedCompetition}
      />
      <TableContainer component={StyledPaper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Position</StyledTableCell>
              <StyledTableCell>Utilisateur</StyledTableCell>
              <StyledTableCell align="center">Nombre de paris</StyledTableCell>
              <StyledTableCell align="center">Score</StyledTableCell>
              <StyledTableCell align="center">Précision globale</StyledTableCell>
              <StyledTableCell align="center">Précision paris placés</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {stats.map((stat, index) => {
              const firstIndexWithSameScore = stats.findIndex(s => s.score === stat.score);
              const position = firstIndexWithSameScore + 1;

              return (
                <StyledTableRow key={stat.name}>
                  <StyledTableCell>{position}</StyledTableCell>
                  <StyledTableCell>
                    <PseudoLink 
                      to={`/predictions/${stat.name}`}
                      style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}
                    >
                      {stat.name}
                    </PseudoLink>
                  </StyledTableCell>
                  <StyledTableCell align="center">{stat.num_bets}</StyledTableCell>
                  <StyledTableCell align="center">{stat.score}</StyledTableCell>
                  <StyledTableCell align="center">{(stat.rating * 100).toFixed(0)}%</StyledTableCell>
                  <StyledTableCell align="center">{(stat.accuracy * 100).toFixed(0)}%</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Stats;
