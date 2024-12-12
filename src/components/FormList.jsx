import { IconButton } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ChatSection from '../components/chat/chatlist';

const FormsList = () => {
  const { id } = useParams();
  const { role } = useSelector((state) => state.auth);
  const forms = [
    { title: 'Fund Requisition', form: 'Form - II', link: 'Fund-Requisition' },
    {
      title: 'Quarterly Expenditure Statement',
      link: 'Quarterly-Expenditure-Statement',
      form: 'Form - III',
    },
    {
      title: 'Quarterly Statement on Capital Equipment',
      link: 'Quarterly-Statement-on-Capital-Equipment',
      form: 'Form - IV',
    },
    {
      title: 'Quarterly Status Report',
      link: 'Quarterly-Status-Report',
      form: 'Form - V',
    },
    {
      title: 'Project Completion Report',
      link: 'Project-Completion-Report',
      form: 'Form - VI',
    },
    {
      title: 'Extension of Project Duration',
      link: 'Extension-of-Project-Duration',
      form: 'Form - VII',
    },
    {
      title: 'Cost Revision or Re-appropriation',
      link: 'Cost-Revision-or-Re-appropriation',
      form: 'Form - VIII',
    },
  ];
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const actionMenuRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };
  const handelView = (title, index) => {
    navigate(`/forms/view/${title}/${index + 2}/${id}`);
  };
  const handelFill = (title, index) => {
    navigate(`/forms/fill/${title}/${index + 2}`, {
      state: { edit: false },
    });
  };
  const handelEdit = (title, index) => {
    navigate(`/forms/fill/${title}/${index + 2}`, {
      state: { edit: true },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        setDropdownOpen(null); // Close the action menu
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="w-[80vw] mx-auto p-6 bg-white shadow-md border rounded-lg">
      {/* Table Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Forms Table</h1>
      </div>

      {/* Table */}
      <table className="min-w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3">#</th>
            <th className="border border-gray-300 p-3">Form Name</th>
            <th className="border border-gray-300 p-3">Form Number</th>
            <th className="border border-gray-300 p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-3">{index + 1}</td>
              <td className="border border-gray-300 p-3">{form.title}</td>
              <td className="border border-gray-300 p-3">{form.form}</td>
              <td className="border border-gray-300 p-3 relative">
                {/* Dropdown Button */}
                <button
                  onClick={() => toggleDropdown(index)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <IconButton color="inherit">
                    <FiMoreVertical />
                  </IconButton>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen === index && (
                  <div
                    ref={actionMenuRef}
                    className="absolute z-10 bg-white border border-gray-300 shadow-lg rounded mt-1 right-0"
                  >
                    <ul className="text-sm">
                      {role === 'admin' ? (
                        <li
                          onClick={() => handelView(form.link, index)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          View
                        </li>
                      ) : (
                        <>
                          <li
                            onClick={() => handelFill(form.link, index)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            Fill
                          </li>
                          <li
                            onClick={() => handelView(form.link, index)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            View
                          </li>
                          <li
                            onClick={() => handelEdit(form.link, index)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            Edit
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ChatSection />
    </div>
  );
};

export default FormsList;
