import axios from 'axios';
import React, { useState } from 'react';
import FileUpload from '../FileUpload';
import ProjectDetails from '../ProjectDetails';

const items = [
  'LandBuilding',
  'CapitalEquipment',
  'Manpower',
  'Consumables',
  'Travel',
  'Contingencies',
  'Workshop Seminar',
];

const initialData = items.reduce((acc, item) => {
  acc[item] = {
    totalApprovedCost: '',
    fundReceived: '',
    interestEarned: '',
    expenditure: '',
    provision: '',
    fundRequired: '',
  };
  return acc;
}, {});

const initialFormState = {
  projectId: '',
  yearPeriod: '',
  funds: initialData,
};

function FundRequisitionForm({ edit }) {
  console.log(edit);

  const [formData, setFormData] = useState(initialFormState);
  const [expanded, setExpanded] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (item, field, value) => {
    setFormData((prev) => {
      const newFunds = {
        ...prev.funds,
        [item]: {
          ...prev.funds[item],
          [field]: value,
        },
      };

      return {
        ...prev,
        funds: newFunds,
      };
    });
  };

  const calculateFundTotals = (item) => {
    const fund = formData.funds[item];
    const totalApprovedCost = parseFloat(fund.totalApprovedCost) || 0;
    const fundReceived = parseFloat(fund.fundReceived) || 0;
    const interestEarned = parseFloat(fund.interestEarned) || 0;
    const expenditure = parseFloat(fund.expenditure) || 0;
    const provision = parseFloat(fund.provision) || 0;
    const fundRequired = parseFloat(fund.fundRequired) || 0;

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

  const validateForm = () => {
    let formErrors = {};

    const fieldLabels = {
      yearPeriod: 'Statement of fund requirement for the year',
    };

    const requiredFields = Object.keys(fieldLabels);

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        formErrors[field] = `${fieldLabels[field]} is required.`;
      }
    });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          'http://localhost:3000/api/forms/fund-requisition',
          formData
        );
        console.log('Form Data Submitted:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Form contains errors:', errors);
    }
  };

  return (
    <>
      <ProjectDetails />
      <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-10">Fund Requisition Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div>
              <label className="block font-medium mb-2">
                Statement of fund requirement for the year
              </label>
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
          <label className="block font-medium mb-3">Fund Requirements</label>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item}
                className="border rounded-lg shadow-sm bg-white overflow-hidden"
              >
                <button
                  className={`w-full p-4 text-left font-semibold transition ${expanded === item ? 'bg-slate-300' : 'bg-gray-100'}`}
                  onClick={() =>
                    setExpanded((prev) => (prev === item ? null : item))
                  }
                >
                  {item}
                </button>

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
          <FileUpload />
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 ${isSubmitting ? 'bg-gray-400' : 'bg-black'} text-white rounded-md hover:bg-slate-600 transition`}
            >
              {edit
                ? isSubmitting
                  ? 'Editing...'
                  : 'Edit'
                : isSubmitting
                  ? 'Submitting...'
                  : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FundRequisitionForm;
