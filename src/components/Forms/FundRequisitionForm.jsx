import axios from 'axios';
import React, { useState } from 'react';

// Fund Categories
const items = [
  'LandBuilding',
  'CapitalEquipment',
  'Manpower',
  'Consumables',
  'Travel',
  'Contingencies',
  'Workshop Seminar',
];

// Initial Data for Fund Categories
const initialData = items.reduce((acc, item) => {
  acc[item] = {
    totalApprovedCost: '',
    fundReceived: '',
    interestEarned: '',
    expenditure: '',
    balance: '',
    provision: '',
    fundRequired: '',
  };
  return acc;
}, {});

// Initial Form State (Project Information)
const initialFormState = {
  projectTitle: '',
  projectCode: '',
  institutionName: '',
  yearPeriod: '',
  funds: initialData,
};

function FundRequisitionForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [expanded, setExpanded] = useState(null);
  const [errors, setErrors] = useState({}); // To store validation errors
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Input Changes for Project Information
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Input Changes for Fund Categories
  const handleChange = (item, field, value) => {
    // Update field value
    setFormData((prev) => {
      const newFunds = {
        ...prev.funds,
        [item]: {
          ...prev.funds[item],
          [field]: value,
        },
      };

      // Recalculate totals after each change
      return {
        ...prev,
        funds: newFunds,
      };
    });
  };

  // Function to calculate total for each fund category
  const calculateFundTotals = (item) => {
    const fund = formData.funds[item];
    const totalApprovedCost = parseFloat(fund.totalApprovedCost) || 0;
    const fundReceived = parseFloat(fund.fundReceived) || 0;
    const interestEarned = parseFloat(fund.interestEarned) || 0;
    const expenditure = parseFloat(fund.expenditure) || 0;
    const provision = parseFloat(fund.provision) || 0;
    const fundRequired = parseFloat(fund.fundRequired) || 0;

    // Calculate balance: totalApprovedCost - fundReceived - interestEarned - expenditure - provision
    const balance =
      totalApprovedCost -
      fundReceived -
      interestEarned -
      expenditure -
      provision;

    return {
      balance,
      fundRequired,
    };
  };

  // Validate form fields
  const validateForm = () => {
    let formErrors = {};

    // Define custom labels for the form fields
    const fieldLabels = {
      projectTitle: 'Project title',
      projectCode: 'Project code',
      institutionName: 'Institution name',
      yearPeriod: 'Year/Period',
    };

    const requiredFields = Object.keys(fieldLabels);

    // Check for missing required fields in project information
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        formErrors[field] = `${fieldLabels[field]} is required.`;
      }
    });

    // Check if the numerical fields in funds categories are valid
    items.forEach((item) => {
      Object.keys(formData.funds[item]).forEach((field) => {
        const value = formData.funds[item][field];
        if (field !== 'balance' && value && isNaN(value)) {
          formErrors[`${item}_${field}`] =
            `${field.replace(/([A-Z])/g, ' $1')} must be a number.`;
        }
      });
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true); // Disable submit button while submitting
      try {
        const response = await axios.post(
          'http://localhost:3000/api/forms/fund-requisition',
          formData
        );
        console.log('Form Data Submitted:', response.data);
        // Handle success (e.g., show a success message or reset the form)
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error (e.g., show an error message)
      } finally {
        setIsSubmitting(false); // Enable submit button after submission
      }
    } else {
      console.log('Form contains errors:', errors);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Fund Requisition Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Project Information Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-2">Project Title</label>
            <input
              type="text"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.projectTitle && (
              <p className="text-red-500 text-sm">{errors.projectTitle}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">Project Code</label>
            <input
              type="text"
              name="projectCode"
              value={formData.projectCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.projectCode && (
              <p className="text-red-500 text-sm">{errors.projectCode}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-2">Institution Name</label>
            <input
              type="text"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.institutionName && (
              <p className="text-red-500 text-sm">{errors.institutionName}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">Year/Period</label>
            <input
              type="text"
              name="yearPeriod"
              value={formData.yearPeriod}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.yearPeriod && (
              <p className="text-red-500 text-sm">{errors.yearPeriod}</p>
            )}
          </div>
        </div>

        {/* Collapsible Fund Sections */}
        <label className="block font-medium mb-3">Fund Requirements</label>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item}
              className="border rounded-lg shadow-sm bg-white overflow-hidden"
            >
              {/* Collapsible Section Header */}
              <button
                className={`w-full p-4 text-left font-semibold transition ${expanded === item ? 'bg-slate-300' : 'bg-gray-100'}`}
                onClick={() =>
                  setExpanded((prev) => (prev === item ? null : item))
                }
              >
                {item}
              </button>
              {/* Expanded Section Content */}
              {expanded === item && (
                <div className="p-4 space-y-4">
                  {Object.keys(formData.funds[item]).map((field) => (
                    <div key={field} className="flex items-center gap-4">
                      <label className="w-40 font-medium capitalize">
                        {field.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type="text"
                        value={formData.funds[item][field]}
                        onChange={(e) =>
                          handleChange(item, field, e.target.value)
                        }
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-black"
                      />
                      {errors[`${item}_${field}`] && (
                        <p className="text-red-500 text-sm">
                          {errors[`${item}_${field}`]}
                        </p>
                      )}
                    </div>
                  ))}
                  {/* Display Calculated Balance */}
                  <div className="flex items-center gap-4">
                    <label className="w-40 font-medium capitalize">
                      Balance
                    </label>
                    <input
                      type="text"
                      value={calculateFundTotals(item).balance}
                      readOnly
                      className="flex-1 px-4 py-2 border rounded-md bg-gray-200"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting} // Disable button during submission
            className={`px-6 py-2 ${isSubmitting ? 'bg-gray-400' : 'bg-black'} text-white rounded-md hover:bg-slate-600 transition`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FundRequisitionForm;
