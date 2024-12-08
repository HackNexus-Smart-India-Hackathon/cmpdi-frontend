import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(project);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PROJECT_BASE_API}/api/projects/project/${id}`
        );
        console.log(response.data);
        setProject(response.data.project);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
  }, [id]);

  const renderProjectDetails = () => {
    return (
      <div className="w-[80vw] mx-auto p-6 bg-white shadow-md border rounded-lg my-8  bg-gradient-to-b from-gray-100 to-white  border-gray-200">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {project.projectTitle}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-semibold">Project Code:</span>{' '}
            {project.projectCode}
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Funding Source
              </p>
              <p className="text-gray-800">{project.fundingSource}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Principal Implementing Agency
              </p>
              <p className="text-gray-800">
                {project.principalImplementingAgency}
              </p>
            </div>
            {project.subImplementingAgencies?.length > 0 && (
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">
                  Sub-Implementing Agencies
                </p>
                <p className="text-gray-800">
                  {project.subImplementingAgencies.join(', ')}
                </p>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Project Investigator Email(s)
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.projectInvestigatorEmail?.map((email, index) => (
                <span
                  key={index}
                  className="inline-block px-4 py-2 bg-slate-100 text-slate-800 rounded-full text-sm font-medium border border-slate-300"
                >
                  {email}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Start Date</p>
              <p className="text-gray-800">
                {new Date(project.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Scheduled Completion Date
              </p>
              <p className="text-gray-800">
                {new Date(project.scheduleCompletionDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <div>{renderProjectDetails()}</div>
      )}
    </>
  );
};

export default ProjectDetails;
