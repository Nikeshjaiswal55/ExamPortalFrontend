import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

import './Header.css';
export default function Header() {
  return (
    <>
      <div
        id="header-container"
        className="m-0 h-auto p-1  d-flex  position-sticky top-0  z-1 w-100 bg-white "
      >
        {/* user part */}
        <div className="d-flex m-0  justify-content-end w-100">
          <span className="p-1 ">

            <div className="dropdown">
              <a
                className="btn  "
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >

            <FaUserAlt size={25} cursor={'pointer'} />
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    UserName
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Email
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>


          </span>
        </div>
      </div>
    </>
  );
}
