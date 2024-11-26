import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminConsole from './pages/AdminConsole';
import './App.css';
import LoginSignup from './components/loginSignup/LoginSignup';

function App() {
  return (
    // <Router>
    //   <div>
    //     <p className="flex justify-center items-center">cmpdi-frontend</p>
    //     <button>
    //       <Link to="/AdminConsole">Go to admin console</Link>
    //     </button>
    //   </div>
    //   <Routes>
    //     <Route path="/AdminConsole" element={<AdminConsole />} />
    //   </Routes>
    // </Router>
    <div>
      <LoginSignup />
    </div>
  );
}

export default App;
