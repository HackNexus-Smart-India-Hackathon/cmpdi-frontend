import axios from 'axios';
import React, { useState } from 'react';

const initialValues = {
  projectTitle: '',
  fundingSource: '',
  description: '',
  principalImplementingAgency: '',
  subImplementingAgencies: [],
  projectInvestigators: [],
  projectOutlay: {
    items: {
      capitalExpenditure: {
        landBuilding: { totalCost: '', year1: '', year2: '', year3: '' },
        equipment: { totalCost: '', year1: '', year2: '', year3: '' },
      },
      revenueExpenditure: {
        salaries: { totalCost: '', year1: '', year2: '', year3: '' },
        consumables: { totalCost: '', year1: '', year2: '', year3: '' },
        travel: { totalCost: '', year1: '', year2: '', year3: '' },
        workshop: { totalCost: '', year1: '', year2: '', year3: '' },
      },
      otherCosts: {
        contingency: { totalCost: '', year1: '', year2: '', year3: '' },
        institutionalOverhead: {
          totalCost: '',
          year1: '',
          year2: '',
          year3: '',
        },
        taxesDuties: { totalCost: '', year1: '', year2: '', year3: '' },
      },
    },
    grandTotal: { totalCost: '', year1: '', year2: '', year3: '' },
  },
  startDate: '',
  scheduleCompletionDate: '',
  status: '',
};

function ProjectForm() {
  const [formData, setFormData] = useState(initialValues);
  const [newAgency, setNewAgency] = useState('');
  const [newInvestigator, setNewInvestigator] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, section, key) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      projectOutlay: {
        ...prev.projectOutlay,
        items: {
          ...prev.projectOutlay.items,
          [section]: {
            ...prev.projectOutlay.items[section],
            [key]: {
              ...prev.projectOutlay.items[section][key],
              [name]: value,
            },
          },
        },
      },
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/projects/create', // Replace with your API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // setSuccess('Project submitted successfully!');
      console.log('API Response:', response.data);
    } catch (err) {
      console.error('API Error:', err);
      // setError('Failed to submit the project. Please try again.');
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-16 bg-gray-50 rounded-lg shadow-lg mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-6">Project Onboarding</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Title & Funding Source */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">Project Title</label>
            <input
              type="text"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              placeholder="Enter Project Title"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Funding Source</label>
            <select
              name="fundingSource"
              value={formData.fundingSource}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Funding Source</option>
              <option value="Research and Development">
                Research and Development
              </option>
              <option value="Science and Technology">
                Science and Technology
              </option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2">Project Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a brief description of the project"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Principal Implementing Agency */}
        <div>
          <label className="block font-medium mb-2">
            Principal Implementing Agency
          </label>
          <input
            type="text"
            name="principalImplementingAgency"
            value={formData.principalImplementingAgency}
            onChange={handleChange}
            placeholder="Enter Principal Implementing Agency"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Sub Implementing Agencies */}
        <div>
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
        <div>
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

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:black"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">
              Schedule Completion Date
            </label>
            <input
              type="date"
              name="scheduleCompletionDate"
              value={formData.scheduleCompletionDate}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:black"
            />
          </div>
        </div>

        {/* Project Outlay */}
        <div>
          <h2 className="text-xl font-bold mb-4">Project Outlay</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Total Cost</th>
                <th className="border border-gray-300 px-4 py-2">Year 1</th>
                <th className="border border-gray-300 px-4 py-2">Year 2</th>
                <th className="border border-gray-300 px-4 py-2">Year 3</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(formData.projectOutlay.items).map(
                ([section, items]) =>
                  Object.entries(items).map(([key, fields]) => (
                    <tr key={key}>
                      <td className="border border-gray-300 px-4 py-2 capitalize">
                        {key}
                      </td>
                      {Object.keys(fields).map((field) => (
                        <td
                          key={field}
                          className="border border-gray-300 px-4 py-2"
                        >
                          <input
                            type="text"
                            name={field}
                            value={fields[field]}
                            onChange={(e) =>
                              handleNestedChange(e, section, key)
                            }
                            className="w-full px-2 py-1 border rounded-md"
                          />
                        </td>
                      ))}
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        <div>
          <label className="block font-medium mb-2">Status of Project</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:black"
          >
            <option value="">Select Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="proposed">Proposed</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
