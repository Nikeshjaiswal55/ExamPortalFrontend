import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router';
import '../../../styles/common.css';
import { path } from '../../../routes/RoutesConstant';
import { FormLabel, Table } from 'react-bootstrap';
import {
  useGetAllQuestionsFromPaperIdQuery,
  useGetStudentAvidenceQuery,
} from '../../../apis/Service';
import { toast } from 'react-toastify';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import { Loader } from '../../../components/Loader/Loader';
import { FormateDate } from '../../../utils/FormateDate';
import { Field } from 'formik';
import { Pending } from '../ResultState/Pending';
import { Pass } from '../ResultState/Pass';
import { Fail } from '../ResultState/Fail';
import checkList from '../../../assets/check-list.png';

export function StudentResult() {
  const { paperId } = useParams();
  let stdId = JSON.parse(localStorage.getItem('stdData'));
  const [decodedData, setDecodedData] = useState(null);

  const { data, isLoading, isError } = useGetStudentAvidenceQuery({
    paperId,
    stdId: stdId.userId,
  });
  console.log(data, 'data');
  const {
    data: assessmetData,
    isSuccess,
    isError: assessmetError,
    isLoading: assessmetLoading,
  } = useGetAllQuestionsFromPaperIdQuery(paperId);

  useEffect(() => {
    if (isSuccess) {
      const decodedString = decodeURIComponent(assessmetData.data);
      const jsonData = JSON.parse(decodedString);
      console.log('asasssasss', jsonData);
      setDecodedData(jsonData);
    }
  }, [isSuccess]);

  return (
    <>
      {isError ? (
        <div className="d-flex align-items-center justify-content-center">
          <SomethingWentWrong />
        </div>
      ) : isLoading || assessmetLoading ? (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      ) : data?.is_published == 'requested' ? (
            <div className="h-100 d-flex align-items-center  bg-white">
          <Pending />
          {/* <Pass /> */}
          {/* <Fail /> */}
        </div>
      ) : (
        <div className="w-100 h-100 overflow-auto">
          <div className=" w-100 row justify-content-between align-items-center pt-3 px-3 flex-wrap ">
                  <div className=" col-12">
              <h5 className="fw-bold fs-4 text-capitalize m-0">
                <img
                  src={checkList}
                  className="me-2"
                  style={{ height: '29px' }}
                />
                {decodedData?.examDetails.assessmentName.replaceAll('+', ' ')}
              </h5>
              <p className="m-0 ms-4 ps-3">
                Submited At: {FormateDate(data?.result.date)}
              </p>
            </div>
            <div className="fw-bold col-4 m-0">
              {/* <p className="m-0">
                Submited At:{' '}
                <span className="font-weight-normal">
                  {FormateDate(data?.result.date)}
                </span>
              </p> */}
            </div>
          </div>
          <div className=" w-100 d-flex justify-content-between align-items-center p-3 flex-wrap ">
            <div className="fw-bold">
              <h6 className="text-capitalize">
                Total Marks:
                <b>{decodedData?.examDetails.totalMarks} </b>
              </h6>
              <h6>
                Minimum Marks:
                <b> {decodedData?.examDetails.minimum_marks}%</b>
              </h6>
            </div>
            <div className="fw-bold">
              <h6 className="text-capitalize">
                Result Status:{' '}
                <span
                  className={`${
                    data?.result.resultStatus == 'fail'
                      ? 'text-danger'
                      : 'text-success'
                  }`}
                >
                  <b> {data?.result.resultStatus}</b>
                </span>
              </h6>
              <h6 className="text-capitalize">
                Result Percentage:
                <b>{data?.result.percentage}%</b>
              </h6>
            </div>
          </div>

          {/* <div className="w-100 m-0 row gap-2 align-items-center justify-content-evenly text-center">
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
          </div> */}
          <div className="white-box overflow   mx-3  ">
            <>
              {data?.questions.map((question, index) => (
                <div key={index} className="p-4 mb-3 bg-white rounded-3">
                  <h6>
                    {index + 1}. {question?.questions.replaceAll('+', ' ')}
                  </h6>
                  <div className="pt-4 ps-3">
                    {/* <FormLabel className="py-2 m-0 fw-bold">
                      Options :-
                    </FormLabel> */}
                    {question?.options.map((option, optionIndex) => (
                      <>
                        <div
                          key={optionIndex}
                          className="d-flex align-items-center "
                        >
                          <FormLabel className="d-flex align-items-center">
                            <input
                              type="radio"
                              value={option}
                              checked={
                                question.userAns === option
                                // question.correctAns === option
                              }
                            />
                            <p className="mx-2 mb-1 mb-0">
                              {option.replaceAll('+', ' ')}
                            </p>
                          </FormLabel>
                        </div>
                      </>
                    ))}
                    <h6 className="text-success mt-2">
                      {question.correctAns
                        ? `Correct Answer: ${question.correctAns.replaceAll(
                            '+',
                            ' '
                          )}`
                        : ''}
                    </h6>
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
