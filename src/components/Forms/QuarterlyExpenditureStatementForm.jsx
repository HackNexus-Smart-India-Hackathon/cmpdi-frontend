import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const QuarterlyExpenditureStatementForm = () => {
  const initialValues = {
    projectName: '',
    projectCode: '',
    companyName: '',
    quarterEnding: '',
    landBuilding: {
      totalApproved: 0,
      sanctionedProvision: 0,
      incurredPreviousYear: 0,
      incurredPreviousQuarter: 0,
      currentQuarter: 0,
    },
    capitalEquipment: {
      totalApproved: 0,
      sanctionedProvision: 0,
      incurredPreviousYear: 0,
      incurredPreviousQuarter: 0,
      currentQuarter: 0,
    },
    manpower: {
      totalApproved: 0,
      sanctionedProvision: 0,
      incurredPreviousYear: 0,
      incurredPreviousQuarter: 0,
      currentQuarter: 0,
    },
    consumables: {
      totalApproved: 0,
      sanctionedProvision: 0,
      incurredPreviousYear: 0,
      incurredPreviousQuarter: 0,
      currentQuarter: 0,
    },
    travel: {
      totalApproved: 0,
      sanctionedProvision: 0,
      incurredPreviousYear: 0,
      incurredPreviousQuarter: 0,
      currentQuarter: 0,
    },
    contingencies: {
      totalApproved: 0,
      sanctionedProvision: 0,
      incurredPreviousYear: 0,
      incurredPreviousQuarter: 0,
      currentQuarter: 0,
    },
    seminars: {
      totalApproved: 0,
      sanctionedProvision: 0,
      incurredPreviousYear: 0,
      incurredPreviousQuarter: 0,
      currentQuarter: 0,
    },
    others: {
      totalApproved: 0,
      sanctionedProvision: 0,
      incurredPreviousYear: 0,
      incurredPreviousQuarter: 0,
      currentQuarter: 0,
    },
    fundsAdvanced: '',
    expenditureToDate: '',
    unspentBalance: '',
  };

  const validationSchema = Yup.object({
    projectName: Yup.string().required('Project Name is required'),
    projectCode: Yup.string().required('Project Code is required'),
    companyName: Yup.string().required('Company Name is required'),
    quarterEnding: Yup.string().required('Quarter Ending is required'),
    fundsAdvanced: Yup.number()
      .min(0, 'Cannot be negative')
      .required('Funds advanced is required'),
    expenditureToDate: Yup.number()
      .min(0, 'Cannot be negative')
      .required('Expenditure to date is required'),
    unspentBalance: Yup.number()
      .min(0, 'Cannot be negative')
      .required('Unspent Balance is required'),
  });

  const onSubmit = (values) => {
    console.log('Form submitted successfully:', values);
  };

  const financialFields = [
    { name: 'landBuilding', label: 'Land & Building' },
    { name: 'capitalEquipment', label: 'Capital Equipment' },
    { name: 'manpower', label: 'Manpower' },
    { name: 'consumables', label: 'Consumables' },
    { name: 'travel', label: 'TA/DA' },
    { name: 'contingencies', label: 'Contingencies' },
    { name: 'seminars', label: 'Attending/Organizing Seminars' },
    { name: 'others', label: 'Others' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white border border-gray-400 rounded p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Quarterly Expenditure Statement Form
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: 'projectName', label: 'Project Name' },
                  { name: 'projectCode', label: 'Project Code' },
                  { name: 'companyName', label: 'Company Name/Institution' },
                  { name: 'quarterEnding', label: 'Quarter Ending' },
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
                      type="text"
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Financial Details
                </h2>
                <div className="overflow-auto">
                  <table className="w-full text-left border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2">Item</th>
                        <th className="border border-gray-300 p-2">
                          Total Approved Cost
                        </th>
                        <th className="border border-gray-300 p-2">
                          Sanctioned Provision
                        </th>
                        <th className="border border-gray-300 p-2">
                          Expenditure Incurred (Prev. Year)
                        </th>
                        <th className="border border-gray-300 p-2">
                          Expenditure Incurred (Prev. Quarter)
                        </th>
                        <th className="border border-gray-300 p-2">
                          Expenditure Incurred (Current Quarter)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {financialFields.map((field) => (
                        <tr key={field.name}>
                          <td className="border border-gray-300 p-2">
                            {field.label}
                          </td>
                          {[
                            'totalApproved',
                            'sanctionedProvision',
                            'incurredPreviousYear',
                            'incurredPreviousQuarter',
                            'currentQuarter',
                          ].map((key) => (
                            <td
                              key={key}
                              className="border border-gray-300 p-2"
                            >
                              <Field
                                name={`${field.name}.${key}`}
                                type="number"
                                className="p-2 w-full border border-gray-400 rounded"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: 'fundsAdvanced', label: 'Funds Advanced Till Date' },
                  { name: 'expenditureToDate', label: 'Expenditure Till Date' },
                  { name: 'unspentBalance', label: 'Unspent Balance in Hand' },
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

export default QuarterlyExpenditureStatementForm;
