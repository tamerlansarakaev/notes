import React from 'react';

// Styles
import './NoteItem.css';

// Types
import { INote } from '../../Types/Types';

export default function NoteItem({ title, description }: INote) {
  return (
    <div className="note-item">
      <div className="note-box">
        <span className="note-title">{title}</span>
        <span className="note-description">{description}</span>
      </div>
      <span className="note-end-text">{title}</span>
      <span className="note-end-time">16:59</span>
    </div>
  );
}
