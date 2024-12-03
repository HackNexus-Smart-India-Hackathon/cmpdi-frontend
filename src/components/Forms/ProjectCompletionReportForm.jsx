import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
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
    workProgram: Yup.string().required('Work program is required'),
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

  const [expanded, setExpanded] = useState(null);

  const onSubmit = (values) => {
    console.log('Form submitted successfully:', values);
  };

  const sections = [
    {
      title: 'Project Information',
      fields: [
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
      ],
    },
    {
      title: 'Project Details',
      fields: [
        { name: 'objectives', label: 'Objectives as Stated in the Proposal' },
        { name: 'workProgram', label: 'Proposed and Approved Work Program' },
        {
          name: 'workDoneDetails',
          label: 'Details of Work Done During the Project',
        },
        {
          name: 'objectivesFulfilled',
          label: 'Extent of Objectives Fulfillment',
        },
        {
          name: 'reasonsUncovered',
          label: 'Reasons for Not Covering Certain Areas (if any)',
        },
      ],
    },
    {
      title: 'Conclusions and Recommendations',
      fields: [
        { name: 'furtherStudiesNeeded', label: 'Need for Further Studies' },
        { name: 'conclusions', label: 'Conclusions and Recommendations' },
        { name: 'applicationScope', label: 'Scope of Application' },
        {
          name: 'associatedPersons',
          label: 'Associated Persons and Expertise',
        },
        {
          name: 'finalExpenditureStatement',
          label: 'Final Expenditure Statement',
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">
        Project Completion Report Form
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            {sections.map((section, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-sm bg-white overflow-hidden mb-6"
              >
                {/* Section Header */}
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((prev) =>
                      prev === section.title ? null : section.title
                    )
                  }
                  className={`w-full p-4 text-left font-semibold transition ${
                    expanded === section.title ? 'bg-gray-300' : 'bg-gray-100'
                  }`}
                >
                  {section.title}
                </button>

                {/* Section Content */}
                {expanded === section.title && (
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {section.fields.map((field) => (
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
                          as={
                            field.name.includes('details')
                              ? 'textarea'
                              : 'input'
                          }
                          rows={field.name.includes('details') ? 3 : undefined}
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
                )}
              </div>
            ))}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                Submit Form
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectCompletionReportForm;
