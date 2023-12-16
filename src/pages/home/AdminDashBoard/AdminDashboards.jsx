/* eslint-disable react/prop-types */
import {useEffect,useState} from 'react';
import {Accordion,Spinner} from 'react-bootstrap';
import {FaUsers} from "react-icons/fa";
import {MdOutlineCastForEducation} from "react-icons/md";
import {MdOutlineAssignment} from "react-icons/md"; import {FaLeanpub} from "react-icons/fa6";
import {CustomButton} from '../../../theme/Button/Buttons'
import {useGetAllCoursesQuery,useGetAssignmentQuery,useGetTop3AssissmentStudentsQuery,useGetTop5AssessmentOfOrgIdQuery,useGetTop5StudentsByOrgIdQuery,useGetTotalStudentAndAssessementByOrgIdQuery} from '../../../apis/Service';
import {SubIdSplit} from '../../../utils/SubIdSplit';
import {path} from '../../../routes/RoutesConstant'
import graphError from '../../../assets/gif/graph/graph-error.gif'
// import graphAnalysis from '../../../assets/gif/graph/graph-analysis.gif'
import assessmentfailded from '../../../assets/gif/graph/assessment-error.png'
import {Loader} from '../../../components/Loader/Loader';
import BarChart from '../component/BarChart';
import SolidGauge from '../component/SolidGauge';
import {useNavigate} from 'react-router-dom';
import {TotalComponent} from '../component/TotalComponent';


const color = [
  'bg-danger',
  'bg-secondary',
  'bg-primary',
  'bg-warning',
  'bg-info',
  'bg-dark',
];

// const TopStudent = [{
//   studentid: 1,
//   email: "dixip034@gmail.com"
// },
// {
//   studentid: 2,
//   email: "dixip034@gmail.com"
// },
// {
//   studentid: 3,
//   email: "dixip034@gmail.com"
// }
// ]


const TopStudentCard = ({email,onEvidenceClick}) => {
  const randomColor = color[Math.floor(Math.random() * color.length)];
  return <>
    <div className="col-12  p-1 m-0">
      <div className=" h-100 d-flex align-items-center gap-2  border m-1 p-1 rounded-2">
        <span className={` h-100 w-25 d-flex justify-content-center align-items-center rounded-2   elevation-1 `}>
          <div
            className={` ${randomColor} img-thumbnail d-flex justify-content-center align-items-center rounded-circle  m-auto p-0   border-dark border-1 `}
            style={{width: "40px",height: "40px"}}
          >
            <h4 className="text-capitalize text-light p-0 ">
              {email.charAt(0).toUpperCase()}
            </h4>
          </div> </span>
        <div className=" w-100  d-flex flex-wrap   justify-content-between align-items-center align-items-center">
          <span className="info-box-text me-2 fs-6">{email}</span>
          <CustomButton buttonText={"Evidence"} onButtonClick={onEvidenceClick} />
        </div>
      </div>
    </div>
  </>
}

const TopStudentAcordianItem = ({index,assessmentId,assessmentName,examDuration,examDate}) => {
  const {data: TopStudent} = useGetTop3AssissmentStudentsQuery(assessmentId);
  return (
    <>
      <Accordion.Item eventKey={index} className=' border-0  border-bottom '>
        <Accordion.Header className=' border border-white'>   <div className='row w-100  gap-2 gap-lg-0 fw-bold '>
          <div className='  col-md-4   '>{assessmentName} </div>
          <div className='  col-md-4  '>{examDuration} </div>
          <div className='  col-md-4   align-self-end'>{examDate} </div>
        </div></Accordion.Header>
        <Accordion.Body className='px-2 py-0 w-100'>
          <div className='row w-100'>
            {TopStudent && TopStudent?.map((value) => {
              return <TopStudentCard key={value.studentid} email={value.email} onEvidenceClick={() => {console.log("evidence click")}} />
            })
            }
            {TopStudent?.length ? null : <p> Actively no  student Toper present </p>}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </>
  )
}

export const AdminDashboard = () => {
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = SubIdSplit(userId.sub);
  let organizationId = JSON.parse(localStorage.getItem('orgData') ?? "")?.orgnizationId;

  const {
    data,
    isLoading,
    isError,
    // isSuccess,
  } = useGetAssignmentQuery({id: userId});
  const {data: courses,isLoading: coursesLoading} = useGetAllCoursesQuery({userId});
  const {data: totalStudentsAndAssessment,isLoading: totalStudentsAndAssessmentLoading,isError: totalStudentsAndAssessmentError} = useGetTotalStudentAndAssessementByOrgIdQuery(organizationId);
  function getCountOfActiveAssessment() {
    let count = 0;
    data?.data && data?.data?.forEach((value) => {
      if(value?.is_Active == "true") {
        count += 1;
      }
    });
    console.log("assesment checking ")
    return count;

  }
  const {data: topRankers,isLoading: topRankersLoading,isFetching: topRankersFetching,isError: topRankersError} = useGetTop5StudentsByOrgIdQuery(organizationId);
  const {data: topAssessmentOrgRanking,isLoading: topAssessmentOfOrgLoading,isError: topAssessmentOfOrgIsError} = useGetTop5AssessmentOfOrgIdQuery(organizationId);
  const [topStudentOfOrg,setTopStudentOfOrg] = useState();
  const [topAssessmentOfOrg,setTopAssessmentOfOrg] = useState();
  function getTopRankersStudentsData() {
    let topRanker = [];
    topRankers?.forEach((value,index) => {
      topRanker[index] = {topMarks: value["topMarks"],email: value?.email,name: value?.email?.split('@')[0]}
    })

    return topRanker;
  }
  function getTopRankeAssessmentsDataOrg() {
    let topRanker = [];
    topAssessmentOrgRanking?.forEach((value,index) => {
      topRanker[index] = {percentage: value["percentage"],assesment_Name: value?.assesment_Name}
    })
    return topRanker;
  }
  useEffect(() => {
    setTopStudentOfOrg(getTopRankersStudentsData());
  },[topRankers]);
  useEffect(() => {
    setTopAssessmentOfOrg(getTopRankeAssessmentsDataOrg());
  },[topAssessmentOrgRanking]);

  const info = [
    {
      id: 2,
      infoText: "Total Assessment",
      infoNumber: totalStudentsAndAssessment?.[1] ?? 0,
      icon: <MdOutlineAssignment size={50} />,
      iconClassName: " ",
      children: <> {totalStudentsAndAssessmentLoading ? <Spinner size='sm' variant='primary' className=' ms-2' animation="border" /> : null} </>,
      onViewClick: () => {navigate(path.showAssessment.path);},
    },{
      id: 1,
      infoText: "Total Student",
      infoNumber: totalStudentsAndAssessment?.[0] ?? 0,
      children: <> {totalStudentsAndAssessmentLoading ? <Spinner size='sm' variant='primary' className=' ms-2' animation="border" /> : null} </>,
      icon: <FaUsers size={50} />,
      onViewClick: () => {navigate(`/admin/total-student/${organizationId}`)},
      iconClassName: "bg-warning",
    },{
      id: 3,
      infoText: "Publish Assessment",
      children: <> {isLoading ? <Spinner size='sm' variant='primary' className=' ms-2' animation="border" /> : null}</>,
      infoNumber: getCountOfActiveAssessment(),
      icon: <FaLeanpub size={50} />,
      iconClassName: "bg-success",
      onViewClick: () => {},
    },{
      id: 4,
      infoText: "Total course",
      infoNumber: courses?.data?.length ?? 0,
      icon: <MdOutlineCastForEducation size={50} />,
      children: <> {coursesLoading ? <Spinner size='sm' variant='primary' className=' ms-2' animation="border" /> : null}</>,
      onViewClick: () => {navigate(path.ShowCourse.path)},
      iconClassName: "bg-success",
    }
  ];

  return (
    <>
      {
        // isLoading ? (
        //   <div className=" position-absolute top-50 start-50  translate-middle " >
        //     <Loader />
        //   </div >
        // ) : (
          <>
            <div className=" w-100 h-100 m-0  p-0 g-md-0 overflow-auto bg-transparent">
                <div className="row w-100   chart-box    p-1 m-0 h-50" >
                  <div className="col-12 col-md-6  m-0 p-0 h-100  d-flex    align-items-center   justify-content-center   rounded-3">
                    <div className="row m-0 p-0 w-100 h-100   d-flex justify-content-center  align-items-baseline " >
                      {info && info.map((value) => {
                        return <>
                          <TotalComponent key={value.id} infoText={value.infoText} infoNumber={value.infoNumber} icon={value.icon} onViewClick={value.onViewClick} iconClassName={value.iconClassName} >{value?.children}</TotalComponent>
                        </>
                      })
                      }
                    </div>


                  </div>
                  <div className="col-12 col-md-6 d-flex  p-0 px-1    flex-column align-items-center    justify-content-center rounded-3">
                    <div className=' w-100 h-100 bg-white rounded-3 '>
                  <h5 className=' ps-5 pt-2 m-0 d-flex justify-content-start align-items-center'> Top Rank Assessment    {topAssessmentOfOrgLoading && <Spinner size='sm' variant='primary' className=' ms-2' animation="border" />}</h5>

                      <div className=' m-0 p-0  w-100' style={{height: "90%"}}>
                    {topAssessmentOfOrg && topAssessmentOfOrg?.length > 0 && <div className=' chart-parent w-100 h-100    d-flex    align-items-center   rounded-3 py-3 justify-content-center '>
                          <BarChart
                            assessemnt1={topAssessmentOfOrg?.[0]?.assesment_Name ?? 'Not present'}
                            assessemnt2={topAssessmentOfOrg?.[1]?.assesment_Name ?? 'Not present'}
                            assessemnt3={topAssessmentOfOrg?.[2]?.assesment_Name ?? 'Not present'}
                            assessemnt4={topAssessmentOfOrg?.[3]?.assesment_Name ?? 'Not present'}
                            assessemnt5={topAssessmentOfOrg?.[4]?.assesment_Name ?? 'Not present'}
                            value1={topAssessmentOfOrg?.[0]?.percentage ?? 0}
                            value2={topAssessmentOfOrg?.[1]?.percentage ?? 0}
                            value3={topAssessmentOfOrg?.[2]?.percentage ?? 0}
                            value4={topAssessmentOfOrg?.[3]?.percentage ?? 0}
                            value5={topAssessmentOfOrg?.[4]?.percentage ?? 0}
                      />
                    </div>}
                    {topAssessmentOfOrg && topAssessmentOfOrg?.length == 0 && !topAssessmentOfOrgIsError && !topAssessmentOfOrgLoading && <div className=' chart-parent w-100 h-100    d-flex    align-items-center   rounded-3 py-3 justify-content-center '>
                      <BarChart
                        assessemnt1={'Not present'}
                        assessemnt2={'Not present'}
                        assessemnt3={'Not present'}
                        assessemnt4={'Not present'}
                        assessemnt5={'Not present'}
                        value1={0.01}
                        value2={0.01}
                        value3={0.01}
                        value4={0.01}
                        value5={0.01}
                      />
                      {/* <img src={graphAnalysis} alt="error" width={"200px"} height={"200px"} /> */}
                    </div>}
                    {topAssessmentOfOrgIsError && <div className='  d-flex w-100 h-100 justify-content-center align-items-center  flex-column'>
                      <div className=' d-flex justify-content-around w-100 '>
                        <img src={graphError} alt="error" width={"200px"} height={"200px"} />
                      </div>
                      <div className=' w-100  d-flex  justify-content-around align-items-center flex-column'>
                        <p className=' text-center'  > Something went wrong  </p>
                        <CustomButton buttonText={" Reload "} className={" mx-auto"} onButtonClick={() => {window.location.reload();}} />
                      </div>  </div>}
                      </div>
                    </div>
                  </div>


                </div>

                <div className=" m-0 p-1  d-flex justify-content-between  rounded-3 w-100 " style={{height: "50%"}}>
                  <div className="row w-100 h-100  chart-box   p-0  m-0 " >
                    <div className="col-12 col-md-8 h-auto  p-0 pe-1 d-flex  align-items-center    justify-content-center rounded-3 overflow-auto">
                      <div className=' chart-parent w-100 h-100  d-flex   align-items-start  rounded-3  justify-content-center bg-white ' >

                        {<div className="row m-0  d-flex flex-column justify-content-start bg-white  rounded-3 w-100 h-100 overflow-auto  p-0   ">
                      <div className='col-12 w-100  p-md-0 m-0   fw-bold '>
                        <h5 className=' ps-4 pt-3 d-flex align-items-center justify-content-start'> Active Assessment  {topAssessmentOfOrgLoading && <Spinner size='sm' variant='primary' className=' ms-2' animation="border" />}</h5>
                          </div>
                      <Accordion className='col-12 w-100 h-75 p-0  ' >
                            {data?.data && data?.data?.map((value,index) => {
                              if(value.is_Active == "true") {
                                return <TopStudentAcordianItem
                                  key={index}
                                  index={index}
                                  assessmentId={value?.paperId}
                                  assessmentName={value?.assessmentName}
                                  examDate={"28-09-2033"}
                                  examDuration={value?.examDuration} />
                              } else {
                                return null;
                              }
                            }
                            )
                            }
                        {data?.data?.length == 0 ? <>no data available</> : null}
                        {isError ? <>  <div className='  d-flex w-100 h-100  flex-column justify-content-center align-items-center'>
                          <div className=' d-flex justify-content-center align-items-center w-100  '>
                            <img src={assessmentfailded} alt="error" width={"100px"} height={"100px"} />
                          </div>
                          <div className=' w-100  h-25  d-flex   align-items-center flex-column'>
                            <p className=' text-center  '  > Something went wrong  </p>
                            <CustomButton buttonText={" Reload "} className={" mx-auto"} onButtonClick={() => {window.location.reload();}} />
                          </div>  </div> </> : null}     
                          </Accordion>
                        </div>}
                      </div>
                    </div>
                <div className="col-12 col-md-4 px-1  h-auto overflow-auto  d-flex   align-items-center    justify-content-start   rounded-3 overflow-auto">
                  <div className=" w-100  h-100  d-flex flex-column bg-white   align-items-center    justify-content-start   rounded-3">
                    <h5 className=' ps-3 pt-2 align-self-start d-flex justify-content-start align-items-center'> Top Ranking Student    {topRankersLoading && <>
                      <Spinner size='sm' variant='primary' className=' ms-2' animation="border" />
                    </>}</h5>


                    {topRankersError ? <div className=' chart-parent w-100 d-flex  h-100  align-items-center  rounded-3 py-3  justify-content-center '> <SolidGauge
                      assessemnt1={'Not present'}
                      assessemnt2={'Not present'}
                      assessemnt3={'Not present'}
                      assessemnt4={'Not present'}
                      assessemnt5={'Not present'}
                      value1={0}
                      value2={0}
                      value3={0}
                      value4={0}
                      value5={0} /> </div> : null}
                    {topStudentOfOrg && topStudentOfOrg?.length && !topRankersLoading && !topRankersFetching ? <div className=' chart-parent w-100 d-flex  h-100  align-items-center  rounded-3 py-3  justify-content-center '>
                          <SolidGauge
                            assessemnt1={topStudentOfOrg?.[0]?.name ?? 'Not present'}
                            assessemnt2={topStudentOfOrg?.[1]?.name ?? 'Not present'}
                            assessemnt3={topStudentOfOrg?.[2]?.name ?? 'Not present'}
                            assessemnt4={topStudentOfOrg?.[3]?.name ?? 'Not present'}
                            assessemnt5={topStudentOfOrg?.[4]?.name ?? 'Not present'}
                            value1={topStudentOfOrg?.[0]?.topMarks ?? 0}
                            value2={topStudentOfOrg?.[1]?.topMarks ?? 0}
                            value3={topStudentOfOrg?.[2]?.topMarks ?? 0}
                            value4={topStudentOfOrg?.[3]?.topMarks ?? 0}
                            value5={topStudentOfOrg?.[4]?.topMarks ?? 0} />
                    </div> : null}

                      </div>
                    </div>
                  </div></div>

            </div>
          </>
        // )
      }

    </>
  );
}
