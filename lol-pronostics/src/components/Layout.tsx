import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, useTheme, IconButton, Menu, MenuItem } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/UserContext';
import { styled } from '@mui/material/styles';
import logo from "../assets/logo_mode_otp.png";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const StyledLogo = styled('img')`
  height: 40px;
  margin-right: 16px;
  cursor: pointer;
`;

const StyledAppBar = styled(AppBar)`
  background-color: var(--secondary-color);
  color: var(--text-color);
`;

const StyledButton = styled(Button)`
  color: var(--text-color);
  &:hover {
    color: var(--primary-color);
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const NavSection = styled('div')`
  display: flex;
  align-items: center;
`;

const UserSection = styled('div')`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const StyledUsername = styled(Typography)`
  cursor: pointer;
  color: var(--text-color);
  &:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
`;

const Layout = () => {
  const { username, logout } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(900)); // Changé de 'sm' à 900
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <StyledAppBar position="static">
        <StyledToolbar>
          <NavSection>
            <StyledLogo src={logo} alt="Logo" onClick={() => navigate('/')} />
            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={() => {
                    navigate('/');
                    setAnchorEl(null);
                  }}>
                    Accueil
                  </MenuItem>
                  <MenuItem onClick={() => {
                    navigate('/stats');
                    setAnchorEl(null);
                  }}>
                    Stats
                  </MenuItem>
                  {username && (
                    <MenuItem onClick={() => {
                      navigate(`/predictions/${username}`);
                      setAnchorEl(null);
                    }}>
                      Mes pronostics
                    </MenuItem>
                  )}
                </Menu>
              </>
            ) : (
              <>
                <StyledButton color="inherit" onClick={() => navigate('/')}>
                  <StyledIcon icon={faHome} />
                  Accueil
                </StyledButton>
                <StyledButton color="inherit" onClick={() => navigate('/stats')}>
                  <StyledIcon icon={faChartBar} />
                  Stats
                </StyledButton>
              </>
            )}
          </NavSection>
          {username && (
            <UserSection>
              <StyledUsername 
                onClick={() => navigate(`/predictions/${username}`)}
                sx={{ mx: 2 }}
              >
                {username}
              </StyledUsername>
              <StyledButton color="inherit" onClick={handleLogout}>
                <StyledIcon icon={faSignOutAlt} />
                Déconnexion
              </StyledButton>
            </UserSection>
          )}
        </StyledToolbar>
      </StyledAppBar>
      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
