import { Auth } from 'firebase/auth';
import { INote, IUser } from '../Types/Types';
import { getDatabase, ref, remove, set } from 'firebase/database';
import { debounce } from '@mui/material';

export const findCurrentNote = (notes: INote[], id: string | undefined) => {
  try {
    const findNote = notes.find((note) => {
      return note.id.toString() === id?.toString();
    });

    return findNote;
  } catch {
    return null;
  }
};

export const validateLoginStatus = (auth: Auth): Promise<IUser | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser && authUser.email) {
        const currentUser: IUser = {
          email: authUser.email,
          id: authUser.uid,
        };
        resolve(currentUser);
      } else {
        resolve(null);
        reject({ type: 'Not Authorization' });
      }
      unsubscribe();
    });
  });
};

export const writeDataNote = debounce((userId: any, notes: INote[]) => {
  const db = getDatabase();
  set(ref(db, `/users/${userId}/notes`), { ...notes });
}, 100);

export const deleteNote = async (userId: any, noteId: string | number) => {
  const db = getDatabase();
  try {
    const deleteNote = await remove(
      ref(db, `/users/${userId}/notes/${noteId}`)
    );
    return deleteNote;
  } catch (err) {
    return err;
  }
};

export const upperCaseNote = (note: INote) => {
  if (!note?.title) return;
  const upperCaseTitle = note.title.toUpperCase();
  const upperCaseDescription = note.description.toUpperCase();
  return {
    title: upperCaseTitle,
    description: upperCaseDescription,
    id: note.id,
  };
};
