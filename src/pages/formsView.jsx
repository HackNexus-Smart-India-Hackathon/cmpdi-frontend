import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatList from '../components/chat/chatlist';
import ExportFundDataToExcel from '../components/formsView/FundRequisitionForm';
import ExportToExcel from '../components/formsView/QuarterlyExpenditureStatementForm';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const FormsView = () => {
  const { title, code, projectId } = useParams();
  const [auditData, setAuditData] = useState([]);
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [field, setField] = useState({
    category: '',
    requestedAmount: '',
    amountApproved: '',
  });
  const { role } = useSelector((state) => state.auth);

  console.log(auditData);

  const handleChangeField = (event) => {
    const { name, value } = event.target;
    setField({ ...field, [name]: value });
  };
  function replaceHyphensWithSpaces(str) {
    return str.replace(/-/g, ' ');
  }
  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROJECT_BASE_API}/api/forms/approve/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        alert('Approved');
      } else {
        console.error('Failed to approve');
      }
    } catch (error) {
      console.error('Error approving:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROJECT_BASE_API}/api/forms/reject/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        alert('Rejected');
      } else {
        console.error('Failed to reject');
      }
    } catch (error) {
      console.error('Error rejecting:', error);
    }
  };

  const handleChange = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROJECT_BASE_API}/api/forms/change/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        alert('Changed');
      } else {
        console.error('Failed to change');
      }
    } catch (error) {
      console.error('Error changing:', error);
    }
  };

  const renderExcel = () => {
    switch (code) {
      case '2':
        return <ExportFundDataToExcel id={selectedEntryId} />;
      case '3':
        return <ExportToExcel id={selectedEntryId} />;
      default:
        alert('not done yet');
    }
  };
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
              {code === '2' && role === 'admin' && (
                <th className="border border-gray-300 p-3">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {auditData.map((entry, index) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-3">
                  {entry.createdAt.slice(0, 10)}{' '}
                  {'(' + entry.createdAt.slice(11, 16) + ')'}
                </td>
                <td className="border border-gray-300 p-3">{entry.filledBy}</td>
                <td className="border border-gray-300 p-3">
                  <button
                    onClick={() => setSelectedEntryId(entry.id)}
                    className="text-blue-600 hover:underline"
                  >
                    View Excel
                  </button>
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
                {code === '2' && role === 'admin' && (
                  <div className="flex gap-3 m-2">
                    <button
                      onClick={() => handleApprove(entry.id)}
                      className="text-gray-600 hover:text-gray-900 bg-green-200 p-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(entry.id)}
                      className="text-gray-600 hover:text-gray-900 bg-red-400 p-1 rounded"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => setIsChangeModalOpen(true)}
                      className="text-gray-600 hover:text-gray-900 bg-yellow-200 p-1 rounded"
                    >
                      Make change
                    </button>
                  </div>
                )}
                <Modal
                  open={isChangeModalOpen}
                  onClose={() => setIsChangeModalOpen(false)}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white border-2  shadow-xl p-4">
                    <div className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={field.category}
                        onChange={(e) => handleChangeField(e)}
                        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter milestone description"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-2">
                        requested amount
                      </label>
                      <input
                        type="text"
                        name="requestedAmount"
                        value={field.requestedAmount}
                        onChange={(e) => handleChangeField(e)}
                        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-2">
                        Amount approved
                      </label>
                      <input
                        type="text"
                        name="amountApproved"
                        value={field.amountApproved}
                        onChange={(e) => handleChangeField(e)}
                        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        required
                      />
                    </div>
                    <button
                      onClick={() => handleChange(entry.id)}
                      className="bg-blue-500 text-white p-2 rounded-md"
                    >
                      Change
                    </button>
                  </div>
                </Modal>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedEntryId && renderExcel()}
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
