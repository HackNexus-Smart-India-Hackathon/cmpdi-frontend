import axios from 'axios';
import React, { useState } from 'react';

// Initial form state
const initialFormState = {
  projectName: '',
  projectCode: '',
  progressQuarter: '',
  principalAgency: '',
  subAgency: '',
  projectCoordinator: '',
  startDate: '',
  completionDate: '',
  barChartStatus: '',
  workDetails: '',
  slippageReasons: '',
  correctiveActions: '',
  nextQuarterWork: '',
  expenditureStatement: '',
};

function QuarterlyProgressForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    let formErrors = {};

    // Check for required fields
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true); // Disable submit button while submitting
      try {
        const response = await axios.post(
          'http://localhost:3000/api/forms/quarterly-status-report', // Your API endpoint
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
      <h1 className="text-3xl font-bold mb-6">Quarterly Status Report Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Project Information Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-2">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.projectName && (
              <p className="text-red-500 text-sm">{errors.projectName}</p>
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
            <label className="block font-medium mb-2">Progress Quarter</label>
            <input
              type="text"
              name="progressQuarter"
              value={formData.progressQuarter}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.progressQuarter && (
              <p className="text-red-500 text-sm">{errors.progressQuarter}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">Principal Agency</label>
            <input
              type="text"
              name="principalAgency"
              value={formData.principalAgency}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.principalAgency && (
              <p className="text-red-500 text-sm">{errors.principalAgency}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-2">Sub Agency</label>
            <input
              type="text"
              name="subAgency"
              value={formData.subAgency}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.subAgency && (
              <p className="text-red-500 text-sm">{errors.subAgency}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">
              Project Coordinator
            </label>
            <input
              type="text"
              name="projectCoordinator"
              value={formData.projectCoordinator}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.projectCoordinator && (
              <p className="text-red-500 text-sm">
                {errors.projectCoordinator}
              </p>
            )}
          </div>
        </div>

        {/* Dates Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">Completion Date</label>
            <input
              type="date"
              name="completionDate"
              value={formData.completionDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.completionDate && (
              <p className="text-red-500 text-sm">{errors.completionDate}</p>
            )}
          </div>
        </div>

        {/* Textarea Fields Section */}
        <div className="space-y-6 mb-6">
          <div>
            <label className="block font-medium mb-2">Bar Chart Status</label>
            <textarea
              name="barChartStatus"
              value={formData.barChartStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.barChartStatus && (
              <p className="text-red-500 text-sm">{errors.barChartStatus}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">Work Details</label>
            <textarea
              name="workDetails"
              value={formData.workDetails}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.workDetails && (
              <p className="text-red-500 text-sm">{errors.workDetails}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">Slippage Reasons</label>
            <textarea
              name="slippageReasons"
              value={formData.slippageReasons}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Corrective Actions</label>
            <textarea
              name="correctiveActions"
              value={formData.correctiveActions}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Next Quarter Work</label>
            <textarea
              name="nextQuarterWork"
              value={formData.nextQuarterWork}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.nextQuarterWork && (
              <p className="text-red-500 text-sm">{errors.nextQuarterWork}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">
              Expenditure Statement
            </label>
            <textarea
              name="expenditureStatement"
              value={formData.expenditureStatement}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.expenditureStatement && (
              <p className="text-red-500 text-sm">
                {errors.expenditureStatement}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-md"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuarterlyProgressForm;
