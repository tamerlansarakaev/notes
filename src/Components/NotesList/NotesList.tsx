// Global
import React from 'react';
import { useSelector } from 'react-redux';

// Types
import { INote, INotesList } from '../../Types/Types';

// Components
import NoteItem from '../NoteItem/NoteItem';

// Styles
import './NotesList.scss';

export default function NotesList() {
  const [statusNotes, setStatusNotes] = React.useState('Loading...');
  const [notes, setNotes] = React.useState<INote[]>();
  const allNotes = useSelector((state: INotesList) => state.rootReducer.notes);

  React.useEffect(() => {
    if (allNotes.length) {
      const newArray = [...allNotes];
      const sortNotes = newArray.sort((a, b) => (a.title > b.title ? 1 : -1));
      setNotes(allNotes);
    }

    setTimeout(() => {
      setStatusNotes('Not have the notes')
    },3000)
  }, [allNotes]);
  return (
    <div className="notes-list">
      {notes &&
        notes.map((note: INote, i) => {
          return <NoteItem {...note} key={i} />;
        })}
      {!notes?.length && (
        <span
          style={{
            fontSize: '20px',
            fontFamily: 'Roboto',
            fontWeight: '600',
            userSelect: 'none',
          }}
        >
          {statusNotes}
        </span>
      )}
    </div>
  );
}
