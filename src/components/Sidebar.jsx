import { AccountCircle } from '@mui/icons-material';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import callRefreshToken from '../utils/reset_token';

const Sidebar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { user_id, access_token } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth);
  const [isSubItemOpen, setIsSubItemOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const handleVisibility = (idx) => {
    setIsSubItemOpen(!isSubItemOpen);
    setOpenIndex(idx);
  };

  const handleProfileMenuOpen = () => {
    navigate('/profile');
  };

  const sidebarItems = [
    {
      Item: 'Dashboard',
      Icon: <DashboardCustomizeOutlinedIcon />,
      Link: `/${role}/dashboard`,
    },
    {
      Item: 'Project',
      Icon: <WorkOutlineOutlinedIcon />,
      Children: [
        { Item: 'Add Project', Link: '/project/add' },
        { Item: 'View Project', Link: '/project/all' },
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
      Children: [
        { Item: 'Research Institute', Link: '/researcinstitute/all' },
        { Item: 'Investigator', Link: '/investigator/all' },
      ],
    },
    {
      Item: 'Meetings',
      Icon: <CalendarMonthOutlinedIcon />,
      Link: '/meetings',
      Children: [
        { Item: 'Schedule Meetings', Link: '/schedule/meetings' },
        { Item: 'Meeting Logs', Link: '/meeting/logs' },
      ],
    },
  ];
  const withChildren = (sidebarItem, index) => {
    return (
      <div>
        <li
          onClick={() => handleVisibility(index)}
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
          <button onClick={() => handleVisibility(index)} className="text-xl">
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
                {
                  <Link to={childItem.Link} className="text-lg">
                    {childItem.Item}
                  </Link>
                }
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  const withoutChildren = (sidebarItem, index) => {
    return (
      <Link to={sidebarItem.Link} onClick={() => handleVisibility(index)}>
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
          <button onClick={() => handleVisibility(index)} className="text-xl">
            {sidebarItem.Item}
          </button>
        </li>
      </Link>
    );
  };
  console.log(data);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_AUTH_BASE_API;
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/user/${user_id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          // withCredentials: true, // Include cookies in the request
        });
        setData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expired, refresh the token
          try {
            const newAccessToken = await callRefreshToken();
            // Retry the original request with the new token
            const retryResponse = await axios.get(
              `${baseUrl}/auth/user/${user_id}`,
              {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );
            setData(retryResponse.data);
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
          }
        } else {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchData();
  }, [access_token, user_id]);
  return (
    <>
      {/* <button onClick={handleSidebarVisibility} className="">
        <ViewSidebarOutlinedIcon />
      </button> */}

      <div className="h-screen fixed left-0 w-[17vw] bg-slate-100">
        <ul className="p-1 py-8 flex flex-col  w-full">
          {sidebarItems.map((sidebarItem, index) => (
            <React.Fragment key={index}>
              {sidebarItem.Children
                ? withChildren(sidebarItem, index)
                : withoutChildren(sidebarItem, index)}
            </React.Fragment>
          ))}
        </ul>

        <div className="bottom-8 fixed">
          <div className="p-2">
            <div
              onClick={handleProfileMenuOpen}
              className="items-center w-[15vw] bg-slate-200 rounded-md cursor-pointer pl-4 p-2 mx-2 mb-2 flex flex-row gap-4 select-none"
            >
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle style={{ fontSize: '3.25rem' }} />
              </IconButton>

              <div>
                <div className="text-xl  font-medium">
                  {data ? data.username : 'User'}
                </div>
                <div className="font-light text-md ">
                  {data ? data.email : 'user email'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
