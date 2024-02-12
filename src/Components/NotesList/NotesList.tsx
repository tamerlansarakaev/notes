import React from "react";
import { useSelector } from "react-redux";
import { INote, INotesList } from "../../Types/Types";
import NoteItem from "../NoteItem/NoteItem";
import "./NotesList.scss";

export default function NotesList() {
  const [statusNotes, setStatusNotes] = React.useState("Loading...");
  const [notes, setNotes] = React.useState<INote[]>([]);
  const allNotes = useSelector((state: INotesList) => state.rootReducer.notes);

  React.useEffect(() => {
    let isMounted = true;

    (async () => {
      if (allNotes.length) {
        const newArray = [...allNotes];
        const sortNotes = await newArray.sort((a: any, b: any) => {
          return b.date > a.date ? 1 : -1;
        });
        if (isMounted) {
          setNotes(sortNotes);
        }
      }
    })();

    setTimeout(() => {
      if (isMounted) {
        setStatusNotes("Not have the notes");
      }
    }, 1000);

    return () => {
      isMounted = false;
    };
  }, [allNotes]);

  return (
    <div className="notes-list">
      {notes.map((note: INote, i) => (
        <NoteItem {...note} key={i} />
      ))}
      {!notes.length && (
        <span
          style={{
            fontSize: "20px",
            fontFamily: "Roboto",
            fontWeight: "600",
            userSelect: "none",
          }}
        >
          {statusNotes}
        </span>
      )}
    </div>
  );
}