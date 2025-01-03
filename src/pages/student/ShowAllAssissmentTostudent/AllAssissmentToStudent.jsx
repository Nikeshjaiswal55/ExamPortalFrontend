import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllAssissmentOnstudentPageQuery } from '../../../apis/Service';
import { Form } from 'react-bootstrap';
import { IoSearchSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import Cardassessment, {
  CardassessmentPlaceholder,
} from '../../admin/showAssessment/Cardassessment';
import { getDecryptedResponse } from '../../../utils/getDecryptedResponse';

export default function AllAssissmentToStudent() {
  const navigate = useNavigate();
  let stdId = JSON.parse(localStorage.getItem('stdData'));
  const otp_data = getDecryptedResponse('otp_data')

  const {
    data: assignmentData,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllAssissmentOnstudentPageQuery(stdId?.userId??otp_data?.std_id);
  const [filterData, setFilterData] = useState([]);
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
      console.log(filterdata.length);
      filterdata.length === 0
        ? setSearchDataFound(true)
        : setSearchDataFound(false);
      setFilterData(filterdata);
    } else {
      setFilterData(assignmentData);
    }
  }, [input]);

  useEffect(() => {
    if (isError) {
      toast.error('something went wrong!!😑', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }, [isError]);

  return (
    <>
      <div className="main w-100 h-100 m-0 p-0 overflow-auto ">
        <div className="w-100 row justify-content-between flex-wrap align-items-center mb-3 ">
          <div
            className="col-12  d-flex col-md-3 mx-3 mb-lg-0 mb-3 justify-content-between border py-2 fs-6 rounded-3 bg-white "
            style={{ width: '350px' }}
          >
            <input
              type="search"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              className="border-0 focus-ring focus-ring-light"
              placeholder="Search here.."
              style={{ width: '90%' }}
              disabled={isLoading || isError ? true : false}
            />
            <span>
              <IoSearchSharp size={25} className=" cursor-pointer" />
            </span>
          </div>
          {/* <div className="w-auto col-md-3 mx-2  mb-lg-0 mb-3 col-12  d-flex justify-content-end">
            <Form.Select
              aria-label="Table view "
              style={{ borderColor: '#707070' }}
              className=" w-100 input-border  border focus-ring focus-ring-light "
            >
              <option value="">Select All </option>
              <option value="company">By name</option>
              <option value="college">By date </option>
            </Form.Select>
          </div> */}
        </div>
        {/* <h4 className="m-0 text-capitalize fw-bold py-2"> All Assessments</h4> */}
        <div className=" position-absolute top-50 start-50  translate-middle ">
          {isError && <SomethingWentWrong />}
        </div>
        <div className=" position-absolute top-50 start-50  translate-middle ">
          {filterData?.length === 0 && (
            <NoDataFound>
              <div>
                <h4 className="text-capitalize fw-bold text-center">
                  {notSearchDataFound
                    ? 'No Such A Data Found!!'
                    : ' No Data Available!!'}
                </h4>
              </div>
            </NoDataFound>
          )}
        </div>
        {isLoading ? (
          <div className="row m-0 p-0  ">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <CardassessmentPlaceholder />
            ))}
          </div>
        ) : (
          <div className="row m-0 p-0  ">
            {filterData?.filter((item) => item._attempted == false).length ===
            0 ? (
              <div className=" position-absolute top-50 start-50  translate-middle ">
                <NoDataFound>
                  <h4 className="text-capitalize fw-bold text-center">
                    No Pending Assissment
                  </h4>
                </NoDataFound>
              </div>
            ) : (
              ''
            )}
            {assignmentData &&
              filterData
                ?.filter((item) => item._attempted == false)
                ?.map((assessmentDetails, index) => (
                  <Cardassessment
                    key={index}
                    paperId={assessmentDetails.paperId}
                    {...assessmentDetails}
                  />
                ))}
          </div>
        )}
      </div>
    </>
  );
}
