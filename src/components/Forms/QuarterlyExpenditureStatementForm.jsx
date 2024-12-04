import axios from 'axios';
import React, { useState } from 'react';

// Financial Categories
const financialCategories = [
  'LandBuilding',
  'CapitalEquipment',
  'Manpower',
  'Consumables',
  'Travel',
  'Contingencies',
  'Seminars',
  'Others',
];

// Initialize financial details
const initializeFinancialDetails = () => {
  return financialCategories.reduce((acc, category) => {
    acc[category] = {
      totalApproved: '',
      sanctionedProvision: '',
      previousYear: '',
      previousQuarter: '',
      currentQuarter: '',
    };
    return acc;
  }, {});
};

const QuarterlyExpenditureStatementForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectCode: '',
    companyName: '',
    quarterEnding: '',
    financialDetails: initializeFinancialDetails(),
    fundsAdvanced: '',
    expenditureToDate: '',
    unspentBalance: '',
  });

  const [expandedCategory, setExpandedCategory] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes for top-level fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for financial details
  const handleFinancialChange = (category, field, value) => {
    setFormData((prev) => ({
      ...prev,
      financialDetails: {
        ...prev.financialDetails,
        [category]: {
          ...prev.financialDetails[category],
          [field]: value,
        },
      },
    }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    ['projectName', 'projectCode', 'companyName', 'quarterEnding'].forEach(
      (field) => {
        if (!formData[field]) {
          newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
        }
      }
    );

    // Check numerical fields
    ['fundsAdvanced', 'expenditureToDate', 'unspentBalance'].forEach(
      (field) => {
        if (!formData[field]) {
          newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
        } else if (isNaN(formData[field]) || formData[field] < 0) {
          newErrors[field] =
            `${field.replace(/([A-Z])/g, ' $1')} must be a valid non-negative number.`;
        }
      }
    );
    console.log(newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Prepare data for API
    const apiPayload = {
      ...formData,
      financialDetails: Object.entries(formData.financialDetails).map(
        ([category, details]) => ({
          category,
          ...details,
        })
      ),
    };

    console.log(apiPayload);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/forms/quarterly-expenditure-statement',
        apiPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response.data);
      alert('Quarterly Expenditure Statement created successfully!');
      // setFormData({
      //   projectName: '',
      //   projectCode: '',
      //   companyName: '',
      //   quarterEnding: '',
      //   financialDetails: initializeFinancialDetails(),
      //   fundsAdvanced: '',
      //   expenditureToDate: '',
      //   unspentBalance: '',
      // });
    } catch (error) {
      console.error('Error submitting form:', error.response || error.message);
      alert('Failed to create the statement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">
        Quarterly Expenditure Statement
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Project Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {[
            { label: 'Project Name', name: 'projectName' },
            { label: 'Project Code', name: 'projectCode' },
            { label: 'Company Name', name: 'companyName' },
            { label: 'Quarter Ending', name: 'quarterEnding' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block font-medium mb-2">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Financial Details */}
        <label className="block font-medium mb-3">Financial Details</label>
        <div className="space-y-4">
          {financialCategories.map((category) => (
            <div
              key={category}
              className="border rounded-lg shadow-sm bg-white overflow-hidden"
            >
              {/* Collapsible Header */}
              <button
                type="button"
                className={`w-full p-4 text-left font-semibold transition ${
                  expandedCategory === category ? 'bg-slate-300' : 'bg-gray-100'
                }`}
                onClick={() =>
                  setExpandedCategory((prev) =>
                    prev === category ? null : category
                  )
                }
              >
                {category.replace(/([A-Z])/g, ' $1')}
              </button>

              {/* Collapsible Content */}
              {expandedCategory === category && (
                <div className="p-4 space-y-4">
                  {Object.keys(formData.financialDetails[category]).map(
                    (field) => (
                      <div key={field} className="flex items-center gap-4">
                        <label className="w-40 font-medium capitalize">
                          {field.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                          type="number"
                          value={
                            formData.financialDetails[category][field] || ''
                          }
                          onChange={(e) =>
                            handleFinancialChange(
                              category,
                              field,
                              e.target.value
                            )
                          }
                          className="flex-1 px-4 py-2 border rounded-md"
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Funds Section */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: 'Funds Advanced Till Date', name: 'fundsAdvanced' },
            { label: 'Expenditure Till Date', name: 'expenditureToDate' },
            { label: 'Unspent Balance in Hand', name: 'unspentBalance' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block font-medium mb-2">{label}</label>
              <input
                type="number"
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
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
  );
};

export default QuarterlyExpenditureStatementForm;
