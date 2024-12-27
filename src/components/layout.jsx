import React, { useState } from 'react';
import 'bootstrap/js/dist/dropdown';
import {
  FaTh,
  FaChalkboardTeacher,
  FaClipboardList,
  FaThList,
} from 'react-icons/fa';
import { MdAssignmentAdd } from 'react-icons/md';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { FaRegRectangleList } from 'react-icons/fa6';
import './layout.css';
import Header from './Header/Header';
import { path } from '../routes/RoutesConstant';
import { CiLogout } from 'react-icons/ci';
import { useAuth0 } from '@auth0/auth0-react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import exameasy_light_logo from '../assets/exameasy_light_logo.svg';
import exameasy_short_light_logo from '../assets/exameasy_short_light_logo.svg';
import emailGif from '../assets/gif/mailgif.gif';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { getDecryptedResponse } from '../utils/getDecryptedResponse';
export default function Layout({ children }) {
  // const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const orgData = JSON.parse(localStorage.getItem('orgData'));
  const stdData = JSON.parse(localStorage.getItem('stdData'));
  const icon_size = '18px';
  const { logout } = useAuth0();
  const notificationFlag = useSelector((state) => state.admin.notification);
    const otp_data= getDecryptedResponse("otp_data")

  const orgOption = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: <FaTh size={icon_size} />,
    },
    {
      path: path.AddCourse.path,
      name: 'Add Course',
      icon: <FaChalkboardTeacher size={icon_size} />,
      orgtype: orgData?.orgnizationType,
    },
    {
      path: path.ShowCourse.path,
      name: 'Course List',
      icon: <FaRegRectangleList size={icon_size} />,
      orgtype: orgData?.orgnizationType,
    },
    {
      path: path.AddAssessment.path,
      name: 'Add Assessment',
      icon: <MdAssignmentAdd size={icon_size} />,
    },
    {
      path: path.ShowAssessment.path,
      name: 'Assessment List',
      icon: <FaClipboardList size={icon_size} />,
    },
    // {
    //   path: '',
    //   name: 'LogOut',
    //   icon: <CiLogout size={icon_size} />,
    //   onClick: () => {
    //     logout({ logoutParams: { returnTo: window.location.origin } });
    //     localStorage.clear();
    //   },
    // },
  ];
  const cmpOption = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: <FaTh size={icon_size} />,
    },
    {
      path: path.AddAssessment.path,
      name: 'Add Assessment',
      icon: <MdAssignmentAdd size={icon_size} />,
    },
    {
      path: path.ShowAssessment.path,
      name: 'Assessment List',
      icon: <FaClipboardList size={icon_size} />,
    },
    // {
    //   path: '',
    //   name: 'LogOut',
    //   icon: <CiLogout size={icon_size} />,
    //   onClick: () => {
    //     logout({ logoutParams: { returnTo: window.location.origin } });
    //     localStorage.clear();
    //   },
    // },
  ];

  const stdOption = [
    // {
    //   path: '/student/dashboard',
    //   className: '',
    //   name: 'Dashboard',
    //   icon: <FaTh size={icon_size} />,
    // },
    {
      path: path.ShowAllAssessmentToStudent.path,
      name: 'Assessment List',
      className: '',
      icon: <FaClipboardList size={icon_size} />,
    },
    // {
    //   path: '',
    //   name: 'LogOut',
    //   className: ' align-self-end',
    //   icon: <CiLogout size={icon_size} />,
    //   onClick: () => {
    //     logout({ logoutParams: { returnTo: window.location.origin } });
    //     localStorage.clear();
    //   },
    // },
  ];

  const orgtype = localStorage.getItem('orgtype');
  const menuItem =
    orgData && orgData.orgnizationType === 'company' && orgtype === 'company'
      ? cmpOption
      : stdData && stdData.role === 'Student'|| otp_data?.role==='Student'
      ? stdOption
      : orgOption;

  return (
    <>
      <div className="d-flex p-0 h-100 ">
        <div
          style={{
            width: isOpen ? '200px' : '50px',
            left: isOpen ? '0px' : '-70px',
          }}
          className="sidebar m-2 d-flex flex-column justify-content-between"
          id="sideNavbar"
        >
          <div>
            <div className="top_section">
              <div style={{ display: isOpen ? 'none' : 'block' }}>
                <img
                  src={exameasy_short_light_logo}
                  alt="logo"
                  className=""
                  width={'20px'}
                />
              </div>
              <h1
                style={{ display: isOpen ? 'block' : 'none' }}
                className="logo text-center"
              >
                <img src={exameasy_light_logo} alt="logo" width={'60%'} />
              </h1>
            </div>

            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="link"
                activeclassName="active"
                onClick={item.onClick}
              >
                {item.icon}
                <div
                  style={{ display: isOpen ? 'block' : 'none' }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </NavLink>
            ))}
          </div>
          <NavLink
            to={''}
            className="link"
            activeclassName="active  align-self-end"
            onClick={() => {
              logout({ logoutParams: { returnTo: window.location.origin } });
              localStorage.clear();
            }}
          >
            <CiLogout size={icon_size} />
            <div
              style={{ display: isOpen ? 'block' : 'none' }}
              className="link_text"
            >
              LogOut
            </div>
          </NavLink>
        </div>

        <div
          style={{
            transition: 'all 0.5s',
            left: isOpen ? '155px' : '5px',
            cursor: 'pointer',
          }}
          className="bars nav-arrow  cursor-pointer position-absolute top-50 translate-middle z-3 text-white bg-dark  rounded-circle "
        >
          {isOpen ? (
            <RiArrowLeftSLine size={30} onClick={toggle} />
          ) : (
            <RiArrowRightSLine size={30} onClick={toggle} />
          )}
        </div>

        <main
          className="main p-0 m-0 h-100 overflow-hidden "
          style={{ width: isOpen ? 'calc(100% - 200px)' : 'calc(100% - 60px)' }}
        >
          <Header isOpen={isOpen} />
          <div
            className="main-container m-0 p-2 w-100"
            style={{ height: 'calc(100vh - 60px)' }}
          >
            <div
              id="header-container"
              className={`m-0 h-auto p-1  d-flex  position-sticky top-2  z-2 w-100 bg-white ${
                notificationFlag ? 'd-block' : 'd-none'
              }`}
            >
              <Alert
                key={'primary'}
                className={`py-2 mb-0 w-100`}
                variant={'primary'}
              >
                <img src={emailGif} height={'40px'} className="mx-3" />
                sending mails to students...
              </Alert>
            </div>
            <div className="w-100 h-100 rounded-1 m-0 p-0 ">{children}</div>
          </div>
          <ToastContainer />
        </main>
      </div>
    </>
  );
}
