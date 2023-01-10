import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import StaffList from "./pages/stafflist";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/staff" element={<StaffList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
