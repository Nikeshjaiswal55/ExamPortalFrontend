import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import learning from '../assets/Learning-cuate.svg';

import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import { InputField } from '../../../theme/InputField/InputField';
import { CustomButton } from '../../../theme/Button/Buttons';
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  "add-course-name": Yup.string().min(2).max(25).required('CourseName is required'),
  "add-course-email":Yup.string()
  .matches(
    /^(?=.*[a-zA-Z]).*^(?!.*@(email|yahoo)\.com).*[A-Za-z0-9]+@[A-Za-z0.9.-]+\.[A-Za-z]{2,4}$/,
    'Invalid email format'
  )
  .required('Required!')
  .test('email-provider', 'Email provider not allowed', (value) => {
    if (/(email|yahoo)\.com$/.test(value)) {
      return false;
    }
    return true;
  }),
});
const style = { backgroundColor: '#f6f6f6' };

const InputFieldData = [
  {
    inputId: 'add-course-name',
    inputName: 'add-course-name',
    formGroupId: 'add-course-group-name',
    placeholder: 'enter course name',
    labelText: 'Course Name',
  },
  {
    inputId: 'add-course-email',
    inputName: 'add-course-email',
    formGroupId: 'add-course-group-email',
    placeholder: `enter HOD's email`,
    labelText: 'HOD Email',
    
  
  },
];

export default function AddCourse() {
  const navigate = useNavigate();
  

  return (
    <>
      <div className="row h-100 m-0 p-0">
        <div className=" col-md-6 h-100 m-0 p-0 ">
          <div className="p-3 pe-lg-5 mt-lg-2">
            <p className="text-capitalize fw-bold fs-4 ">Add course</p>
            <p>
              Adding a course is easy! Just provide the course name and the Head
              of Department's (HOD) email, and you're good to go.
            </p>
          </div>
          <Formik
            initialValues={{ 'add-course-name': '', 'add-course-email': '' }}
            onSubmit={(values) => {}}
          >
            <Form className=" d-flex flex-column justify-content-evenly ">
              {InputFieldData.map((inputData) => (
                <InputField
                  inputId={inputData.inputId}
                  inputName={inputData.inputName}
                  formGroupClassName="my-1 my-md-4 mx-5 my-0 mx-1 "
                  formGroupId={inputData.formGroupId}
                  placeholder={inputData.placeholder}
                  labelText={inputData.labelText}
                />
              ))}

              <CustomButton
                onButtonClick={() => navigate('/admin/create-assessment')}
                buttonText={'Submit'}
                className={
                  'm-auto d-block px-5 m-3 mx-5 mt-3  text-capitalize  rounded-4'
                }
              />
            </Form>
          </Formik>
        </div>

        <div className="col-md-6 m-0 p-0 h-100 d-none d-md-flex  align-items-center  justify-content-center">
          <img src={learning} alt="" className="img-fluid w-75" />
        </div>
      </div>
    </>
  );
}
