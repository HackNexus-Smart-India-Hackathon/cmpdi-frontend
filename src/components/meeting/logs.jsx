import React, { useState } from 'react';

const MeetingLogApp = () => {
  // State for projects, meetings, and selected data
  const [projects] = useState([
    { id: 1, name: 'Project Alpha' },
    { id: 2, name: 'Project Beta' },
    { id: 3, name: 'Project Gamma' },
  ]);
  const [meetings, setMeetings] = useState({
    1: [
      {
        id: 1,
        title: 'Kickoff Meeting',
        logs: ['Introduced team', 'Discussed goals'],
      },
      {
        id: 2,
        title: 'Sprint Review',
        logs: ['Reviewed progress', 'Feedback session'],
      },
    ],
    2: [
      {
        id: 3,
        title: 'Initial Planning',
        logs: ['Defined roadmap', 'Set deadlines'],
      },
      {
        id: 4,
        title: 'Design Review',
        logs: ['Reviewed UI mockups', 'Updated requirements'],
      },
    ],
    3: [
      {
        id: 5,
        title: 'Requirements Gathering',
        logs: ['Identified key features', 'Noted risks'],
      },
      {
        id: 6,
        title: 'Testing Session',
        logs: ['Tested functionality', 'Fixed bugs'],
      },
    ],
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // Function to handle adding a new log
  const addNewLog = (meetingId, newLog) => {
    setMeetings((prevMeetings) => ({
      ...prevMeetings,
      [selectedProject]: prevMeetings[selectedProject].map((meeting) =>
        meeting.id === meetingId
          ? { ...meeting, logs: [...meeting.logs, newLog] }
          : meeting
      ),
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-[85vh]">
      {/* Project List */}
      <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Projects</h3>
        <ul className="space-y-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className={`p-3 rounded-lg shadow-sm cursor-pointer ${
                selectedProject === project.id
                  ? 'bg-blue-100 border-l-4 border-blue-500'
                  : 'bg-gray-100'
              }`}
              onClick={() => {
                setSelectedProject(project.id);
                setSelectedMeeting(null); // Reset meeting selection
              }}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Meeting List */}
      <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">
          {selectedProject
            ? `Meetings for ${projects.find((p) => p.id === selectedProject)?.name}`
            : 'Select a Project'}
        </h3>
        {selectedProject ? (
          <ul className="space-y-3">
            {meetings[selectedProject]?.map((meeting) => (
              <li
                key={meeting.id}
                className={`p-3 rounded-lg shadow-sm cursor-pointer ${
                  selectedMeeting?.id === meeting.id
                    ? 'bg-green-100 border-l-4 border-green-500'
                    : 'bg-gray-100'
                }`}
                onClick={() => setSelectedMeeting(meeting)}
              >
                {meeting.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No project selected.</p>
        )}
      </div>

      {/* Meeting Logs */}
      <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-4">
        {selectedMeeting ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {selectedMeeting.title}
            </h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              {selectedMeeting.logs.map((log, index) => (
                <li key={index} className="text-gray-700">
                  {log}
                </li>
              ))}
            </ul>
            <button
              onClick={() =>
                addNewLog(selectedMeeting.id, prompt('Enter a new log:'))
              }
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Add New Log
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Select a meeting to view logs.</p>
        )}
      </div>
    </div>
  );
};

export default MeetingLogApp;
