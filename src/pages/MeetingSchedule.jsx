import React from 'react';
import Scheduler from '../components/meeting/meetingSchedule';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MeetingSchedule = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className="w-64">
          <Sidebar />
        </div>

        <div className="flex-1 mx-10">
          <Scheduler />
        </div>
      </div>
    </div>
  );
};

export default MeetingSchedule;
