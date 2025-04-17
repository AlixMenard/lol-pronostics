import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const BoText = styled(Typography)`
  font-size: 1rem;
  color: var(--secondary-color);
  padding-left: 8px;
  margin-left: 15px;
  border-left: 1px solid var(--secondary-color);
`;

interface BoNumberProps {
  bo: number;
}

export const BoNumber = ({ bo }: BoNumberProps) => (
  bo > 0 ? <BoText>BO{bo}</BoText> : null
);
