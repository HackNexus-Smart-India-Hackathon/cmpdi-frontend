import React from 'react';
import QuarterlyExpenditure from '../components/charts/QuaterlyExpenditure';
import ChatList from '../components/chat/chatlist';
import FormsList from '../components/FormList';
import GanttChart from '../components/ganttchart';
import Navbar from '../components/Navbar';
import ProjectDetails from '../components/ProjectDetails';
import Sidebar from '../components/Sidebar';
const Project = () => {
  return (
    <div>
      <Navbar className="min-h-screen flex flex-col" />
      <div className="flex flex-1">
        <div className="w-[17vw]">
          <Sidebar />
        </div>
        <div className="flex-1">
          <ProjectDetails />
          <GanttChart />
          <FormsList />
          <div>
            <QuarterlyExpenditure />
          </div>
        </div>
        <ChatList />
      </div>
    </div>
  );
};

export default Project;
