import { Auth } from 'firebase/auth';
import { INote, IUser } from '../Types/Types';

export const findCurrentNote = (notes: INote[], id: string | undefined) => {
  const findNote = notes.find((note) => {
    return note.id.toString() === id;
  });

  return findNote;
};

export const validateLoginStatus = (auth: Auth): Promise<IUser | null> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser && authUser.email) {
        const currentUser: IUser = {
          email: authUser.email,
          id: authUser.uid,
        };
        resolve(currentUser);
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
};
