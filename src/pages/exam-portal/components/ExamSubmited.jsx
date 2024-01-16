import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { path } from '../../../routes/RoutesConstant';
import { useGetStudentAvidenceQuery } from '../../../apis/Service';
import { Fail } from '../../student/ResultState/Fail';
import { Pending } from '../../student/ResultState/Pending';
import { Pass } from '../../student/ResultState/Pass';
import { Loader } from '../../../components/Loader/Loader';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';

export const ExamSubmited = () => {
  const { paperId } = useParams();
  const stdId = JSON.parse(localStorage.getItem('stdData'));
  const { data, isLoading, isError } = useGetStudentAvidenceQuery({
    paperId,
    stdId: stdId.userId,
  });
  // return (
  //   <div className="d-flex justify-content-center mt-5 gap-4">
  //     <div className="d-flex align-items-center">
  //       <Image
  //         src="https://icons.veryicon.com/png/o/miscellaneous/8atour/submit-successfully.png"
  //         style={{ height: '4rem', width: '4rem' }}
  //         roundedCircle
  //       />
  //     </div>
  //     <div>
  //       <h4>Test Completed</h4>
  //       <h6>
  //         You have successfully completed the test. You can close this tab.
  //       </h6>
  //       <Button
  //         variant="success"
  //         onClick={() =>
  //           navigate(`${path.examReport.path}/${paperId}/${stdData.userId}`)
  //         }
  //       >
  //         View Your Report
  //       </Button>
  //     </div>
  //   </div>
  // );

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
      ) : data?.is_published === 'approved' ? (
        data?.result.resultStatus === 'pass' ? (
          <div className="h-100 d-flex align-items-center justify-content-center">
            <Pass stdId={stdId} paperId={paperId} data={data?.result} />
          </div>
        ) : data?.result.resultStatus === 'fail' ? (
          <div className="h-100 d-flex align-items-center justify-content-center">
            <Fail stdId={stdId} paperId={paperId} data={data?.result} />
          </div>
        ) : null
      ) : (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <Pending />
        </div>
      )}
    </>
  );
};
