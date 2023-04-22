// Global import for App
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import 'firebase/auth';

// Other
import { signInUser } from './redux/reducers/rootReducer';
import app from './Api/api';
import { IRootReducer, IUser } from './Types/Types';
import { validateLoginStatus } from './utils';

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
  const authStatus = useSelector(
    (state: IRootReducer) => state.rootReducer.authStatus
  );

  async function getData(): Promise<IUser | unknown> {
    const auth = getAuth(app);
    const validateUser = await validateLoginStatus(auth);
    const db = getDatabase();
    const starCountRef = ref(db, '/users');
    const result = new Promise((resolve) => {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const userArray = Object.values(data);
        if (validateUser) {
          const result: any = userArray.find((user: any) => {
            return validateUser.email === user.email;
          });
          resolve(result);
        } else {
          resolve(null);
        }
      });
    });
    if (!validateUser) {
      return null;
    }
    return result;
  }

  React.useEffect(() => {
    const setData = async () => {
      const data: any = await getData();
      return data;
    };

    setData().then((data: IUser) => {
      if (data) {
        dispatch(
          signInUser({
            notes: data.notes,
            user: { email: data.email, id: data.id },
            authStatus: 'Authorized',
          })
        );
        setStatusUserLogin('Authorized');
        return;
      } else {
        dispatch(
          signInUser({ authStatus: 'Not Authorized', notes: [], user: {} })
        );
        setStatusUserLogin('Not Authorized');
        return data;
      }
    });
  }, [loginStatus, authStatus]);

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
