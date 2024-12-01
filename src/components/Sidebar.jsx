import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { role } = useSelector((state) => state.auth);
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
      Link: `${role}console`,
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
      Item: 'Meetings',
      Icon: <CalendarMonthOutlinedIcon />,
      Link: '/meetings',
      Children: [
        { Item: 'Schedule Meetings', Link: '/schedulemeetings' },
        { Item: 'Meeting Logs', Link: '/meetinglogs' },
      ],
    },
  ];
  const withChildren = (sidebarItem, index) => {
    return (
      <div>
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
        {isSubItemOpen && openIndex === index && (
          <ul className="ml-8">
            {sidebarItem.Children.map((childItem, childIndex) => (
              <li
                key={childIndex}
                className="mx-6 my-1 px-4 py-1 border-none rounded-md cursor-pointer hover:bg-slate-200 select-none text-sm sm:text-base"
              >
                {<Link to={childItem.Link}>{childItem.Item}</Link>}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  const withoutChildren = (sidebarItem, index) => {
    return (
      <Link to={sidebarItem.Link}>
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
      </Link>
    );
  };
  return (
    <div>
      <button onClick={handleSidebarVisibility} className="">
        <ViewSidebarOutlinedIcon />
      </button>

      <div>
        {isSidebarOpen && (
          <div className="h-screen fixed left-0 w-64 bg-slate-100">
            <ul className="p-1 w-full">
              {sidebarItems.map((sidebarItem, index) => (
                <React.Fragment key={index}>
                  {sidebarItem.Children
                    ? withChildren(sidebarItem, index)
                    : withoutChildren(sidebarItem, index)}
                </React.Fragment>
              ))}
            </ul>

            <div className="w-64 fixed bottom-0">
              <div className="p-2">
                <div className="hover:bg-slate-200 rounded-md cursor-pointer pl-4 p-2 mx-2 mb-2 flex flex-row gap-4 select-none">
                  <div className="bg-slate-500 h-10 w-10 rounded-full"></div>
                  <div>
                    <div className="text-sm sm:text-base font-medium">
                      Nikhil
                    </div>
                    <div className="font-light text-xs sm:text-sm">
                      nikhil@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
