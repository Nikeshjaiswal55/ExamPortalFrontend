import React from 'react';
import Example from '../../pages/admin/Example';
import { FaUserAlt } from 'react-icons/fa';
import './Header.css';
export default function Header() {
  return (
    <>
      <div
        id="header-container"
        className=" ms-lg-5   row m-0 h-auto  w-auto  p-1  d-flex  position-sticky top-0  z-3 bg-white ps-lg-5"
      >
        {/* user part */}
        <div className="d-flex justify-content-between  justify-content-lg-end">
          <span className="d-lg-none">
            <Example />
          </span>
          <span className="p-1 ">
            <FaUserAlt size={25} cursor={'pointer'} />
          </span>
        </div>
      </div>
    </>
  );
}
