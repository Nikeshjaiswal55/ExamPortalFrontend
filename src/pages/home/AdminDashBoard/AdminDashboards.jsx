import React,{useEffect,useState} from 'react';
import {Accordion} from 'react-bootstrap';
import '../component/Chart.css'
import {FaUsers,FaShoppingCart,FaArrowRight} from "react-icons/fa";
import {MdOutlineAssignment} from "react-icons/md"; import {FaLeanpub,FaRightLeft} from "react-icons/fa6";
import {CustomButton} from '../../../theme/Button/Buttons'
import {useGetAssignmentQuery,useGetTop3AssissmentStudentsQuery,useGetTop5AssissmentQuery,useGetTotalAssessmentAdminQuery,useGetTotalStudentAdminQuery} from '../../../apis/Service';
import {SubIdSplit} from '../../../utils/SubIdSplit';

import {Loader} from '../../../components/Loader/Loader';
import BarChart from './BarChart';
import SolidGauge from './SolidGauge';
// import RadarChart from './SolidGauge';


const color = [
  'bg-danger',
  'bg-secondary',
  'bg-primary',
  'bg-warning',
  'bg-info',
  'bg-dark',
];

const TopStudent = [{
  studentid: 1,
  email: "dixip034@gmail.com"
},
{
  studentid: 2,
  email: "dixip034@gmail.com"
},
{
  studentid: 3,
  email: "dixip034@gmail.com"
}
]
const TotalComponent = ({infoText,infoNumber,icon,iconClassName}) => {
  return <>
    <div class="col-12 col-md-6 p-0 ps-2 m-0" style={{maxHeight: "150px"}}>
      <div class=" w-100 h-100   d-flex  justify-content-center flex-column align-items-center gap-2 bg-white   border m-1 p-0 rounded-2" >
        <div class="w-100 h-100  d-flex   gap-4 p-2 ">
          <div class={` d-flex justify-content-center align-items-center rounded-2   elevation-1 ${iconClassName}  `} style={{width: "30px ",height: "30px"}}>{icon}</div>
          <div class="info-box-text fs-5 fw-bold">{infoText}</div>
        </div>
        <div className=' w-100 m-0 p-0 '>
          <span class="info-box-number fs-5 ps-3">{infoNumber}</span>
        </div>
        <div className=' w-100 text-center m-0 p-0'>
          <hr />
          <span className=' fs-5 text-center p-0 m-0 py-2'> view more <FaArrowRight /></span>
        </div>
      </div>
    </div>
  </>
}

const TopStudentCard = ({email,onEvidenceClick}) => {
  const randomColor = color[Math.floor(Math.random() * color.length)];
  return <>
    <div class="col-12  p-1 m-0">
      <div class=" h-100 d-flex align-items-center gap-2  border m-1 p-1 rounded-2">
        <span class={` h-100 w-25 d-flex justify-content-center align-items-center rounded-2   elevation-1 `}>
          <div
            className={` ${randomColor} img-thumbnail d-flex justify-content-center align-items-center rounded-circle  m-auto p-0   border-dark border-1 `}
            style={{width: "40px",height: "40px"}}
          >
            <h4 className="text-capitalize text-light p-0 ">
              {email.charAt(0).toUpperCase()}
            </h4>
          </div> </span>
        <div class=" w-100  d-flex flex-wrap   justify-content-between align-items-center align-items-center">
          <span class="info-box-text me-2 fs-6">{email}</span>
          <CustomButton buttonText={"Evidence"} onButtonClick={onEvidenceClick} />
        </div>
      </div>
    </div>
  </>
}

const TopStudentAcordianItem = ({index,assessmentId,assessmentName,examDuration,examDate}) => {
  const {data: TopStudent,isLoading,isError,isSuccess} = useGetTop3AssissmentStudentsQuery(assessmentId);
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
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = SubIdSplit(userId.sub);

  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetAssignmentQuery({id: userId});
  const {data: totalStudents} = useGetTotalStudentAdminQuery();
  const {data: totalAssessments} = useGetTotalAssessmentAdminQuery();
  const info = [

    {
      id: 2,
      infoText: "Total Assessment",
      infoNumber: totalAssessments?.[0] ?? 10,
      icon: <MdOutlineAssignment size={50} />,
      iconClassName: "bg-danger",
    },{
      id: 1,
      infoText: "Total Student",
      infoNumber: totalStudents?.[0] ?? 500,
      icon: <FaUsers size={50} />,
      iconClassName: "bg-warning",
    },{
      id: 3,
      infoText: "Publish Assessment",
      infoNumber: data?.length ?? 5,
      icon: <FaLeanpub size={50} />,
      iconClassName: "bg-success",
    },{
      id: 4,
      infoText: "Total course",
      infoNumber: data?.length ?? 10,
      icon: <FaLeanpub size={50} />,
      iconClassName: "bg-success",
    }
  ];
  const {data: top5Assessment
    ,isLoading: isTop5AssessmentLoading
    ,isError: isTop5AssessmentError} = useGetTop5AssissmentQuery(userId);

  const [barChatData,setBarChatData] = useState();
  const [barChartLabels,setBarChatLabels] = useState();

  useEffect(() => {
    const chartData = [];
    const chartLabels = [];
    if(top5Assessment) {
      top5Assessment?.forEach((value) => {
        chartLabels.push(value.assessmentName);
        chartData.push(value.marks);
      });
    }
    console.log("chart data ",chartData);
    console.log("chart labels",chartLabels);
    setBarChatData(chartData);
    setBarChatLabels(chartLabels);
    console.log(top5Assessment);
  },[top5Assessment]);
  return (
    <>


      {
        isLoading ? (
          <div className=" position-absolute top-50 start-50  translate-middle " >
            <Loader />
          </div >
        ) : (
          <>
            <div className=" w-100 h-100 m-0  p-0 g-md-0 overflow-auto bg-transparent">
                <div className="row w-100   chart-box   p-0 py-2 m-0 h-50" >
                  <div className="col-12 col-md-6  m-0 p-0 h-100  d-flex    align-items-center   justify-content-center   rounded-3">
                    <div class="row m-0 p-0 w-100 h-100   d-flex justify-content-center  align-items-baseline " >
                      {info && info.map((value) => {
                        return <>
                          <TotalComponent key={value.id} infoText={value.infoText} infoNumber={value.infoNumber} icon={value.icon} iconClassName={value.iconClassName} />
                        </>
                      })
                      }
                    </div>


                  </div>
                  <div className="col-12 col-md-6 d-flex     flex-column align-items-center    justify-content-center rounded-3">
                    <div className=' w-100 h-100 bg-white rounded-3 '>
                      <h5 className=' ps-5 pt-2'> Top Rank Assessment</h5>
                      <div className=' m-0 p-0  w-100' style={{height: "90%"}}>
                        {barChatData && barChartLabels && <div className=' chart-parent w-100 h-100    d-flex    align-items-center   rounded-3 py-3 justify-content-center '>

                          <BarChart
                            assessemnt1={"ITEG"}
                            assessemnt2={"SNS"}
                            assessemnt3={"SVS"}
                            assessemnt4={"MEG"}
                            assessemnt5={"BEG"}
                            value1={1000}
                            value2={800}
                            value3={500}
                            value4={400}
                            value5={300}
                          />
                        </div>}
                      </div>
                    </div>
                  </div>


                </div>

                <div className=" m-0 p-0  d-flex justify-content-between  rounded-3 w-100 h-50 ">
                  <div className="row w-100 h-100  chart-box   p-0  m-0 " >
                    <div className="col-12 col-md-8 h-auto overflow-auto  d-flex  align-items-center    justify-content-center rounded-3 overflow-auto">
                      <div className=' chart-parent w-100 h-100  d-flex   align-items-start  rounded-3  justify-content-center bg-white ' >

                        {data?.data?.length ? <div className="row m-0  d-flex flex-column justify-content-start bg-white  rounded-3 w-100 h-100 overflow-auto  p-0   ">
                          <div className='col-12 w-100 py- p-md-0 m-0   fw-bold '>
                            <h5 className=' ps-5 pt-2'> Active Assessment</h5>
                          </div>
                          <Accordion className='col-12 w-100 p-0  ' >
                            {data?.data && data?.data?.map((value,index) => {
                              if(value.is_Active == "true") {
                                return <TopStudentAcordianItem
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

                          </Accordion>
                        </div> : null}
                      </div>
                    </div>
                    <div className="col-12 col-md-4  h-auto overflow-auto  d-flex   align-items-center    justify-content-start   rounded-3 overflow-auto">


                      <div className=" w-100  h-100  d-flex flex-column bg-white   align-items-center    justify-content-start   rounded-3">
                        <h5 className=' ps-5 pt-2'> Top Ranking Student  </h5>

                        {barChatData && barChartLabels && <div className=' chart-parent w-100 d-flex  h-100  align-items-center  rounded-3 py-3  justify-content-center '>
                          <SolidGauge
                            assessemnt1={"ITEG"}
                            assessemnt2={"SNS"}
                            assessemnt3={"SVS"}
                            assessemnt4={"MEG"}
                            assessemnt5={"BEG"}
                            value1={1000}
                            value2={800}
                            value3={500}
                            value4={400}
                            value5={300} />
                        </div>}

                      </div>
                    </div>
                  </div></div>



            </div>
          </>
        )
      }

    </>
  );
}
