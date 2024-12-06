import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import React from 'react';
import { useSelector } from 'react-redux';
import KeyMetrix from '../components/adminConsole/keymetrix';
import QuarterlyExpenditure from '../components/charts/QuaterlyExpenditure';
import Navbar from '../components/Navbar';
import ProjectTable from '../components/projectList';
import Sidebar from '../components/Sidebar';

const AdminConsole = () => {
  const { user_id, access_token } = useSelector((state) => state.auth);
  console.log(user_id, access_token);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className="w-[17vw]">
          <Sidebar />
        </div>

        <div className="flex-1 m-10">
          <div className="flex flex-row gap-8">
            <div className="p-4 flex flex-row gap-8 flex-wrap justify-around rounded-lg shadow-md">
              <KeyMetrix
                title={'4 Projects'}
                description={'Pending'}
                icon={<AccessAlarmRoundedIcon />}
              />
              <KeyMetrix
                title={'4 Projects'}
                description={'Total'}
                icon={<AccessAlarmRoundedIcon />}
                backgroundColor={'#CDE5F1'}
              />

              <KeyMetrix
                title={'4 Projects'}
                description={'Active'}
                icon={<AccessAlarmRoundedIcon />}
              />
              <KeyMetrix
                title={'4 Projects'}
                description={'Completed'}
                icon={<AssignmentTurnedInRoundedIcon />}
                backgroundColor={'#CDE5F1'}
              />
            </div>
          </div>
          <div>
            <ProjectTable />
          </div>
          <div className="mt-20">
            <QuarterlyExpenditure />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminConsole;
