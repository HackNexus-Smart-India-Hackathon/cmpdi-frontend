import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const FundRequisitionForm = () => {
  const initialValues = {
    projectName: '',
    projectCode: '',
    companyName: '',
    yearPeriod: '',
    landBuilding: '',
    capitalEquipment: '',
    manpower: '',
    consumables: '',
    travel: '',
    contingencies: '',
    workshops: '',
    totalApprovedCost: '',
    totalFundReceived: '',
    interestEarned: '',
    expenditureIncurred: '',
    balanceFund: '',
    fundProvision: '',
    fundRequired: '',
  };

  const validationSchema = Yup.object({
    projectName: Yup.string().required('Project Name is required'),
    projectCode: Yup.string().required('Project Code is required'),
    companyName: Yup.string().required('Company Name is required'),
    yearPeriod: Yup.string().required('Year/Period is required'),
    landBuilding: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
    capitalEquipment: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
    manpower: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
    consumables: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
    travel: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
    contingencies: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
    workshops: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
    totalApprovedCost: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
    totalFundReceived: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
    interestEarned: Yup.number().min(0, 'Cannot be negative'),
    expenditureIncurred: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
    balanceFund: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
    fundProvision: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
    fundRequired: Yup.number()
      .required('This field is required')
      .min(0, 'Cannot be negative'),
  });

  const onSubmit = (values) => {
    console.log('Form submitted successfully:', values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-5xl w-full bg-white border border-gray-400 rounded p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Fund Requisition Form
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="projectName"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Project Name
                  </label>
                  <Field
                    name="projectName"
                    type="text"
                    className="mt-1 p-2 w-full border border-gray-400 rounded"
                  />
                  <ErrorMessage
                    name="projectName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="projectCode"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Project Code
                  </label>
                  <Field
                    name="projectCode"
                    type="text"
                    className="mt-1 p-2 w-full border border-gray-400 rounded"
                  />
                  <ErrorMessage
                    name="projectCode"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Company/Institution Name
                  </label>
                  <Field
                    name="companyName"
                    type="text"
                    className="mt-1 p-2 w-full border border-gray-400 rounded"
                  />
                  <ErrorMessage
                    name="companyName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="yearPeriod"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Year/Period
                  </label>
                  <Field
                    name="yearPeriod"
                    type="text"
                    className="mt-1 p-2 w-full border border-gray-400 rounded"
                  />
                  <ErrorMessage
                    name="yearPeriod"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Financial Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { name: 'landBuilding', label: 'Land & Building' },
                    { name: 'capitalEquipment', label: 'Capital Equipment' },
                    { name: 'manpower', label: 'Manpower' },
                    { name: 'consumables', label: 'Consumables' },
                    { name: 'travel', label: 'Travel' },
                    { name: 'contingencies', label: 'Contingencies' },
                    { name: 'workshops', label: 'Workshops/Seminars' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-800"
                      >
                        {field.label} (₹ Lakhs)
                      </label>
                      <Field
                        name={field.name}
                        type="number"
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
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Summary
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { name: 'totalApprovedCost', label: 'Total Approved Cost' },
                    { name: 'totalFundReceived', label: 'Total Fund Received' },
                    { name: 'interestEarned', label: 'Interest Earned' },
                    {
                      name: 'expenditureIncurred',
                      label: 'Expenditure Incurred',
                    },
                    { name: 'balanceFund', label: 'Balance Fund' },
                    { name: 'fundProvision', label: 'Fund Provision' },
                    { name: 'fundRequired', label: 'Fund Required' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-800"
                      >
                        {field.label} (₹ Lakhs)
                      </label>
                      <Field
                        name={field.name}
                        type="number"
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

export default FundRequisitionForm;
