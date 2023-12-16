import React, { useEffect, useState } from 'react';
import {
  useGetAllAssissmentOnstudentPageQuery,
  useGetPassedAssessmentByStudentIdQuery,
  useGetTop5AssesmentScoreByStudentIdQuery,
} from '../../../apis/Service';
import { TotalComponent } from '../component/TotalComponent';
import graphError from '../../../assets/gif/graph/graph-error.gif';
import graphAnalysis from '../../../assets/gif/graph/graph-analysis.gif';
import { StudentCertificate } from '../../student/StudentCertificate/StudentCertificateDownload';
// import { ViewResult } from '../../student/viewResult/ViewResult';
import { SubIdSplit } from '../../../utils/SubIdSplit';
import noAssessmentFound from '../../../assets/gif/graph/noAssesmentFound.png';
import { FaArrowRight, FaThumbsUp, FaUsers } from 'react-icons/fa';
import { MdOutlineAssignment } from 'react-icons/md';
import { Loader } from '../../../components/Loader/Loader';
import BarChart from '../component/BarChart';
import { CustomButton } from '../../../theme/Button/Buttons';
import { Accordion, Spinner } from 'react-bootstrap';
import AttemptedFailed from '../../../assets/gif/graph/assessment-error.png';
import { BarChartStudentDashboard } from '../component/BarChartStudentDashboard';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../routes/RoutesConstant';

export const StudentDashBoard = () => {
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = SubIdSplit(userId.sub);

  const {
    data: assignmentData,
    isLoading: isAssignmentLoading,
    isError: isAssignmentError,
  } = useGetAllAssissmentOnstudentPageQuery(userId);
  // const assignmentData = [
  //   {is_attempted: true},
  //   {is_attempted: false}
  // ]
  // const
  const [isAttemptedAssessment, setIsAttemptedAssessment] = useState(0);
  const navigate = useNavigate();
  const {
    data: top15Students,
    isLoading: top15StudentsLoading,
    isError: top15StudentsIsError,
    isFetching: isAssignmentFetching,
  } = useGetTop5AssesmentScoreByStudentIdQuery(userId);

  const { data: passedAssessment, isLoading: passedAssessmentLoading } =
    useGetPassedAssessmentByStudentIdQuery(userId);
  // const top15Students = [
  //   {
  //     assesment_Name: "yes",
  //     percentage: 10
  //   },{
  //     assesment_Name: "yes-no",
  //     percentage: 20
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },{
  //     assesment_Name: "no",
  //     percentage: 50
  //   },
  // ];
  const info = [
    {
      id: 1,
      infoText: 'Total Assessment',
      infoNumber: assignmentData?.length ?? 0,
      icon: <FaUsers size={50} />,
      children: (
        <>
          {' '}
          {isAssignmentLoading ? (
            <Spinner
              size="sm"
              variant="primary"
              className=" ms-3"
              animation="border"
            />
          ) : null}{' '}
        </>
      ),
      iconClassName: 'bg-warning',
      onViewClick: () => {
        navigate(path.ShowAllAssessmentToStudent.path);
      },
    },
    {
      id: 2,
      infoText: 'Atempted Assessment',
      infoNumber:
        assignmentData?.filter((item) => item.is_attempted == true).length ?? 0,
      icon: <MdOutlineAssignment size={50} />,
      children: (
        <>
          {' '}
          {isAssignmentLoading ? (
            <Spinner
              size="sm"
              variant="primary"
              className=" ms-3"
              animation="border"
            />
          ) : null}{' '}
        </>
      ),
      iconClassName: 'bg-danger',
      onViewClick: () => {},
    },
    {
      id: 3,
      infoText: 'Passed Assessment',
      infoNumber: passedAssessment?.length ?? 0,
      icon: <FaThumbsUp size={50} />,
      iconClassName: 'bg-success',
      colClassName: ' w-100',
      children: (
        <>
          {' '}
          {passedAssessmentLoading ? (
            <Spinner
              size="sm"
              variant="primary"
              className=" ms-3"
              animation="border"
            />
          ) : null}{' '}
        </>
      ),
      onViewClick: () => {
        '';
      },
    },
  ];
  useEffect(() => {
    let count = 0;
    assignmentData?.filter((item) => {
      if (item.is_attempted) {
        count += 1;
      }
      return item.is_attempted == true;
    });
    setIsAttemptedAssessment(count);
  }, [assignmentData]);
  return (
    <>
      {/* {isAssignmentLoading ? (<div className=" position-absolute top-50 start-50  translate-middle " >
      //     <Loader />
        //   </div >) : ( */}
      <div className=" w-100 h-100 m-0  p-0 g-md-0 overflow-auto bg-transparent">
        <div className="row w-100   chart-box    p-1 m-0 h-50">
          <div className="col-12 d-flex  p-0 px-1    flex-column align-items-center    justify-content-center rounded-3">
            <div className=" w-100 h-100 bg-white rounded-3 ">
              <h5 className=" ps-5 pt-2 m-0 d-flex justify-content-start align-items-center">
                {' '}
                Top Rank Assessment{' '}
                {top15StudentsLoading && (
                  <Spinner
                    className=" text-primary ms-3"
                    animation="border"
                    size="sm"
                  />
                )}
              </h5>
              <div className=" m-0 p-0  w-100" style={{ height: '90%' }}>
                {top15Students && top15Students?.length > 0 && (
                  <div className=" chart-parent w-100 h-100    d-flex    align-items-center   rounded-3 py-3 justify-content-center ">
                    <BarChartStudentDashboard studentData={top15Students} />
                  </div>
                )}
                {top15Students &&
                  top15Students?.length == 0 &&
                  !top15StudentsIsError &&
                  !top15StudentsLoading && (
                    <div className="  d-flex w-100 flex-column">
                      <div className=" d-flex justify-content-around flex-column w-100 h-50">
                        <div className=" d-flex justify-content-around  w-100 h-50">
                          <img
                            src={graphAnalysis}
                            alt="error"
                            width={'200px'}
                            height={'200px'}
                          />
                        </div>
                        <div className=" w-100 h-50 d-flex  justify-content-around align-items-center flex-column">
                          <p className=" text-center"> No Result Found </p>
                        </div>
                      </div>
                    </div>
                  )}
                {top15StudentsIsError ? (
                  <div className="   d-flex justify-content-center align-items-center w-100 h-100  flex-column">
                    <div className=" d-flex justify-content-around w-100 h-50">
                      <img
                        src={graphError}
                        alt="error"
                        width={'200px'}
                        height={'200px'}
                      />
                    </div>
                    <div className=" w-100  d-flex  j align-items-center flex-column">
                      <p className=" text-center">
                        {' '}
                        something went wrong while fetching graph data{' '}
                      </p>
                      <CustomButton
                        buttonText={' Reload '}
                        className={' mx-auto'}
                        onButtonClick={() => {
                          window.location.reload();
                        }}
                      />
                    </div>{' '}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div
          className=" m-0 p-1  d-flex justify-content-between  rounded-3 w-100 "
          style={{ height: '50%' }}
        >
          <div className="row w-100 h-100  chart-box   p-0  m-0 ">
            <div className="col-12 col-sm-6 col-md-5 px-1  h-auto overflow-auto  d-flex   align-items-center    justify-content-start   rounded-3 overflow-auto">
              <div className="row m-0 p-0  w-100 h-100  ">
                {info &&
                  info.map((value) => {
                    return (
                      <>
                        <TotalComponent
                          key={value.id}
                          infoText={value.infoText}
                          infoNumber={value.infoNumber}
                          icon={value.icon}
                          onViewClick={value.onViewClick}
                          iconClassName={value.iconClassName}
                          colClassName={value.colClassName}
                        >
                          {' '}
                          {value.children}
                        </TotalComponent>
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-7 h-auto  p-0 pe-1 d-flex  align-items-center    justify-content-center rounded-3 overflow-auto">
              <div className=" chart-parent w-100 h-100  d-flex   align-items-start  rounded-3  justify-content-center bg-white ">
                {
                  <div className="row m-0  d-flex flex-column justify-content-start bg-white  rounded-3 w-100 h-100 overflow-auto  p-0   ">
                    <div className="row m-0  d-flex justify-content-between bg-white  rounded-3 w-100 h-100  p-2   ">
                      <div className=" w-100 py-3 p-md-2   fw-bold ">
                        <h4 className=" ps-3  d-flex justify-content-start align-items-center">
                          {' '}
                          Attempted Assessment{' '}
                          {isAssignmentLoading && isAssignmentFetching ? (
                            <>
                              {' '}
                              <Spinner
                                className=" text-primary ms-3 "
                                animation="border"
                                size="sm"
                              />{' '}
                            </>
                          ) : null}
                        </h4>
                      </div>
                      {isAttemptedAssessment == 0 &&
                      !isAssignmentLoading &&
                      !isAssignmentFetching &&
                      !isAssignmentError ? (
                        <>
                          <div className="  d-flex w-100 h-100 justify-content-center align-items-center  flex-column">
                            <div className=" d-flex justify-content-around w-100 ">
                              <img
                                src={noAssessmentFound}
                                alt="error"
                                width={'200px'}
                                height={'200px'}
                              />
                            </div>
                            <div className=" w-100  d-flex  justify-content-around align-items-center flex-column">
                              <p className=" text-center">
                                {' '}
                                No Attempted Assessment Found{' '}
                              </p>
                            </div>{' '}
                          </div>{' '}
                        </>
                      ) : null}
                      {isAssignmentError ? (
                        <>
                          {' '}
                          <div className="  d-flex w-100 h-75  flex-column justify-content-center align-items-center">
                            <div className=" d-flex justify-content-center align-items-center w-100  ">
                              <img
                                src={AttemptedFailed}
                                alt="error"
                                width={'100px'}
                                height={'100px'}
                              />
                            </div>
                            <div className=" w-100  h-25  d-flex   align-items-center flex-column">
                              <p className=" text-center  ">
                                {' '}
                                Something went wrong{' '}
                              </p>
                              <CustomButton
                                buttonText={' Reload '}
                                className={' mx-auto'}
                                onButtonClick={() => {
                                  window.location.reload();
                                }}
                              />
                            </div>{' '}
                          </div>{' '}
                        </>
                      ) : null}
                      <Accordion className="  my-2 p-0 p-md-2 ">
                        {assignmentData &&
                          assignmentData
                            ?.filter((item) => item.is_attempted == true)
                            ?.map((value) => {
                              return (
                                <>
                                  <div className=" border rounded py-3 px-2 my-1">
                                    {' '}
                                    <div className=" w-100 d-flex  flex-column flex-md-row gap-2  flex-wrap  justify-content-start  align-items-start  align-items-md-center justify-content-md-between fw-bold ">
                                      <div className=" ps-3 ps-md-0 w-auto text-start text-capitalize">
                                        {value?.assessmentName}{' '}
                                      </div>
                                      <div className=" ps-3 ps-md-0 w-auto  text-start text-capitalize">
                                        {value?.examDuration}{' '}
                                      </div>
                                      <div className=" ps-3 ps-md-0 w-auto  text-start text-capitalize">
                                        {value?.published_date}{' '}
                                      </div>
                                      <div className="d-flex  justify-content-around justify-content-lg-between gap-2">
                                        <ViewResult paperId={value.paperId} />
                                        <div>
                                          <StudentCertificate />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                      </Accordion>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
