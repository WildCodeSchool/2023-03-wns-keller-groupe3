import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";
import City from "./Pages/City";
import Map from "./Pages/Map";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/city'>City</Link>
            </li>
            <li>
              <Link to='/map'>Map</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/city' element={<City />} />
          <Route path='/map' element={<Map />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
