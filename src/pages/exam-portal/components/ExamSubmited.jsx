import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../routes/RoutesConstant';

export const ExamSubmited = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center mt-5 gap-4">
      <div className="d-flex align-items-center">
        <Image
          src="https://icons.veryicon.com/png/o/miscellaneous/8atour/submit-successfully.png"
          style={{ height: '4rem', width: '4rem' }}
          roundedCircle
        />
      </div>
      <div>
        <h4>Test Completed</h4>
        <h6>
          You have successfully completed the test. You can close this tab.
        </h6>
        <Button variant="success" onClick={() => navigate(path.examReport.path)}>
          View Your Report
        </Button>
      </div>
    </div>
  );
};
