import axios from 'axios';
import React, { useState } from 'react';
import FileUpload from '../FileUpload';
import ProjectDetails from '../ProjectDetails';

// Quarterly Report Sections
const sections = [
  {
    title: 'Project Information',
    fields: [{ name: 'progressQuarter', label: 'Progress for Quarter' }],
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
  projectId: '',
  progressQuarter: '',
  barChartStatus: '',
  workDetails: '',
  slippageReasons: '',
  correctiveActions: '',
  nextQuarterWork: '',
  expenditureStatement: '',
  projectInvestigators: [],
};

function QuarterlyStatusReportForm({ edit }) {
  const [formData, setFormData] = useState(initialFormState);
  const [expanded, setExpanded] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  formData.projectId = 1;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_PROJECT_BASE_API}/api/forms/quarterly-status-report`,
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
        <h1 className="text-3xl font-bold mb-10">Quarterly Status Report</h1>
        <form onSubmit={handleSubmit}>
          {/* Project Information Section */}
          <div className=" mb-6">
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

          {/* Work Status Section with Accordion UI */}
          <div className="space-y-4">
            <label className="block font-medium mb-3">Required Details</label>
            {sections.slice(1).map((section) => (
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

          <FileUpload />
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
    </>
  );
}

export default QuarterlyStatusReportForm;
