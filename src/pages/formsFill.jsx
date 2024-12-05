import React from 'react';
import { useParams } from 'react-router-dom';
import ChatSection from '../components/chat/chatlist';
import FundRequisitionForm from '../components/FormsFill/FundRequisitionForm';
import ProjectCompletionReportForm from '../components/FormsFill/ProjectCompletionReportForm';
import ProjectDurationExtensionForm from '../components/FormsFill/ProjectDurationExtentionForm';
import QuarterlyExpenditureStatementForm from '../components/FormsFill/QuarterlyExpenditureStatementForm';
import QuarterlyExpenditureStatementonCapitalEquipment from '../components/FormsFill/QuarterlyExpenditureStatementonCapitalEquipment';
import QuarterlyStatusReportForm from '../components/FormsFill/QuaterlyStatusReportForm';
import RevisionCostForm from '../components/FormsFill/RevisionofProjectCost';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const FormsFill = ({ edit = false }) => {
  console.log(edit);

  const { code } = useParams();

  const renderFormComponent = (edit) => {
    switch (code) {
      case '2':
        return <FundRequisitionForm edit={edit} />;
      case '3':
        return <QuarterlyExpenditureStatementForm edit={edit} />;
      case '4':
        return <QuarterlyExpenditureStatementonCapitalEquipment edit={edit} />;
      case '5':
        return <QuarterlyStatusReportForm edit={edit} />;
      case '6':
        return <ProjectCompletionReportForm edit={edit} />;
      case '7':
        return <ProjectDurationExtensionForm edit={edit} />;
      case '8':
        return <RevisionCostForm edit={edit} />;
      default:
        return <div>Form not found</div>;
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className="w-[17vw]">
          <Sidebar />
        </div>
        <div className="flex-1 m-4">
          {renderFormComponent(edit)}
          <ChatSection />
        </div>
      </div>
    </div>
  );
};

export default FormsFill;
