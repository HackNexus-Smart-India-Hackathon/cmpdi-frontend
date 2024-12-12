import axios from 'axios';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import ProjectOutlay from './ProjectOutlay';
// import ShowProjectOutlay from './ShowProjectOutlay';
// import { setProject } from '../state/index';

function ProjectForm() {
  // const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);
  const initialValues = {
    projectTitle: '',
    fundingSource: '',
    description: '',
    principalImplementingAgency: {
      agencyName: '',
      projectInvestigatorName: '',
    },
    projectInvestigators: [],
    subImplementingAgencies: [],
    adminId: [user_id],
    projectOutlay: {
      name: 'PRINCIPAL',
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
    outlay: [],
  };
  const [formData, setFormData] = useState(initialValues);

  // const [newInvestigator, setNewInvestigator] = useState('');
  const [newAgency, setNewAgency] = useState({
    name: '',
    investigatorName: '',
    investigatorEmail: '',
  });
  const [isEditingAgency, setIsEditingAgency] = useState(false);
  const [agencyIndex, setAgencyIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleAddTag = (key, value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [key]: [...prev[key], value],
  //   }));
  // };

  // const handleRemoveTag = (key, index) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [key]: prev[key].filter((_, i) => i !== index),
  //   }));
  // };

  const handleAgencyChange = (e) => {
    const { name, value } = e.target;
    setNewAgency((prev) => ({ ...prev, [name]: value }));
  };

  const addOrEditAgency = () => {
    const updatedAgencies = [...formData.subImplementingAgencies];
    if (isEditingAgency && agencyIndex !== null) {
      updatedAgencies[agencyIndex] = newAgency;
    } else {
      updatedAgencies.push(newAgency);
    }
    console.log(newAgency.name);

    setFormData((prev) => ({
      ...prev,
      subImplementingAgencies: updatedAgencies,
    }));
    console.log(formData);
    setNewAgency({
      name: '',
      investigatorName: '',
      investigatorEmail: '',
    });
    setIsEditingAgency(false);
    setAgencyIndex(null);
  };

  const removeAgency = (index) => {
    setFormData((prev) => ({
      ...prev,
      // outlay: prev.outlay.filter(
      // (item) =>
      // Object.keys(item)[0] === prev.subImplementingAgencies[index][name]
      // ),
      subImplementingAgencies: prev.subImplementingAgencies.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // const handleNestedChange = (e, path) => {
  //   const value = e.target.value;
  //   setFormData((prev) => {
  //     const updated = JSON.parse(JSON.stringify(prev)); // Deep clone
  //     let current = updated;

  //     path.slice(0, -1).forEach((key) => {
  //       if (!current[key]) current[key] = {};
  //       current = current[key];
  //     });

  //     current[path[path.length - 1]] = value;
  //     return updated;
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const uniqueArray = formData.outlay.filter(
      (obj, index, self) => index === self.findIndex((o) => o.name === obj.name)
    );
    console.log(uniqueArray);
    function removeDuplicates(arr) {
      const seen = new Set();
      return arr.filter((item) => {
        const key = JSON.stringify(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    console.log(removeDuplicates(formData.outlay));
    formData.outlay = [...formData.outlay, ...uniqueArray];
    console.log('Form Data:', formData);
    const baseUrl = process.env.REACT_APP_PROJECT_BASE_API;
    function clubEmails(email1, subImplemtingAgencies) {
      // const email2 = [];
      // subImplemtingAgencies.forEach((item) => {
      //   email2.push(item[Object.keys(item)[2]]);
      // });
      // email2.forEach((email) => {
      //   email1.push(email);
      // });
      return email1;
    }
    console.log('Form Data:', formData);
    const modifiedFormData = {
      projectTitle: formData.projectTitle,
      fundingSource: formData.fundingSource,
      description: formData.description,
      principalImplementingAgency: {
        principalImplementingAgency: formData.principalImplementingAgency,
        principalInvestigator: formData.projectInvestigators,
      },
      subImplementingAgencies: formData.subImplementingAgencies,
      projectInvestigators: formData.subImplementingAgencies.investigatorEmail,
      startDate: formData.startDate,
      scheduleCompletionDate: formData.scheduleCompletionDate,
      principalOutlay: formData.projectOutlay,
      subOutlay: formData.outlay,
      status: formData.status,
      adminId: formData.adminId,
    };

    console.log(modifiedFormData);

    try {
      const response = await axios.post(
        `${baseUrl}/api/projects/create`,
        modifiedFormData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // setSuccess('Project submitted successfully!');
      // dispatch(
      //   setProject({
      //     projectId: response.data.projectId,
      //     projectCode: response.data.projectCode,
      //     projectTitle: formData.projectTitle,
      //     fundingSource: formData.fundingSource,
      //     principalImplementingAgency: formData.principalImplementingAgency,
      //     subImplementingAgencies: formData.subImplementingAgencies,
      //     projectInvestigatorEmail: formData.projectInvestigatorEmail,
      //     startDate: formData.startDate,
      //     scheduleCompletionDate: formData.scheduleCompletionDate,
      //   })
      // );
      console.log('API Response:', response.data);
    } catch (err) {
      console.error('API Error:', err);
      // setError('Failed to submit the project. Please try again.');
    } finally {
      // setIsLoading(false);
    }
  };
  const setPrincipalOutlay = (name, projectOutlay) => {
    setFormData((prev) => {
      let updatedData = { ...prev };

      updatedData.projectOutlay = projectOutlay;
      return updatedData;
    });
  };
  const setProjectOutlay = (name, projectOutlay) => {
    setFormData((prev) => {
      let updatedData = { ...prev };

      // Check if an entry with the same name exists
      const existingIndex = updatedData.outlay.findIndex(
        (entry) => entry[name] !== undefined
      );

      if (existingIndex !== -1) {
        // Update the existing entry
        updatedData.outlay[existingIndex][name] = projectOutlay;
      } else {
        // Add a new entry
        const data = { [name]: projectOutlay };
        updatedData.outlay.push(data);
      }

      return updatedData;
    });
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
            value={formData.principalImplementingAgency.agencyName}
            onChange={handleChange}
            placeholder="Enter Principal Implementing Agency"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Project Investigator Name
          </label>
          <input
            type="text"
            name="principalImplementingAgency"
            value={formData.principalImplementingAgency.projectInvestigatorName}
            onChange={handleChange}
            placeholder="Enter Principal Implementing Agency"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Project Investigator Email
          </label>
          <input
            type="text"
            name="principalImplementingAgency"
            value={formData.projectInvestigators}
            onChange={handleChange}
            placeholder="Enter Principal Implementing Agency"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* <div>
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
        </div> */}

        <ProjectOutlay
          projectOutlay={setPrincipalOutlay}
          agencyName={'PRINCIPAL'}
          Title="Principal Agency"
        />

        {/* Sub Implementing Agencies */}
        {/* <div>
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
        </div> */}

        {/* Project Investigators */}
        {/* <div>
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
        </div> */}

        <div>
          <label className="block font-medium mb-2">
            Sub Implementing Agencies
          </label>
          {formData.subImplementingAgencies.map((agency, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <div>
                <p className="font-medium">{agency.name}</p>
                <p className="text-sm text-gray-600">
                  Investigator Name: {agency.investigatorName}
                </p>
                <p className="text-sm text-gray-600">
                  Investigator Email: {agency.investigatorEmail}
                </p>
                {/* <ShowProjectOutlay
                  outlay={formData.outlay.at(-1).value}
                  name={newAgency.name}
                /> */}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setNewAgency(agency);
                    setIsEditingAgency(true);
                    setAgencyIndex(index);
                  }}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => removeAgency(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            {/* <label className="block font-medium mb-2">
              Add/Edit Sub Implementing Agency
            </label> */}
            <label className="block font-medium mt-3">Sub-Agency Name</label>
            <input
              type="text"
              name="name"
              value={newAgency.name}
              onChange={handleAgencyChange}
              placeholder="Agency Name"
              className="w-full px-4 py-2 border rounded-md m-1"
            />
            <label className="block font-medium mt-3">
              Project Investigator Name
            </label>
            <input
              type="text"
              name="investigatorName"
              value={newAgency.investigatorName}
              onChange={handleAgencyChange}
              placeholder="Project Investigator Name"
              className="w-full px-4 py-2 border rounded-md m-1"
            />
            <label className="block font-medium mt-3">
              Project Investigator Email
            </label>
            <input
              type="text"
              name="investigatorEmail"
              value={newAgency.investigatorEmail}
              onChange={handleAgencyChange}
              placeholder="Project Investigator Email Address"
              className="w-full px-4 py-2 border rounded-md m-1"
            />
            <div className="mx-1 my-5">
              <ProjectOutlay
                projectOutlay={setProjectOutlay}
                // agencyIndex={agencyIndex}
                agencyName={newAgency.name}
                Title="Sub-Implementing Agency"
              />
            </div>
            <button
              type="button"
              onClick={addOrEditAgency}
              className="px-4 py-2 my-4 bg-black text-white rounded-md hover:bg-gray-800"
            >
              {isEditingAgency ? 'Update Agency' : 'Add Agency'}
            </button>
          </div>
        </div>

        {/* Project Outlay */}
        {/* <div>
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
        </div> */}

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
            onClick={() => {
              console.log(formData);
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
