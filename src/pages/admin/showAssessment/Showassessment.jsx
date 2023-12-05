import React, { useEffect, useState } from 'react';
import '../components/style.css';
import { Link, useNavigate } from 'react-router-dom';
import Cardassessment, { CardassessmentPlaceholder } from './Cardassessment';
import '../../../styles/common.css';
import {
  useDeleteAssignmentMutation,
  useGetAssignmentQuery,
} from '../../../apis/Service';
import { SubIdSplit } from '../../../utils/SubIdSplit';
import { Form, Spinner } from 'react-bootstrap';
import { IoSearchSharp } from 'react-icons/io5';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import { path } from '../../../routes/RoutesConstant';
import { Loader } from '../../../components/Loader/Loader';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import { toast } from 'react-toastify';

export default function ShowAssessment() {
  // const [showCard,setShowCard] = useState();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = SubIdSplit(userId.sub);
  const {
    data: assignmentData,
    isLoading,
    isError,
    isSuccess,
  } = useGetAssignmentQuery({id: userId });

  const [
    deleteAssignment,
    { isError: deleteError, isLoading: deleteloading, isSuccess: dltSuccess },
  ] = useDeleteAssignmentMutation();

  const [filterData, setFilterData] = useState(assignmentData);
  const [input, setInput] = useState();
  const [notSearchDataFound, setSearchDataFound] = useState(false);

  useEffect(() => {
    setFilterData(assignmentData);
  }, [isSuccess]);

  useEffect(() => {
    if (input) {
      const filterdata = assignmentData.filter((item) =>
        item.assessmentName.toLowerCase().includes(input.toLowerCase())
      );
      filterdata.length === 0
        ? setSearchDataFound(true)
        : setSearchDataFound(false);
      setFilterData(filterdata);
    } else {
      setFilterData(assignmentData);
    }
  }, [input,dltSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error('something went wrong!!😑', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }, [isError, deleteError]);

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
              disabled={isError || isLoading ? true : false}
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
        {isError && <SomethingWentWrong />}
        <div className=" position-absolute top-50 start-50  translate-middle ">
          {filterData?.length === 0 && (
            <NoDataFound>
              <div>
                <h4 className="text-capitalize fw-bold text-center">
                  {notSearchDataFound
                    ? 'No Such A Data Found!!'
                    : ' No Data Available!!'}
                </h4>
                <h6 className="text-capitalize fw-bold text-center">
                  create assissment by click{' '}
                  <Link to={path.CreateAssessment.path}>here</Link>
                </h6>
              </div>
            </NoDataFound>
          )}
        </div>
        {isLoading || deleteloading ? (
          <div className="row m-0 p-0  ">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <CardassessmentPlaceholder />
            ))}
          </div>
        ) : (
          <div className="row m-0 p-0  ">
            {assignmentData &&
              filterData?.map((assessmentDetails, index) => (
                <Cardassessment
                  key={index}
                  paperId={assessmentDetails.paperId}
                  {...assessmentDetails}
                  deleteAssignment={deleteAssignment}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
