import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';
import { path } from '../../../routes/RoutesConstant';
import {AiOutlineFieldTime} from "react-icons/ai";
import '../../../styles/common.css'
import {Button,Spinner} from 'react-bootstrap';

export default function Cardassessment(props) {
  const navigate = useNavigate();
  return (
    <>

      <div className='col-12 col-lg-6 mb-4 h-25 '>
        <div className=' white-box p-4 border rounded-4  bg-white' >
          <div className="d-flex justify-content-between align-items-center bg-white rounded-3 p-2 px-4  bg-body-secondary">
            <div className='m-0 p-0'>
              <strong className='fs-6'>{props?.assessmentName}
              </strong><br />
              <span>{props?.ExamDate}</span>
            </div>
            {props.flag ? (<div className=' d-flex justify-content-evenly   align-items-center'> <Spinner animation="grow" variant='success' size="sm" /> <strong className='ms-2'>  Active</strong>
            </div>) :
              (<div>
                <Button variant="outline-primary" className='btn  p-0 px-1 text-uppercase'>setup in progress </Button>
              </div>)}

          </div>
          <div className=' d-flex justify-content-between flex-wrap align-baseline pt-3 ps-2'> <div className=' d-flex  align-items-center  justify-content-evenly'><AiOutlineFieldTime size={30} /><span className='ms-2'> {props?.examDuration}</span> </div>
            <div
              className="text-black m-0 mx-5 p-0 position-relative cursor-pointer "
              style={{width: '50px',height: "10px"}}
              onClick={() => navigate(path.showStudent.path)}
            >
              <div
                className=" rounded-circle border p-0 position-absolute top-0 start-25  text-center  bg-danger   "
                style={{width: '30px',height: '30px'}}
              ><b> A</b> </div>
              <div className="border rounded-circle p-0 position-absolute top-0 start-50 text-center bg-secondary  bg-gradient"
                style={{width: '30px',height: '30px'}}
              ><b>B</b> </div>
              <div
                className="border rounded-circle p-0 position-absolute  top-0 start-100 text-center bg-white "
                style={{width: '30px',height: '30px'}}
              ><b> 3+</b></div>
            </div>
          </div>
        </div >
      </div >
      {/* <div className={'col-12 col-md-6'}>
      <div className="card bg-dark py-1 px-4 rounded-3  ">
        <div className="py-2">
          <p className="text-light">
            <strong>ExamName:</strong> {props?.assessmentName}
          </p>
        </div>
        <div className="d-flex justify-content-between bg-white rounded-3 p-3">
          <div>
            <p>
              <strong>Exam Mode:</strong> {props?.examMode}
            </p>
            <p>
              <strong>Exam Duration:</strong> {props?.examDuration}
            </p>
          </div>
          <div>
            <p>
              <strong>Exam Round:</strong> {props?.examRounds}
            </p>
            {props?.branch === '' ? (
              ''
            ) : (
              <p>
                <strong>Course Name:</strong> {props?.branch}
              </p>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between py-2">
          <p className="text-light">
            <strong>ExamDate:</strong> {props.ExamDate}
          </p>
          <div
            className="text-black m-0 mx-5 position-relative h-100 cursor-pointer "
            style={{ width: '50px' }}
            onClick={() => navigate(path.showStudent.path)}
          >
            <img
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              className="border rounded-circle p-0 position-absolute top-0 start-25   "
              style={{ width: '30px', height: '30px' }}
            />
            <img
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              className="border rounded-circle p-0 position-absolute top-0 start-50 "
              style={{ width: '30px', height: '30px' }}
            />
            <img
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              className="border rounded-circle p-0 position-absolute  top-0 start-100 "
              style={{ width: '30px', height: '30px' }}
            />
          </div>
        </div>
      </div>
    </div> */}
    </>
  );
}
