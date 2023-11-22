import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import '../components/style.css';
import TableResponsive from './TableResponsive';

export default function OrgDashBoard() {
  return (
    <>
      <div className="row m-0 p-0 justify-content-end">
        <div className="  col-12 row m-0 d-flex">
          <div className="row d-flex  p-1 g-1">
            <div className="row d-flex  justify-content-around  p-2 pt-0 g-1">
              <div className="col  col-xl-3 p-3 bg-white rounded-3">
                <h1> Your Created Exams </h1>
              </div>
              <div className="col col-xl-3  offset-sm-1 p-3 bg-white rounded-3">
                <h1> Number of Students</h1>
              </div>
              <div className="col col-xl-3 offset-sm-1 p-3 bg-white rounded-3">
                <h1> Number of maintors </h1>
                <h1> in your </h1>
                <h1> organisation</h1>
              </div>
            </div>

            <div className="row m-0  d-flex justify-content-between bg-white rounded-3 w-100 ">
              <div className="row w-100 d-flex justify-content-around  align-items-center p-3">
                <div className="col-6  text-center  ">
                  <p className=" text-capitalize  text-break fw-bold ">
                    Upcoming assesment
                  </p>
                </div>
                <div className=" col-6 col-lg-3 offset-lg-3   ">
                  <Form.Select
                    aria-label="Table view "
                    style={{ borderColor: '#707070' }}
                    className="p-1 input-border  border focus-ring focus-ring-light "
                  >
                    <option value="">Table view</option>
                    <option value="company">Row view </option>
                    <option value="college">Coloumn view </option>
                  </Form.Select>
                </div>
              </div>

              <div className=" row  w-100 g-1 bg-white rounded-3 ">
                <TableResponsive />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
