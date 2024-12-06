import { Modal } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Scheduler from './meetingSchedule';

const MeetingLogApp = () => {
  const projectBaseUrl = process.env.REACT_APP_PROJECT_BASE_API;
  const meetBaseUrl = process.env.REACT_APP_MEET_BASE_API;
  const [projects, setProjects] = useState([]);
  const { user_id } = useSelector((state) => state.auth);
  const [meetings, setMeetings] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [isLoadingMeeting, setIsLoadingMeeting] = useState(false);
  const [isScheduleMeetModalOpen, setIsScheduleMeetModalOpen] = useState(false);
  const [isAddLogModalOpen, setIsAddLogModalOpen] = useState(false);
  const [newLog, setNewLog] = useState('');

  // Function to handle adding a new log
  const addNewLog = async (meetingId, newLog) => {
    try {
      const response = await axios.put(
        `${meetBaseUrl}/meeting/create/logs/${meetingId}`,
        {
          logs: newLog,
        }
      );
      if (response.status === 200) {
        setMeetings((meetings) =>
          meetings.map((meeting) =>
            meeting.id === meetingId
              ? { ...meeting, logs: [...meeting.logs, newLog] }
              : meeting
          )
        );
        setIsAddLogModalOpen(false);
      }
    } catch (error) {
      console.error('Error adding log to meeting:', error);
      alert('Failed to add log. Please try again.');
    }
  };

  const getMeetings = async (projectId) => {
    setIsLoadingMeeting(true);
    try {
      const response = await axios.get(`${meetBaseUrl}/meeting/${projectId}`);
      setMeetings(response.data.meeting || []);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    } finally {
      setIsLoadingMeeting(false);
    }
  };

  const handleProjectSelection = (projectId) => {
    setSelectedProject(projectId);
    setSelectedMeeting(null);
    getMeetings(projectId);
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get(
          `${projectBaseUrl}/api/projects/admin/${user_id}/projects`
        );
        setProjects(response.data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoadingProject(false);
      }
    };
    getProjects();
  }, [projectBaseUrl, user_id]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-[85vh]">
      {/* Project List */}
      <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Projects</h3>
        {isLoadingProject ? (
          <p>Loading projects...</p>
        ) : (
          <ul className="space-y-3">
            {projects.map((project) => (
              <li
                key={project.id}
                className={`p-3 rounded-lg shadow-sm cursor-pointer ${
                  selectedProject === project.id
                    ? 'bg-blue-100 border-l-4 border-blue-500'
                    : 'bg-gray-100'
                }`}
                onClick={() => handleProjectSelection(project.id)}
              >
                {project.projectTitle}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Meeting List */}
      <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">
          {selectedProject
            ? `Meetings for ${
                projects.find((project) => project.id === selectedProject)
                  ?.projectTitle
              }`
            : 'Select a Project'}
        </h3>
        {selectedProject ? (
          <>
            {isLoadingMeeting ? (
              <p>Loading meetings...</p>
            ) : meetings.length > 0 ? (
              <ul className="space-y-3">
                {meetings.map((meeting) => (
                  <li
                    key={meeting.id}
                    className={`p-3 rounded-lg shadow-sm cursor-pointer ${
                      selectedMeeting?.id === meeting.id
                        ? 'bg-blue-100 border-l-4 border-blue-500'
                        : 'bg-gray-100'
                    }`}
                    onClick={() => setSelectedMeeting(meeting)}
                  >
                    {meeting.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No meetings found.</p>
            )}
            <button
              onClick={() => setIsScheduleMeetModalOpen(true)}
              className="mt-4 bg-black text-white px-4 py-2 rounded-lg "
            >
              Schedule Meeting
            </button>
          </>
        ) : (
          <p>Select a project to view meetings.</p>
        )}
      </div>
      <Modal
        open={isScheduleMeetModalOpen}
        onClose={() => setIsScheduleMeetModalOpen(false)}
      >
        <Scheduler
          project_id={selectedProject}
          setIsScheduleMeetModalOpen={setIsScheduleMeetModalOpen}
        />
      </Modal>

      {/* Meeting Logs */}
      <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-4">
        {selectedMeeting ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {selectedMeeting.title}
            </h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              {Array.isArray(selectedMeeting.logs) &&
              selectedMeeting.logs.length > 0 ? (
                selectedMeeting.logs.map((log, index) => (
                  <li key={index} className="text-gray-700">
                    {log}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No logs added yet.</li>
              )}
            </ul>
            <button
              onClick={() => setIsAddLogModalOpen(true)}
              className="bg-black text-white px-4 py-2 rounded-lg "
            >
              Add New Log
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Select a meeting to view logs.</p>
        )}
      </div>
      <Modal
        open={isAddLogModalOpen}
        onClose={() => setIsAddLogModalOpen(false)}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white border-2  shadow-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Add New Log</h3>
          <textarea
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter meeting log"
            value={newLog}
            onChange={(e) => setNewLog(e.target.value)}
          ></textarea>
          <button
            onClick={() => addNewLog(selectedMeeting.id, newLog)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Log
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MeetingLogApp;
