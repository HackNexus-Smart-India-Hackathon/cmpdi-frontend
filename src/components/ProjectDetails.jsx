import React from 'react';

const project = {
  projectCode: 'P12345',
  projectTitle: 'Solar Energy Initiative',
  fundingSource: 'Green Energy Fund',
  principalImplementingAgency: 'Ministry of Renewable Energy',
  subImplementingAgencies: ['Agency A', 'Agency B'],
  projectInvestigatorEmail: [
    'investigator1@example.com',
    'investigator2@example.com',
  ],
  startDate: '2024-01-15T00:00:00.000Z',
  scheduleCompletionDate: '2025-12-31T00:00:00.000Z',
};

const ProjectDetails = () => {
  return (
    <div className=" my-8 p-8 bg-gradient-to-b from-gray-100 to-white border border-gray-200 rounded-lg shadow-lg">
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
            <p className="text-sm font-medium text-gray-500">Funding Source</p>
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
            {project.projectInvestigatorEmail.map((email, index) => (
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

export default ProjectDetails;
