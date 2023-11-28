import React from 'react';
import '../components/style.css';
import {useNavigate} from 'react-router-dom';
import Cardassessment from './Cardassessment';
import '../../../styles/common.css'
import { useGetAssignmentQuery } from '../../../apis/Service';
import { SubIdSplit } from '../../../utils/SubIdSplit';
import {Form,Spinner} from 'react-bootstrap';
import {IoSearchSharp} from "react-icons/io5";
export default function ShowAssessment() {
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = SubIdSplit(userId.sub);
  const accessToken = localStorage.getItem('accessToken');
  // const {data: assignmentData,isLoading, error,} = useGetAssignmentQuery({ accessToken, id: userId });

  // console.log('assignmentData', assignmentData);

  // Create an array of assessment details objects
  const assignmentData = [
    {
      id: 1,
      examMode: 'Online',
      examDuration: '12.10',
      examRounds: '8',
      branch: '2022-23',
      ExamDate: '28 november 2023 at 3:08 PM',
      assessmentName: 'BBA',
      flag: true

    },
    {
      id: 2,
      examMode: 'Offline',
      examDuration: '11.30',
      examRounds: '5',
      branch: '2022-23',
      ExamDate: '28 november 2023 at 3:08 PM',
      assessmentName: 'Java Mastery Challenge',
      flag: false

    },
    {
      id: 3,
      examMode: 'Offline',
      examDuration: '11.30',
      examRounds: '5',
      branch: '2022-23',
      ExamDate: '28 november 2023 at 3:08 PM',
      assessmentName: 'BCA',
      flag: true

    },
    {
      id: 4,
      examMode: 'Offline',
      examDuration: '11.30',
      examRounds: '5',
      branch: '2022-23',
      ExamDate: '28 november 2023 at 3:08 PM',
      assessmentName: 'BCA',
      flag: false

    },

    {
      id: 5,
      examMode: 'Offline',
      examDuration: '11.30',
      examRounds: '5',
      branch: '2022-23',
      ExamDate: '28 november 2023 at 3:08 PM',
      assessmentName: 'BCA',
      flag: true

    },
    {
      id: 6,
      examMode: 'Offline',
      examDuration: '11.30',
      examRounds: '5',
      branch: '2022-23',
      ExamDate: '28 november 2023 at 3:08 PM',
      assessmentName: 'BCA',
      flag: false

    },

    {
      id: 7,
      examMode: 'Offline',
      examDuration: '11.30',
      examRounds: '5',
      branch: '2022-23',
      ExamDate: '28 november 2023 at 3:08 PM',
      assessmentName: 'BCA',
      flag: true

    },
    {
      id: 8,
      examMode: 'Offline',
      examDuration: '11.30',
      examRounds: '5',
      branch: '2022-23',
      ExamDate: '28 november 2023 at 3:08 PM',
      assessmentName: 'BCA',
      flag: false

    },

    {
      id: 9,
      examMode: 'Offline',
      examDuration: '11.30',
      examRounds: '5',
      branch: '2022-23',
      ExamDate: '28 november 2023 at 3:08 PM',
      assessmentName: 'BCA',
      flag: true
    },
    {
      id: 10,
      examMode: 'Offline',
      examDuration: '11.30',
      examRounds: '5',
      branch: '2022-23',
      ExamDate: '28 november 2023 at 3:08 PM',
      assessmentName: 'BCA',
      flag: false

    },
  ];

  return (
    <>
      <div className="main w-100 px-3 h-100 m-0 p-0 py-2 overflow-auto ">

        <div className='w-100 d-flex justify-content-between flex-wrap align-items-center  p-lg-3  '>
          <div className=' d-flex justify-content-between border p-1 p-md-3 fs-4 rounded-4 bg-white  ' style={{width: "550px"}}>
            <input type="search" className='   border-0 focus-ring  focus-ring-light' placeholder="Search here.." style={{width: "90%"}} />
            <span><IoSearchSharp size={35} className=' cursor-pointer' /></span>
          </div>
          <div className='w-auto d-flex justify-content-end'>
            <Form.Select
              aria-label="Table view "
              style={{borderColor: '#707070'}}
              className=" w-100   input-border  border focus-ring focus-ring-light "
            >
              <option value="">Select All </option>
              <option value="company">By name</option>
              <option value="college">By date </option>
            </Form.Select>
          </div>
        </div>
        {/* <h4 className="m-0 text-capitalize fw-bold py-2"> All Assessments</h4> */}

        {/* {isLoading ? (
          <div className=" position-absolute top-50 start-50  translate-middle ">
            <Spinner animation="grow" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
          </div>
        ) : ( */}


          <div className=" row m-0 p-0 g-2 ">
          {assignmentData && assignmentData.map((assessmentDetails) => (
              <Cardassessment
                key={assessmentDetails.paperId}
              {...assessmentDetails}
              // {...assessmentDetails.examDetails}
              />
            ))}
          </div>
        {/* )} */}
      </div>
    </>
  );
}
