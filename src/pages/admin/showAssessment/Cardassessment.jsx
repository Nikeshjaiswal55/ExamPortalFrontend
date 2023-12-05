import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';
import { AiOutlineFieldTime } from 'react-icons/ai';
import '../../../styles/common.css';
import { Button, Placeholder, Spinner } from 'react-bootstrap';
import { ImCross } from 'react-icons/im';
import { toast } from 'react-toastify';
// import {Button,Placeholder,Spinner} from 'react-bootstrap';
import SidePooup from './AssessmentSidePooup/SidePooup';
import Example from './AssessmentSidePooup/Modal';

export default function Cardassessment({
  deleteAssignment,
  paperId,
  ...props
}) {
  const stdData = JSON.parse(localStorage.getItem('stdData'));
  const navigate = useNavigate();
  const removeAssisstment = async () => {
    await deleteAssignment(paperId);
  };

  const [showCard, setShowCard] = useState();

  return (
    <>
      <div className="col-12 col-lg-6 mb-4 h-25 ">
        <div className=" white-box px-4 pt-2 pb-4 position-relative border rounded-4  bg-white">
          <div className="w-100 d-flex pb-3 pt-1 cursor-pointer justify-content-end align-items-center">
            <ImCross onClick={removeAssisstment} />
          </div>
          <div className="d-flex justify-content-between align-items-center bg-white rounded-3 p-2 px-4  bg-body-secondary">
            <div className="m-0 p-0">
              <strong
                className="fs-6 cursor-pointer"
                onClick={() => setShowCard(true)}
              >
                {props?.assessmentName}
              </strong>
              <br />
              <span>{props?.ExamDate}</span>
            </div>
            {props?._Active ? (
              <div className=" d-flex justify-content-evenly   align-items-center">
                {' '}
                <Spinner animation="grow" variant="success" size="sm" />{' '}
                <strong className="ms-2"> Active</strong>
              </div>
            ) : (
              <div>
                <Button
                  variant="outline-primary"
                  className="btn  p-0 px-1 text-uppercase"
                  disabled
                >
                  setup in progress
                </Button>
              </div>
            )}
          </div>
          <div className=" d-flex justify-content-between flex-wrap align-baseline pt-3 ps-2">
            <div className=" d-flex  align-items-center  justify-content-evenly">
              <AiOutlineFieldTime size={30} />
              <span className="ms-2"> {props?.examDuration}</span>{' '}
            </div>
            {stdData ? (
              <Button
                onClick={() => navigate(`/student/exam-verify/${paperId}`)}
              >
                GetStarted
              </Button>
            ) : (
              <div
                className="text-black m-0 mx-5 p-0 position-relative cursor-pointer "
                style={{ width: '50px', height: '10px' }}
                onClick={() => navigate(`/admin/student-details/${paperId}`)}
              >
                <div
                  className=" rounded-circle border p-0 position-absolute top-0 start-25  text-center  bg-danger   "
                  style={{ width: '30px', height: '30px' }}
                >
                  <b> A</b>{' '}
                </div>
                <div
                  className="border rounded-circle p-0 position-absolute top-0 start-50 text-center bg-secondary  bg-gradient"
                  style={{ width: '30px', height: '30px' }}
                >
                  <b>B</b>{' '}
                </div>
                <div
                  className="border rounded-circle p-0 position-absolute  top-0 start-100 text-center bg-white "
                  style={{ width: '30px', height: '30px' }}
                >
                  <b> 3+</b>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Example show={showCard} {...props} setShowCard={setShowCard} />
    </>
  );
}

export const CardassessmentPlaceholder = () => {
  return (
    <div className="col-12 col-lg-6 mb-4 h-25 ">
      <div className=" white-box p-4 border rounded-4 bg-white">
        <div className=" rounded-3 p-2 mx-3  bg-body-secondary">
          <Placeholder as="div" animation="glow">
            <Placeholder xs={5} />
          </Placeholder>
          <Placeholder as="div" animation="glow">
            <Placeholder xs={3} />
          </Placeholder>
        </div>
        <div className="pt-3 ps-4">
          <Placeholder as="div" animation="glow">
            <Placeholder xs={2} />
          </Placeholder>
          <Placeholder as="div" animation="glow">
            <Placeholder xs={3} />
          </Placeholder>
        </div>
      </div>
    </div>
  );
};
