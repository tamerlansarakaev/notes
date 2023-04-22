// Global
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

// MUI for App
import { Box, Modal } from '@mui/material';

// Types
import { IRootReducer } from '../../Types/Types';

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

function Home() {
  const [openSettings, setOpenSettings] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const settingsModalRef = React.useRef<HTMLDivElement>(null); // <-- specify the type
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
            onClick={() => setOpenSettings(!openSettings)}
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
        onClose={() => setOpenSettings(!openSettings)}
        open={openSettings}
        ref={settingsModalRef}
      />
      <NotesList />
    </Box>
  );
}

export default React.memo(Home);
