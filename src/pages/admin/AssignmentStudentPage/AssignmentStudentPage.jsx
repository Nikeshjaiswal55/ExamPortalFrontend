import React from 'react';
import { StudentCard } from '../components/StudentCard/StudentCard';
import { TotalStudent } from '../components/TotalStudent/TotalStudent';
import { useGetStudentOnPerticularAssignmentQuery } from '../../../apis/Service';
import { useParams } from 'react-router-dom';

export default function AssignmentStudentPage() {
  const { paperId } = useParams()
  const { data, isSuccess,isLoading } = useGetStudentOnPerticularAssignmentQuery(paperId)
  if (isSuccess) {

    console.log("student", data)
  }
  return (
    isLoading?<h1>load</h1>:
    <div className="h-100 w-100 m-0 p-0 ">
      <div className=" h-auto ">
        <TotalStudent totalStudent={data?.content_Student}/>
      </div>
      <div
        className="card-div row w-100 overflow-auto"
        style={{ height: 'calc(100vh - 16rem)' }}
      >
        {data.content_Student
          .map((studentdetails) => (
            <StudentCard divBoxStyle={'col-lg-2 col-12'} studentdetails={studentdetails} />
          ))}
      </div>
    </div>
  );
}
