import React from 'react';
import { ReactSVG } from 'react-svg';
import uniqid from 'uniqid';

// Icon
import CrossIcon from '../SettingsModal/icon/cross.svg';

// Components
import { Button } from '@mui/material';

// Styles
import CreateNoteClassNames from './CreateNote.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../Types/Types';
import { createNote } from '../../utils/utils';
import { update } from 'firebase/database';
import { updateData } from '../../redux/reducers/rootReducer';
import { modalClose } from '../../redux/reducers/modalReducer';

export interface INewNote {
  title: string;
  description: string;
  id: any;
  date: number | string;
}

const CreateNote = React.forwardRef((_, ref) => {
  const userId = useSelector(
    (state: IRootReducer) => state.rootReducer.user?.id
  );

  const dateOnMilliseconds = new Date().getTime();
  const id = uniqid();
  const [note, setNote] = React.useState<INewNote>({
    title: '',
    description: '',
    id,
    date: dateOnMilliseconds,
  });

  const dispatch = useDispatch();

  async function handleSubmit(e: any) {
    if (userId?.toString()) {
      const id: any = userId.toString();

      const addNote = await createNote(note, id).then(() => {
        dispatch(updateData());
        dispatch(modalClose());
      });
      return addNote;
    }
  }

  return (
    <div className={CreateNoteClassNames.container}>
      <div className={CreateNoteClassNames.header}>
        <h1>Create new note</h1>
        <ReactSVG
          src={CrossIcon}
          className={CreateNoteClassNames.crossIcon}
          onClick={() => dispatch(modalClose())}
        />
      </div>
      <form
        className={CreateNoteClassNames.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <fieldset
          style={{
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            alignItems: 'center',
            padding: '0',
            marginLeft: 0,
            border: 'none',
          }}
        >
          <input
            placeholder="write here your title for note"
            onChange={(e) => {
              setNote({ ...note, title: e.target.value });
            }}
            minLength={10}
            value={note.title}
            maxLength={50}
            required
            className={CreateNoteClassNames.inputTitle}
          />
        </fieldset>
        <fieldset
          style={{
            display: 'flex',
            padding: 0,
            boxSizing: 'border-box',
            border: 'none',
            marginLeft: 'auto',
          }}
        >
          <Button
            type="submit"
            className={CreateNoteClassNames.button}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            create
          </Button>
        </fieldset>
      </form>
    </div>
  );
});

export default React.memo(CreateNote);
