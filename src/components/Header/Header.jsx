import React from 'react';
import {FaUserAlt} from 'react-icons/fa';
import './Header.css';

export function Header({isOpen}) {
  const user = JSON.parse(localStorage.getItem("users"));
  console.log(user)
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
                className="btn border-0 "
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserAlt size={25} cursor={'pointer'} />
              </a>
              <ul className="dropdown-menu  text-body-secondary">

                <li >
                  <a className="dropdown-item bg-white text-black fw-bold" href="#">
                    {user.name}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item  bg-white text-black" href="#">
                    {user.email}
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
