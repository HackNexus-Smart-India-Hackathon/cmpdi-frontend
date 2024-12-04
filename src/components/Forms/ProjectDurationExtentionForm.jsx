import axios from 'axios';
import React, { useState } from 'react';

const ProjectDurationExtensionForm = () => {
  const initialValues = {
    projectName: '',
    projectCode: '',
    principalAgency: '',
    projectLeader: '',
    startDate: '',
    completionDate: '',
    approvedObjectives: '',
    approvedWorkProgram: '',
    workDoneDetails: '',
    revisedSchedule: '',
    timeExtension: '',
    extensionReason: '',
    totalCost: '',
    actualExpenditure: '',
    furtherStudiesNeeded: '', // New optional field
    applicationScope: '', // New optional field
  };

  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    if (
      !value.trim() &&
      !['furtherStudiesNeeded', 'applicationScope'].includes(name)
    ) {
      return 'This field is required.';
    }
    if (name === 'timeExtension' && value <= 0) {
      return 'Time extension must be at least 1 month.';
    }
    if (['totalCost', 'actualExpenditure'].includes(name) && value < 0) {
      return 'Value cannot be negative.';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          'http://localhost:3000/api/forms/project-duration-extension',
          formData
        );
        console.log('Form submitted successfully:', response.data);
        // alert('Form submitted successfully!');
        // setFormData(initialValues); // Reset the form
      } catch (error) {
        alert('An error occurred while submitting the form.');
        console.error(error.response?.data || error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          apiError: error.response?.data?.message || 'Unknown error occurred.',
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Extension of Project Duration Form
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {[
            /* Render standard input fields */
            { name: 'projectName', label: 'Project Name' },
            { name: 'projectCode', label: 'Project Code' },
            { name: 'principalAgency', label: 'Principal Implementing Agency' },
            { name: 'projectLeader', label: 'Project Leader/Coordinator' },
            { name: 'startDate', label: 'Start Date', type: 'date' },
            {
              name: 'completionDate',
              label: 'Scheduled Completion Date',
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

        <div className="space-y-4">
          {[
            /* Render expandable textarea fields */
            { name: 'approvedObjectives', label: 'Approved Objectives' },
            {
              name: 'approvedWorkProgram',
              label: 'Approved Work Program and Schedule',
            },
            { name: 'workDoneDetails', label: 'Details of Work Done' },
            {
              name: 'revisedSchedule',
              label: 'Revised Bar Chart/PERT Network with Justification',
            },
            {
              name: 'extensionReason',
              label: 'Reason for Proposed Time Extension',
            },
            {
              name: 'furtherStudiesNeeded',
              label: 'Further Studies Needed (Optional)',
            },
            { name: 'applicationScope', label: 'Application Scope (Optional)' },
          ].map((field) => (
            <div
              key={field.name}
              className="border rounded-lg shadow-sm bg-white overflow-hidden"
            >
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
              {expanded === field.name && (
                <div className="p-4">
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm">{errors[field.name]}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {[
            /* Render numeric fields */
            {
              name: 'timeExtension',
              label: 'Proposed Time Extension (Months)',
              type: 'number',
            },
            {
              name: 'totalCost',
              label: 'Total Cost of the Project (₹ Lakhs)',
              type: 'number',
            },
            {
              name: 'actualExpenditure',
              label: 'Actual Expenditure Incurred (₹ Lakhs)',
              type: 'number',
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block font-medium mb-2">{field.label}</label>
              <input
                type={field.type}
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

        {errors.apiError && (
          <p className="text-red-500 mt-4">{errors.apiError}</p>
        )}

        <div className="mt-8 flex justify-end">
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
  );
};

export default ProjectDurationExtensionForm;
