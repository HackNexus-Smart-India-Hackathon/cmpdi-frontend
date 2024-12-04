import { IconButton } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ProjectTable = () => {
  const [showActions, setShowActions] = useState(null);
  const actionMenuRef = useRef(null);
  const navigate = useNavigate();

  const projects = [
    {
      title: 'Next-Gen',
      code: 'NG001',
      piNames: ['Esther Howard', 'Alex Johnson'],
      start: '01/05/2024',
      complete: '31/12/2024',
      status: 'Completed',
    },
    {
      title: 'Next-Gen',
      code: 'NG002',
      piNames: ['Guy Hawkins', 'Michael Brown'],
      start: '15/03/2024',
      complete: '30/09/2024',
      status: 'Pending',
    },
    {
      title: 'Wippo',
      code: 'WP001',
      piNames: ['Robert Fox', 'Sarah Connor'],
      start: '10/06/2024',
      complete: '31/01/2025',
      status: 'Completed',
    },
    {
      title: 'Orlando',
      code: 'OR001',
      piNames: ['Wade Warren', 'Laura Smith'],
      start: '20/08/2024',
      complete: '15/02/2025',
      status: 'Completed',
    },
  ];

  const statusColors = {
    Completed: 'bg-green-100 text-green-600',
    Pending: 'bg-yellow-100 text-yellow-600',
  };

  const toggleActions = (index) => {
    setShowActions(showActions === index ? null : index);
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
  const handleView = (code, title) => {
    navigate(`/project/${title}/${code}`);
  };

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
          {projects.map((project, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3">{project.title}</td>
              <td className="p-3">{project.code}</td>
              <td className="p-3">
                {project.piNames.map((name, i) => (
                  <div key={i}>{name}</div>
                ))}
              </td>
              <td className="p-3">{project.start}</td>
              <td className="p-3">{project.complete}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
