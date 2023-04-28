import { Auth, getAuth } from 'firebase/auth';
import { INote, IUser } from '../Types/Types';
import { get, getDatabase, ref, remove, set } from 'firebase/database';
import { debounce } from '@mui/material';
import { INewNote } from '../Components/CreateNote/CreateNote';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../redux/reducers/rootReducer';

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

export const writeDataNote = debounce((userId: any, note: INote) => {
  const db = getDatabase();
  set(ref(db, `/users/${userId}/notes/${note.id}`), { ...note });
}, 100);

export const deleteNote = async (userId: any, noteId: string | number) => {
  const db = getDatabase();
  try {
    const deleteNote = await remove(
      ref(db, `/users/${userId}/notes/${noteId}`)
    );
    console.log(noteId);
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
    date: note.date,
  };
};

export const createNote = async (note: INewNote, userId: string) => {
  const db = getDatabase();
  set(ref(db, `/users/${userId}/notes/${note.id}`), { ...note });
};

export async function getData(
  dispatch: any
): Promise<IUser | null | undefined> {
  const auth = getAuth();
  const validateUser = await validateLoginStatus(auth);
  if (!validateUser) {
    dispatch(signOutUser());
  }
  const db = getDatabase();
  const starCountRef = ref(db, '/users');

  try {
    if (validateUser?.email) {
      const snapshot = await get(starCountRef);
      const data = snapshot.val();
      const userArray = Object.values(data);
      const result: any = userArray.find((user: any) => {
        return validateUser.email === user.email;
      });

      return result;
    }
  } catch (error) {
    return null;
  }
  return;
}
