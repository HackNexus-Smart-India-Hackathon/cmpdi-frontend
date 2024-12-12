import { TrashIcon } from '@heroicons/react/outline';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FileUpload from '../FileUpload';
import ProjectDetails from '../ProjectDetails';

const QuarterlyExpenditureStatementonCapitalEquipment = ({ edit }) => {
  const { project } = useSelector((state) => state.auth);
  const initialValues = {
    projectId: '',
    quarterEnding: '',
    equipmentDetails: [
      {
        equipmentName: '',
        supplierName: '',
        units: '',
        unitValue: '',
        totalValue: '',
        approvedCost: '',
        progressiveExpenditure: '',
      },
    ],
  };

  const [formData, setFormData] = useState(initialValues);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [errors, setErrors] = useState({}); // Validation errors

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedData = { ...formData };
    updatedData.equipmentDetails[index][field] = value;
    setFormData(updatedData);
  };

  const handleAddEquipment = () => {
    const updatedData = { ...formData };
    updatedData.equipmentDetails.push({
      equipmentName: '',
      supplierName: '',
      units: '',
      unitValue: '',
      totalValue: '',
      approvedCost: '',
      progressiveExpenditure: '',
    });
    setFormData(updatedData);
  };

  const handleRemoveEquipment = (index) => {
    const updatedData = { ...formData };
    updatedData.equipmentDetails.splice(index, 1);
    setFormData(updatedData);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.quarterEnding)
      errors.quarterEnding = 'Quarter Ending is required';

    formData.equipmentDetails.forEach((equipment, index) => {
      if (!equipment.equipmentName)
        errors[`equipmentName-${index}`] = 'Equipment Name is required';
      if (!equipment.supplierName)
        errors[`supplierName-${index}`] = 'Supplier Name is required';
      if (!equipment.units || isNaN(equipment.units) || equipment.units < 1)
        errors[`units-${index}`] = 'Units must be greater than 0';
      if (
        !equipment.unitValue ||
        isNaN(equipment.unitValue) ||
        equipment.unitValue < 0
      )
        errors[`unitValue-${index}`] = 'Unit Value must be a positive number';
      if (
        !equipment.totalValue ||
        isNaN(equipment.totalValue) ||
        equipment.totalValue < 0
      )
        errors[`totalValue-${index}`] = 'Total Value must be a positive number';
      if (
        !equipment.approvedCost ||
        isNaN(equipment.approvedCost) ||
        equipment.approvedCost < 0
      )
        errors[`approvedCost-${index}`] =
          'Approved Cost must be a positive number';
      if (
        !equipment.progressiveExpenditure ||
        isNaN(equipment.progressiveExpenditure) ||
        equipment.progressiveExpenditure < 0
      )
        errors[`progressiveExpenditure-${index}`] =
          'Progressive Expenditure must be a positive number';
    });
    console.log(errors);

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    formData.projectId = project.id;
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_PROJECT_BASE_API}/api/forms/quarterly-expenditure-statement-capital-equipment`,
          formData
        );

        if (response.data.success) {
          console.log('Form submitted successfully:', response.data);
        } else {
          console.error('Error submitting form:', response.data.message);
        }
      } catch (error) {
        console.error('Error making API request:', error);
      }
    }
  };

  return (
    <>
      <ProjectDetails />
      <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-10">
          Quarterly Expenditure Statement on Capital Equipment
        </h1>
        <form onSubmit={handleSubmit}>
          <div className=" mb-6">
            <div>
              <label className="block font-medium mb-2">Quarter Ending</label>
              <input
                type="date"
                name="quarterEnding"
                value={formData.quarterEnding}
                onChange={(e) =>
                  setFormData({ ...formData, quarterEnding: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.quarterEnding && (
                <p className="text-red-500 text-sm">{errors.quarterEnding}</p>
              )}
            </div>
          </div>

          {/* Equipment Details Section */}
          <div className="space-y-4">
            <label className="block font-medium mb-3">Equipment Details</label>
            {formData.equipmentDetails.map((equipment, index) => (
              <div key={index} className="border rounded-lg shadow-sm bg-white">
                <button
                  type="button"
                  className={`w-full p-4 text-left font-semibold transition ${expandedIndex === index ? 'bg-slate-300' : 'bg-gray-100'}`}
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                >
                  Equipment {index + 1}
                </button>

                {expandedIndex === index && (
                  <div className="p-4 space-y-4">
                    {[
                      'equipmentName',
                      'supplierName',
                      'units',
                      'unitValue',
                      'totalValue',
                      'approvedCost',
                      'progressiveExpenditure',
                    ].map((field) => (
                      <div key={field} className="flex items-center gap-4">
                        <label className="w-40 font-medium capitalize">
                          {field.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                          type="text"
                          value={equipment[field]}
                          onChange={(e) => handleInputChange(e, index, field)}
                          className="flex-1 px-4 py-2 border rounded-md"
                        />
                        {errors[`${field}-${index}`] && (
                          <p className="text-red-500 text-sm">
                            {errors[`${field}-${index}`]}
                          </p>
                        )}
                      </div>
                    ))}
                    <div className="flex justify-between mt-4">
                      <button
                        type="button"
                        className="bg-red-500 text-white p-2 rounded flex items-center gap-2"
                        onClick={() => handleRemoveEquipment(index)}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddEquipment}
              className="mt-6 bg-black text-white p-2 rounded"
            >
              Add New Equipment
            </button>
          </div>

          <FileUpload />

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-slate-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default QuarterlyExpenditureStatementonCapitalEquipment;
