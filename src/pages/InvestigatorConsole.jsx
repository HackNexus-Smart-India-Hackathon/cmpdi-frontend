import React from 'react';
import ChatList from '../components/chat/chatlist';
import Navbar from '../components/Navbar';
import ScheduleTable from '../components/ScheduleTable';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';
const InvestigatorConsole = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <header className="w-full">
        <Navbar />
      </header>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-[17vw] bg-gray-100 border-r border-gray-300">
          <Sidebar />
        </aside>

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
