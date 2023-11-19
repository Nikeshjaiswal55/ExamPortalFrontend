import React from 'react';

import { Button, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../../components/SideNavBar/SideNavBar';
import Header from '../../../components/Header/Header';
import { InputField } from '../../../theme/InputField/InputField';

const InputFieldData = [
  {
    inputId: 'assesement-name',
    inputName: 'assessement-name',
    formGroupId: 'assesement-group-name',
    placeholder: 'enter assessement name',
    labelText: 'assessement name',
  },
  {
    inputId: 'assesement-pattern',
    inputName: 'assessement-pattern',
    formGroupId: 'assesement-group-pattern',
    placeholder: 'enter assessement  pattern',
    labelText: 'assessement  pattern',
  },
];

export default function AddAssignment() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/admin/dashboard');
  };
  return (
    <>
      {/* <div className="container-body row w-100  m-0 p-0 justify-content-end ps-lg-5"> */}
        <div
          className="col-12 row m-0   d-flex p-2 ps-lg-5 "
        // style={{ backgroundColor: 'var(--white-100)' }}
        >
          <div className=" col-md-6 bg-white">
            <div className="p-3 pe-lg-5">
              <p className="text-capitalize fw-bold fs-4 ">create assessment</p>
              <p>
                Creating assessments is a breeze! Simply provide the assessment
                name, and you can further customize it by configuring the paper
                pattern via video call or online test. Plus, you have the option
                to set blocking conditions, ensuring your assessment suits your
                specific needs.
              </p>
            </div>
            <Form>
              {InputFieldData.map((inputData) => (
                <InputField
                  inputId={inputData.inputId}
                  inputName={inputData.inputName}
                  formGroupId={inputData.formGroupId}
                  placeholder={inputData.placeholder}
                  labelText={inputData.labelText}
                />
              ))}
              <Row className="my-5 mx-3 p-3 d-flex justify-content-center p-md-5 ">
                <Button
                  variant="dark"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="m-auto d-block px-5  w-50 mx-5   text-capitalize  rounded-4"
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}
