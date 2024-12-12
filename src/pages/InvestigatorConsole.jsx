import React from 'react';
import { useSelector } from 'react-redux';
import ChatList from '../components/chat/chatlist';
import GanttChart from '../components/ganttchart';
import Navbar from '../components/Navbar';
import ScheduleTable from '../components/ScheduleTable';
import Sidebar from '../components/Sidebar';
// import Timeline from '../components/Timeline';
const InvestigatorConsole = () => {
  const { project } = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className="w-[17vw]">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-grow p-4 bg-white overflow-y-auto">
          {/* Timeline */}
          <section className="mb-6">
            <GanttChart id={project.id} />
          </section>

          {/* Schedule Table */}
          <section>
            <ScheduleTable />
          </section>
          <ChatList />
        </main>
      </div>
    </div>
  );
};

export default InvestigatorConsole;
