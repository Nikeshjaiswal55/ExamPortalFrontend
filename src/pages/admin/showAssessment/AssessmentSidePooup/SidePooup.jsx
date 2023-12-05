import { useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';

import { CustomButton } from '../../../../theme/Button/Buttons';
import Configure from './Configure';
function SidePooup({ ...props }) {
  return (
    <>
      <div className="w-100 m-0 p-0">
        <div className="row gap-3 align-items-center">
          <div className="col-12 col-md-3 p-4 ">
            <h4>Test Configuration</h4>

            <div
              className=" mx-1 bg-dark-subtle rounded-5"
              style={{ width: '200px', height: '10px' }}
            >
              <div
                className=" rounded-5"
                style={{
                  width: '50%',
                  height: '10px',
                  backgroundColor: 'blue',
                }}
              ></div>
            </div>
          </div>
          <div className=" col-12 col-md-8 shadow  rounded-4  ">
            <h4 className=" p-4 fw-bold ">{props.assessmentName}</h4>
          </div>
        </div>

        <div className="row gap-3 mx-2">
          <Tab.Container id="left-tabs-SidePooup" defaultActiveKey="configure">
            <div className=" col-12 col-md-3 p-lg-4 mt-3 mt-md-0 d-flex flex-column  justify-content-between align-item-between align-items-md-baseline ">
              <Nav variant="pills" className="flex-row w-100">
                <Nav.Item>
                  <Nav.Link eventKey="configure">Configure</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="edit-emails">Edit Emails </Nav.Link>
                </Nav.Item>
              </Nav>
              <CustomButton
                buttonText={'Publish'}
                onButtonClick={(e) => {
                  e.target.innerHTML = 'End';
                }}
                className={' p-lg-2 w-100'}
              />
            </div>
            <div
              className=" col-12 flex-1 col-md-8 shadow  rounded-4  "
            >
              <Tab.Content>
                <Tab.Pane eventKey="configure" className=" bg-transparent">
                  <div className="row w-100">
                    <Configure {...props} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="edit-emails" className=" bg-transparent">
                  Second tab content
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      </div>
    </>
  );
}

export default SidePooup;
