// Global
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

// MUI for App
import { Box, Modal } from '@mui/material';

// Types
import { IModalReducer, IRootReducer } from '../../Types/Types';

// Components
import Header from '../../Components/Header/Header';
import NotesList from '../../Components/NotesList/NotesList';

// Icons
import AddNotesIcon from '../../assets/headerIcons/addNoteIcon.svg';
import SettingsIcon from '../../assets/headerIcons/settingsforProfile.svg';
import SignOutIcon from '../../assets/headerIcons/exit.svg';

// Styles
import homeClassNames from './Home.module.scss';
import CustomMenuProfile from '../../Components/UI/CustomMenu/CustomMenuProfile';
import Button from '../../Components/UI/Button/Button';
import { getAuth } from 'firebase/auth';
import { signOutUser } from '../../redux/reducers/rootReducer';
import SettingsModal from '../../Components/SettingsModal/SettingsModal';
import { modalOpen } from '../../redux/reducers/modalReducer';

function Home() {
  const openSettingsModal = useSelector(
    (state: IModalReducer) => state.modalReducer
  );

  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector(
    (state: IRootReducer) => state.rootReducer.authStatus
  );
  const auth = getAuth();
  const dispatch = useDispatch();

  async function signOut() {
    auth.signOut().then(() => {
      dispatch(signOutUser());
    });
  }

  function openModalSettings() {
    dispatch(modalOpen({ modalType: 'SettingsModal', modalStatus: true }));
  }

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
      <Header activeBackButton={false} className={homeClassNames.header}>
        <ReactSVG src={AddNotesIcon} className={homeClassNames.addNote} />
        <CustomMenuProfile>
          <Button
            className={homeClassNames.menuButton}
            onClick={openModalSettings}
          >
            <ReactSVG src={SettingsIcon} className={homeClassNames.menuIcon} />
          </Button>
          <Button
            className={homeClassNames.menuButton}
            onClick={() => signOut()}
          >
            <ReactSVG src={SignOutIcon} className={homeClassNames.menuIcon} />
          </Button>
        </CustomMenuProfile>
      </Header>
      <SettingsModal
        open={
          openSettingsModal.modalStatus &&
          openSettingsModal.modalType === 'SettingsModal'
            ? true
            : false
        }
      />
      <NotesList />
    </Box>
  );
}

export default React.memo(Home);
