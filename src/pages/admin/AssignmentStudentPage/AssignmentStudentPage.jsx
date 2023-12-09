import React, { useState } from 'react';
import { StudentCard } from '../components/StudentCard/StudentCard';
import { TotalStudent } from '../components/TotalStudent/TotalStudent';
import { useGetStudentOnPerticularAssignmentQuery } from '../../../apis/Service';
import { useParams } from 'react-router-dom';
import { Loader } from '../../../components/Loader/Loader';

export default function AssignmentStudentPage() {
  const { paperId } = useParams();
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
          <div className=" h-auto ">
            <TotalStudent totalStudent={data} />
          </div>
          <div
            className="card-div row w-100 justify-content-center justify-content-md-start mx-2 overflow-auto"
            style={{ height: 'calc(100vh - 16rem)' }}
          >
            {data?.map((studentdetails) => (
              <StudentCard
              paperId={paperId}
                divBoxStyle={'col-lg-2 col-12'}
                studentdetails={studentdetails}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
