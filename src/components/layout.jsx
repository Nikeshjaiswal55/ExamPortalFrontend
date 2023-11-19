import React,{useState} from 'react';
import 'bootstrap/js/dist/dropdown';
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from 'react-icons/fa';
import {RiArrowLeftSLine,RiArrowRightSLine} from 'react-icons/ri';
import {NavLink} from 'react-router-dom';
import './layout.css';
import Header from './Header/Header';

export default function Layout({children}) {
  // const Sidebar = ({children}) => {
  const [isOpen,setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: <FaTh />,
    },
    {
      path: '/admin/add-course',
      name: 'Add course',
      icon: <FaUserAlt />,
    },
    {
      path: '/admin/add-assessment',
      name: 'add assessment',
      icon: <FaRegChartBar />,
    },
    {
      path: '/admin/create-course',
      name: 'create course',
      icon: <FaCommentAlt />,
    },
    {
      path: '/admin/create-assessment',
      name: 'create assessment',
      icon: <FaShoppingBag />,
    },
    {
      path: '/admin/show-course',
      name: 'course List',
      icon: <FaThList />,
    },
  ];


  return (
    <>
      <div className="d-flex p-0 h-100 ">
        <div
          style={{
            width: isOpen ? '200px' : '50px',
            left: isOpen ? '0px' : '-70px',
          }}
          className="sidebar m-2  "
          id="sideNavbar"
        >
          <div className="top_section">
            <h1 style={{display: isOpen ? 'block' : 'none'}} className="logo">
              Lg
            </h1>
          </div>
          {menuItem.map((item,index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{display: isOpen ? 'block' : 'none'}}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
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
          className="main p-0 m-0 h-100 "
          style={{width: isOpen ? 'calc(100% - 200px)' : 'calc(100% - 60px)'}}
        >
          <Header isOpen={isOpen} />
          <div
            className="main-container m-0 p-2 w-100  "
            style={{height: 'calc(100vh - 60px)'}}
          >
            <div className="w-100 h-100 rounded-1 m-0 p-0  bg-white">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
