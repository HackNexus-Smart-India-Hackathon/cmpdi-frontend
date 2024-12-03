import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

const SubImplementingAgencies = ({ values }) => {
  const [newAgency, setNewAgency] = useState('');

  return (
    <div className="mb-6">
      <label className="block text-gray-700 ">Sub Implementing Agencies</label>

      <FieldArray name="subImplementingAgencies">
        {({ remove, push }) => (
          <>
            {/* Display existing agencies as tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {values.subImplementingAgencies.map((agency, index) => (
                <div
                  key={index}
                  className="flex items-center bg-slate-100 text-black px-3 py-1 rounded-full text-sm mt-4 mb-2"
                >
                  <span>{agency}</span>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="ml-2 text-black hover:text-black"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Input for new agency */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newAgency || ''}
                onChange={(e) => setNewAgency(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newAgency.trim()) {
                    e.preventDefault();
                    if (
                      !values.subImplementingAgencies.includes(newAgency.trim())
                    ) {
                      push(newAgency.trim());
                      setNewAgency('');
                    } else {
                      alert('Agency name already exists!');
                    }
                  }
                }}
                placeholder="Add a new agency"
                className="w-full px-3 py-2 border rounded border-gray-300 focus:border-black "
              />
              <button
                type="button"
                onClick={() => {
                  if (
                    newAgency.trim() &&
                    !values.subImplementingAgencies.includes(newAgency.trim())
                  ) {
                    push(newAgency.trim());
                    setNewAgency('');
                  } else {
                    alert('Invalid or duplicate agency name!');
                  }
                }}
                className="bg-black text-white px-4 py-2 rounded hover:bg-slate-500"
              >
                Add
              </button>
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};

const AddInvestigator = ({ values }) => {
  const [newInvestigator, setNewInvestigator] = useState('');

  return (
    <div className="mb-6">
      <label className="block text-gray-700 ">Project Investigators</label>

      <FieldArray name="projectInvestigators">
        {({ remove, push }) => (
          <>
            {/* Display existing investigators as tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {values.projectInvestigators.map((investigator, index) => (
                <div
                  key={index}
                  className="flex items-center bg-slate-100 text-black px-3 py-1 rounded-full text-sm mt-4 mb-2"
                >
                  <span>{investigator}</span>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="ml-2 text-black hover:text-black"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Input for new investigator */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newInvestigator || ''}
                onChange={(e) => setNewInvestigator(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newInvestigator.trim()) {
                    e.preventDefault();
                    if (
                      !values.projectInvestigators.includes(
                        newInvestigator.trim()
                      )
                    ) {
                      push(newInvestigator.trim());
                      setNewInvestigator('');
                    } else {
                      alert('Investigator email or phone already exists!');
                    }
                  }
                }}
                placeholder="Email or Phone"
                className="w-full px-3 py-2 border rounded border-gray-300 focus:border-black "
              />
              <button
                type="button"
                onClick={() => {
                  if (
                    newInvestigator.trim() &&
                    !values.projectInvestigators.includes(
                      newInvestigator.trim()
                    )
                  ) {
                    push(newInvestigator.trim());
                    setNewInvestigator('');
                  } else {
                    alert('Invalid or duplicate email/phone!');
                  }
                }}
                className="bg-black text-white px-4 py-2 rounded hover:bg-slate-500"
              >
                Add
              </button>
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};

const ProjectOnboarding = () => {
  const initialValues = {
    projectTitle: '',
    fundingSource: '',
    description: '',
    principalImplementingAgency: '',
    subImplementingAgencies: [],
    projectInvestigators: [],
    projectOutlay: {
      items: {
        capitalExpenditure: {
          landBuilding: { totalCost: '', year1: '', year2: '', year3: '' },
          equipment: { totalCost: '', year1: '', year2: '', year3: '' },
        },
        revenueExpenditure: {
          salaries: { totalCost: '', year1: '', year2: '', year3: '' },
          consumables: { totalCost: '', year1: '', year2: '', year3: '' },
          travel: { totalCost: '', year1: '', year2: '', year3: '' },
          workshop: { totalCost: '', year1: '', year2: '', year3: '' },
        },
        otherCosts: {
          contingency: { totalCost: '', year1: '', year2: '', year3: '' },
          institutionalOverhead: {
            totalCost: '',
            year1: '',
            year2: '',
            year3: '',
          },
          taxesDuties: { totalCost: '', year1: '', year2: '', year3: '' },
        },
      },
      grandTotal: { totalCost: '', year1: '', year2: '', year3: '' },
    },
    startDate: '',
    scheduleCompletionDate: '',
    status: '',
  };

  const validationSchema = Yup.object().shape({
    projectTitle: Yup.string().required('Project title is required'),
    fundingSource: Yup.string().required('Funding source is required'),
    principalImplementingAgency: Yup.string().required(
      'Principal Implementing Agency is required'
    ),
    subImplementingAgencies: Yup.array()
      .of(Yup.string().required('Sub-implementing agency is required'))
      .min(1, 'At least one sub-implementing agency is required'),
    projectInvestigators: Yup.array().of(
      Yup.string().required('project investigator is required')
    ),
    startDate: Yup.date().required('Start date is required'),
    duration: Yup.number()
      .typeError('Must be a number')
      .required('Duration is required'),

    description: Yup.string(),
  });

  // const handleSubmit = async (values, { resetForm, setSubmitting }) => {
  //   try {
  //     console.log('Submitting:', values);

  //     const projectData = {
  //       projectTitle: values.projectTitle,
  //       fundingSource: values.fundingSource,
  //       description: values.description,
  //       principalImplementingAgency: values.principalImplementingAgency,
  //       subImplementingAgencies: values.subImplementingAgencies,
  //       projectInvestigators: values.projectInvestigators,
  //       startDate: values.startDate,
  //       scheduleCompletionDate: values.scheduleCompletionDate,
  //       projectOutlay: values.outlay,
  //       status: values.status,
  //     };

  //     const response = await axios.post(
  //       'http://localhost:3000/api/projects/create',
  //       projectData
  //     );

  //     if (response.data.success) {
  //       alert('Project created successfully');
  //       resetForm();
  //     } else {
  //       alert('Error: ' + response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     alert('Failed to submit the form. Please try again.');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
  return (
    <div className="min-h-screen flex items-center justify-center p-12">
      <div className="w-full max-w-7xl bg-white rounded shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Project Onboarding</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          // onSubmit={handleSubmit(values, { resetForm, setSubmitting })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              console.log('Submitting:', values);

              const projectData = {
                projectTitle: values.projectTitle,
                fundingSource: values.fundingSource,
                description: values.description,
                principalImplementingAgency: values.principalImplementingAgency,
                subImplementingAgencies: values.subImplementingAgencies,
                projectInvestigators: values.projectInvestigators,
                startDate: values.startDate,
                scheduleCompletionDate: values.scheduleCompletionDate,
                projectOutlay: values.outlay,
                status: values.status,
              };

              const response = await axios.post(
                'http://localhost:3000/api/projects/create',
                projectData
              );

              if (response.data.success) {
                alert('Project created successfully');
                resetForm();
              } else {
                alert('Error: ' + response.data.message);
              }
            } catch (error) {
              console.error('Error submitting form:', error);
              alert('Failed to submit the form. Please try again.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setSubmitting, resetForm, values }) => (
            <Form
              onSubmit={async (values) => {
                try {
                  console.log('Submitting:', values);

                  const projectData = {
                    projectTitle: values.projectTitle,
                    fundingSource: values.fundingSource,
                    description: values.description,
                    principalImplementingAgency:
                      values.principalImplementingAgency,
                    subImplementingAgencies: values.subImplementingAgencies,
                    projectInvestigators: values.projectInvestigators,
                    startDate: values.startDate,
                    scheduleCompletionDate: values.scheduleCompletionDate,
                    projectOutlay: values.projectOutlay,
                    status: values.status,
                  };

                  // const response = await axios.post(
                  //   'http://localhost:3000/api/projects/create',
                  //   projectData
                  // );

                  console.log(projectData);
                  const response = await axios.post(
                    'http://localhost:3000/api/projects/create',
                    projectData,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    }
                  );

                  if (response.data.success) {
                    alert('Project created successfully');
                    resetForm();
                  } else {
                    alert('Error: ' + response.data.message);
                  }
                } catch (error) {
                  console.error('Error submitting form:', error);
                  alert('Failed to submit the form. Please try again.');
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div className="mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Project Title */}
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-2">
                      Project Title
                    </label>
                    <Field
                      type="text"
                      name="projectTitle"
                      value={values.projectTitle}
                      placeholder="Enter Project Title"
                      className="w-full px-3 py-2 border rounded"
                    />
                    <ErrorMessage
                      name="projectTitle"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Funding Source */}
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-2">
                      Funding Source
                    </label>
                    <Field
                      as="select"
                      name="fundingSource"
                      value={values.fundingSource}
                      className="w-full px-3 py-2 border rounded appearance-none focus:outline-none focus:ring-2 focus:ring-black"
                      style={{
                        backgroundImage:
                          "url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27><polyline points=%276 9 12 15 18 9%27/></svg>')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.5rem',
                      }}
                    >
                      <option value="" disabled>
                        Select Funding Source
                      </option>
                      <option value="R&D">Research and Development</option>
                      <option value="S&T">Science and Technology</option>
                    </Field>

                    <ErrorMessage
                      name="fundingSource"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Project Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  value={values.description}
                  placeholder="Provide a brief description of the project"
                  className="w-full px-3 py-2 border rounded resize-none"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Principal Implementing Agency */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Principal Implementing Agency
                </label>
                <Field
                  type="text"
                  name="principalImplementingAgency"
                  value={values.principalImplementingAgency}
                  placeholder="Enter Principal Implementing Agency"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="principalImplementingAgency"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Sub Implementing Agencies */}
              <SubImplementingAgencies values={values} />

              {/* Remaining Fields */}
              {/* Project Investigators, Milestones, and Other Fields */}
              {/* Existing logic remains as is */}

              {/* Add Investigators */}
              <AddInvestigator values={values} />

              {/* Start Date and Schedule Completion Date */}
              <div className="mb-6">
                <div className="flex gap-4">
                  {/* Start Date */}
                  <div className="flex-1">
                    <label
                      htmlFor="startDate"
                      className="block text-gray-700 mb-2"
                    >
                      Start Date
                    </label>
                    <Field
                      type="date"
                      name="startDate"
                      value={values.startDate}
                      id="startDate"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Schedule Completion Date */}
                  <div className="flex-1">
                    <label
                      htmlFor="scheduleCompletionDate"
                      className="block text-gray-700 mb-2"
                    >
                      Schedule Completion Date
                    </label>
                    <Field
                      type="date"
                      name="scheduleCompletionDate"
                      value={values.scheduleCompletionDate}
                      id="scheduleCompletionDate"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <ErrorMessage
                      name="scheduleCompletionDate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Project Outlay Table */}

              <label className="block text-gray-700">Project Outlay</label>
              <table className="table-auto w-full border-collapse border border-gray-300 text-left text-sm">
                <thead>
                  <tr>
                    <th
                      className="border border-gray-300 px-4 py-2"
                      rowSpan={2}
                    >
                      Sl. No.
                    </th>
                    <th
                      className="border border-gray-300 px-4 py-2"
                      rowSpan={2}
                    >
                      Items
                    </th>
                    <th
                      className="border border-gray-300 px-4 py-2"
                      colSpan={4}
                    >
                      (Rs. in lakhs)
                    </th>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Total Project Cost
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      1st Year
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      2nd Year
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      3rd Year
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Capital Expenditure */}
                  <tr>
                    <td
                      colSpan={6}
                      className="font-bold bg-gray-100 border border-gray-300 px-4 py-2"
                    >
                      Capital Expenditure
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">9.1</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Land &amp; Building
                    </td>
                    {['totalCost', 'year1', 'year2', 'year3'].map(
                      (field, i) => (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          key={i}
                        >
                          <Field
                            name={`items.capitalExpenditure.landBuilding.${field}`}
                            type="text"
                            className="w-full border rounded p-1"
                            value={
                              values?.items?.capitalExpenditure?.landBuilding?.[
                                field
                              ] || ''
                            }
                          />
                        </td>
                      )
                    )}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">9.2</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Equipment
                    </td>
                    {['totalCost', 'year1', 'year2', 'year3'].map(
                      (field, i) => (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          key={i}
                        >
                          <Field
                            name={`items.capitalExpenditure.equipment.${field}`}
                            type="text"
                            className="w-full border rounded p-1"
                            value={
                              values?.items?.capitalExpenditure?.equipment?.[
                                field
                              ] || ''
                            }
                          />
                        </td>
                      )
                    )}
                  </tr>

                  {/* Revenue Expenditure */}
                  <tr>
                    <td
                      colSpan={6}
                      className="font-bold bg-gray-100 border border-gray-300 px-4 py-2"
                    >
                      Revenue Expenditure
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">9.4</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Salaries / Allowances
                    </td>
                    {['totalCost', 'year1', 'year2', 'year3'].map(
                      (field, i) => (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          key={i}
                        >
                          <Field
                            name={`items.revenueExpenditure.salaries.${field}`}
                            type="text"
                            className="w-full border rounded p-1"
                            value={
                              values?.items?.revenueExpenditure?.salaries?.[
                                field
                              ] || ''
                            }
                          />
                        </td>
                      )
                    )}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">9.5</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Consumables
                    </td>
                    {['totalCost', 'year1', 'year2', 'year3'].map(
                      (field, i) => (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          key={i}
                        >
                          <Field
                            name={`items.revenueExpenditure.consumables.${field}`}
                            type="text"
                            className="w-full border rounded p-1"
                            value={
                              values?.items?.revenueExpenditure?.consumables?.[
                                field
                              ] || ''
                            }
                          />
                        </td>
                      )
                    )}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">9.6</td>
                    <td className="border border-gray-300 px-4 py-2">Travel</td>
                    {['totalCost', 'year1', 'year2', 'year3'].map(
                      (field, i) => (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          key={i}
                        >
                          <Field
                            name={`items.revenueExpenditure.travel.${field}`}
                            type="text"
                            className="w-full border rounded p-1"
                            value={
                              values?.items?.revenueExpenditure?.travel?.[
                                field
                              ] || ''
                            }
                          />
                        </td>
                      )
                    )}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">9.7</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Attending or Organizing Workshops/Seminars
                    </td>
                    {['totalCost', 'year1', 'year2', 'year3'].map(
                      (field, i) => (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          key={i}
                        >
                          <Field
                            name={`items.revenueExpenditure.workshop.${field}`}
                            type="text"
                            className="w-full border rounded p-1"
                            value={
                              values?.items?.revenueExpenditure?.workshop?.[
                                field
                              ] || ''
                            }
                          />
                        </td>
                      )
                    )}
                  </tr>

                  {/* Other Costs */}
                  <tr>
                    <td
                      colSpan={6}
                      className="font-bold bg-gray-100 border border-gray-300 px-4 py-2"
                    >
                      Other Costs
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">9.9</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Contingency
                    </td>
                    {['totalCost', 'year1', 'year2', 'year3'].map(
                      (field, i) => (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          key={i}
                        >
                          <Field
                            name={`items.otherCosts.contingency.${field}`}
                            type="text"
                            className="w-full border rounded p-1"
                            value={
                              values?.items?.otherCosts?.contingency?.[field] ||
                              ''
                            }
                          />
                        </td>
                      )
                    )}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">9.10</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Institutional Overhead
                    </td>
                    {['totalCost', 'year1', 'year2', 'year3'].map(
                      (field, i) => (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          key={i}
                        >
                          <Field
                            name={`items.otherCosts.institutionalOverhead.${field}`}
                            type="text"
                            className="w-full border rounded p-1"
                            value={
                              values?.items?.otherCosts
                                ?.institutionalOverhead?.[field] || ''
                            }
                          />
                        </td>
                      )
                    )}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">9.11</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Taxes and Duties
                    </td>
                    {['totalCost', 'year1', 'year2', 'year3'].map(
                      (field, i) => (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          key={i}
                        >
                          <Field
                            name={`items.otherCosts.taxesDuties.${field}`}
                            type="text"
                            className="w-full border rounded p-1"
                            value={
                              values?.items?.otherCosts?.taxesDuties?.[field] ||
                              ''
                            }
                          />
                        </td>
                      )
                    )}
                  </tr>

                  {/* Grand Total */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="font-bold border border-gray-300 px-4 py-2">
                      GRAND TOTAL
                    </td>
                    {['totalCost', 'year1', 'year2', 'year3'].map(
                      (field, i) => (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          key={i}
                        >
                          <Field
                            name={`grandTotal.${field}`}
                            type="text"
                            className="w-full border rounded p-1"
                            value={values?.grandTotal?.[field] || ''}
                          />
                        </td>
                      )
                    )}
                  </tr>
                </tbody>
              </table>

              {/* Status of Project */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Status of Project
                </label>
                <Field
                  as="select"
                  name="status"
                  value={values.status}
                  className="w-full px-3 py-2 border rounded appearance-none focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Cancelled">Cancelled</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
                disabled={isSubmitting}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    console.log('Submitting:', values);

                    const projectData = {
                      projectTitle: values.projectTitle,
                      fundingSource: values.fundingSource,
                      description: values.description,
                      principalImplementingAgency:
                        values.principalImplementingAgency,
                      subImplementingAgencies: values.subImplementingAgencies,
                      projectInvestigators: values.projectInvestigators,
                      startDate: values.startDate,
                      scheduleCompletionDate: values.scheduleCompletionDate,
                      projectOutlay: values.outlay,
                      status: values.status,
                    };

                    const response = await axios.post(
                      'http://localhost:3000/api/projects/create',
                      projectData
                    );

                    if (response.data.success) {
                      alert('Project created successfully');
                      resetForm();
                    } else {
                      alert('Error: ' + response.data.message);
                    }
                  } catch (error) {
                    console.error('Error submitting form:', error);
                    alert('Failed to submit the form. Please try again.');
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProjectOnboarding;
