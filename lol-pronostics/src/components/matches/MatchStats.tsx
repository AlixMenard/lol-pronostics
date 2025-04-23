import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

// Type exact correspondant à la réponse API
type ApiResponse = {
  status: string;
  data: {
    [teamCode: string]: {
      last_year: [number, number];
      bo1: [number, number];
      bo3: {
        result: [number, number];
        score: [number, number];
      };
      bo5: {
        result: [number, number];
        score: [number, number];
      };
      in_league: [number, number];
      last_5: Array<{
        tournament: string;
        team1: string;
        team2: string;
        score1: number;
        score2: number;
        bo: number;
      }>;
    };
  };
};

export const MatchStats = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [stats, setStats] = useState<ApiResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchStats = async () => {
      try {
        const response = await api.getMatchStats(Number(matchId));
        if (response.data && response.data.data) {
          setStats(response.data.data);
        }
      } catch (err) {
        setError('Erreur lors du chargement des statistiques');
      } finally {
        setLoading(false);
      }
    };

    if (matchId) {
      fetchMatchStats();
    }
  }, [matchId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!stats) return <div>Aucune statistique disponible</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Statistiques du match</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {stats && Object.entries(stats).map(([teamCode, teamStats]) => (
          <div
            key={teamCode}
            style={{
              flex: '1 1 45%',
              backgroundColor: '#2e2e2e',
              padding: '16px',
              borderRadius: '8px',
              color: '#fff',
              minWidth: '300px',
            }}
          >
            <h2>{teamCode}</h2>
            <p>
              <strong>Dernière année :</strong> {teamStats.last_year.join(' - ')}
            </p>
            <p>
              <strong>BO1 :</strong> {teamStats.bo1.join(' - ')}
            </p>
            <p>
              <strong>BO3 Résultats :</strong> {teamStats.bo3.result.join(' - ')}
            </p>
            <p>
              <strong>BO3 Scores :</strong> {teamStats.bo3.score.join(' - ')}
            </p>
            <p>
              <strong>BO5 Résultats :</strong> {teamStats.bo5.result.join(' - ')}
            </p>
            <p>
              <strong>BO5 Scores :</strong> {teamStats.bo5.score.join(' - ')}
            </p>
            <p>
              <strong>Dans la ligue :</strong> {teamStats.in_league.join(' - ')}
            </p>
            <div>
              <strong>Derniers 5 matchs :</strong>
              <ul style={{ paddingLeft: '20px' }}>
                {teamStats.last_5.map((match, index) => (
                  <li key={index}>
                    {match.tournament} : {match.team1} {match.score1} - {match.score2} {match.team2} (BO{match.bo})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};