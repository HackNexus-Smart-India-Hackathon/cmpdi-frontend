import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import FundRequisitionForm from '../components/formsView/FundRequisitionForm';
// import ProjectCompletionReportForm from '../components/formsView/ProjectCompletionReportForm';
// import ProjectDurationExtensionForm from '../components/formsView/ProjectDurationExtentionForm';
// import QuarterlyExpenditureStatementForm from '../components/formsView/QuarterlyExpenditureStatementForm';
// import QuarterlyExpenditureStatementonCapitalEquipment from '../components/formsView/QuarterlyExpenditureStatementonCapitalEquipment';
// import QuarterlyStatusReportForm from '../components/formsView/QuarterlyStatusReportForm';
// import RevisionCostForm from '../components/formsView/RevisionCostForm';
import ChatList from '../components/chat/chatlist';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
const FormsView = () => {
  const { title, code, projectId } = useParams();
  const [auditData, setAuditData] = useState([]);
  console.log(auditData);

  // const auditData = [
  //   {
  //     id: 1,
  //     auditTime: '2024-12-05 10:45 AM',
  //     filledBy: 'John Doe',
  //     formDataLink: '/forms/data/1',
  //     supportingDocLink: '/forms/supporting-doc/1',
  //   },
  //   {
  //     id: 2,
  //     auditTime: '2024-12-04 02:30 PM',
  //     filledBy: 'Jane Smith',
  //     formDataLink: '/forms/data/2',
  //     supportingDocLink: '/forms/supporting-doc/2',
  //   },
  //   {
  //     id: 3,
  //     auditTime: '2024-12-03 11:15 AM',
  //     filledBy: 'Robert Brown',
  //     formDataLink: '/forms/data/3',
  //     supportingDocLink: '/forms/supporting-doc/3',
  //   },
  // ];

  function replaceHyphensWithSpaces(str) {
    return str.replace(/-/g, ' ');
  }
  useEffect(() => {
    const getTitle = () => {
      switch (code) {
        case '2':
          return 'fund-requisition';
        case '3':
          return 'quarterly-expenditure-statement';
        case '4':
          return 'quarterly-expenditure-statement-capital-equipment';
        case '5':
          return 'quarterly-status-report';
        case '6':
          return '/project-completion-report';
        case '7':
          return 'project-duration-extension';
        case '8':
          return 'revision-cost-report';
        default:
          return 'Form not found';
      }
    };
    const fetchAuditData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PROJECT_BASE_API}/api/forms/${getTitle()}/project/${projectId}`
        );
        const result = await response.json();
        if (result.success) {
          setAuditData(result.data);
        } else {
          console.error('Failed to fetch audit data');
        }
      } catch (error) {
        console.error('Error fetching audit data:', error);
      }
    };
    fetchAuditData();
  }, [code, projectId, title]);
  const common = () => {
    return (
      <div className="w-[80vw] mx-auto p-6 bg-white shadow-md border rounded-lg">
        <h1 className="text-xl font-semibold mb-4">
          {replaceHyphensWithSpaces(title)} Audit History
        </h1>
        <table className="min-w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3">Audit Time</th>
              <th className="border border-gray-300 p-3">Filled By</th>
              <th className="border border-gray-300 p-3">View Form Data</th>
              <th className="border border-gray-300 p-3">
                View Supporting Doc
              </th>
            </tr>
          </thead>
          <tbody>
            {auditData.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-3">
                  {entry.createdAt.slice(0, 10)}{' '}
                  {'(' + entry.createdAt.slice(11, 16) + ')'}
                </td>
                <td className="border border-gray-300 p-3">{entry.filledBy}</td>
                <td className="border border-gray-300 p-3">
                  <a
                    href={entry.formDataLink}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Form Data
                  </a>
                </td>
                <td className="border border-gray-300 p-3">
                  <a
                    href={entry.supportingDocLink}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Supporting Doc
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ChatList />
      </div>
    );
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className="w-[17vw]">
          <Sidebar />
        </div>

        <div className="flex-1 m-4">{common()}</div>
      </div>
    </div>
  );
};

export default FormsView;
