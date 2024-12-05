import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const RevisionCostForm = () => {
  const initialValues = {
    projectName: '',
    projectCode: '',
    principalAgency: '',
    projectLeader: '',
    startDate: '',
    scheduledCompletionDate: '',
    approvedObjective: '',
    approvedWorkProgram: '',
    workDetails: '',
    totalApprovedCost: '',
    revisedTimeSchedule: '',
    actualExpenditure: '',
    revisedCost: '',
    justification: '',
  };

  const validationSchema = Yup.object({
    projectName: Yup.string().required('Project Name is required'),
    projectCode: Yup.string().required('Project Code is required'),
    principalAgency: Yup.string().required(
      'Principal Implementing/Sub-Implementing Agency is required'
    ),
    projectLeader: Yup.string().required(
      'Project Leader/Coordinator/Principal Investigator is required'
    ),
    startDate: Yup.date().required('Start Date is required'),
    scheduledCompletionDate: Yup.date().required(
      'Scheduled Completion Date is required'
    ),
    approvedObjective: Yup.string().required('Approved Objective is required'),
    approvedWorkProgram: Yup.string().required(
      'Approved Work Program is required'
    ),
    workDetails: Yup.string().required(
      'Details of Work Done with Actual Time Schedule are required'
    ),
    totalApprovedCost: Yup.number()
      .min(0, 'Total Approved Cost cannot be negative')
      .required('Total Approved Cost is required'),
    revisedTimeSchedule: Yup.string().required(
      'Revised Time Schedule is required'
    ),
    actualExpenditure: Yup.number()
      .min(0, 'Actual Expenditure cannot be negative')
      .required('Actual Expenditure is required'),
    revisedCost: Yup.number()
      .min(0, 'Revised Cost cannot be negative')
      .required('Revised Cost is required'),
    justification: Yup.string().required(
      'Justification for Revision is required'
    ),
  });

  const onSubmit = (values) => {
    console.log('Form submitted successfully:', values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white border border-gray-400 rounded p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Revision of Project Cost/Re-appropriation of Funds
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
                  {
                    name: 'principalAgency',
                    label: 'Principal Implementing/Sub-Implementing Agency',
                  },
                  {
                    name: 'projectLeader',
                    label: 'Project Leader/Coordinator/Principal Investigator',
                  },
                  { name: 'startDate', label: 'Start Date', type: 'date' },
                  {
                    name: 'scheduledCompletionDate',
                    label: 'Scheduled Completion Date',
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

              {[
                { name: 'approvedObjective', label: 'Approved Objective' },
                {
                  name: 'approvedWorkProgram',
                  label: 'Approved Work Program and Schedule',
                },
                {
                  name: 'workDetails',
                  label:
                    'Details of Work Done with Actual Time Schedule (Bar Chart)',
                },
                {
                  name: 'revisedTimeSchedule',
                  label: 'Revised Time Schedule (if applicable)',
                },
                {
                  name: 'justification',
                  label: 'Justification for Revision/Re-appropriation',
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

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    name: 'totalApprovedCost',
                    label: 'Total Approved Cost (₹ Lakhs)',
                    type: 'number',
                  },
                  {
                    name: 'actualExpenditure',
                    label: 'Actual Expenditure Till Last Quarter (₹ Lakhs)',
                    type: 'number',
                  },
                  {
                    name: 'revisedCost',
                    label: 'Revised Cost of the Project (₹ Lakhs)',
                    type: 'number',
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

export default RevisionCostForm;
