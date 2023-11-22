import React from 'react';
import SideNavBar from '../../../components/SideNavBar/SideNavBar';
import Header from '../../../components/Header/Header';
import { Button, Form, Row } from 'react-bootstrap';
import learning from '../assets/Learning-cuate.svg';

import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import { InputField } from '../../../theme/InputField/InputField';
import { CustomButton } from '../../../theme/Button/Buttons';
import * as Yup from 'yup'
import { useAddCourseMutation } from '../../../apis/Service';

const SignupSchema = Yup.object().shape({
  "add-course-name": Yup.string().min(2).max(25).required('CourseName is required'),
  "add-course-email": Yup.string()
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
  const [postAddCourse, { isLoading, data, error }] = useAddCourseMutation((localStorage.getItem('accessToken')));
  
 async function onSubmit(values){
  console.log(values);
  let users = JSON.parse(localStorage.getItem("users"));
  console.log("users ", users);
  if (users) {
    console.log(users.sub);
    
    let addCourseName = {
      "course_name": `${values["add-course-name"]}`,
      // "userId": `${values["add-course-email"]}`
      "userId": `${users.sub}`
    }
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const promise = await postAddCourse({ ...addCourseName, accessToken });
      if (promise.data) {
        navigate('/create-assessment')
      } else {
        alert('sorry your connection lost or api failed ');
      }
    } else {
      alert("user not login or signup")
    }
  }
  else {
    alert("user not present")
  }
}



  return (
    <>
      <SideNavBar />
      <Header />

      <div className="container-body row w-100 rounded-5 m-0 p-0 justify-content-end ms-lg-5 w-auto  bg-white ">
        <div
          className="col-12 row m-0 d-flex  pt-2 p-2   ms-lg-5 ps-lg-4  w-100"
          style={style}
        >
          <div className=" col-md-6 bg-white">
            <div className="p-3 pe-lg-5 ms-lg-5 mt-lg-2">
              <p className="text-capitalize fw-bold fs-4 ">Add course</p>
              <p>
                Adding a course is easy! Just provide the course name and the
                Head of Department's (HOD) email, and you're good to go.
              </p>
            </div>
            <Formik

              initialValues={{ 'add-course-name': '', 'add-course-email': '' }}
              validationSchema={SignupSchema}
              onSubmit={onSubmit}

            >
              {props => (
                <Form className="mx-lg-5">
                  {InputFieldData.map((inputData) => (
                    <>
                      <InputField
                        inputId={inputData.inputId}
                        inputName={inputData.inputName}
                        formGroupId={inputData.formGroupId}
                        placeholder={inputData.placeholder}
                        labelText={inputData.labelText}
                        onInputBlur={props.handleBlur}
                        onInputChange={props.handleChange}

                      />

                    </>
                  ))}

                  <CustomButton
                    onButtonClick={props.handleSubmit}
                    buttonText={'Submit'}

                    rowClassName={
                      'mt-3 m-0 mx-2 p-3 p-md-5 pb-md-0  m-md-5 mb-md-0'
                    }
                    className={'m-md-3'}
                  />
                </Form>
              )}
            </Formik>
          </div>


          <div className="col-md-6  d-flex align-items-center  justify-content-center p-3 bg-white ">
            <img src={learning} alt="" className="img-fluid w-75" />
          </div>
        </div>
        {
          error &&
          alert("connection lost " + JSON.stringify(error))
        }
      </div>

    </>
  );
     
}