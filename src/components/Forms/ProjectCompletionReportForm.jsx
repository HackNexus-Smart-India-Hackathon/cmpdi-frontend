import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const ProjectCompletionReportForm = () => {
  const initialValues = {
    title: '',
    projectCode: '',
    commencementDate: '',
    approvedCompletionDate: '',
    actualCompletionDate: '',
    objectives: '',
    workProgram: '',
    workDoneDetails: '',
    objectivesFulfilled: '',
    reasonsUncovered: '',
    furtherStudiesNeeded: '',
    conclusions: '',
    applicationScope: '',
    associatedPersons: '',
    finalExpenditureStatement: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title of the project is required'),
    projectCode: Yup.string().required('Project Code is required'),
    commencementDate: Yup.date().required('Date of commencement is required'),
    approvedCompletionDate: Yup.date().required(
      'Approved date of completion is required'
    ),
    actualCompletionDate: Yup.date().required(
      'Actual date of completion is required'
    ),
    objectives: Yup.string().required('Objectives are required'),
    workProgram: Yup.string().required('Work programme is required'),
    workDoneDetails: Yup.string().required('Details of work done are required'),
    objectivesFulfilled: Yup.string().required(
      'Details of objectives fulfillment are required'
    ),
    reasonsUncovered: Yup.string().required(
      'Reasons for uncovered areas are required'
    ),
    furtherStudiesNeeded: Yup.string().required(
      'Indication of further studies required'
    ),
    conclusions: Yup.string().required(
      'Conclusions and recommendations are required'
    ),
    applicationScope: Yup.string().required('Scope of application is required'),
    associatedPersons: Yup.string().required(
      'Names of associated persons and their expertise are required'
    ),
    finalExpenditureStatement: Yup.string().required(
      'Final expenditure statement details are required'
    ),
  });

  const onSubmit = (values) => {
    console.log('Form submitted successfully:', values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white border border-gray-400 rounded p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Project Completion Report Form
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
                  { name: 'title', label: 'Title of the Project' },
                  { name: 'projectCode', label: 'Project Code' },
                  {
                    name: 'commencementDate',
                    label: 'Date of Commencement',
                    type: 'date',
                  },
                  {
                    name: 'approvedCompletionDate',
                    label: 'Approved Completion Date',
                    type: 'date',
                  },
                  {
                    name: 'actualCompletionDate',
                    label: 'Actual Completion Date',
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
                {
                  name: 'objectives',
                  label: 'Objectives as Stated in the Proposal',
                },
                {
                  name: 'workProgram',
                  label: 'Proposed and Approved Work Programme',
                },
                {
                  name: 'workDoneDetails',
                  label: 'Details of Work Done During the Project',
                },
                {
                  name: 'objectivesFulfilled',
                  label:
                    'Extent to which Objectives as outlined in the Original Proposal have been Fulfilled',
                },
                {
                  name: 'reasonsUncovered',
                  label: 'Reasons for Not Covering Certain Areas (if any)',
                },
                {
                  name: 'furtherStudiesNeeded',
                  label: 'Need for Further Studies in Uncovered Areas',
                },
                {
                  name: 'conclusions',
                  label:
                    'Conclusions and Recommendations (Including Quantified Benefits to the Industry)',
                },
                {
                  name: 'applicationScope',
                  label: 'Scope of Application in the Coal Industry',
                },
                {
                  name: 'associatedPersons',
                  label:
                    'Names of Persons Associated with the Project and Their Expertise',
                },
                {
                  name: 'finalExpenditureStatement',
                  label: 'Final Expenditure Statement (Form III & IV)',
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

export default ProjectCompletionReportForm;
