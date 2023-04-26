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
import { modalClose, modalOpen } from '../../redux/reducers/modalReducer';
import CreateNote from '../../Components/CreateNote/CreateNote';
import { types } from '../../redux/types';

function Home() {
  const modalStatus = useSelector((state: IModalReducer) => state.modalReducer);

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

  function openCreateModal() {
    dispatch(modalOpen({ modalType: types.CREATE_MODAL, modalStatus: true }));
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
        <ReactSVG
          src={AddNotesIcon}
          className={homeClassNames.addNote}
          onClick={() => openCreateModal()}
        />
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
          modalStatus.modalStatus && modalStatus.modalType === 'SettingsModal'
            ? true
            : false
        }
      />
      <Modal
        open={
          modalStatus.modalStatus &&
          modalStatus.modalType === types.CREATE_MODAL
            ? true
            : false
        }
        onClose={() => dispatch(modalClose())}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
        slotProps={{
          backdrop: {
            style: {
              background: 'rgba(26, 26, 26, 0.5)',
              backdropFilter: 'blur(15px)',
            },
          },
        }}
      >
        <CreateNote />
      </Modal>
      <NotesList />
    </Box>
  );
}

export default React.memo(Home);
