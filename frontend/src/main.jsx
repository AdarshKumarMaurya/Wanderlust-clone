import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import New from './New.jsx';
import Show from './Show.jsx';
import Edit from './Edit.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <Navbar />
    <Routes>
      {/* Define a path and element for each route */}
      <Route path="/" element={<App />} />
      <Route path='/listing/new' element={<New/>} />
      <Route path="/listing/:id" element={<Show />} />
      <Route path="/listing/update/:id/edit" element={<Edit />} />
      {/* You can add more routes here */}
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);

