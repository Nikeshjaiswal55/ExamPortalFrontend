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
import {Form,FormControl,Pagination,Spinner} from 'react-bootstrap';
import { IoSearchSharp } from 'react-icons/io5';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import { path } from '../../../routes/RoutesConstant';
import { Loader } from '../../../components/Loader/Loader';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import { toast } from 'react-toastify';
// import {AdminPaginationAssessment} from './AdminPaginationAssessment';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {CustomButton} from '../../../theme/Button/Buttons';


export default function ShowAssessment() {
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = SubIdSplit(userId.sub);
  const [publishDate,setPublishDate] = useState(null);
  const [createdDate,setCreateDate] = useState(null);
  const [input,setInput] = useState("");
  const [searchByName,setSearchByName] = useState("");
  const [page,setPage] = useState(1);
  const [searchByStatus,setSearchByStatus] = useState("");
  const [notSearchDataFound,setSearchDataFound] = useState(false);
  const [Per_Page,setPer_Page] = useState(10);
  const [sortOrder,setSortOrder] = useState("asc");
  const [active,setActive] = useState(page);
  // const [assessmentName,setAssessmentName] = useState('');
  const [totalPages,setTotalPages] = useState(1);
  const {
    data: assignmentData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetAssignmentQuery({
    id: userId,
    publishDate,
    createdDate,
    paper_name: searchByName,
    pageno: page - 1,
    pageSize: Per_Page,
    sortOrder: sortOrder,
    Active: searchByStatus
  });
  const [
    deleteAssignment,
    { isError: deleteError, isLoading: deleteloading, isSuccess: dltSuccess },
  ] = useDeleteAssignmentMutation();

  useEffect(() => {
    setTotalPages(assignmentData?.totalPages);

  },[assignmentData]);

  const handlePaginationClick = (pageNumber) => {
    setActive(pageNumber);
    setPage(pageNumber);
  };

  const paginationItems = [];
  for(let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => handlePaginationClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

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
  const changeStatusByActive = (e) => {
    console.log("active status  :- ",e.target.value);
    setCreateDate(null);
    setPublishDate(null);
    setInput("");
    setSearchByStatus(e.target.value);
  };
  return (
    <>
      <div className="main w-100 px-3 h-100 m-0 p-0 py-2 overflow-auto ">
        <div className="w-100 row justify-content-between flex-wrap align-items-center  p-lg-3  ">

          <div className=" row m-0  p-2 d-flex justify-content-between align-items-center">
            <h4 className="m-0 col-md-5 justify-content-start  align-items-center text-capitalize fw-bold">All Assessment</h4>

            <div className=" col-md-7 mx-0  mb-lg-0 mb-3   d-flex align-items-lg-center py-2 justify-content-between justify-content-sm-end  flex-wrap">

              <Form.Select
                aria-label="by order "
                style={{borderColor: '#707070'}}
                className="  w-auto  input-border fs-6 py-2  border focus-ring focus-ring-light me-1 "
                onChange={(e) => {setSortOrder(e.target.value)}}
                disabled={isError || isLoading || isFetching ? true : false}

              >
                <option value="">Sort by order</option>
                <option value="asc">By asc</option>
                <option value="desc">By desc </option>
              </Form.Select>
              <CustomButton
                className={'  rounded-4  float-start'}
                buttonText={'Add Assessment'}
                onButtonClick={() => navigate(path.AddAssessment.path)}
              />
            </div>
          </div>
          <div
            className="col-12  d-flex col-md-3 mx-3 mb-lg-0 mb-3 justify-content-between border py-1 fs-6 rounded-4 bg-white  "
            style={{width: '350px'}}
          >
            <input
              type="search"
              value={input}
              onChange={(e) => {

                setInput(e.target.value);
              }
              }
              className="border-0 focus-ring  focus-ring-light"
              placeholder="Search here.."
              style={{ width: '90%' }}
              disabled={isLoading || isFetching ? true : false}
            />
            <span>
              <IoSearchSharp size={25}
                className=" cursor-pointer"
                onClick={() => {
                  setSearchByStatus("");
                  setCreateDate(null);
                  setPublishDate(null);
                  setSearchByName(input);
                  console.log("       input       ",input);
                }}
              />
            </span>
          </div>
          <div className=" col-12 w-auto  col-lg-8 mx-0  mb-lg-0 mb-3 d-flex  py-2 justify-content-md-end flex-wrap ">
            <ReactDatePicker selected={publishDate}
              className=' py-2 px-1 border fs-6 me-1 rounded-2 focus-ring focus-ring-light '
              placeholderText='Search by publish date'
              onChange={(date) => {
                const date2 = new Date(date);
                // setPublishDate((date2.getFullYear()) +"-" + (date2.getMonth() + 1) + "-" + (date2.getDate()));
                setInput(""); setSearchByStatus("");
                setCreateDate(null);
                setPublishDate(date2);
                console.log("date============================ " + (date2.getFullYear()) + "-" + (date2.getMonth() + 1) + "-" + (date2.getDate()))
              }}

              disabled={isError || isLoading || isFetching ? true : false}

            />
            <ReactDatePicker
              selected={createdDate}
              className=' py-2 px-1 border fs-6 me-1 rounded-2  focus-ring focus-ring-light '
              onChangeRaw={(e) => console.log("raw :- ",e)}
              onYearChange={(e) => console.log("year :- ",e)}
              onMonthChange={(e) => console.log("month:- ",e)}
              adjustDateOnChange={(e) => console.log("adjust date on change :- ",e)}
              disabled={isLoading || isFetching ? true : false}

              placeholderText='Search by create date'
              onChange={(date) => {
                const date2 = new Date(date);
                // setCreateDate((date2.getFullYear()) + "-" + (date2.getMonth() + 1) + "-" + (date2.getDate()));
                setPublishDate(null);
                setInput(""); setSearchByStatus("");
                setCreateDate(date2)

                console.log((date2.getFullYear()) + "-" + (date2.getMonth() + 1) + "-" + (date2.getDate()))
              }}
            />
            <Form.Select
              aria-label="by active "
              style={{borderColor: '#707070'}}
              className="  fs-6 w-auto input-border  border focus-ring focus-ring-light me-1 py-2 "
              onChange={changeStatusByActive}
              disabled={isError || isLoading || isFetching ? true : false}

            >
              <option value="">Filter by status </option>
              <option value="true">Active</option>
              <option value="false">  Setup in progress </option>
            </Form.Select>

            {/* <Form.Select
              aria-label="by order "
              style={{borderColor: '#707070'}}
              className=" w-auto input-border fs-6 py-2  border focus-ring focus-ring-light me-1 "
              onChange={(e) => {console.log("direction :- ",e.target.value); setSortOrder(e.target.value)}}
            >
              <option value="">Sort by order</option>
              <option value="asc">By Asc</option>
              <option value="desc">By Desc </option>
            </Form.Select> */}

          </div>
        </div>
        {isError && <SomethingWentWrong />}
        <div className=" position-absolute top-50 start-50  translate-middle ">
          {assignmentData?.data?.length === 0 && !isLoading && (
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
        {isLoading || isFetching || deleteloading ? (
          <div className="row m-0 p-0  ">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <CardassessmentPlaceholder />
            ))}
          </div>
        ) : (
            <>
              {assignmentData?.data?.length > 0 && !isError && <div className="row m-0 p-0  h-75 ">
                {assignmentData?.data?.length > 0 && !isError && <>
                  <div className='row p-0 m-0 h-100 w-100'>
                    {assignmentData?.data?.map((assessmentDetails,index) => (
                      <Cardassessment
                        key={index}
                        paperId={assessmentDetails.paperId}
                        {...assessmentDetails}
                        deleteAssignment={deleteAssignment}
                      />
                    ))}
                  </div>
                  <div className="col-12 h-auto align-self-end  my-3 d-flex justify-content-start justify-content-md-end pe-4 overflow-auto">
                    <div className=' fs-5  d-flex justify-content-start  align-items-baseline p-0 py-2 m-0'>
                      <div className=' w-auto d-flex align-items-baseline me-2 '>
                        <label htmlFor="per-page" className=' me-2'>Per-page</label>
                        <FormControl type="number" name="per-page" className=' w-auto h-50 rounded-1 border   btn btn-outline-light text-black  ' id="per-page" width={"50px"} min={1} max={100} defaultValue={Per_Page} onChange={(e) => {setPer_Page(e.target.value); console.log(e.target.value)}} />
                      </div>
                      <Pagination>
                        <Pagination.First onClick={() => handlePaginationClick(1)} />
                        <Pagination.Prev onClick={() => handlePaginationClick(page - 1 > 0 ? page - 1 : 1)} />
                        {paginationItems}
                        <Pagination.Next onClick={() => handlePaginationClick(page + 1 <= totalPages ? page + 1 : totalPages)} />
                        <Pagination.Last onClick={() => handlePaginationClick(totalPages)} />
                      </Pagination>
                    </div>
                  </div>
                </>}
              </div>}
            </>
        )}

      </div>
    </>
  );
}
