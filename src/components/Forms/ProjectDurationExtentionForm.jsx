import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const ProjectDurationExtensionForm = () => {
  const initialValues = {
    projectName: '',
    projectCode: '',
    principalAgency: '',
    projectLeader: '',
    startDate: '',
    completionDate: '',
    approvedObjectives: '',
    approvedWorkProgram: '',
    workDoneDetails: '',
    revisedSchedule: '',
    timeExtension: '',
    extensionReason: '',
    totalCost: '',
    actualExpenditure: '',
  };

  const validationSchema = Yup.object({
    projectName: Yup.string().required('Project Name is required'),
    projectCode: Yup.string().required('Project Code is required'),
    principalAgency: Yup.string().required(
      'Principal Implementing Agency is required'
    ),
    projectLeader: Yup.string().required(
      'Project Leader/Coordinator is required'
    ),
    startDate: Yup.date().required('Start Date is required'),
    completionDate: Yup.date().required(
      'Scheduled Completion Date is required'
    ),
    approvedObjectives: Yup.string().required(
      'Approved Objectives are required'
    ),
    approvedWorkProgram: Yup.string().required(
      'Approved Work Program is required'
    ),
    workDoneDetails: Yup.string().required('Details of Work Done are required'),
    revisedSchedule: Yup.string().required(
      'Revised Schedule with Justification is required'
    ),
    timeExtension: Yup.number()
      .min(1, 'Time extension must be at least 1 month')
      .required('Proposed Time Extension is required'),
    extensionReason: Yup.string().required(
      'Reason for Time Extension is required'
    ),
    totalCost: Yup.number()
      .min(0, 'Cannot be negative')
      .required('Total Cost is required'),
    actualExpenditure: Yup.number()
      .min(0, 'Cannot be negative')
      .required('Actual Expenditure is required'),
  });

  const onSubmit = (values) => {
    console.log('Form submitted successfully:', values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white border border-gray-400 rounded p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Extension of Project Duration Form
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
                    label: 'Principal Implementing Agency',
                  },
                  {
                    name: 'projectLeader',
                    label: 'Project Leader/Coordinator',
                  },
                  { name: 'startDate', label: 'Start Date', type: 'date' },
                  {
                    name: 'completionDate',
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
                { name: 'approvedObjectives', label: 'Approved Objectives' },
                {
                  name: 'approvedWorkProgram',
                  label: 'Approved Work Program and Schedule',
                },
                {
                  name: 'workDoneDetails',
                  label: 'Details of Work Done (Bar Chart)',
                },
                {
                  name: 'revisedSchedule',
                  label: 'Revised Bar Chart/PERT Network with Justification',
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
                    name: 'timeExtension',
                    label: 'Proposed Time Extension (Months)',
                    type: 'number',
                  },
                  { name: 'extensionReason', label: 'Reason for Extension' },
                  {
                    name: 'totalCost',
                    label: 'Total Cost of the Project (₹ Lakhs)',
                    type: 'number',
                  },
                  {
                    name: 'actualExpenditure',
                    label: 'Actual Expenditure Incurred (₹ Lakhs)',
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

export default ProjectDurationExtensionForm;
