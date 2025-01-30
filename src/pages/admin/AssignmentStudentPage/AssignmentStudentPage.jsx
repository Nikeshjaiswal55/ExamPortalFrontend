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

  const [searchTerm, setSearchTerm] = useState("");
  const filteredStudents = data?.filter((student) =>
    student?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-100 w-100 m-0 p-0 ">
      {isError && <SomethingWentWrong />}
      {isLoading ? (
        <div className=" position-absolute top-50 start-50  translate-middle ">
          <Loader />
        </div>
      ) : (
        <>
        <div className='d-flex justify-content-between align-items-center'>
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
          <div style={{ width: "12rem" }}>
              <input
                placeholder="Search student.."
                className="form-control w-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
            <div className="m-0 p-0 overflow-x-hidden overflow-y-auto" style={{height: 'calc(100vh - 122px)'}}>
            <div className="card-div row w-100 justify-content-center justify-content-md-start mx-2 overflow-auto">
              {filteredStudents?.map((studentdetails, index) => (
                <StudentCard
                  key={index}
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
