// Global import for App
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import 'firebase/auth';

// Other
import { signInUser } from './redux/reducers/rootReducer';
import app from './Api/api';
import { INote, IRootReducer, IUser } from './Types/Types';
import { validateLoginStatus } from './utils/utils';

// Pages for App
import Home from './pages/Home/Home';
import Note from './pages/Note/Note';
import Login from './pages/Login/Login';

// Styles
import './App.scss';
import './vars/vars.scss';

function App(): React.ReactElement {
  const dispatch = useDispatch();
  const [statusUserLogin, setStatusUserLogin] = React.useState('');
  const loginStatus = useSelector(
    (state: IRootReducer) => state.rootReducer.loginStatus
  );
  const updateStatus = useSelector(
    (state: IRootReducer) => state.rootReducer.update
  );
  const authStatus = useSelector(
    (state: IRootReducer) => state.rootReducer.authStatus
  );

  async function getData(): Promise<IUser | null> {
    const auth = getAuth();
    const validateUser = await validateLoginStatus(auth);
    const db = getDatabase();
    const starCountRef = ref(db, '/users');

    if (!validateUser) {
      return null;
    }

    try {
      const snapshot = await get(starCountRef);
      const data = snapshot.val();
      const userArray = Object.values(data);

      const result: any = userArray.find((user: any) => {
        return validateUser.email === user.email;
      });

      return result;
    } catch (error) {
      return null;
    }
  }

  React.useEffect(() => {
    if (updateStatus) {
      const setData = async () => {
        const data: any = await getData();
        return data;
      };

      setData().then((data: IUser) => {
        let notesList: INote[] = [];
        if (data.notes) {
          const inArray: INote[] = Object.values(data.notes);
          const inArrayKeys = Object.keys(data.notes);

          inArray.forEach((note: INote, i) => {
            if (note) {
              notesList.push({ ...note, id: inArrayKeys[i] });
            }
          });
          if (notesList) {
            dispatch(
              signInUser({
                notes: notesList,
                user: { email: data.email, id: data.id },
                authStatus: 'Authorized',
              })
            );
            setStatusUserLogin('Authorized');
            return;
          }
        } else if (!notesList.length) {
          dispatch(
            signInUser({
              notes: notesList,
              user: { email: data.email, id: data.id },
              authStatus: 'Authorized',
            })
          );
        } else {
          dispatch(
            signInUser({ authStatus: 'Not Authorized', notes: [], user: {} })
          );
          setStatusUserLogin('Not Authorized');
          return data;
        }
      });
    }
  }, [loginStatus, authStatus, updateStatus]);

  React.useEffect(() => {
    if (authStatus) {
      setStatusUserLogin(authStatus);
    }
  }, [authStatus]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/notes/:id" element={<Note />} />
        {statusUserLogin === 'Not Authorized' ? (
          <Route path="/login" element={<Login />} />
        ) : (
          ''
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
