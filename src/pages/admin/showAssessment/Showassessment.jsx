import React from 'react';
import '../components/style.css';
import { useNavigate } from 'react-router-dom';
import Cardassessment from './Cardassessment';
import { useGetAssignmentQuery } from '../../../apis/Service';
import { SubIdSplit } from '../../../utils/SubIdSplit';
import { Spinner } from 'react-bootstrap';

export default function ShowAssessment() {
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = SubIdSplit(userId.sub);
  const accessToken = localStorage.getItem('accessToken');
  const {
    data: assignmentData,
    isLoading,
    error,
  } = useGetAssignmentQuery({ accessToken, id: userId });

  console.log('assignmentData', assignmentData);

  // Create an array of assessment details objects
  const assessmentDetailsArray = [
    {
      id: 1,
      ExamMode: 'Online',
      ExamDuration: '9.45-12.10',
      ExamRound: '8',
      Session: '2022-23',
      ExamDate: '1/05/2023',
      ExamName: 'BBA',
    },
    {
      id: 2,
      ExamMode: 'Offline',
      ExamDuration: '10.00-11.30',
      ExamRound: '5',
      Session: '2022-23',
      ExamDate: '2/05/2023',
      ExamName: 'BCA',
    },
    {
      id: 3,
      ExamMode: 'Offline',
      ExamDuration: '10.00-11.30',
      ExamRound: '5',
      Session: '2022-23',
      ExamDate: '2/05/2023',
      ExamName: 'BCA',
    },
    {
      id: 4,
      ExamMode: 'Offline',
      ExamDuration: '10.00-11.30',
      ExamRound: '5',
      Session: '2022-23',
      ExamDate: '2/05/2023',
      ExamName: 'BCA',
    },

    {
      id: 5,
      ExamMode: 'Offline',
      ExamDuration: '10.00-11.30',
      ExamRound: '5',
      Session: '2022-23',
      ExamDate: '2/05/2023',
      ExamName: 'BCA',
    },
    {
      id: 6,
      ExamMode: 'Offline',
      ExamDuration: '10.00-11.30',
      ExamRound: '5',
      Session: '2022-23',
      ExamDate: '2/05/2023',
      ExamName: 'BCA',
    },

    {
      id: 7,
      ExamMode: 'Offline',
      ExamDuration: '10.00-11.30',
      ExamRound: '5',
      Session: '2022-23',
      ExamDate: '2/05/2023',
      ExamName: 'BCA',
    },
    {
      id: 8,
      ExamMode: 'Offline',
      ExamDuration: '10.00-11.30',
      ExamRound: '5',
      Session: '2022-23',
      ExamDate: '2/05/2023',
      ExamName: 'BCA',
    },

    {
      id: 9,
      ExamMode: 'Offline',
      ExamDuration: '10.00-11.30',
      ExamRound: '5',
      Session: '2022-23',
      ExamDate: '2/05/2023',
      ExamName: 'BCA',
    },
    {
      id: 10,
      ExamMode: 'Offline',
      ExamDuration: '10.00-11.30',
      ExamRound: '5',
      Session: '2022-23',
      ExamDate: '2/05/2023',
      ExamName: 'BCA',
    },
  ];

  return (
    <>
      <div className="w-100 px-3 h-100 m-0 p-0 py-2 overflow-auto">
        <h4 className="m-0 text-capitalize fw-bold py-2"> All Assessments</h4>

        {isLoading ? (
          <div className=" position-absolute top-50 start-50  translate-middle ">
            <Spinner animation="grow" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
          </div>
        ) : (
          <div className=" row m-0 p-0 g-2 ">
            {assignmentData.map((assessmentDetails) => (
              <Cardassessment
                key={assessmentDetails.paperId}
                {...assessmentDetails.examDetails}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
