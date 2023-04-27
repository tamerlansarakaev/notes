import React from 'react';

// Styles
import './NoteItem.scss';

// Types
import { INote } from '../../Types/Types';
import { Link } from 'react-router-dom';

export default function NoteItem({ title, description, id, date }: INote) {
  function formatCurrentDate(currentDate: number) {
    if (!currentDate) return;

    const date = new Date(currentDate);
    const month = date.getMonth();
    const day = date.getDay();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const resultMinutes = minutes > 10 ? minutes : `0${minutes}`;
    return `${day}/${month}/${year} | ${hours}:${resultMinutes}`;
  }

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
        <span className="note-end-time">{date && formatCurrentDate(date)}</span>
      </div>
    </>
  );
}
