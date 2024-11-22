import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminConsole from "./pages/AdminConsole";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <p className="flex justify-center items-center">cmpdi-frontend</p>
        <button>
          <Link to="/AdminConsole">click</Link>
        </button>
      </div>
      <Routes>
        <Route path="/AdminConsole" element={<AdminConsole />} />
      </Routes>
    </Router>
  );
}

export default App;
