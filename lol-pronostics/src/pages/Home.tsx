import { useState, useEffect } from 'react';
import { Container, Grid, useTheme, useMediaQuery } from '@mui/material';
import { api } from '../services/api';
import { useUser } from '../context/UserContext';
import { CompetitionList } from '../components/competitions/CompetitionList';
import { MatchList } from '../components/matches/MatchList';
import BetModal from '../components/modals/BetModal';
import { Competition, Match, Prediction } from '../types';
import styled from 'styled-components';
import { Loader } from '../components/common/Loader';
import { CompetitionSelection } from '../components/stats/CompetitionSelection';
import { StatsModal } from '../components/modals/StatsModal';

const StyledContainer = styled(Container)`
  height: calc(100vh - 80px); // 80px corresponds à la hauteur de l'en-tête
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
  const isMobile = useMediaQuery(theme.breakpoints.down(1000)); 

  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const { userId } = useUser();
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

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

  const handleStatsClick = (matchId: number) => {
    setSelectedMatchId(matchId);
  };

  const handleBetClick = (match: Match) => {
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
          <CompetitionList  // Ajouter CompetitionList ici pour la version mobile
            competitions={competitions}
            matches={matches}
            selectedCompetition={selectedCompetition}
            onSelectCompetition={setSelectedCompetition}
            isMobile={isMobile}
          />
          <MatchList
            matches={matches}
            onMatchSelect={handleBetClick}
            onStatsClick={handleStatsClick}
            isMobile={isMobile}
          />
        </ContentContainer>
      ) : (
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item xs={3}>
            <CompetitionList
              competitions={competitions}
              matches={matches}
              selectedCompetition={selectedCompetition}
              onSelectCompetition={setSelectedCompetition}
              isMobile={isMobile}
            />
          </Grid>
          <Grid item xs={9}>
            <MatchList
              matches={matches}
              onMatchSelect={handleBetClick}
              onStatsClick={handleStatsClick}
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

      <StatsModal
        matchId={selectedMatchId}
        open={!!selectedMatchId}
        onClose={() => setSelectedMatchId(null)}
      />
    </StyledContainer>
  );
};

export default Home;
