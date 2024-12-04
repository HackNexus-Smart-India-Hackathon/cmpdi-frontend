import axios from 'axios';
import React, { useState } from 'react';

// Initial form state
const initialFormState = {
  projectName: '',
  projectCode: '',
  principalImplementingAgency: '',
  subImplementingAgencies: [],
  projectInvestigators: [],
  startDate: '',
  scheduledCompletionDate: '',
  approvedObjective: '',
  approvedWorkProgram: '',
  workDetails: '',
  totalApprovedCost: '',
  revisedTimeSchedule: '',
  actualExpenditure: '',
  revisedCost: '',
  justification: '',
};

function RevisionCostForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [newAgency, setNewAgency] = useState('');
  const [newInvestigator, setNewInvestigator] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes for dynamic fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add sub-implementing agency
  const handleAddAgency = () => {
    if (newAgency) {
      setFormData((prev) => ({
        ...prev,
        subImplementingAgencies: [...prev.subImplementingAgencies, newAgency],
      }));
      setNewAgency('');
    }
  };

  // Remove sub-implementing agency
  const handleRemoveAgency = (index) => {
    setFormData((prev) => ({
      ...prev,
      subImplementingAgencies: prev.subImplementingAgencies.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Add project investigator
  const handleAddInvestigator = () => {
    if (newInvestigator) {
      setFormData((prev) => ({
        ...prev,
        projectInvestigators: [...prev.projectInvestigators, newInvestigator],
      }));
      setNewInvestigator('');
    }
  };

  // Remove project investigator
  const handleRemoveInvestigator = (index) => {
    setFormData((prev) => ({
      ...prev,
      projectInvestigators: prev.projectInvestigators.filter(
        (_, i) => i !== index
      ),
    }));
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
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          'http://localhost:3000/api/forms/revision-cost-report',
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
      <h1 className="text-3xl font-bold mb-6 text-center">
        Revision of Project Cost/Re-appropriation of Funds
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Project Information Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {[
            { name: 'projectName', label: 'Project Name' },
            { name: 'projectCode', label: 'Project Code' },
            {
              name: 'principalImplementingAgency',
              label: 'Principal Implementing Agency',
            },
            { name: 'startDate', label: 'Start Date', type: 'date' },
            {
              name: 'scheduledCompletionDate',
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
                  onClick={() => handleRemoveAgency(index)}
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
              onClick={handleAddAgency}
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
                  onClick={() => handleRemoveInvestigator(index)}
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
              placeholder="Add a new investigator"
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <button
              type="button"
              onClick={handleAddInvestigator}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Add
            </button>
          </div>
        </div>

        {/* Other Fields */}
        <div className="mt-6 space-y-6">
          {[
            { name: 'approvedObjective', label: 'Approved Objective' },
            {
              name: 'approvedWorkProgram',
              label: 'Approved Work Program and Schedule',
            },
            {
              name: 'workDetails',
              label:
                'Details of Work Done with Actual Time Schedule (Bar Chart)',
            },
            { name: 'revisedTimeSchedule', label: 'Revised Time Schedule' },
            {
              name: 'justification',
              label: 'Justification for Revision/Re-appropriation',
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block font-medium mb-2">{field.label}</label>
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Financials */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

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
  );
}

export default RevisionCostForm;
