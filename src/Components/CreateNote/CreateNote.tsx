import React from 'react';
import { ReactSVG } from 'react-svg';
import uniqid from 'uniqid';

// Icon
import CrossIcon from '../SettingsModal/icon/cross.svg';

// Other
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../../Types/Types';
import { createNote } from '../../utils/utils';
import { updateData } from '../../redux/reducers/rootReducer';
import { modalClose } from '../../redux/reducers/modalReducer';

// Components
import { Button } from '@mui/material';

// Styles
import CreateNoteClassNames from './CreateNote.module.scss';

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

  async function handleSubmit() {
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
        onSubmit={() => handleSubmit()}
      >
        <fieldset
          style={{
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            height: '100%',
            padding: '0',
            margin: 0,
            border: 'none',
          }}
        >
          <input
            placeholder="write title"
            onChange={(e) => {
              setNote({ ...note, title: e.target.value });
            }}
            minLength={1}
            value={note.title}
            maxLength={50}
            required
            className={CreateNoteClassNames.inputTitle}
          />
          <textarea
            className={CreateNoteClassNames.inputDescription}
            onChange={(e) => {
              setNote({ ...note, description: e.target.value });
            }}
            placeholder="Write description"
            maxLength={5000}

          />
        </fieldset>
        <fieldset className={CreateNoteClassNames.submitGroup}>
          <Button
            type="submit"
            className={CreateNoteClassNames.button}
          >
            create
          </Button>
        </fieldset>
      </form>
    </div>
  );
});

export default React.memo(CreateNote);
