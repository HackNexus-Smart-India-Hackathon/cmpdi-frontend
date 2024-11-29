import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const QuarterlyExpenditureStatementonCapitalEquipment = () => {
  const initialValues = {
    projectName: '',
    projectCode: '',
    companyName: '',
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

  const validationSchema = Yup.object({
    projectName: Yup.string().required('Project Name is required'),
    projectCode: Yup.string().required('Project Code is required'),
    companyName: Yup.string().required('Name of Company/Institute is required'),
    quarterEnding: Yup.date().required('Quarter Ending Date is required'),
    equipmentDetails: Yup.array().of(
      Yup.object({
        equipmentName: Yup.string().required('Equipment Name is required'),
        supplierName: Yup.string().required('Supplier Name is required'),
        units: Yup.number()
          .min(1, 'Number of units must be at least 1')
          .required('Units are required'),
        unitValue: Yup.number()
          .min(0, 'Unit value cannot be negative')
          .required('Unit Value is required'),
        totalValue: Yup.number()
          .min(0, 'Total value cannot be negative')
          .required(),
        approvedCost: Yup.number()
          .min(0, 'Approved cost cannot be negative')
          .required(),
        progressiveExpenditure: Yup.number()
          .min(0, 'Progressive expenditure cannot be negative')
          .required(),
      })
    ),
  });

  const onSubmit = (values) => {
    console.log('Form submitted successfully:', values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white border border-gray-400 rounded p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Quarterly Expenditure Statement on Capital Equipment
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: 'projectName', label: 'Project Name' },
                  { name: 'projectCode', label: 'Project Code' },
                  { name: 'companyName', label: 'Name of Company/Institute' },
                  {
                    name: 'quarterEnding',
                    label: 'Quarter Ending',
                    type: 'date',
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-800"
                    >
                      {field.label}
                    </label>
                    <Field
                      name={field.name}
                      type={field.type || 'text'}
                      className="mt-1 p-2 w-full border border-gray-400 rounded"
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-bold text-gray-800">
                  Equipment Details (Add Rows as Needed)
                </h2>
                {values.equipmentDetails.map((_, index) => (
                  <div
                    key={index}
                    className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    {[
                      { name: 'equipmentName', label: 'Equipment Name' },
                      { name: 'supplierName', label: 'Supplier Name' },
                      {
                        name: 'units',
                        label: 'Number of Units',
                        type: 'number',
                      },
                      {
                        name: 'unitValue',
                        label: 'Unit Value (₹)',
                        type: 'number',
                      },
                      {
                        name: 'totalValue',
                        label: 'Total Value (₹)',
                        type: 'number',
                      },
                      {
                        name: 'approvedCost',
                        label: 'Approved Cost (₹)',
                        type: 'number',
                      },
                      {
                        name: 'progressiveExpenditure',
                        label: 'Progressive Expenditure (₹)',
                        type: 'number',
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <label
                          htmlFor={`equipmentDetails.${index}.${field.name}`}
                          className="block text-sm font-medium text-gray-800"
                        >
                          {field.label}
                        </label>
                        <Field
                          name={`equipmentDetails.${index}.${field.name}`}
                          type={field.type || 'text'}
                          className="mt-1 p-2 w-full border border-gray-400 rounded"
                        />
                        <ErrorMessage
                          name={`equipmentDetails.${index}.${field.name}`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-black text-white font-bold py-2 rounded hover:bg-gray-800 transition duration-150"
                >
                  Submit Form
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default QuarterlyExpenditureStatementonCapitalEquipment;
