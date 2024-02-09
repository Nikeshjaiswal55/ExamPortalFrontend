import React from 'react';
import result from '../../../assets/Pending.svg';
import { path } from '../../../routes/RoutesConstant';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const Pending = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-100 w-100 bg-white">
        <div className="h-100 w-100 result-bg d-flex justify-content-center">
          <div className=" result-container text-center">
            <h2 className="mb-3">Coming Soon: Your Results Await! 📈</h2>
            <img src={result} />
            <h5 className="mt-5">Results pending—anticipation builds! </h5>
            <h5 className="mt-3">Stay tuned for updates on your outcome.</h5>
            <Button
              variant="dark me-sm-4 m-2 mt-sm-5"
              onClick={() => navigate(path.StudentDashboard.path)}
            >
              Back To Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
