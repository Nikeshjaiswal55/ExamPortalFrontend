import React, { useState } from 'react';

import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Header from './Header/Header';

export default function Layout({ children }) {
  // const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: <FaTh />,
    },
    {
      path: '/admin/add-course',
      name: 'About',
      icon: <FaUserAlt />,
    },
    {
      path: '/admin/add-assessment',
      name: 'Analytics',
      icon: <FaRegChartBar />,
    },
    // {
    //   path: '/comment',
    //   name: 'Comment',
    //   icon: <FaCommentAlt />,
    // },
    // {
    //   path: '/product',
    //   name: 'Product',
    //   icon: <FaShoppingBag />,
    // },
    // {
    //   path: '/productList',
    //   name: 'Product List',
    //   icon: <FaThList />,
    // },
  ];
  return (
    <>
      <div className="container p-0">
        <div
          style={{ width: isOpen ? '200px' : '50px' }}
          className="sidebar m-2"
        >
          <div className="top_section">
            <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
              Logo
            </h1>
            <div
              style={{ marginLeft: isOpen ? '50px' : '0px' }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? 'block' : 'none' }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <main className='p-0'>
          <Header/>
          <div className='main-container'> {children}</div>
         </main>
      </div>
    </>
  );
}
