import React,{useEffect,useState} from 'react';
import {Accordion} from 'react-bootstrap';
import '../component/Chart.css'
import {FaUsers,FaShoppingCart} from "react-icons/fa";
import {MdOutlineAssignment} from "react-icons/md";
import {CustomButton} from '../../../theme/Button/Buttons'
import {useGetAssignmentQuery,useGetTop3AssissmentStudentsQuery,useGetTop5AssissmentQuery,useGetTotalAssessmentAdminQuery,useGetTotalStudentAdminQuery} from '../../../apis/Service';
import {SubIdSplit} from '../../../utils/SubIdSplit';
import BarChart from '../component/BarChart';
import DoughnutChart from '../component/DoughnutChart';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import PieChart from '../component/PieChart';
import {Loader} from '../../../components/Loader/Loader';


const color = [
  'bg-danger',
  'bg-secondary',
  'bg-primary',
  'bg-warning',
  'bg-info',
  'bg-dark',
];
// const randomColor = color[Math.floor(Math.random() * color.length)];

// const TopStudent = [
//   {
//     studentid: 12,
//     email: "dixitp034@gmail.com",
//   },
//   {
//     studentid: 13,
//     email: "kapilj.bca2022@ssism.org",
//   },
//   {
//     studentid: 14,
//     email: "akashbba2022@ssism.org",
//   }
// ]
const TotalComponent = ({infoText,infoNumber,icon,iconClassName}) => {
  return <>
    <div class="col-12 col-sm-6 h-7 col-md-4 p-2 m-0" style={{height: "150px"}}>
      <div class=" w-100  d-flex align-items-center gap-2   border m-1 p-2 rounded-2" style={{backgroundColor: "var(--main-div)"}}>
        <span class={` d-flex justify-content-center align-items-center rounded-2   elevation-1 ${iconClassName}  `} style={{width: "80px ",height: "80px"}}>{icon}</span>
        <div class="  d-flex flex-column">
          <span class="info-box-text fs-4 fw-bold">{infoText}</span>
          <span class="info-box-number fs-5">{infoNumber}</span>
        </div>
      </div>
    </div>
  </>
}

const TopStudentCard = ({email,onEvidenceClick}) => {
  const randomColor = color[Math.floor(Math.random() * color.length)];
  return <>
    <div class="col-12  p-1 m-0">
      <div class=" w-100 h-100 d-flex align-items-center gap-2  border m-1 p-1 rounded-2">
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
      <Accordion.Item eventKey={index} className=' border-0  border-bottom b'>
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
      id: 1,
      infoText: "Total Student",
      infoNumber: totalStudents?.[0] ?? 0,
      icon: <FaUsers size={50} />,
      iconClassName: "bg-warning",
    },
    {
      id: 2,
      infoText: "Total Assessment",
      infoNumber: totalAssessments?.[0] ?? 0,
      icon: <MdOutlineAssignment size={50} />,
      iconClassName: "bg-danger",
    },{
      id: 3,
      infoText: "Publish Assessment",
      infoNumber: data?.length,
      icon: <FaShoppingCart size={50} />,
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
              <div className="row w-100  chart-box   p-0 m-0 " style={{height: "20rem"}}>
                <div className="col-12 col-md-4  d-flex   align-items-center   justify-content-center rounded-3">
                  {barChatData && barChartLabels && <div className=' chart-parent w-100 h-75  d-flex   align-items-center  rounded-3 py-3 justify-content-center ' style={{backgroundColor: "var(--main-div)"}}>
                    <BarChart chartLabels={barChartLabels} chartData={barChatData} />
                  </div>}
                </div>
                <div className="col-12 col-md-4 h-auto  d-flex   align-items-center    justify-content-center    rounded-3">

                  {barChatData && barChartLabels && <div className=' chart-parent w-100 h-75  d-flex   align-items-center  rounded-3 py-3  justify-content-center ' style={{backgroundColor: "var(--main-div)"}}>
                    <DoughnutChart DoughnutChartData={barChatData} DoughnutChartLabels={barChartLabels} />
                  </div>}

                </div>
                <div className="col-12 col-md-4 d-flex   align-items-center   justify-content-center    rounded-3">
                  {barChatData && barChartLabels && <div className=' chart-parent w-100 h-75   d-flex   align-items-center  rounded-3 py-3 justify-content-center ' style={{backgroundColor: "var(--main-div)"}}>
                    <PieChart PieChartData={barChatData} PieChartLabels={barChartLabels} />
                  </div>}
                </div>
              </div>
              <div class="row m-0 p-0 d-flex justify-content-around w-100  " >
                {info && info.map((value) => {

                  return <>
                    <TotalComponent key={value.id} infoText={value.infoText} infoNumber={value.infoNumber} icon={value.icon} iconClassName={value.iconClassName} />
                  </>
                })
                }

              </div>

              {data?.length ? <div className="row m-0  d-flex justify-content-between bg-white  rounded-3 w-100  p-2   ">
                <div className=' w-100 py-3 p-md-2   fw-bold '>
                  <h4 className=' ps-3'> Active Assessment</h4>
                </div>
                  <Accordion className='  my-1 p-0  ' >

                  {data && data?.map((value,index) => {

                    if(value._Active) {
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
          </>
        )
      }

    </>
  );
}
