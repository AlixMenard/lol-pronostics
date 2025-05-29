import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 16px;
`;

const LoadingMessage = styled(Typography)`
  color: #fff;
  font-size: 1rem;
`;

export interface LoadingStateProps {
  message: string;
}

export const LoadingState = ({ message }: LoadingStateProps) => {
  return (
    <LoadingContainer>
      <CircularProgress sx={{ color: '#ff3f09' }} />
      <LoadingMessage>
        {message}
      </LoadingMessage>
    </LoadingContainer>
  );
}; 