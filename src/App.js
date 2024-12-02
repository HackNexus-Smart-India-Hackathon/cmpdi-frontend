import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Authentication/Login';
import ResetPassword from './components/Authentication/ResetPassword';
import SignUp from './components/Authentication/SignUp';
import TwoFactorAuth from './components/Authentication/TwoFactorAuth';
import ProjectOnboarding from './components/ProjectOnboarding';
import AdminConsole from './pages/AdminConsole';
import './App.css';
import InvestigatorConsole from './pages/InvestigatorConsole';
import Profile from './pages/profile';
import Project from './pages/project';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/twofactorauthentication" element={<TwoFactorAuth />} />
        <Route path="/admin/dashboard" element={<AdminConsole />} />
        <Route
          path="/investigator/dashboard"
          element={<InvestigatorConsole />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="project/:title/:code" element={<Project />} />
        <Route path="project/onboard" element={<ProjectOnboarding />} />
      </Routes>
    </Router>
  );
}

export default App;
