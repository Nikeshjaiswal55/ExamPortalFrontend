import React from 'react';

import { Button, Form, Row } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { InputField } from '../../../theme/InputField/InputField';
import {Formik} from 'formik';

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
    navigate('/admin-dashboard');
  };

  return (
    <>

        <div
        className="col-12 m-0  d-flex p-2 w-100 h-100 "
        >
        <div className=" col-md-6 bg-white ">
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
          <Formik
            initialValues={{
              "assessement-name": "",
              'assessement-pattern': ""
            }
            }
            onSubmit={(values) => {
              console.log(values);
            }}
          >

            <Form className='d-flex  flex-column justify-content-between' >
              {InputFieldData.map((inputData) => (
                <InputField
                  inputId={inputData.inputId}
                  inputName={inputData.inputName}
                  formGroupId={inputData.formGroupId}
                  placeholder={inputData.placeholder}
                  labelText={inputData.labelText}
                />
              ))}
              <Row className=" d-flex justify-content-center px-0 py-3  p-md-2 ">
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
          </Formik>
          </div>

      </div>
    </>
  );
}
