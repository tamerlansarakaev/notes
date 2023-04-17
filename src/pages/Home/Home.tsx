// Global
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

// Types
import { IRootReducer } from '../../Types/Types';

// MUI for App
import { Box } from '@mui/material';

// Components
import Header from '../../Components/Header/Header';
import NotesList from '../../Components/NotesList/NotesList';

// Icons
import AddNotesIcon from '../../assets/headerIcons/addNoteIcon.svg';
import ProfileIcon from '../../assets/headerIcons/profileIcon.svg';

// Styles
import headerClassNames from './Home.module.scss';

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
      <Header activeBackButton={false} className={headerClassNames.header}>
        <ReactSVG src={AddNotesIcon} className={headerClassNames.addNote} />
        <ReactSVG src={ProfileIcon} className={headerClassNames.profileIcon} />
      </Header>
      <NotesList />
    </Box>
  );
}

export default React.memo(Home);
