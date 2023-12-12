import { useEffect, useState } from 'react';
import { Button, Nav, Spinner, Tab } from 'react-bootstrap';

import { CustomButton } from '../../../../theme/Button/Buttons';

import Configure from './Configure';
import {
  usePutActivePaperMutation,
  useSentMailToStudentMutation,
} from '../../../../apis/Service';
import { toast } from 'react-toastify';
import { getNotification } from '../../../../store/adminSlice';
import { useDispatch } from 'react-redux';
function SidePooup({ paperId, handleClose, ...props }) {
  const dipatch = useDispatch();
  const [paperActive, setPaperActive] = useState(props.is_Active);
  const [publish, { isSuccess, isLoading }] = usePutActivePaperMutation();
  const [sendingMail] = useSentMailToStudentMutation();
  const activePaper = async () => {
    publish({ paperId, paperActive }).then(() => {
      dipatch(getNotification(true));
      sendingMail(paperId).then((res) => {
        if (res.error.originalStatus === 200) {
          dipatch(getNotification(false));
        }
      });
    });
    setPaperActive(!paperActive);
    toast.success('assessment updated successfully!!🎉', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    handleClose();
  };

  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

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
                {/* <Nav.Item>
                  <Nav.Link eventKey="edit-emails">Edit Emails </Nav.Link>
                </Nav.Item> */}
              </Nav>
              <Button
                onClick={(e) => {
                  activePaper();
                }}
                className=" p-lg-2 w-100 btn-dark btn"
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : paperActive ? (
                  'End'
                ) : (
                  'Publish'
                )}
              </Button>
            </div>
            <div className=" col-12 flex-1 col-md-8 shadow  rounded-4  ">
              <Tab.Content>
                <Tab.Pane eventKey="configure" className=" bg-transparent">
                  <div className="row w-100">
                    <Configure paperId={paperId} ConfigureProps={props} />
                  </div>
                </Tab.Pane>
                {/* <Tab.Pane eventKey="edit-emails" className=" bg-transparent">
                  Second tab content
                </Tab.Pane> */}
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      </div>
    </>
  );
}

export default SidePooup;
