import {useState} from 'react';
import {Nav,Tab} from 'react-bootstrap';

import {CustomButton} from '../../../../theme/Button/Buttons'
import Configure from './Configure';
function SidePooup({examName}) {
  return (
    <>

      <div className='row w-100 m-0 p-0'  >
        <div className='row gap-3 mt-4  align-items-center'>
          <div className=' col-2 p-4 '>

            <h3>Test Configuration</h3>

            <div className=' mx-1 bg-dark-subtle rounded-5' style={{width: "200px",height: "10px"}}>
              <div className=' rounded-5' style={{width: "50%",height: "10px",backgroundColor: "blue"}}  >
              </div>
            </div>

          </div>
          <div className=' col-9   shadow  rounded-4  '>
            <h1 className=' p-4 '>{examName}</h1>
          </div>

        </div>

        <div className='row gap-3 mt-4'>
          <Tab.Container id="left-tabs-SidePooup" defaultActiveKey="configure">
            <div className=' col-2 p-lg-4  d-flex flex-column  justify-content-between align-items-baseline '>
              <Nav variant="pills" className="flex-column w-100">
                <Nav.Item>
                  <Nav.Link eventKey="configure">Configure</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="edit-emails">Edit Emails </Nav.Link>
                </Nav.Item>
              </Nav>
              <CustomButton buttonText={"Publish"} onButtonClick={(e) => {e.target.innerHTML = "End"}} className={" p-lg-2 w-100"} />
            </div>
            <div className=' col-9 shadow  rounded-4  ' style={{height: "650px"}}>
              <Tab.Content>
                <Tab.Pane eventKey="configure" className=' bg-transparent'>
                  <div className=' row w-100'> <Configure /></div>
                </Tab.Pane>
                <Tab.Pane eventKey="edit-emails" className=' bg-transparent'>Second tab content</Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>

      </div>
    </>
  );
}

export default SidePooup;
