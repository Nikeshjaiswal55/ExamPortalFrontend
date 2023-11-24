import React from 'react';
import { Form, Spinner } from 'react-bootstrap';
import learning from '../assets/Learning-cuate.svg';
import { path } from '../../../routes/RoutesConstant';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { InputField } from '../../../theme/InputField/InputField';
import { CustomButton } from '../../../theme/Button/Buttons';
import * as Yup from 'yup';
import { useAddCourseMutation } from '../../../apis/Service';
import { SubIdSplit } from '../../../utils/SubIdSplit';

const SignupSchema = Yup.object().shape({
  'add-course-name': Yup.string()
    .min(2)
    .max(25)
    .required('CourseName is required'),
  'add-course-email': Yup.string()
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
  const [postAddCourse, { isLoading, data, error }] = useAddCourseMutation(
    localStorage.getItem('accessToken')
  );

  async function onSubmits(values) {
    console.log(values);
    let users = JSON.parse(localStorage.getItem('users'));
    console.log('users ', users);
    if (users) {
      console.log(users.sub);

      let addCourseName = {
        course_name: `${values['add-course-name']}`,
        userId: SubIdSplit(users.sub),
        mails: ['nik@gmail.com'],
      };
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const promise = await postAddCourse({ ...addCourseName, accessToken });
        if (promise.data) {
          navigate(path.CreateAssessment.path);
        } else {
          alert('sorry your connection lost or api failed ');
        }
      } else {
        alert('user not login or signup');
      }
    } else {
      alert('user not present');
    }
  }

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
            validationSchema={SignupSchema}
            onSubmit={onSubmits}
          >
            {(props) => (
              <Form className=" d-flex flex-column justify-content-evenly ">
                {InputFieldData.map((inputData) => (
                  <InputField
                    inputId={inputData.inputId}
                    inputName={inputData.inputName}
                    formGroupId={inputData.formGroupId}
                    formGroupClassName={'my-1 my-md-4 mx-5 '}
                    placeholder={inputData.placeholder}
                    labelText={inputData.labelText}
                    onInputBlur={props.handleBlur}
                    onInputChange={props.handleChange}
                  />
                ))}

                <CustomButton
                  buttonText={
                    isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      'Submit'
                    )
                  }
                  onButtonClick={props.handleSubmit}
                  className={
                    'm-auto d-block px-5 m-3 mx-5 mt-3  text-capitalize  rounded-4'
                  }
                />
              </Form>
            )}
          </Formik>
        </div>

        <div className="col-md-6 m-0 p-0 h-100 d-none d-md-flex  align-items-center  justify-content-center">
          <img src={learning} alt="" className="img-fluid w-75" />
        </div>
        {error && alert('connection lost ' + JSON.stringify(error))}
      </div>
    </>
  );
}
