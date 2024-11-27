import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './components/loginSignup/LoginSignup';
import AdminConsole from './pages/AdminConsole';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
      </Routes>
      <Routes>
        <Route path="/AdminConsole" element={<AdminConsole />} />
      </Routes>
    </Router>
  );
}

export default App;
