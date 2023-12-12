import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router';
import '../../../styles/common.css';
import { path } from '../../../routes/RoutesConstant';
import { FormLabel, Table } from 'react-bootstrap';
import { useGetStudentAvidenceQuery } from '../../../apis/Service';
import { toast } from 'react-toastify';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import { Loader } from '../../../components/Loader/Loader';
import { FormateDate } from '../../../utils/FormateDate';
import { Field } from 'formik';
import { Pending } from '../ResultState/Pending';

export function StudentResult() {
  const { paperId } = useParams();
  let stdId = JSON.parse(localStorage.getItem('stdData'));
  const { data, isLoading, isError } = useGetStudentAvidenceQuery({
    paperId,
    stdId: stdId.userId,
  });

  return (
    <>
      {isError ? (
        <div className="d-flex align-items-center justify-content-center">
          <SomethingWentWrong />
        </div>
      ) : isLoading ? (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      ) : data.is_published === 'requested' ? (
        <div className="h-100 d-flex align-items-center justify-content-center bg-white">
          <Pending />
        </div>
      ) : (
        <div className="w-100 h-100 overflow-auto">
          <div className=" w-100 d-flex justify-content-between align-items-center p-3 flex-wrap ">
            <div className="fw-bold">
              <h5>Submited At: {FormateDate(data?.result.date)}</h5>
            </div>
          </div>

          <div className="w-100 m-0 row gap-2 align-items-center justify-content-evenly text-center">
            <div className="col-6 col-md-2 p-4  rounded-3 bg-warning text-white">
              <p className="white-box  pb-2 px-2 rounded-4 fw-bold mb-0 ">
                Total Marks
              </p>
              <p className="white-box px-2 rounded-4 fw-bold mb-0 ">
                {data?.result.marks}
              </p>
            </div>
            <div className="col-6 col-md-2 p-4  rounded-3 bg-info text-white">
              <p className="white-box pb-2 px-2 rounded-4 fw-bold mb-0 ">
                Percentage
              </p>
              <p className="white-box px-2 rounded-4 fw-bold mb-0 ">
                {data?.result.percentage}%
              </p>
            </div>
            <div
              className={`col-6 col-md-2  p-4 text-white rounded-3 ${
                data?.result.resultStatus !== 'fail'
                  ? 'bg-success'
                  : 'bg-danger'
              }`}
            >
              <p className="white-box pb-2 px-2  rounded-4 fw-bold mb-0 ">
                Result Status
              </p>
              <p className="white-box px-2 rounded-4 fw-bold mb-0 ">
                {data?.result.resultStatus}
              </p>
            </div>
            <div className="col-6 col-md-2  p-4  rounded-3">
              <p className="white-box pb-2  px-2 rounded-4 fw-bold mb-0 ">
                View Change
              </p>
              <p className="white-box px-2 rounded-4 fw-bold mb-0 ">
                {data?.result.marks}
              </p>
            </div>
          </div>
          <div className="white-box overflow  p-4 m-4 border border-black ">
            <>
              {data?.questions.map((question, index) => (
                <div key={index} className="p-4 mb-3 bg-white rounded-4">
                  <div>
                    {index + 1}. {question?.questions.replaceAll('+', ' ')}
                  </div>
                  <div>
                    <FormLabel className="py-2 m-0 fw-bold">
                      Options :-
                    </FormLabel>
                    {question?.options.map((option, optionIndex) => (
                      <>
                        <div
                          key={optionIndex}
                          className="d-flex align-items-center"
                        >
                          <FormLabel className="d-flex align-items-center">
                            <input
                              type="radio"
                              value={data?.questions.userAns}
                            />
                            <h6 className="mx-2 mb-1 mb-0">{option}</h6>
                          </FormLabel>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              ))}
            </>
          </div>
        </div>
      )}
    </>
  );
}
