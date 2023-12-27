import React from 'react';
import { TotalStudent } from '../components/TotalStudent/TotalStudent';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetAllStudentOfOrgQuery,
  useGetStudentOnPerticularAssignmentQuery,
} from '../../../apis/Service';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import { Loader } from '../../../components/Loader/Loader';
import { StudentCard } from '../components/StudentCard/StudentCard';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { path } from '../../../routes/RoutesConstant';

export const TotalStudentOfOrg = () => {
  const { orgId } = useParams();
  const navigate = useNavigate();
  const { data, isSuccess, isLoading, isError } =
    useGetAllStudentOfOrgQuery(orgId);
  if (isSuccess) {
    console.log('student', data);
  }
  return (
    <div className="h-100 w-100 m-0 p-0 ">
      {isError && (
        <div className=" w-100 h-100 d-flex justify-content-center align-items-center">
          <SomethingWentWrong />
        </div>
      )}
      {isLoading ? (
        <div className=" position-absolute top-50 start-50  translate-middle ">
          <Loader />
        </div>
      ) : (
        <>
          {!isError && (
            <>
              <div className="w-100 d-flex gap-2 align-items-center bg-white rounded-4 p-2">
                <IoMdArrowRoundBack
                  size={30}
                  className="cursor-pointer "
                  onClick={() => navigate(path.AdminDasboard.path)}
                />
                <h4 className="m-0 col-md-5 justify-content-start  align-items-center text-capitalize fw-bold">
                  Total Student
                </h4>
              </div>
              {/* <div className=" h-auto ">
                        <TotalStudent totalStudent={data} />
                    </div> */}
              <div
                className="m-0 p-0"
                style={{ height: 'calc(100vh - 16rem)' }}
              >
                <div className="card-div row w-100 justify-content-center justify-content-md-start mx-2 overflow-auto">
                  {data?.map((studentdetails) => (
                    <StudentCard
                      // paperId={paperId}
                      divBoxStyle={'col-lg-2 col-12'}
                      studentdetails={studentdetails}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
