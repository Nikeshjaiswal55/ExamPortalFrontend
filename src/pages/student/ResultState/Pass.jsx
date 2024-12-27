import React from 'react';
import result from '../../../assets/result-pass.svg';
import { Button } from 'react-bootstrap';
import bombGif from '../../../assets/output-onlinegiftools.gif';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../routes/RoutesConstant';
import { getDecryptedResponse } from '../../../utils/getDecryptedResponse';

export const Pass = ({ paperId, stdId, data }) => {
  const otp_data = getDecryptedResponse('otp_data')
  const navigate = useNavigate();
  return (
    <div className="h-100 w-100 bg-white">
      <div className="h-100 w-100 result-bg d-flex justify-content-center align-items-center">
        <div className="position-absolute">
          <img src={bombGif} alt="" />
        </div>
        <div className="result-container text-center">
          <h1 className="mb-3">Congratulations🎉</h1>
          <img src={result} />
          <h5 className="mt-5">
            Your hard work has paid off, achieving a fantastic{' '}
          </h5>
          <span className="display-3 fw-bolder">{data?.percentage}%</span>
          <h5 className="mt-3">
            Your dedication and effort have brought you to this impressive
            milestone.
          </h5>
          <h5 className="mt-3">Keep up the great work!</h5>
          {/* <Button variant="dark me-4 mt-5">View Certificate</Button> */}
          {/* <Button
            variant="dark me-sm-4 m-2 mt-sm-5"
            onClick={() => navigate(path.StudentDashboard.path)}
          >
            Back To Dashboard
          </Button>
          <Button
            variant="dark m-2
             mt-sm-5"
            onClick={() =>
              navigate(`${path.examReport.path}/${paperId}/${stdId.userId}`)
            }
          >
            View Exam Evidence
          </Button> */}

          {otp_data?.stdId?<Button
            variant="dark m-2
           mt-sm-5"
            onClick={() =>{
              localStorage.clear()
              navigate(`/sns-svs`)
            }
            }>
              Back to home
          </Button>: <><Button
            variant="dark me-sm-4 m-2 mt-sm-5"
            onClick={() => navigate(path.StudentDashboard.path)}
          >
            Back To Dashboard
          </Button>
          <Button
            variant="dark m-2
             mt-sm-5"
            onClick={() =>
              navigate(`${path.examReport.path}/${paperId}/${stdId.userId}`)
            }
          >
            View Exam Evidence
          </Button> </>}
        </div>
      </div>
    </div>
  );
};
