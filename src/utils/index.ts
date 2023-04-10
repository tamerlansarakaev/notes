import { INote } from '../Types/Types';

export const findCurrentNote = (notes: INote[], id: string | undefined) => {
  const findNote = notes.find((note) => {
    return note.id.toString() === id;
  });

  return findNote;
};
