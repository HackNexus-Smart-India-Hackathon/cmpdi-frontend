import React from 'react';
import ChatList from '../components/chat/chatlist';
import Navbar from '../components/Navbar';
import ScheduleTable from '../components/ScheduleTable';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';
const InvestigatorConsole = () => {
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
            <Timeline />
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
