import { IconButton } from '@mui/material';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProjectTable = () => {
  const projectBaseUrl = process.env.REACT_APP_PROJECT_BASE_API;
  const [showActions, setShowActions] = useState(null);
  const [projects, setProjects] = useState([]);
  const { user_id } = useSelector((state) => state.auth);
  const [isLoadingProject, setIsLoadingProject] = useState(true);

  const actionMenuRef = useRef(null);
  const navigate = useNavigate();

  const statusColors = {
    Completed: 'bg-green-100 text-green-600',
    ongoing: 'bg-yellow-100 text-yellow-600',
  };

  const toggleActions = (index) => {
    setShowActions(showActions === index ? null : index);
  };
  const handleView = (code, title) => {
    navigate(`/project/${title}/${code}`);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        setShowActions(null); // Close the action menu
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get(
          `${projectBaseUrl}/api/projects/admin/${user_id}/projects`
        );
        setProjects(response.data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoadingProject(false);
      }
    };
    getProjects();
  }, [projectBaseUrl, user_id]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 text-gray-600">Title</th>
            <th className="p-3 text-gray-600">Code</th>
            <th className="p-3 text-gray-600">PI Names</th>
            <th className="p-3 text-gray-600">Start Date</th>
            <th className="p-3 text-gray-600">Complete Date</th>
            <th className="p-3 text-gray-600">Status</th>
            <th className="p-3 text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingProject ? (
            <p>Loading projects...</p>
          ) : (
            projects.map((project, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{project.projectTitle}</td>
                <td className="p-3">{project.projectCode}</td>
                <td className="p-3">
                  {project.projectInvestigatorEmail.map((name, i) => (
                    <div key={i}>{name}</div>
                  ))}
                </td>
                <td className="p-3">{project.startDate.slice(0, 10)}</td>
                <td className="p-3">
                  {project.scheduleCompletionDate.slice(0, 10)}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-sm rounded-full font-medium ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="p-3 relative">
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => toggleActions(index)}
                  >
                    <IconButton color="inherit">
                      <FiMoreVertical />
                    </IconButton>
                  </button>
                  {showActions === index && (
                    <div
                      ref={actionMenuRef}
                      className="z-10 absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg"
                    >
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => handleView(project.title, project.code)}
                      >
                        View
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => alert('Edit')}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
