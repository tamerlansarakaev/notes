import React from 'react';
import uniqid from 'uniqid';
import { Container } from '@mui/material';

// Types
import { INote } from '../../Types/Types';

// Components
import NoteItem from '../NoteItem/NoteItem';

// Styles
import './NotesList.css';

type Props = {};

export default function NotesList({}: Props) {
  const id = uniqid();
  const [notes, setNotes] = React.useState<INote[]>([
    { id, title: 'Hello my World', description: 'Thanks' },
    { id, title: 'Hello my World', description: 'Thanks' },
    { id, title: 'Hi', description: 'fdfdf' },
    { id, title: 'Hi', description: 'fdfdf' },
    { id, title: 'Hi', description: 'fdfdf' },
    { id, title: 'What', description: 'fdfdfdfdf' },
  ]);
  return (
    <div className="notes-list">
      {notes &&
        notes.map((note: INote, i) => {
          return <NoteItem {...note} key={i} />;
        })}
    </div>
  );
}
