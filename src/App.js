import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Authentication/Login';
import ResetPassword from './components/Authentication/ResetPassword';
import SignUp from './components/Authentication/SignUp';
import TwoFactorAuth from './components/Authentication/TwoFactorAuth';
import AdminConsole from './pages/AdminConsole';
import './App.css';
import Profile from './pages/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
