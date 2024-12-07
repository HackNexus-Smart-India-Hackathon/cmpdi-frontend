import axios from 'axios';
import React, { useState } from 'react';
// import FileUpload from '../FileUpload';
import ProjectDetails from '../ProjectDetails';

const ProjectDurationExtensionForm = ({ edit }) => {
  const initialValues = {
    projectId: 1,
    approvedObjectives: '',
    approvedWorkProgram: '',
    workDoneDetails: '',
    revisedSchedule: '',
    timeExtension: '',
    extensionReason: '',
    totalCost: '',
    actualExpenditure: '',
    furtherStudiesNeeded: '',
    applicationScope: '',
  };

  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    if (name === 'projectId') return '';
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
    console.log(newErrors);
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
      formData.projectId = 1;
      try {
        const response = await axios.post(
          'http://localhost:5001/api/forms/project-duration-extension',
          formData
        );
        console.log('Form submitted successfully:', response.data);
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
    <>
      <ProjectDetails />
      <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-10 ">
          Extension of Project Duration Form
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block font-medium mb-3">Required Details</label>
          <div className="space-y-4">
            {[
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
              {
                name: 'applicationScope',
                label: 'Application Scope (Optional)',
              },
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
                      <p className="text-red-500 text-sm">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-6 mt-6">
            {[
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
                <label className="block font-medium mb-4 mt-4 ">
                  {field.label}
                </label>
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

          {/* <FileUpload /> */}

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
    </>
  );
};

export default ProjectDurationExtensionForm;
