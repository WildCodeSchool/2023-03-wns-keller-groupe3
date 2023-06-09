import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './Pages/Home';
import City from './Pages/City';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/city">City</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city" element={<City />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
