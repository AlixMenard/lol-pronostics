import { styled } from '@mui/material/styles';

const Logo = styled('img')`
  width: 36px;
  height: 36px;
  object-fit: contain;
  padding: 4px;
  padding-left: 8px;
`;

interface CompetitionLogoProps {
  name: string;
  size?: 'small' | 'large';
}

export const CompetitionLogo = ({ name, size = 'large' }: CompetitionLogoProps) => {

  let shortName = name === "LFL2 Spring 2025" ? 'div2' : name.split(' ')[0].toLowerCase()

  let logoSrc;

  try {
    logoSrc = require(`../../assets/${shortName}.png`);
  } catch {
    return null;
  }

  return <Logo 
    src={logoSrc} 
    alt={name}
    style={{
      width: size === 'small' ? '20px' : '36px',
      height: size === 'small' ? '20px' : '36px',
      padding: size === 'small' ? '0' : '4px',
    }}
  />;
};
