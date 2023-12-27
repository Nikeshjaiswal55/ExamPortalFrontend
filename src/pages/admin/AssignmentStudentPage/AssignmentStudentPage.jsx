import React, { useState } from 'react';
import { StudentCard } from '../components/StudentCard/StudentCard';
import { useGetStudentOnPerticularAssignmentQuery } from '../../../apis/Service';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../components/Loader/Loader';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import { IoIosArrowBack } from 'react-icons/io';
import { path } from '../../../routes/RoutesConstant';

export default function AssignmentStudentPage() {
  const { paperId } = useParams();
  const navigate = useNavigate();
  const { data, isSuccess, isLoading, isError } =
    useGetStudentOnPerticularAssignmentQuery(paperId);
  if (isSuccess) {
    console.log('student', data);
  }

  return (
    <div className="h-100 w-100 m-0 p-0 ">
      {isError && <SomethingWentWrong />}
      {isLoading ? (
        <div className=" position-absolute top-50 start-50  translate-middle ">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-100 d-flex gap-2 align-items-center rounded-3 p-2">
            <IoIosArrowBack
              size={30}
              className="cursor-pointer "
              onClick={() => navigate(path.showAssessment.path)}
            />
            <h4 className="m-0 col-md-5 justify-content-start  align-items-center text-capitalize fw-bold">
              Student
            </h4>
          </div>
          <div className="m-0 p-0" style={{ height: 'calc(100vh - 16rem)' }}>
            <div className="card-div row w-100 justify-content-center justify-content-md-start mx-2 overflow-auto">
              {data?.map((studentdetails, index) => (
                <StudentCard
                  paperId={paperId}
                  divBoxStyle={'col-lg-2 col-12'}
                  studentdetails={studentdetails}
                  index={index}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
