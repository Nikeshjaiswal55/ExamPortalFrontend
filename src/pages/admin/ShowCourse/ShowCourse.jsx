import React,{useEffect,useState} from 'react';


// http://localhost:9090/course/byUserId/105410884551884874922?page=0&size=2&sortField=course_name&sortOrder=asc
import {Form,FormControl,Pagination,Table} from 'react-bootstrap';
import {ShowCourseTr} from './showCourseTr';
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
} from '../../../apis/Service';
import '../../../styles/common.css';
import {CustomButton} from '../../../theme/Button/Buttons';
import {useNavigate} from 'react-router-dom';
import {path} from '../../../routes/RoutesConstant';
import {SubIdSplit} from '../../../utils/SubIdSplit';
import {toast} from 'react-toastify';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import {Loader} from '../../../components/Loader/Loader';


export default function ShowCourse() {
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = SubIdSplit(userId.sub);


  const [list,setList] = useState([]);
  // get the particular page data
  const [page,setPage] = useState(1);
  // const [input,setInput] = useState();
  const [active,setActive] = useState(1);
  const [Per_Page,setPer_Page] = useState(10);
  const [sortOrder,setSortOrder] = useState("");
  // const [assessmentName,setAssessmentName] = useState('');
  // get total pages then
  const [totalPages,setTotalPages] = useState(10);
  const {data,isError,isLoading} = useGetAllCoursesQuery({
    userId,
    page: page - 1,
    size: Per_Page,
    sortField: "course_name",
    // sortField: "course_id",
    sortOrder
  });

  const [
    updateCourse,
    {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateCourseMutation();

  const [
    deleteCourse,
    {
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteCourseMutation();



  function handleAddCourse() {
    navigate(path.AddCourse.path);
  }

  useEffect(() => {
    if(updateSuccess) {
      toast.success('course updated successfully!!🎉',{
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
  },[updateSuccess]);

  useEffect(() => {
    if(deleteSuccess) {
      toast.success('course deleted successfully!!🎉',{
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
  },[deleteSuccess]);

  useEffect(() => {
    if(isError || updateError || deleteError) {
      toast.error('something went wrong!!😑',{
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
  },[updateError,deleteError,isError]);


  useEffect(() => {
    setList(data?.data);
    setTotalPages(data?.totalPages || 1)
  },[data]);

  const handlePaginationClick = (pageNumber) => {
    setActive(pageNumber);
    setPage(pageNumber);
  };

  // const [startDate,setStartDate] = useState();
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
  return (
    <>
      <div className="w-100 h-100 m-0 p-2 overflow-auto">
        <div className=" row m-0  p-2 d-flex justify-content-between align-items-center">
          <h4 className="m-0 col-12 col-sm-3 justify-content-start  align-items-center text-capitalize fw-bold">All Courses</h4>

          <div className=" col-12  col-sm-9 mx-0  mb-lg-0 mb-3   d-flex align-items-lg-center py-2 justify-content-between justify-content-sm-end  flex-wrap">
            {/* <div
              className="d-flex  mx-3 mb-lg-0 mb-3  justify-content-between border py-1 px-2  fs-5 rounded-4 bg-white  "

            >
              <input
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border-0 focus-ring  focus-ring-light"
                placeholder="Search here.."
                style={{width: '90%'}}
                disabled={isError || isLoading ? true : false}
              />
              <span>
                <IoSearchSharp size={35} className=" cursor-pointer" />
              </span>
            </div> */}
            {/* <ReactDatePicker selected={startDate} className='py-2 px-1 border fs-5 me-1 rounded-3 ' placeholderText='Search by date' onChange={(date) => setStartDate(date)} /> */}
            <Form.Select
              aria-label="by order "
              style={{borderColor: '#707070'}}
              className=" w-auto input-border fs-5 py-2  border focus-ring focus-ring-light me-1 "
              onChange={(e) => {
                setSortOrder(e.target.value);

              }}
            >
              <option value="">Sort by order</option>
              <option value="asc">By asc</option>
              <option value="desc">By desc </option>
            </Form.Select>
            <CustomButton
              className={'  rounded-4  float-start'}
              buttonText={'Add Course'}
              onButtonClick={handleAddCourse}
            />
          </div>
        </div>
        {isError && <SomethingWentWrong />}
        {(isLoading || updateLoading || deleteLoading) && (
          <div className=" position-absolute top-50 start-50  translate-middle ">
            <Loader />
          </div>
        )}

        <div className=" position-absolute top-50 start-50  translate-middle ">
          {list?.length == 0 && (
            <NoDataFound>
              <div>
                <h4 className="text-capitalize fw-bold text-center">
                  No Data Available!!
                </h4>
                <h6 className="text-capitalize fw-bold text-center">
                  create course by click on above right corner button
                </h6>
              </div>
            </NoDataFound>
          )}
        </div>

        <div className=' row m-0 p-0  w-100' style={{height: "95%"}} >
          {list && list?.length > 0 && (
            <Table striped responsive hover>
              <thead className="t-head ">
                <tr>
                  <th className="text-center"> SrNo</th>
                  <th>Course Name</th>
                  <th>Created By</th>
                  <th></th>
                  {/* <th className='text-center'><input placeholder='search here course' className='form-control'/></th> */}
                </tr>
              </thead>
              <tbody>
                {data?.data &&
                  data?.data?.map((rowdata,index) => {
                    console.log(rowdata);
                    return (
                      <ShowCourseTr
                        key={index}
                        updateCourse={updateCourse}
                        deleteCourse={deleteCourse}
                        srNo={index + 1}
                        courseId={rowdata['course_id']}
                        courseName={rowdata['course_name']}
                        createdBy={rowdata['userName']}
                      />
                    );
                  })}
              </tbody>
            </Table>
          )}
          {list && list?.length > 0 && <div className="col-12 h-auto align-self-end  d-flex justify-content-start justify-content-md-end pe-4 overflow-auto">
            <div className=' fs-5  d-flex justify-content-start  align-items-baseline p-0  m-0'>
              <div className=' w-auto d-flex align-items-baseline me-2 align-baseline '>
                <label htmlFor="per-page" className='  fs-6 me-2'>Per-page</label>
                <FormControl type="number" name="per-page" className=' w-auto h-50 rounded-1 border   btn btn-outline-light text-black  ' id="per-page" width={"50px"} min={1} max={100} defaultValue={Per_Page} onChange={(e) => {setPer_Page(e.target.value); console.log(e.target.value)}} />
              </div>
              <Pagination    >
                <Pagination.First onClick={() => handlePaginationClick(1)} />
                <Pagination.Prev onClick={() => handlePaginationClick((page - 1) > 0 ? page - 1 : 1)} />
                {paginationItems}
                <Pagination.Next onClick={() => handlePaginationClick((page + 1) <= totalPages ? page + 1 : totalPages)} />
                <Pagination.Last onClick={() => handlePaginationClick(totalPages)} />
              </Pagination>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}
