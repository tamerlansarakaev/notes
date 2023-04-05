// Global import for App
import React from 'react';
import { BrowserRouter, Routes, Route, useActionData } from 'react-router-dom';

// Other
import { useDispatch } from 'react-redux';
import { defaultData } from './redux/reducers/rootReducer';

// Pages for App
import Home from './pages/Home/Home';

// Styles
import './App.scss';
import Note from './pages/Note/Note';

function App() {
  const dispatch = useDispatch();

  const notes = [
    {
      id: 1,
      title: 'Hello my World',

      description: '',
    },
    { id: 2, title: 'Hello my World', description: 'Thanks' },
    { id: 3, title: 'Hi', description: 'fdfdf' },
    { id: 4, title: 'Hi', description: 'fdfdf' },
    { id: 5, title: 'Hi', description: 'fdfdf' },
    { id: 6, title: 'What', description: 'fdfdfdfdf' },
  ];
  function loadData() {
    dispatch(defaultData(notes));
  }

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/notes/:id" element={<Note />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
