import React from 'react';
import robot from '../../assets/gif/something_went_wrong_robot.gif';
import { Button } from 'react-bootstrap';

const SomethingWentWrong = () => {
  return (
    <div className="d-flex justify-content-center flex-column align-items-center w-100 ">
      <img width={400} height={400} src={robot} alt="robot" />
      <h4 className="text-capitalize fw-bold">ohh No!!</h4>
      <h6>Something Went Wrong !!</h6>
      <Button
        variant="dark"
        onClick={() => window.location.reload()}
        className="text-capitalize rounded-4"
      >
        refresh
      </Button>
    </div>
  );
};

export default SomethingWentWrong;
