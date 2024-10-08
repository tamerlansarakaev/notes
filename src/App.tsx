// Global import for App
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "firebase/auth";

// Other
import { signInUser } from "./redux/reducers/rootReducer";
import { INote, IRootReducer, IUser } from "./Types/Types";
import { getData } from "./utils/utils";

// Pages for App
import Home from "./pages/Home/Home";
import Note from "./pages/Note/Note";
import Login from "./pages/Login/Login";

// Styles
import "./App.scss";
import "./vars/vars.scss";
import Register from "./pages/Register/Register";

function App(): React.ReactElement {
  const dispatch = useDispatch();
  const [statusUserLogin, setStatusUserLogin] = React.useState("");
  const loginStatus = useSelector(
    (state: IRootReducer) => state.rootReducer.loginStatus
  );
  const updateStatus = useSelector(
    (state: IRootReducer) => state.rootReducer.update
  );
  const authStatus = useSelector(
    (state: IRootReducer) => state.rootReducer.authStatus
  );

  React.useEffect(() => {
    if (updateStatus) {
      const setData = async () => {
        const data: any = await getData(dispatch);
        return data;
      };

      setData().then((data: IUser) => {
        if (!data) return;

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
                authStatus: "Authorized",
              })
            );

            setStatusUserLogin("Authorized");
            return;
          }
        } else if (!notesList.length) {
          dispatch(
            signInUser({
              notes: notesList,
              user: { email: data.email, id: data.id },
              authStatus: "Authorized",
            })
          );
        } else {
          dispatch(
            signInUser({ authStatus: "Not Authorized", notes: [], user: {} })
          );

          setStatusUserLogin("Not Authorized");
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

  React.useEffect(() => {
    speechSynthesis.cancel();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/:id" element={<Note />} />

        {statusUserLogin === "Not Authorized" ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          ""
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
