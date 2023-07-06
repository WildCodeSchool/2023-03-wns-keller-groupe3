import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MapSelected from "./components/MapSelected";
import Home from "./Pages/Home";
import City from "./Pages/City";
import "./App.css";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/city' element={<City />} />
          <Route path='/city/:id' element={<MapSelected />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
