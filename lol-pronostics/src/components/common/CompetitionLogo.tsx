import { styled } from '@mui/material/styles';

const Logo = styled('img')`
  width: 48px;
  height: 48px;
  object-fit: contain;
  padding: 5px;
  padding-left: 12px;
`;

interface CompetitionLogoProps {
  name: string;
  size?: 'small' | 'large';
}

export const CompetitionLogo = ({ name, size = 'large' }: CompetitionLogoProps) => {
  const shortName = name === "2025 Unicef LCK Package" ? "lck" : name.split(' ')[0].toLowerCase();
  let logoSrc;

  try {
    logoSrc = require(`../../assets/${shortName}.png`);
  } catch (e) {
    console.log(`Logo not found for ${shortName}`);
    return null;
  }

  return <Logo 
    src={logoSrc} 
    alt={name}
    style={{
      width: size === 'small' ? '24px' : '80px',
      height: size === 'small' ? '24px' : '48px',
      padding: size === 'small' ? '0' : '5px',
    }}
  />;
};
