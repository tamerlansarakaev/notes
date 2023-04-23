import React from 'react';
import {
  Box,
  Input,
  ListItemButton,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

// Icons
import UpperCaseIcon from '../../assets/upperCase.svg';

// Components
import Header from '../../Components/Header/Header';

// Styles
import './Notes.scss';

// Other
import { useDispatch, useSelector } from 'react-redux';
import { INote, INotesList, IRootReducer } from '../../Types/Types';
import Button from '../../Components/UI/Button/Button';
import { changeNote } from '../../redux/reducers/rootReducer';
import { ReactSVG } from 'react-svg';
import { findCurrentNote, writeDataNote } from '../../utils/utils';

function Note() {
  const [changeActive, setChangeActive] = React.useState({
    type: '',
    status: false,
  });
  const [loading, setLoading] = React.useState<boolean>(true);
  const [note, setNote] = React.useState<INote>();
  const { id } = useParams();
  const allNotes = useSelector((state: INotesList) => state.rootReducer.notes);
  const user = useSelector((state: IRootReducer) => state.rootReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeNotes = React.useCallback(async () => {
    const filterNotes = allNotes.filter((noteFilter) => {
      return noteFilter.id !== note?.id;
    });
    const resultNotes = [...filterNotes, note];
    dispatch(changeNote(resultNotes));
    return resultNotes;
  }, [note?.title, note?.description]);

  const upperCaseNote = () => {
    if (!note?.title) return;
    const upperCaseTitle = note?.title.toUpperCase();
    const upperCaseDescription = note?.description.toUpperCase();

    return {
      title: upperCaseTitle,
      description: upperCaseDescription,
      id: note.id,
    };
  };

  React.useEffect(() => {
    if (!findCurrentNote(allNotes, id)) {
      navigate('/');
    }

    if (allNotes && !note) {
      setNote(findCurrentNote(allNotes, id));
      setLoading(false);
    }
  }, [allNotes]);

  React.useEffect(() => {
    if (changeActive.status) {
      changeNotes().then((notes: any) => {
        writeDataNote(user?.id, notes);
      });
    }

    if (changeActive.status && changeActive.type === 'UpperCase') {
      const upperNote = upperCaseNote();
      setNote(upperNote);
      setChangeActive({ ...changeActive, type: '' });

      setTimeout(() => {
        setChangeActive({ ...changeActive, status: false });
      }, 1000);
    }

    if (!changeActive.status) return;
  }, [note, changeActive]);

  return (
    <Box
      sx={{
        bgcolor: '#2E2E2E',
        color: 'white',
        minHeight: '100vh',
        minWidth: '100%',
      }}
    >
      <Header>
        <ListItemButton
          sx={{
            display: 'flex',
            maxWidth: '41px',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            borderRadius: '8px',
          }}
          disableRipple
          onClick={() => setChangeActive({ type: 'UpperCase', status: true })}
          onBlur={() => {
            setChangeActive({
              type: 'UpperCase',
              status: false,
            });
          }}
        >
          <ReactSVG src={UpperCaseIcon} />
        </ListItemButton>
        <Box sx={{ margin: 'auto 0' }}>
          <Button>Удалить</Button>
        </Box>
      </Header>
      {!loading ? (
        <>
          <Box
            sx={{
              display: 'flex',
              marginTop: '14px',
              flexDirection: 'column',
              gap: '20px',
              textAlign: 'start',
              paddingLeft: '30px',
              paddingBottom: '70px',
              fontFamily: 'Roboto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1704px',
              }}
            >
              <Typography
                typography={'div'}
                sx={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '23px',
                  textTransform: 'uppercase',
                  color: '#B3FF78',
                }}
              >
                <span
                  className={`note-page-status${
                    changeActive.status ? '-active' : ''
                  }`}
                >
                  Редактирование
                </span>
              </Typography>
              <form
                className="note-page-form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Input
                  type="text"
                  className="note-page-title"
                  name="title"
                  inputProps={{ maxLength: 50 }}
                  onChange={(e) => {
                    setChangeActive({ type: 'Update Note', status: true });
                    setNote((note: any) => {
                      return { ...note, title: e.target.value };
                    });
                  }}
                  onBlur={() => {
                    setChangeActive({ type: 'Update Note', status: false });
                  }}
                  placeholder="Write your Title"
                  disableUnderline
                  value={note && note.title}
                />
                <TextareaAutosize
                  className="note-page-description"
                  name="description"
                  onChange={(e) => {
                    setChangeActive({ type: 'Update Note', status: true });
                    setNote((note: any) => {
                      return { ...note, description: e.target.value };
                    });
                  }}
                  onBlur={() => {
                    setChangeActive({ type: 'Update Note', status: false });
                  }}
                  placeholder="Write your description for the title"
                  value={note && note.description}
                />
              </form>
            </Box>
          </Box>
        </>
      ) : (
        <h1 style={{ marginLeft: '35px', fontFamily: 'Roboto' }}>Loading...</h1>
      )}
    </Box>
  );
}

export default React.memo(Note);
