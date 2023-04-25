import React from 'react';

// Styles
import './NoteItem.scss';

// Types
import { INote } from '../../Types/Types';
import { Link } from 'react-router-dom';

export default function NoteItem({ title, description, id }: INote) {
  return (
    <>
      <div className="note-item">
        <Link to={`/notes/${id}`} className="note-box">
          <div className="note-item-info">
            <span className="note-box-title">{title}</span>
            <span className="note-box-description">{description}</span>
          </div>
        </Link>
        <span className="note-end-text">{title}</span>
      </div>
    </>
  );
}
