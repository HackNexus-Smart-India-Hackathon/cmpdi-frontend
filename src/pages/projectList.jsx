import React from 'react';
import Navbar from '../components/Navbar';
import ProjectTable from '../components/projectList';
import Sidebar from '../components/Sidebar';

const ProjectList = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-1">
        <div className="w-[17vw]">
          <Sidebar />
        </div>
        <div className="w-[80vw] m-6 ">
          <ProjectTable />
        </div>
      </div>
    </>
  );
};

export default ProjectList;
