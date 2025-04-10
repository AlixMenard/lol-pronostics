import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { TeamCode } from '../../types';
import { api } from '../../services/api';
import RGE from "../../assets/RGE.png"
import { Loader } from './Loader';

const Logo = styled('img')`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const PlaceholderLogo = styled('div')`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-color);
  border-radius: 50%;
  color: var(--text-color);
  font-size: 0.8rem;
  opacity: 0.7;
`;

interface TeamLogoProps {
  teamCode: string;
  size?: 'small' | 'large';
}

export const TeamLogo = ({ teamCode, size = 'large' }: TeamLogoProps) => {
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      if (teamCode === 'TBD' || teamCode === 'RGE') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.getTeamLogo(teamCode);
        setLogo(response.data.url); // Modification ici pour accéder à response.data.url
      } catch (error) {
        console.error('Failed to fetch logo:', error);
        setLogo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, [teamCode]);

  if (teamCode === "TBD") {
    return <PlaceholderLogo>TBD</PlaceholderLogo>;
  }

  if (teamCode === "RGE") {
    return (
      <Logo 
        src={RGE}
        alt="RGE"
        loading="lazy"
        style={{
          width: size === 'small' ? '32px' : '40px',
          height: size === 'small' ? '32px' : '40px'
        }}
      />
    );
  }

  const getModifiedUrl = (url: string | null) => {
    if (!url || typeof url !== 'string') return null;
    const parts = url.split('/revision');
    return parts[0];
  };

  const logoUrl = getModifiedUrl(logo);
  
  if (loading) {
    return <Loader />;
  }

  if (!logoUrl) return null;

  return (
    <Logo 
      src={logoUrl}
      alt={teamCode}
      loading="lazy"
      style={{
        width: size === 'small' ? '32px' : '40px',
        height: size === 'small' ? '32px' : '40px'
      }}
    />
  );
};
