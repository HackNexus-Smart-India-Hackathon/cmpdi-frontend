import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const QuarterlyStatusReportForm = () => {
  const initialValues = {
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

  const validationSchema = Yup.object({
    projectName: Yup.string().required('Project Name is required'),
    projectCode: Yup.string().required('Project Code is required'),
    progressQuarter: Yup.string().required('Progress for Quarter is required'),
    principalAgency: Yup.string().required(
      'Principal Implementing Agency is required'
    ),
    subAgency: Yup.string().required('Sub-Implementing Agency is required'),
    projectCoordinator: Yup.string().required(
      'Project Coordinator is required'
    ),
    startDate: Yup.date().required('Start Date is required'),
    completionDate: Yup.date().required('Completion Date is required'),
    barChartStatus: Yup.string().required('Bar Chart Status is required'),
    workDetails: Yup.string().required('Work Details are required'),
    slippageReasons: Yup.string(),
    correctiveActions: Yup.string(),
    nextQuarterWork: Yup.string().required('Work for Next Quarter is required'),
    expenditureStatement: Yup.string().required(
      'Expenditure Statement is required'
    ),
  });

  const onSubmit = (values) => {
    console.log('Form submitted successfully:', values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white border border-gray-400 rounded p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Quarterly Status Report Form
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: 'projectName', label: 'Project Name' },
                  { name: 'projectCode', label: 'Project Code' },
                  { name: 'progressQuarter', label: 'Progress for Quarter' },
                  { name: 'principalAgency', label: 'Principal Agency' },
                  { name: 'subAgency', label: 'Sub-Implementing Agency' },
                  {
                    name: 'projectCoordinator',
                    label: 'Project Coordinator/Leader',
                  },
                  {
                    name: 'startDate',
                    label: 'Date of Commencement',
                    type: 'date',
                  },
                  {
                    name: 'completionDate',
                    label: 'Approved Completion Date',
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
                <label
                  htmlFor="barChartStatus"
                  className="block text-sm font-medium text-gray-800"
                >
                  Bar Chart Status
                </label>
                <Field
                  as="textarea"
                  name="barChartStatus"
                  rows="3"
                  className="mt-1 p-2 w-full border border-gray-400 rounded"
                />
                <ErrorMessage
                  name="barChartStatus"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {[
                {
                  name: 'workDetails',
                  label: 'Details of Work Done During the Quarter',
                },
                { name: 'slippageReasons', label: 'Slippage Reasons (if any)' },
                {
                  name: 'correctiveActions',
                  label: 'Corrective Actions Taken',
                },
                {
                  name: 'nextQuarterWork',
                  label: 'Work Expected in Next Quarter',
                },
                {
                  name: 'expenditureStatement',
                  label: 'Expenditure Statement (Form-III & IV)',
                },
              ].map((field) => (
                <div className="mt-6" key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-800"
                  >
                    {field.label}
                  </label>
                  <Field
                    as="textarea"
                    name={field.name}
                    rows="3"
                    className="mt-1 p-2 w-full border border-gray-400 rounded"
                  />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}

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

export default QuarterlyStatusReportForm;
