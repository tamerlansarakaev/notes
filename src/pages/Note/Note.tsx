import React from 'react';
import { Box, Input, TextareaAutosize, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

// Components
import Header from '../../Components/Header/Header';

// Styles
import './Notes.scss';

// Other
import { useDispatch, useSelector } from 'react-redux';
import { INote, INotesList } from '../../Types/Types';
import Button from '../../Components/UI/Button/Button';
import { changeNote } from '../../redux/reducers/rootReducer';

function Note() {
  const [changeActive, setChangeActive] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [note, setNote] = React.useState<INote>();
  const { id } = useParams();
  const allNotes = useSelector((state: INotesList) => state.rootReducer.notes);
  const dispatch = useDispatch();

  const changeNotes = React.useCallback(async () => {
    const filterNotes = allNotes.filter((noteFilter) => {
      return noteFilter.id !== note?.id;
    });

    const resultNotes = [...filterNotes, note];

    dispatch(changeNote(resultNotes));
  }, [note?.title, note?.description]);

  const findCurrentNote = (notes: INote[]) => {
    const findNote = notes.find((note) => {
      return note.id.toString() === id;
    });

    setNote(findNote);
  };

  React.useEffect(() => {
    if (allNotes && !note) {
      findCurrentNote(allNotes);
      setLoading(false);
    }
  }, [allNotes]);

  React.useEffect(() => {
    if (changeActive) {
      changeNotes();
    }
  }, [note]);

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
        <Box sx={{ margin: 'auto 0' }}>
          <Button title="Удалить" />
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
                  className={`note-page-status${changeActive ? '-active' : ''}`}
                >
                  Редактирование
                </span>
              </Typography>
              <form className="note-page-form">
                <Input
                  type="text"
                  className="note-page-title"
                  name="title"
                  onChange={(e) => {
                    setChangeActive(true);
                    setNote((note: any) => {
                      return { ...note, title: e.target.value };
                    });
                  }}
                  onBlur={() => {
                    setChangeActive(false);
                  }}
                  placeholder="Write your Title"
                  disableUnderline
                  value={note && note.title}
                />
                <TextareaAutosize
                  className="note-page-description"
                  name="description"
                  onChange={(e) => {
                    setChangeActive(true);
                    setNote((note: any) => {
                      return { ...note, description: e.target.value };
                    });
                  }}
                  onBlur={() => {
                    setChangeActive(false);
                  }}
                  placeholder="Write your text"
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