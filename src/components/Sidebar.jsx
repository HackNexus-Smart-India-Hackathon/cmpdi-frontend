import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

import React, { useState } from 'react';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubItemOpen, setIsSubItemOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const handleVisibility = (idx) => {
    setIsSubItemOpen(!isSubItemOpen);
    setOpenIndex(idx);
  };

  const handleSidebarVisibility = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarItems = [
    {
      Item: 'Dashboard',
      Icon: <DashboardCustomizeOutlinedIcon />,
      Link: '/dashboard',
    },
    {
      Item: 'Project',
      Icon: <WorkOutlineOutlinedIcon />,
      Link: '/project',
      Children: [
        { Item: 'Add Project', Link: '/dashboard/addproject' },
        { Item: 'View Project', Link: '/dashboard/viewproject' },
      ],
    },
    {
      Item: 'Tasks',
      Icon: <TaskOutlinedIcon />,
      Link: '/tasks',
    },
    {
      Item: 'Analytics',
      Icon: <AnalyticsOutlinedIcon />,
      Link: '/analytics',
    },
    {
      Item: 'Discover',
      Icon: <TravelExploreOutlinedIcon />,
      Link: '/discover',
      Children: [
        { Item: 'Research Institute', Link: '/researcinstitute' },
        { Item: 'Investigator', Link: '/investigator' },
      ],
    },
    {
      Item: 'Notifications',
      Icon: <NotificationsNoneOutlinedIcon />,
      Link: '/notifications',
    },
    {
      Item: 'Meetings',
      Icon: <CalendarMonthOutlinedIcon />,
      Link: '/meetings',
      Children: [
        { Item: 'Schedule Meetings', Link: '/schedulemeetings' },
        { Item: 'Meeting Logs', Link: '/meetinglogs' },
      ],
    },
  ];

  return (
    <>
      <button onClick={handleSidebarVisibility} className="">
        <ViewSidebarOutlinedIcon />
      </button>

      {isSidebarOpen && (
        <div className="h-screen fixed left-0 w-64 bg-slate-100">
          <ul className="p-1 w-full">
            {sidebarItems.map((sidebarItem, index) => (
              <React.Fragment key={index}>
                <li
                  className={`m-2 p-2 flex items-center gap-3 pl-4 border-none rounded-md cursor-pointer hover:bg-slate-200 select-none ${
                    sidebarItem.Children?.length > 0 &&
                    isSubItemOpen &&
                    openIndex === index
                      ? `bg-slate-200`
                      : ''
                  }`}
                >
                  <div className="text-base sm:text-lg md:text-xl">
                    {sidebarItem.Icon}
                  </div>
                  <button onClick={() => handleVisibility(index)} className="">
                    {sidebarItem.Item}
                  </button>
                </li>
                {sidebarItem.Children?.length > 0 &&
                  isSubItemOpen &&
                  openIndex === index && (
                    <ul className="ml-8">
                      {sidebarItem.Children.map((childItem, childIndex) => (
                        <li
                          key={childIndex}
                          className="mx-6 my-1 px-4 py-1 border-none rounded-md cursor-pointer hover:bg-slate-200 select-none text-sm sm:text-base"
                        >
                          {childItem.Item}
                        </li>
                      ))}
                    </ul>
                  )}
              </React.Fragment>
            ))}
          </ul>

          <div className="w-64 fixed bottom-0">
            <div className="p-2">
              <div className="hover:bg-slate-200 rounded-md cursor-pointer pl-4 p-2 mx-2 mb-2 flex flex-row gap-4 select-none">
                <div className="bg-slate-500 h-10 w-10 rounded-full"></div>
                <div>
                  <div className="text-sm sm:text-base font-medium">Nikhil</div>
                  <div className="font-light text-xs sm:text-sm">
                    nikhil@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
