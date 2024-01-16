import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';
import { AiOutlineFieldTime } from 'react-icons/ai';
import '../../../styles/common.css';
import { Button, Placeholder, Spinner } from 'react-bootstrap';
import { ImCross } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
// import {Button,Placeholder,Spinner} from 'react-bootstrap';
import SidePooup from './AssessmentSidePooup/SidePooup';
import Example from './AssessmentSidePooup/Modal';
import { path } from '../../../routes/RoutesConstant';
import { useDispatch } from 'react-redux';
import { updateAssissmentData } from '../../../store/adminSlice';
import { DateAndTimeFormate, TimeFormate } from '../../../utils/utils';

const color = ['#966CFF', '#FF8533', '#E6CB0E', '#0ea4e6', '#0ee670'];

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

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
  const dispatch = useDispatch();

  return (
    <>
      <div className="col-12 col-lg-6 mb-2 p-0 px-1  ">
        <div className="white-box h-100 px-3 pt-3 pb-3 position-relative border rounded-4  bg-white">
          {/* <div
            className={`w-100 d-flex ${
              stdData || props?.is_Active !== 'false' ? 'pb-4 mb-1' : 'pb-3'
            } pt-1 cursor-pointer justify-content-end align-items-center`}
          >
            {stdData || props?.is_Active !== 'false' ? (
              ''
            ) : (
              <MdDelete color="red" onClick={removeAssisstment} />
            )}
          </div> */}
          <div className="d-flex justify-content-between align-items-center bg-white rounded-3 p-2 px-4  bg-body-secondary">
            <div className="m-0 p-0">
              <strong
                onClick={() => {
                  dispatch(updateAssissmentData({ paperId, ...props }));
                  navigate(path.UpdateAssessment.path);
                }}
                className="fs-6 cursor-pointer text-capitalize"
                // onClick={() => (stdData ? '' : setShowCard(true))}
              >
                {props?.assessmentName}
              </strong>
              <br />
              <p style={{ fontSize: '14px' }} className="mt-1 mb-0 p-0">
                {DateAndTimeFormate(props?.created_date)}
              </p>
            </div>
            {props?.is_Active !== 'false' ? (
              <div className=" d-flex my-2   align-items-center">
                <div className="position-relative d-flex justify-content-center align-items-center">
                  <Spinner
                    animation="grow"
                    className="position-absolute"
                    size="sm"
                    style={{ color: '#14c2183b' }}
                  />
                  <Spinner
                    animation="grow"
                    className="position-absolute"
                    style={{
                      height: '12px',
                      width: '12px',
                      color: '#14c21866',
                    }}
                  />
                  <Spinner
                    animation="grow"
                    className="position-absolute"
                    style={{ height: '8px', width: '8px', color: '#14c218' }}
                  />
                </div>
                <strong className="ms-2 ps-1"> Active</strong>
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
              <span className="ms-2">{TimeFormate(props?.examDuration)}</span>
            </div>
            {stdData ? (
              <Button
                onClick={() =>
                  navigate(`${path.TermAndCondition.path}/${paperId}`)
                }
                className="border-dashed border-primary bg-light text-primary text-capitalize"
              >
                Get Started
              </Button>
            ) : (
              <div
                className="text-black m-0 mx-5 p-0 position-relative cursor-pointer "
                style={{ width: '50px', height: '10px' }}
                onClick={() => navigate(`/admin/student-details/${paperId}`)}
              >
                {[1, 2].map((item) => (
                  <div
                    className={` border-light rounded-circle border p-0 position-absolute top-0 d-flex justify-content-center align-items-center ${
                      item == 1
                        ? 'start-25'
                        : item == 2
                        ? 'start-50'
                        : 'start-75'
                    }  text-center`}
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor:
                        color[Math.floor(Math.random() * color.length)],
                    }}
                  >
                    <span className="text-light m-0 p-0">
                      {alphabet[Math.floor(Math.random() * alphabet.length)]}
                    </span>
                  </div>
                ))}

                <div
                  className="border border-light rounded-circle p-0 position-absolute  top-0 start-100 text-center bg-white d-flex justify-content-center align-items-center"
                  style={{ width: '30px', height: '30px' }}
                >
                  <span> 3+</span>
                </div>
              </div>
            )}
          </div>
          <div
            className={`w-100 d-flex ${
              stdData || props?.is_Active !== 'false' ? 'mb-1' : 'pb-1'
            } pt-2 cursor-pointer justify-content-end align-items-center pe-4`}
            onClick={removeAssisstment}
          >
            {stdData || props?.is_Active !== 'false' ? (
              ''
            ) : (
              // <MdDelete color="red" onClick={removeAssisstment} />
              <h6
                className="m-0 text-primary px-2 py-1 rounded-3"
                style={{ background: '#ecf7f8' }}
              >
                Delete
              </h6>
            )}
          </div>
        </div>
      </div>

      <Example
        show={showCard}
        {...props}
        paperId={paperId}
        setShowCard={setShowCard}
      />
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
