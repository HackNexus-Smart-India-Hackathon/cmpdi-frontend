import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FileUpload from '../FileUpload';
import ProjectDetails from '../ProjectDetails';

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

const QuarterlyExpenditureStatementForm = ({ edit }) => {
  const { project } = useSelector((state) => state.auth);
  console.log(project.id);

  const [formData, setFormData] = useState({
    projectId: '',
    quarterEnding: '',
    financialDetails: initializeFinancialDetails(),
    fundsAdvanced: '',
    expenditureToDate: '',
    unspentBalance: '',
  });

  const [expandedCategory, setExpandedCategory] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    ['quarterEnding'].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
      }
    });

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

    formData.projectId = project.id;

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
        `${process.env.REACT_APP_PROJECT_BASE_API}/api/forms/quarterly-expenditure-statement`,
        apiPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response.data);
      alert('Quarterly Expenditure Statement created successfully!');
    } catch (error) {
      console.error('Error submitting form:', error.response || error.message);
      alert('Failed to create the statement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ProjectDetails />
      <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-10">
          Quarterly Expenditure Statement
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Quarter Ending</label>
            <input
              type="date"
              name="quarterEnding"
              value={formData.quarterEnding}
              onChange={(e) =>
                setFormData({ ...formData, quarterEnding: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md mb-2"
            />
            {errors.quarterEnding && (
              <p className="text-red-500 text-sm">{errors.quarterEnding}</p>
            )}
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
                    expandedCategory === category
                      ? 'bg-slate-300'
                      : 'bg-gray-100'
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
          <div className="mt-6 mb-6">
            {[
              { label: 'Funds Advanced Till Date', name: 'fundsAdvanced' },
              { label: 'Expenditure Till Date', name: 'expenditureToDate' },
              { label: 'Unspent Balance in Hand', name: 'unspentBalance' },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block font-medium mb-4 mt-4">{label}</label>
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

          <FileUpload />

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
    </>
  );
};

export default QuarterlyExpenditureStatementForm;
