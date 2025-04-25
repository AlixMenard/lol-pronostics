import { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { api } from '../services/api';
import { authService } from '../services/auth.service';

const StyledButton = styled(Button)`
  background-color: var(--secondary-color);
  &:hover {
    background-color: var(--primary-color);
  }
`;

const StyledContainer = styled(Container)`
  background-color: var(--background-color);
`;

export const Login = () => {
  const [modo, setModo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUserId } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await api.signin(modo, password);
      console.log('Réponse API:', response.data);
  
      await authService.login(response.data.token, {
        id: response.data.id,
        name: response.data.name,
      });
      console.log('Après authService.login, isAuthenticated:', authService.isAuthenticated());
  
      setUserId(response.data.id);
      console.log('Après setUserId, userId:', response.data.id);
  
      navigate('/', { replace: true });
      console.log('Navigation déclenchée vers /');
    } catch (err) {
      console.error('Erreur:', err);
      setError('Identifiants invalides');
    }
  };
  
  return (
    <StyledContainer maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Pseudo"
            name="username"
            autoFocus
            value={modo}
            onChange={(e) => setModo(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </StyledButton>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default Login;
