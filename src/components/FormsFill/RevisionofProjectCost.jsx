import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FileUpload from '../FileUpload';
import ProjectDetails from '../ProjectDetails';

// Initial form state
const initialFormState = {
  projectId: 1,
  approvedObjective: '',
  approvedWorkProgram: '',
  workDetails: '',
  totalApprovedCost: '',
  revisedTimeSchedule: '',
  actualExpenditure: '',
  revisedCost: '',
  justification: '',
};

const sections = [
  {
    title: 'Revision Detail',
    fields: [
      {
        name: 'approvedObjective',
        label: 'Approved Objective',
        type: 'textarea',
      },
      {
        name: 'approvedWorkProgram',
        label: 'Approved Work Program and Schedule',
        type: 'textarea',
      },
      {
        name: 'workDetails',
        label: 'Details of Work Done with Actual Time Schedule (Bar Chart)',
        type: 'textarea',
      },
      {
        name: 'revisedTimeSchedule',
        label: 'Revised Time Schedule',
        type: 'textarea',
      },

      {
        name: 'justification',
        label: 'Justification for Revision/Re-appropriation',
        type: 'textarea',
      },
    ],
  },
];

function RevisionCostForm({ edit }) {
  const { project } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes for dynamic fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Simple validation
  const validateForm = () => {
    const formErrors = {};
    Object.keys(formData).forEach((field) => {
      if (
        !formData[field] &&
        field !== 'subImplementingAgencies' &&
        field !== 'projectInvestigators'
      ) {
        formErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.projectId = project.id;
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_PROJECT_BASE_API}/api/forms/revision-cost-report`,
          formData
        );
        console.log('Form Data Submitted:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <ProjectDetails />
      <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-10 ">Revision of Project Cost</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block font-medium mb-3">Required Details</label>
            {sections.slice(0).map((section) => (
              <div
                key={section.title}
                className="border rounded-lg shadow-sm bg-white overflow-hidden"
              >
                <button
                  type="button"
                  className={`w-full p-4 text-left font-semibold transition ${expanded === section.title ? 'bg-slate-300' : 'bg-gray-100'}`}
                  onClick={() =>
                    setExpanded(
                      expanded === section.title ? null : section.title
                    )
                  }
                >
                  {section.title}
                </button>

                {expanded === section.title && (
                  <div className="p-4 space-y-6">
                    {section.fields.map((field) => (
                      <div key={field.name} className="flex flex-col gap-3">
                        <label className="font-medium capitalize">
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md resize-none"
                            rows="4"
                          />
                        ) : (
                          <input
                            type="text"
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md"
                          />
                        )}
                        {errors[field.name] && (
                          <p className="text-red-500 text-sm">
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Financials */}
          <div className="mt-6 mb-6">
            {[
              {
                name: 'totalApprovedCost',
                label: 'Total Approved Cost (₹ Lakhs)',
                type: 'number',
              },
              {
                name: 'actualExpenditure',
                label: 'Actual Expenditure Till Last Quarter (₹ Lakhs)',
                type: 'number',
              },
              {
                name: 'revisedCost',
                label: 'Revised Cost of the Project (₹ Lakhs)',
                type: 'number',
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-medium mb-2">{field.label}</label>
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md mt-4 mb-4"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          <FileUpload />

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 ${isSubmitting ? 'bg-gray-400' : 'bg-black'} text-white rounded-md hover:bg-slate-600 transition`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RevisionCostForm;
