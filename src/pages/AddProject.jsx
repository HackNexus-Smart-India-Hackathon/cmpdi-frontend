import React from 'react';
import Navbar from '../components/Navbar';
import ProjectOnboarding from '../components/ProjectOnboarding';
import Sidebar from '../components/Sidebar';
const Project = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex flex-1">
          <div className="w-64">
            <Sidebar />
          </div>

          <div className="flex-1 mx-10">
            <ProjectOnboarding />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
