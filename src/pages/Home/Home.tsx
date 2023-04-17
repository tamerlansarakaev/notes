// Global
import React from 'react';
import { useSelector } from 'react-redux';

// MUI for App
import { Box } from '@mui/material';

// Components
import Header from '../../Components/Header/Header';
import NotesList from '../../Components/NotesList/NotesList';

// Styles
import './Home.scss';
import { IRootReducer } from '../../Types/Types';
import { useLocation, useNavigate } from 'react-router-dom';

function Home(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector(
    (state: IRootReducer) => state.rootReducer.authStatus
  );
  React.useEffect(() => {
    if (authStatus === 'Not Authorized') {
      navigate('/login');
    } else if (location.pathname === '/login' && authStatus === 'Authorized') {
      navigate('/');
    }
  }, [authStatus]);

  return (
    <Box
      sx={{
        bgcolor: '#2E2E2E',
        color: 'white',
        minHeight: '100vh',
        minWidth: '100%',
      }}
    >
      <Header activeBackButton={false} />
      <NotesList />
    </Box>
  );
}

export default React.memo(Home);
