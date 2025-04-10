import { styled, keyframes } from '@mui/material/styles';
import logo from "../../assets/logo_mode_otp.png";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const SpinningLogo = styled('img')`
  width: 4em;
  height: 4em;
  animation: ${spin} 2s linear infinite;
`;

export const Loader = () => (
  <LoaderContainer>
    <SpinningLogo src={logo} alt="Loading..." />
  </LoaderContainer>
);
