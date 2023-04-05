// MUI for App
import { Box } from '@mui/material';

// Components
import Header from '../../Components/Header/Header';
import NotesList from '../../Components/NotesList/NotesList';

// Styles
import './Home.scss';

export default function Home() {
  return (
    <Box
      sx={{
        bgcolor: '#2E2E2E',
        color: 'white',
        minHeight: '100vh',
        minWidth: '100%',
      }}
    >
      <Header />
      <NotesList />
    </Box>
  );
}
