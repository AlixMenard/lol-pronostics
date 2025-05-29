import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  background-color: rgba(255, 63, 9, 0.1);
  border-radius: 12px;
  gap: 16px;
`;

const ErrorIcon = styled(ErrorOutlineIcon)`
  font-size: 48px;
  color: #ff3f09;
`;

const ErrorMessage = styled(Typography)`
  color: #fff;
  font-size: 1rem;
  max-width: 400px;
`;

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <ErrorContainer>
      <ErrorIcon />
      <ErrorMessage>
        {message}
      </ErrorMessage>
      {onRetry && (
        <Button
          variant="contained"
          color="primary"
          onClick={onRetry}
          sx={{
            bgcolor: '#ff3f09',
            '&:hover': {
              bgcolor: '#ff5722'
            }
          }}
        >
          Réessayer
        </Button>
      )}
    </ErrorContainer>
  );
}; 