import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Authentication/Login';
import ResetPassword from './components/Authentication/ResetPassword';
import SignUp from './components/Authentication/SignUp';
import TwoFactorAuth from './components/Authentication/TwoFactorAuth';
import FileUpload from './components/FileUpload';
import BarChart from './components/graphs/BarChart';
import PieChart from './components/graphs/PieChart';
import ProjectOnboarding from './components/ProjectOnboarding';
import ExcelDownload from "./components/exceldownload";
import Gantt from "./components/ganttchart.jsx";

import AddProject from "./pages/AddProject";
import AdminConsole from "./pages/AdminConsole";
import "./App.css";
import FormsFill from "./pages/formsFill";
import FormsList from "./pages/formsList";
import FormsView from "./pages/formsView";
import InvestigatorConsole from "./pages/InvestigatorConsole";
import MeetingLogs from "./pages/MeetingLogs";
import MeetingSchedule from "./pages/MeetingSchedule";
import Profile from "./pages/profile";
import Project from "./pages/project";
import ProjectList from "./pages/projectList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/:role/:userId" element={<SignUp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route
          path="/twofactorauthentication/:user_id"
          element={<TwoFactorAuth />}
        />
        <Route path="/admin/dashboard" element={<AdminConsole />} />
        <Route
          path="/investigator/dashboard"
          element={<InvestigatorConsole />}
        />
        <Route path="/profile" element={<Profile />} />

        <Route path="/project/:title" element={<Project />} />
        <Route path="/project/add" element={<AddProject />} />

        <Route path="/project/:title/:code/:id" element={<Project />} />
        {/* project id title code */}
        <Route path="/project/onboard" element={<ProjectOnboarding />} />
        <Route path="/project/all" element={<ProjectList />} />
        <Route path="/schedule/meetings" element={<MeetingSchedule />} />
        <Route path="/meeting/logs" element={<MeetingLogs />} />
        <Route path="/forms" element={<FormsList />} />
        <Route path="/forms/view/:title/:code" element={<FormsView />} />
        <Route path="/forms/fill/:title/:code" element={<FormsFill />} />
        <Route path="/piegraph" element={<PieChart />} />
        <Route path="/bargraph" element={<BarChart />} />
        <Route path="/fileupload" element={<FileUpload />} />
        <Route path="/exceldownload" element={<ExcelDownload />} />
        <Route path="/ganttchart" element={<Gantt />} />
      </Routes>
    </Router>
  );
}

export default App;

// Link: '/analytics',
//  { Item: 'Research Institute', Link: '/researcinstitute/all' },
//         { Item: 'Investigator', Link: '/investigator/all'
// { Item: 'Schedule Meetings', Link: '/schedule/meetings' },
//         { Item: 'Meeting Logs', Link: '/meeting/logs' }
