// Global import for App
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages for App
import Home from './pages/Home/Home';

// Styles
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

