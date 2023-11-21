import React from 'react';
import Example from '../../pages/admin/Example';
import { FaUserAlt } from 'react-icons/fa';
import './Header.css';
export default function Header() {
  return (
    <>
      <div
        id="header-container"
        className="m-0 h-auto p-1  d-flex  position-sticky top-0  z-3 w-100 bg-white "
      >
        {/* user part */}
        <div className="d-flex m-0  justify-content-end w-100">
          <span className="p-1 ">
            <FaUserAlt size={25} cursor={'pointer'} />
          </span>
        </div>
      </div>
    </>
  );
}
