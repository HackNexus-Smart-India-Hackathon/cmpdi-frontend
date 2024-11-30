import React from 'react';
import { useSelector } from 'react-redux';
import FundRequisitionForm from '../components/Forms/FundRequisitionForm';
import ProjectCompletionReportForm from '../components/Forms/ProjectCompletionReportForm';
import ProjectDurationExtensionForm from '../components/Forms/ProjectDurationExtentionForm';
import QuarterlyExpenditureStatementForm from '../components/Forms/QuarterlyExpenditureStatementForm';
import QuarterlyStatusReportForm from '../components/Forms/QuaterlyStatusReportForm';
import RevisionCostForm from '../components/Forms/RevisionofProjectCost';
import Navbar from '../components/Navbar';
import ProjectOnboarding from '../components/ProjectOnboarding';

import Sidebar from '../components/Sidebar';

const AdminConsole = () => {
  const { user_id, access_token } = useSelector((state) => state.auth);
  console.log(user_id, access_token);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className="w-64">
          <Sidebar />
        </div>

        <div className="flex-1 mx-10">
          <ProjectOnboarding />
          <FundRequisitionForm />
          <QuarterlyStatusReportForm />
          <QuarterlyExpenditureStatementForm />
          <ProjectDurationExtensionForm />
          <ProjectCompletionReportForm />
          <QuarterlyExpenditureStatementForm />
          <RevisionCostForm />
        </div>
      </div>
    </div>
  );
};

export default AdminConsole;
