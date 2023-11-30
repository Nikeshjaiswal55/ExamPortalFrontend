import React from 'react';
import {FaUserAlt,FaMoon} from 'react-icons/fa';
import {MdSunny} from 'react-icons/md';

import './Header.css';
import Mode from '../../utils/theme';

export default function Header({isOpen}) {
  const user = JSON.parse(localStorage.getItem("users"));
  console.log(user)
  return (
    <>
      <div
        id="header-container"
        className="m-0 h-auto p-1  d-flex  position-sticky top-0  z-1 w-100 box"
      >
        {/* user part */}
        <div className="d-flex m-0  justify-content-end w-100">
          <div className="d-flex py-1">
            <Mode/>
            <div className="dropdown">
              <div href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
              >
                <FaUserAlt className='me-3 icon' size={22} cursor={'pointer'} />
              </div>
              <ul className="dropdown-menu  text-body-secondary">

                <li >
                  <a className="dropdown-item box text-black fw-bold" href="#">
                    {user.name}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item  box text-black" href="#">
                    {user.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
