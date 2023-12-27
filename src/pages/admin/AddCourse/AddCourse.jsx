import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import learning from '../assets/Learning-cuate.svg';
import { path } from '../../../routes/RoutesConstant';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import { InputField } from '../../../theme/InputField/InputField';
import { CustomButton } from '../../../theme/Button/Buttons';
import * as Yup from 'yup';
import {
  useAddCourseMutation,
  useCreateCourseInBackgroundMutation,
  useSentMailToStudentMutation,
} from '../../../apis/Service';
import { SubIdSplit } from '../../../utils/SubIdSplit';
import { ExcelDataReader } from '../../../utils/ExcelDataReader';
import { MdUpload } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import ExcelShower from '../../../theme/ExcelShower/ExcelShower';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const SignupSchema = Yup.object().shape({
  'add-course-name': Yup.string()
    .min(2)
    .max(25)
    .required('Course name is required'),
  excelFile: Yup.mixed().required('File is required'),
  'add-course-duration': Yup.number()
    .min(1, 'Course duration must be greater than or equal to 1')
    .required('Course duration is required'),
});

const InputFieldData = [
  {
    inputId: 'add-course-name',
    inputName: 'add-course-name',
    formGroupId: 'add-course-group-name',
    placeholder: 'enter course name',
    labelText: 'Course Name',
  },
];

export default function AddCourse() {
  const navigate = useNavigate();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showError, setShowError] = useState(false);
  const [excel, setExcel] = useState([]);

  const handleErrorClose = () => setShowError(false);
  const handleErrorShow = () => setShowError(true);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (inputFile.current) {
      console.log(inputFile);
      inputFile.current.value = '';
      inputFile.current.type = 'text';
      inputFile.current.type = 'file';
    }
  };

  const [postAddCourse, { isLoading, data, error, isError, isSuccess }] =
    useAddCourseMutation();
  // const [
  //   sendMailInBackground,
  //   {
  //     isLoading: isMailLoading,
  //     data: mailData,
  //     error: mailError,
  //     isError: isMailError,
  //     isSuccess: isMailSuccess,
  //   },
  // ] = useSentMailToStudentMutation();

  const orgData = JSON.parse(localStorage.getItem('orgData'));
  const [
    createCourseInBackground,
    {
      isLoading: isMailLoading,
      data: mailData,
      error: mailError,
      isError: isMailError,
      isSuccess: isMailSuccess,
    },
  ] = useCreateCourseInBackgroundMutation();

  async function onSubmits(values) {
    const accessToken = localStorage.getItem('accessToken');
    let users = JSON.parse(localStorage.getItem('users'));
    if (excel.length) {
      if (users) {
        let addCourseName = {
          course_name: `${values['add-course-name']}`,
          userId: SubIdSplit(users.sub),
          token: accessToken,
          duration: values['add-course-duration'],
        };

        if (accessToken) {
          postAddCourse({
            ...addCourseName,
            accessToken,
          }).then((res) => {
            console.log(res);
            if (res?.data) {
              const data = excel.map((data) => {
                return {
                  courseId: res.data.course_id,
                  orgnizationId: orgData.orgnizationId,
                  branch: data.branch,
                  email: data.email,
                  name: data.name,
                  year: data.year,
                };
              });
              navigate(path.CreateAssessment.path);
              createCourseInBackground(data);
            }
          });
        } else {
          alert('user not login or signup');
        }
      }
    } else {
      alert('please provide a excel file or data in valid form ');
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('course created successfully!!🎉', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error('something went wrong!!😑', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }, [isError]);

  return (
    <>
      <div className="row bg-white rounded-2 h-100 m-0 p-0">
        <div className=" col-md-6 h-100 m-0 p-0 ">
          <div className="p-3 pe-lg-5 mt-lg-2  ms-md-4   ">
            <p className="text-capitalize fw-bold fs-4 ">Add course</p>
            <p className='mb-0'>
              Adding a course is easy! Just provide the course name & course
              duration, and the list of email in excel,
            </p>
            <p  className='mt-0'>
              and you're good to go.
            </p>
          </div>
          <Formik
            initialValues={{
              'add-course-name': '',
              'add-course-duration': '',
              excelFile: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={onSubmits}
          >
            {(props) => (
              <Form className=" d-flex flex-column justify-content-evenly ">
                <div className="row">
                  <div className=" col-12">
                    {InputFieldData.map((inputData) => (
                      <InputField
                        inputId={inputData.inputId}
                        inputName={inputData.inputName}
                        formGroupId={inputData.formGroupId}
                        formGroupClassName={' my-1 my-md-2 mx-3 mx-sm-5'}
                        placeholder={inputData.placeholder}
                        labelText={inputData.labelText}
                        onInputBlur={props.handleBlur}
                        onInputChange={props.handleChange}
                      />
                    ))}
                  </div>
                  <div className="col-12">
                    <Form.Group className=" my-1 my-md-2 mx-3 mx-sm-5">
                      <Form.Label className={`text-capitalize fw-bold `}>
                        Enter course duration
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="add-course-duration"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        className="input-border p-2 border focus-ring text-capitalize focus-ring-light"
                        placeholder="enter course year (example : 4,3,2,1)"
                      />
                      <ErrorMessage
                        component={'div'}
                        name="add-course-duration"
                        className=" input-error"
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className=" my-3 py-1 d-flex justify-content-center align-items-center border border-dark-subtle  my-1 my-md-2 mx-3 mx-sm-5  w-auto  ps-3 pe-2 text-center rounded-5 ">
                <MdUpload size={30} className=" p-1" />
                  <>
                    <label for="files" className=" cursor-pointer">
                      Upload student email excel list
                    </label>
                    <input
                      id="files"
                      style={{
                        visibility: 'hidden',
                        width: '1px',
                        height: '1px',
                      }}
                      name="excelFile"
                      ref={inputFile}
                      accept=".xlsx, .xls, .xlsm, .xlsb, .csv,.xlam ,.xltx , .xltm"
                      onChange={async (e) => {
                        handleFileChange(e);
                        props.handleChange(e);
                        let arr = await ExcelDataReader(e.target.files[0]);
                        if (arr instanceof String) {
                          console.log(arr);
                          setExcel(arr);
                          handleErrorShow();
                        } else {
                          setExcel([...arr]);
                          console.log('excel data =========', arr);
                        }
                      }}
                      onBlur={props.handleBlur}
                      type="file"
                    />
                  </>
                </div>
                {selectedFile ? (
                  <div className="my-0 py-1 d-flex justify-content-center  ">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>{selectedFile.name}</span>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className=" fw-bold cursor-pointer ms-2 px-1 border-0 text-danger rounded-circle"
                        title="remove file"
                      >
                        &#x2715;
                      </button>
                      <button
                        type="button"
                        title="Show Preview "
                        className=" cursor-pointer border border-0 ms-2 px-1"
                        onClick={() => {
                          if (excel.length && selectedFile) {
                            setShowPreview(true);
                          } else {
                            alert(excel);
                          }
                        }}
                      >
                        {' '}
                        <FaEye />{' '}
                      </button>
                    </div>
                  </div>
                ) : null}

                <ErrorMessage
                  component={'div'}
                  className=" input-error  my-1  mx-5 "
                  name="excelFile"
                />
                {/* {!props.touched['excelFile'] && excel ? null : <p className=' input-error text-center'> Please provide  a excel</p>} */}
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
                    'm-auto d-block px-5  my-1 my-md-2 mx-3 mx-sm-5 mt-4  text-capitalize  rounded-4'
                  }
                />
              </Form>
            )}
          </Formik>
        </div>

        <div className="col-md-6 m-0 p-0 h-100 d-none d-md-flex  align-items-center  justify-content-center">
          <img src={learning} alt="" className="img-fluid w-75" />
        </div>
      </div>
      {excel instanceof String ? (
        <>
          <Modal show={showError} onHide={handleErrorClose}>
            <Modal.Header>
              <Modal.Title>Invalid File Error </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {JSON.stringify(excel).replaceAll('"', ' ')}
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="px-4"
                variant="dark"
                onClick={() => {
                  handleRemoveFile();
                  handleErrorClose();
                }}
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : null}
      {showPreview && excel.length > 0 && (
        <ExcelShower
          showFlag={true}
          setShowPreview={setShowPreview}
          excelData={excel}
        />
      )}
    </>
  );
}
