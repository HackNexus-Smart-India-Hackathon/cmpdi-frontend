import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/loginSignup/Login';
import ResetPassword from './components/loginSignup/ResetPassword';
import SignUp from './components/loginSignup/SignUp';
import TwoFactorAuth from './components/loginSignup/TwoFactorAuth';
import AdminConsole from './pages/AdminConsole';
import './App.css';
import Profile from './pages/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/twofactorauthentication" element={<TwoFactorAuth />} />
        <Route path="/adminconsole" element={<AdminConsole />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
