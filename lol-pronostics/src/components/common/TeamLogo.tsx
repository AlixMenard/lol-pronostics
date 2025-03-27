import { styled } from '@mui/material/styles';
import { TeamCode } from '../../types';
import logosData from '../../assets/logos.json';
import RGE from "../../assets/RGE.png"

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
    if (!url) return null;
    return url.split('/revision')[0];
  };

  const logoUrl = teamCode in logosData ? getModifiedUrl(logosData[teamCode as Exclude<TeamCode, 'TBD'>]) : null;
  
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
