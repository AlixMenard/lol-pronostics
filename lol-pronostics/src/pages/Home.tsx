import { useState, useEffect } from 'react';
import { Container, Grid, useTheme, useMediaQuery } from '@mui/material';
import { api } from '../services/api';
import { useUser } from '../context/UserContext';
import { CompetitionList } from '../components/competitions/CompetitionList';
import { MatchList } from '../components/matches/MatchList';
import BetModal from '../components/BetModal';
import { leaguepediaApi } from '../services/leaguepediaApi';
import { Competition, Match, TeamLogos, Prediction } from '../types';
import styled from 'styled-components';
import { Loader } from '../components/common/Loader';
import { CompetitionSelection } from '../components/stats/CompetitionSelection';

const StyledContainer = styled(Container)`
  height: calc(100vh - 80px); // 80px corresponds to the header height
  overflow: hidden;
`;

interface ContentContainerProps {
  isMobile?: boolean;
}

const ContentContainer = styled('div')<ContentContainerProps>`
  padding: ${props => props.isMobile ? '16px 8px' : '16px'};
`;

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1000)); // Changé de 'sm' à 900

  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedMatchLogos, setSelectedMatchLogos] = useState<{ team1: string | null, team2: string | null }>({ team1: null, team2: null });
  const { userId } = useUser();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await api.getCompetitions();
        setCompetitions(response.data);
        if (response.data.length > 0) {
          setSelectedCompetition(response.data[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch competitions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompetitions();
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!selectedCompetition || !userId) return;
      try {
        const response = await api.getMatches(selectedCompetition);
        const betsResponse = await api.getBets(userId);
        
        const matchesWithBets = response.data.map((match: Match) => {
          const bet = betsResponse.data.find(
            (bet: Prediction) => 
              bet.team1 === match.team1 && 
              bet.team2 === match.team2
          );
          
          if (bet) {
            return {
              ...match,
              userBet: {
                team1bet: bet.team1bet,
                team2bet: bet.team2bet
              }
            };
          }
          return match;
        });
        
        setMatches(matchesWithBets);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      }
    };
    fetchMatches();
  }, [selectedCompetition, userId]);

  const handleBetSubmit = async (score1: number, score2: number) => {
    if (!userId || !selectedMatch) return;
    
    try {
      await api.placeBet(userId, selectedMatch.id, score1, score2);
      
      setMatches(matches.map(match => {
        if (match.id === selectedMatch.id) {
          return {
            ...match,
            userBet: {
              team1bet: score1,
              team2bet: score2
            }
          };
        }
        return match;
      }));
      
      setSelectedMatch(null);
    } catch (error) {
      console.error('Failed to place bet:', error);
    }
  };

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <StyledContainer maxWidth={false}>
      {isMobile ? (
        <ContentContainer isMobile={isMobile}>
          <CompetitionSelection
            competitions={competitions}
            selectedCompetition={selectedCompetition}
            onSelectCompetition={setSelectedCompetition}
          />
          <MatchList
            matches={matches}
            onMatchSelect={handleMatchSelect}
            isMobile={isMobile}
          />
        </ContentContainer>
      ) : (
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item xs={3}>
            <CompetitionList
              competitions={competitions}
              selectedCompetition={selectedCompetition}
              onSelectCompetition={setSelectedCompetition}
              isMobile={isMobile}
            />
          </Grid>
          <Grid item xs={9}>
            <MatchList
              matches={matches}
              onMatchSelect={handleMatchSelect}
              isMobile={isMobile}
            />
          </Grid>
        </Grid>
      )}
      
      {selectedMatch && (
        <BetModal
          open={!!selectedMatch}
          onClose={() => setSelectedMatch(null)}
          match={selectedMatch}
          onSubmit={handleBetSubmit}
        />
      )}
    </StyledContainer>
  );
};

export default Home;
