import axios from 'axios';
import React, { useState } from 'react';
import FileUpload from '../FileUpload';
import ProjectDetails from '../ProjectDetails';

const ProjectCompletionReportForm = () => {
  const initialValues = {
    projectId: '',
    actualCompletionDate: '',
    objectives: '',
    workProgram: '',
    workDoneDetails: '',
    objectivesFulfilled: '',
    reasonsUncovered: '',
    furtherStudiesNeeded: '',
    conclusions: '',
    applicationScope: '',
    associatedPersons: '',
    finalExpenditureStatement: '',
  };

  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    const stringValue = value != null ? String(value) : ''; // Ensure value is a string

    if (!stringValue.trim()) {
      return 'This field is required.';
    }

    // Specific validation for dates
    if (name === 'actualCompletionDate') {
      const date = new Date(stringValue);
      if (isNaN(date)) {
        return 'Please provide a valid date.';
      }
    }

    if (name === 'projectId' && isNaN(stringValue)) {
      return 'Project ID must be a number.';
    }

    return '';
  };

  const validateForm = () => {
    formData.projectId = 1;
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setErrors({});

      try {
        const response = await axios.post(
          'http://localhost:5001/api/forms/project-completion-report',
          formData
        );

        console.log(response.data);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          if (data.fieldErrors) {
            setErrors(data.fieldErrors);
          } else {
            alert(`Error: ${data.message || 'An unknown error occurred.'}`);
          }
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('No response from the server. Please try again later.');
        } else {
          console.error('Error setting up the request:', error.message);
          alert(
            'An error occurred while submitting the form. Please try again.'
          );
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <ProjectDetails />
      <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-10 text-center">
          Project Completion Report Form
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block font-medium mb-3">Required Details</label>
          <div className="space-y-4">
            {[
              {
                name: 'objectives',
                label: 'Objectives as Stated in the Proposal',
              },
              {
                name: 'workProgram',
                label: 'Proposed and Approved Work Programme',
              },
              {
                name: 'workDoneDetails',
                label: 'Details of Work Done During the Project',
              },
              {
                name: 'objectivesFulfilled',
                label: 'Extent to which Objectives have been Fulfilled',
              },
              {
                name: 'reasonsUncovered',
                label: 'Reasons for Not Covering Certain Areas',
              },
              {
                name: 'furtherStudiesNeeded',
                label: 'Need for Further Studies',
              },
              { name: 'conclusions', label: 'Conclusions and Recommendations' },
              {
                name: 'applicationScope',
                label: 'Scope of Application in Industry',
              },
              {
                name: 'associatedPersons',
                label: 'Names of Associated Persons and Their Expertise',
              },
              {
                name: 'finalExpenditureStatement',
                label: 'Final Expenditure Statement',
              },
            ].map((field) => (
              <div
                key={field.name}
                className="border rounded-lg shadow-sm bg-white overflow-hidden"
              >
                {/* Collapsible Section Header */}
                <button
                  type="button"
                  className={`w-full p-4 text-left font-semibold transition ${
                    expanded === field.name ? 'bg-slate-300' : 'bg-gray-100'
                  }`}
                  onClick={() =>
                    setExpanded((prev) =>
                      prev === field.name ? null : field.name
                    )
                  }
                >
                  {field.label}
                </button>
                {/* Expanded Section Content */}
                {expanded === field.name && (
                  <div className="p-4 space-y-4">
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 mb-6">
            {[
              {
                name: 'actualCompletionDate',
                label: 'Actual completion data',
                type: 'date',
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-medium mb-2">{field.label}</label>
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          <FileUpload />

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 ${
                isSubmitting ? 'bg-gray-400' : 'bg-black'
              } text-white rounded-md hover:bg-slate-600 transition`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProjectCompletionReportForm;
