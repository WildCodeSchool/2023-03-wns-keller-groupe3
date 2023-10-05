import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MapSelected from "./components/MapSelected";
import "./App.css";
import Nav from "./components/Nav";
import Cities from "./pages/Cities";
import Home from "./pages/Home";
import User from "./pages/User";

function App() {
  console.log("------------UPDATED VIA WEBHOOK-------------");
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user' element={<User />} />
          <Route path='/cities' element={<Cities />} />
          <Route path='/city/:id' element={<MapSelected />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
