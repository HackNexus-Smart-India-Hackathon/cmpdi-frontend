import React from 'react';
import Logs from '../components/meeting/logs';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
const MeetingLogs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className="w-64">
          <Sidebar />
        </div>

        <div className="flex-1 mx-10">
          <Logs />
        </div>
      </div>
    </div>
  );
};

export default MeetingLogs;
