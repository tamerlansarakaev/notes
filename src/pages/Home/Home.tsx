// MUI for App
import { Container } from '@mui/material';

// Components
import Header from '../../Components/Header/Header';

// Styles
import './Home.css';
import NotesList from '../../Components/NotesList/NotesList';

type Props = {};

export default function Home({}: Props) {
  return (
    <Container
      sx={{
        bgcolor: '#2E2E2E',
        color: 'white',
        minHeight: '100vh',
        minWidth: '100%',
        paddingTop: '10px',
      }}
    >
      <Header />
      <NotesList />
    </Container>
  );
}
