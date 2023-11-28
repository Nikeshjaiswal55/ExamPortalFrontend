import React, { useEffect, useState } from 'react';
import '../components/style.css';
import { useNavigate } from 'react-router-dom';
import Cardassessment from './Cardassessment';
import '../../../styles/common.css';
import { useGetAssignmentQuery } from '../../../apis/Service';
import { SubIdSplit } from '../../../utils/SubIdSplit';
import { Form, Spinner } from 'react-bootstrap';
import { IoSearchSharp } from 'react-icons/io5';
export default function ShowAssessment() {
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = SubIdSplit(userId.sub);
  const accessToken = localStorage.getItem('accessToken');
  const {
    data: assignmentData,
    isLoading,
    error,
    isSuccess,
  } = useGetAssignmentQuery({ accessToken, id: userId });

  const [filterData, setFilterData] = useState(assignmentData);
  const [input, setInput] = useState();

  useEffect(() => {
    setFilterData(assignmentData);
  }, [isSuccess]);

  useEffect(() => {
    if (input) {
      const filterdata = assignmentData.filter((item) =>
        item.examDetails.assessmentName
          .toLowerCase()
          .includes(input.toLowerCase())
      );
      setFilterData(filterdata);
    } else {
      setFilterData(assignmentData);
    }
  }, [input]);

  return (
    <>
      <div className="main w-100 px-3 h-100 m-0 p-0 py-2 overflow-auto ">
        <div className="w-100 row justify-content-between flex-wrap align-items-center  p-lg-3  ">
          <div
            className=" d-flex col-md-5 mx-3 mb-lg-0 mb-3 col-12 justify-content-between border p-2 fs-4 rounded-4 bg-white  "
            style={{ width: '550px' }}
          >
            <input
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border-0 focus-ring  focus-ring-light"
              placeholder="Search here.."
              style={{ width: '90%' }}
            />
            <span>
              <IoSearchSharp size={35} className=" cursor-pointer" />
            </span>
          </div>
          <div className="w-auto col-md-3 mx-2  mb-lg-0 mb-3 col-12  d-flex justify-content-end">
            <Form.Select
              aria-label="Table view "
              style={{ borderColor: '#707070' }}
              className=" w-100 input-border  border focus-ring focus-ring-light "
            >
              <option value="">Select All </option>
              <option value="company">By name</option>
              <option value="college">By date </option>
            </Form.Select>
          </div>
        </div>
        {/* <h4 className="m-0 text-capitalize fw-bold py-2"> All Assessments</h4> */}

        {isLoading ? (
          <div className=" position-absolute top-50 start-50  translate-middle ">
            <Spinner animation="grow" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
          </div>
        ) : (
          <div className="row m-0 p-0  ">
            {assignmentData &&
              filterData?.map((assessmentDetails, index) => (
                <Cardassessment
                  key={index}
                  {...assessmentDetails.examDetails}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
