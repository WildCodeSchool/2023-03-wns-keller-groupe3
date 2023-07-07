import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MapSelected from "./components/MapSelected";
import Home from "./Pages/Home";
import Cities from "./Pages/Cities";
import "./App.css";
import Nav from "./components/Nav";
import User from "./Pages/User";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/city" element={<Cities />} />
          <Route path="/city/:id" element={<MapSelected />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
