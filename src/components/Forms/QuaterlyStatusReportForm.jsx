import axios from 'axios';
import React, { useState } from 'react';

// Quarterly Report Sections
const sections = [
  {
    title: 'Project Information',
    fields: [
      { name: 'projectName', label: 'Project Name' },
      { name: 'projectCode', label: 'Project Code' },
      { name: 'progressQuarter', label: 'Progress for Quarter' },
      {
        name: 'principalImplementingAgency',
        label: 'Principal Implementing Agency',
      },
      { name: 'startDate', label: 'Date of Commencement', type: 'date' },
      {
        name: 'completionDate',
        label: 'Approved Completion Date',
        type: 'date',
      },
    ],
  },
  {
    title: 'Work Status',
    fields: [
      { name: 'barChartStatus', label: 'Bar Chart Status', type: 'textarea' },
      {
        name: 'workDetails',
        label: 'Details of Work Done During the Quarter',
        type: 'textarea',
      },
      {
        name: 'slippageReasons',
        label: 'Slippage Reasons (if any)',
        type: 'textarea',
      },
      {
        name: 'correctiveActions',
        label: 'Corrective Actions Taken',
        type: 'textarea',
      },
      {
        name: 'nextQuarterWork',
        label: 'Work Expected in Next Quarter',
        type: 'textarea',
      },
    ],
  },
  {
    title: 'Expenditure Details',
    fields: [
      {
        name: 'expenditureStatement',
        label: 'Expenditure Statement (Form-III & IV)',
        type: 'textarea',
      },
    ],
  },
];

const initialFormState = {
  projectName: '',
  projectCode: '',
  progressQuarter: '',
  principalImplementingAgency: '',
  subImplementingAgencies: [],
  startDate: '',
  completionDate: '',
  barChartStatus: '',
  workDetails: '',
  slippageReasons: '',
  correctiveActions: '',
  nextQuarterWork: '',
  expenditureStatement: '',
  projectInvestigators: [],
};

function QuarterlyStatusReportForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [expanded, setExpanded] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAgency, setNewAgency] = useState('');
  const [newInvestigator, setNewInvestigator] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    // Check required fields
    Object.keys(formData).forEach((field) => {
      if (
        !formData[field] &&
        field !== 'slippageReasons' &&
        field !== 'correctiveActions'
      ) {
        formErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleAddTag = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: [...prev[key], value],
    }));
  };

  const handleRemoveTag = (key, index) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          'http://localhost:3000/api/forms/quarterly-status-report',
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
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Quarterly Status Report</h1>
      <form onSubmit={handleSubmit}>
        {/* Project Information Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {sections[0].fields.map((field) => (
            <div key={field.name}>
              <label className="block font-medium mb-2">{field.label}</label>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Sub Implementing Agencies */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Sub Implementing Agencies
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.subImplementingAgencies.map((agency, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-black rounded-full flex items-center gap-2"
              >
                {agency}
                <button
                  type="button"
                  className="text-slate-600"
                  onClick={() =>
                    handleRemoveTag('subImplementingAgencies', index)
                  }
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex mt-2 gap-2">
            <input
              type="text"
              value={newAgency}
              onChange={(e) => setNewAgency(e.target.value)}
              placeholder="Add a new agency"
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => {
                if (newAgency) {
                  handleAddTag('subImplementingAgencies', newAgency);
                  setNewAgency('');
                }
              }}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Add
            </button>
          </div>
        </div>

        {/* Project Investigators */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Project Investigators
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.projectInvestigators.map((investigator, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-black rounded-full flex items-center gap-2"
              >
                {investigator}
                <button
                  type="button"
                  className="text-slate-600"
                  onClick={() => handleRemoveTag('projectInvestigators', index)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex mt-2 gap-2">
            <input
              type="text"
              value={newInvestigator}
              onChange={(e) => setNewInvestigator(e.target.value)}
              placeholder="Email or Phone"
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => {
                if (newInvestigator) {
                  handleAddTag('projectInvestigators', newInvestigator);
                  setNewInvestigator('');
                }
              }}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Add
            </button>
          </div>
        </div>
        {/* Work Status Section with Accordion UI */}
        <div className="space-y-4">
          {sections.slice(1).map((section) => (
            <div
              key={section.title}
              className="border rounded-lg shadow-sm bg-white overflow-hidden"
            >
              <button
                type="button"
                className={`w-full p-4 text-left font-semibold transition ${expanded === section.title ? 'bg-slate-300' : 'bg-gray-100'}`}
                onClick={() =>
                  setExpanded(expanded === section.title ? null : section.title)
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
        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
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
  );
}

export default QuarterlyStatusReportForm;
