import React, { useState, useRef, useEffect } from 'react';

import {
  Button,
  FormCheck,
  Form,
  FormLabel,
  Spinner,
  Modal,
  Alert,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../../theme/InputField/InputField';
import { ImCross } from 'react-icons/im';
import { RiAddFill } from 'react-icons/ri';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import { IoClose } from 'react-icons/io5';
import { MdUpload } from 'react-icons/md';
import * as yup from 'yup';
import {
  usePostAssignmentMutation,
  useGetAllCoursesQuery,
  useInvitedStudentByMailMutation,
} from '../../../apis/Service';
import { path } from '../../../routes/RoutesConstant';
import { FaEye } from 'react-icons/fa';
import { ExcelDataReader } from '../../../utils/ExcelDataReader';
import ExcelShower from '../../../theme/ExcelShower/ExcelShower';
import emailGif from '../../../assets/gif/mailgif.gif';
import { toast } from 'react-toastify';
export default function AddAssignment() {
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = userId.sub.split('|')[1];
  const orgType = localStorage.getItem('orgtype');

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showError, setShowError] = useState(false);
  const [excel, setExcel] = useState([]);
  const [showAssignment, setShowAssignment] = useState(false);
  const [option, setOption] = useState('');
  const [email, setEmail] = useState();
  const [duration, setDuration] = useState('');

  const handleErrorClose = () => setShowError(false);
  const handleErrorShow = () => setShowError(true);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (inputFile.current) {
      inputFile.current.value = '';
      inputFile.current.type = 'text';
      inputFile.current.type = 'file';
    }
    setExcel([]);
  };

  const [
    AssigmnetData,
    { isLoading, data, isSuccess: AssignmentSuccess, isError },
  ] = usePostAssignmentMutation();
  const [inviteStudent, { isLoading: invitedLoading, isError: inviteError }] =
    useInvitedStudentByMailMutation();
  const { data: AllCourse } = useGetAllCoursesQuery({ userId });

  useEffect(() => {
    if (AssignmentSuccess) {
      toast.success('assessment created successfully!!🎉', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      // navigate(path.ShowAssessment.path);
    }
  }, [AssignmentSuccess]);

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
  }, [isError, inviteError]);

  const addAssignmentSchema = yup.object().shape({
    assessementName: yup.string().required('Please enter assessement name'),
    assessementPattern: yup.string().required('Please enter assessement name'),
    examDuration: yup.string().required('Please enter assessement duration'),
    // examBranch: yup.string().required('Please enter branch name'),
    // examSession: yup.string().required('Please enter session name'),
    // email: yup.array().required('Please enter assessement emails'),
    email: yup
      .array()
      .of(
        yup
          .string()
          .matches(
            /^(?=.*[a-zA-Z]).*^(?!.*@(email|yahoo)\.com).*[A-Za-z0-9]+@[A-Za-z0.9.-]+\.[A-Za-z]{2,4}$/,
            'Invalid email formats'
          )
      )
      .required()
      .test('email-provider', 'Email provider not allowed', (value) => {
        if (/(email|yahoo)\.com$/.test(value)) {
          return false;
        }
        return true;
      }),
    questions: yup.array().required('Please enter assessement name'),
    // 'excelFile': yup.mixed().required('File is required'),
  });

  const handleDurationChange = (event, handleChange) => {
    const { name, value } = event.target;
    // Remove non-digit characters from input
    const formattedValue = value.replace(/\D/g, '');
    // Format the input with colons after every 2 digits
    let formattedDuration = '';
    for (let i = 0; i < formattedValue.length; i += 2) {
      if (i !== 0) {
        formattedDuration += ':';
      }
      formattedDuration += formattedValue.substr(i, 2);
    }
    if (formattedDuration.length <= 8) {
      setDuration(formattedDuration);
      handleChange({
        target: {
          name: name,
          value: formattedDuration,
        },
      });
    }
  };

  const InputFieldData = [
    {
      inputId: 'assesement-name',
      inputName: 'assessementName',
      formGroupId: 'assesement-group-name',
      placeholder: 'enter assessement name',
      labelText: 'assessement name',
      colClassName: 'col-12',
    },
    {
      inputId: 'assesement-pattern',
      inputName: 'assessementPattern',
      formGroupId: 'assesement-group-pattern',
      placeholder: 'enter assessement  pattern',
      labelText: 'assessement  pattern',
      colClassName: 'col-md-6 my-3',
      inputValue: 'Online',
    },
    {
      inputId: 'exam-duration',
      inputName: 'examDuration',
      formGroupId: 'exam-group-duration',
      placeholder: 'select assessement duration',
      labelText: 'assessement duration',
      colClassName: 'col-md-6 my-3',
      onInputChange: (e) => handleDurationChange(e, handleChange),
      inputValue: duration,
    },
    {
      inputId: 'exam-session',
      inputName: 'examSession',
      formGroupId: 'exam-group-session',
      placeholder: 'select of assessement session',
      labelText: 'enter assessement session',
      colClassName: 'col-md-6  my-3',
      Orgtype: orgType,
    },
    {
      inputId: 'total-marks',
      inputName: 'totalMarks',
      formGroupId: 'total-group-marks',
      placeholder: 'enter total marks',
      labelText: 'enter total marks',
      colClassName: 'col-md-6  my-3',
    },
    {
      inputId: 'minimum-marks',
      inputName: 'minimumMarks',
      formGroupId: 'minimum-group-marks',
      placeholder: 'enter minimum marks',
      labelText: 'enter minimum marks',
      colClassName: 'col-md-6  my-3',
    },
  ];

  const handleSubmits = (e, handleSubmit) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <div className="row w-100 rounded-5 m-0 p-0 justify-content-end">
        {invitedLoading && (
          <Alert key={'primary'} className="py-2" variant={'primary'}>
            <img src={emailGif} height={'40px'} className="mx-3" />
            sending mails to students...
          </Alert>
        )}
        <Formik
          initialValues={{
            assessementName: '',
            assessementPattern: 'Online',
            examDuration: '',
            examRound: 1,
            examBranch: '',
            examSession: '',
            totalMarks: '',
            minimumMarks: '',
            email: [],
            questions: [
              { questions: '', options: [], correctAns: '', userAns: '' },
            ],
            excelFile: '',
          }}
          onSubmit={async (values) => {
            values.examDuration = duration + '';
            if (excel.length || values.email.length || values.branch !== '') {
              const examDetails = {
                examDuration: values.examDuration,
                examMode: 'Online',
                examRounds: 2,
                paperChecked: false,
                branch: values.examBranch,
                session: values.examSession,
                assessmentName: values.assessementName,
                totalMarks: values.totalMarks,
                minimum_marks: values.minimumMarks,
                is_Active: false,
                is_Setup: true,
                is_attempted: false,
              };
              let emails = excel.reduce(
                (arr, currentvalue) => {
                  arr.push(currentvalue.email);
                  return arr;
                },
                [...values.email]
              );

              await AssigmnetData({
                examDetails,
                questions: values.questions,
                userId,
                orgnizationId: getOrgdata?.orgnizationId,
              }).then((res) => {
                if (res?.data?.paperId) {
                  inviteStudent({
                    userId: res?.data?.userId,
                    paperId: res?.data?.paperId,
                    orgnizationId: res?.data?.orgnizationId,
                    emails: emails,
                  });
                }
              });
            }
          }}
          validationSchema={addAssignmentSchema}
        >
          {({ values, handleSubmit, handleBlur, handleChange }) => (
            <Form
              onSubmit={(e) => {
                handleSubmits(e, handleSubmit);
              }}
            >
              <div className="row m-0  d-flex ">
                <div
                  className="col-md-6  position-relative"
                  style={{ height: '90vh' }}
                >
                  <div className="pt-3 pe-lg-5 mt-lg-2">
                    <p className="text-capitalize fw-bold fs-4  position-sticky top-0  ">
                      create assessment
                    </p>
                    <p>
                      Creating assessments is a breeze! Simply provide the
                      assessment name, and you can further customize it by
                      configuring the paper pattern via video call or online
                      test. Plus, you have the option to set blocking
                      conditions, ensuring your assessment suits your specific
                      needs.
                    </p>
                  </div>
                  <div
                    className="overflow-auto"
                    style={{ height: 'calc(100vh - 16rem)' }}
                  >
                    <div className="row">
                      {InputFieldData.map((inputData) =>
                        inputData.Orgtype == 'company' ? (
                          ''
                        ) : (
                          <InputField
                            inputId={inputData.inputId}
                            inputName={inputData.inputName}
                            formGroupId={inputData.formGroupId}
                            placeholder={inputData.placeholder}
                            labelText={inputData.labelText}
                            onInputBlur={handleBlur}
                            onInputChange={
                              inputData.onInputChange
                                ? (e) => handleDurationChange(e, handleChange)
                                : handleChange
                            }
                            formGroupClassName={inputData.colClassName}
                            inputValue={inputData.inputValue}
                          />
                        )
                      )}
                    </div>
                    {orgType == 'company' ? (
                      ''
                    ) : (
                      <>
                        <label className="text-capitalize fw-bold">
                          Select Candidate Course{' '}
                          <span className="fw-normal">
                            (note: only selected course student will get exam
                            link)
                          </span>
                        </label>
                        <Form.Select
                          className="my-3 rounded-3 border px-2"
                          aria-label="Default select example"
                          name="examBranch"
                          value={values.examBranch} // Make sure to set the value prop
                          onChange={handleChange}
                          disabled={
                            values.email.length > 0 || excel.length > 0
                              ? true
                              : false
                          }
                        >
                          <option value="">Select Course</option>
                          {AllCourse?.map((branch) => (
                            <option key={branch} value={branch.course_name}>
                              {branch.course_name}
                            </option>
                          ))}
                        </Form.Select>
                        <p className="text-capitalize fw-bold m-0 p-0 text-center">
                          OR
                        </p>
                      </>
                    )}
                    <label className="text-capitalize fw-bold">
                      Enter Candidate Emails
                    </label>
                    <div className="my-3 rounded-3 border py-3 px-2">
                      <FieldArray name="email">
                        {({ push, remove }) => (
                          <div className="d-flex gap-2 align-items-center flex-wrap">
                            {values.email.map((email, index) => (
                              <div
                                key={index}
                                className="d-flex  ps-3 pe-2 align-items-center rounded-5 "
                                style={{ backgroundColor: 'var(--grey)' }}
                              >
                                <div className="py-2 border-end pe-3 text-light">
                                  {email}
                                </div>
                                <IoClose
                                  color="white"
                                  size={30}
                                  className="cursor-pointer p-1"
                                  onClick={() => remove(index)}
                                />
                              </div>
                            ))}
                            <input
                              type="email"
                              value={email}
                              // name={`email[${index}]`}
                              placeholder="Enter email"
                              disabled={
                                values.examBranch || excel.length > 0
                                  ? true
                                  : false
                              }
                              className=" py-2 px-3 rounded-5 form-control border focus-ring border-0 focus-ring-light"
                              onChange={(e) => setEmail(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && email.trim() !== '') {
                                  e.preventDefault();
                                  values.email.push(email);
                                  setEmail('');
                                }
                              }}
                            />
                          </div>
                        )}
                      </FieldArray>
                      <ErrorMessage
                        name="email"
                        component={'div'}
                        className=" input-error"
                      />
                    </div>

                    <p className="text-capitalize fw-bold m-0 p-0 text-center">
                      OR
                    </p>
                    {/* ------------------------------------------------------------------- */}
                    <div className=" my-3 py-1 d-flex justify-content-center align-items-center border border-dark-subtle   my-1 my-md-2 mx-5  w-auto  ps-3 pe-2 text-center rounded-5 ">
                      <>
                        {' '}
                        <label for="files" className=" cursor-pointer">
                          {' '}
                          Upload student email excel list
                        </label>
                        <input
                          id="files"
                          style={{
                            visibility: 'hidden',
                            width: '1px',
                            height: '1px',
                          }}
                          disabled={
                            values.examBranch || values.email.length > 0
                              ? true
                              : false
                          }
                          name="excelFile"
                          ref={inputFile}
                          accept=".xlsx, .xls, .xlsm, .xlsb, .csv,.xlam ,.xltx , .xltm"
                          onChange={async (e) => {
                            handleFileChange(e);
                            handleChange(e);
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
                          onBlur={handleBlur}
                          type="file"
                        />
                      </>
                      <MdUpload size={30} className=" p-1" />
                    </div>
                    <div className="my-0 py-1 d-flex justify-content-center  ">
                      {selectedFile ? (
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
                      ) : null}
                    </div>

                    <ErrorMessage
                      component={'div'}
                      className=" input-error  my-1  mx-5 "
                      name="excelFile"
                    />
                  </div>
                </div>
                <div className="col-md-6 pe-1 bg-white position-relative">
                  <div className="ps-3  mt-lg-2  ">
                    <p className="text-capitalize fw-bold fs-4 position-sticky top-0 bg-white pt-3">
                      Assessment Question
                    </p>
                    {showAssignment && (
                      <FieldArray name="questions">
                        {({ push, remove }) => (
                          <div
                            className="overflow-auto pe-4"
                            style={{ height: 'calc(100vh - 16rem)' }}
                          >
                            {values.questions.map((question, index) => (
                              <div key={index}>
                                <Form.Group>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <Form.Label className="py-1 fw-bold">
                                      Question {index + 1} :-
                                    </Form.Label>
                                    {values.questions.length === 1 ? (
                                      ' '
                                    ) : (
                                      <ImCross
                                        onClick={() => remove(index)}
                                        className="cursor-pointer"
                                      />
                                    )}
                                  </div>
                                  <Field
                                    type="text"
                                    name={`questions[${index}].questions`}
                                    placeholder="Enter question"
                                    className="form-control"
                                  />
                                  <ErrorMessage
                                    name={`questions[${index}].questions`}
                                    component="div"
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <FormLabel className="py-2 m-0 fw-bold">
                                    Options :-
                                  </FormLabel>
                                  {question.options.map(
                                    (option, optionIndex) => (
                                      <div key={optionIndex}>
                                        <FormCheck
                                          type="radio"
                                          id={`option-${index}-${optionIndex}`}
                                          name={`questions[${index}].correctAns`}
                                          value={option}
                                          label={option}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    )
                                  )}
                                  <p className="mt-2 mb-0 fw-bold">
                                    NOTE : Please tick on correct option
                                  </p>
                                  {/* Single input field for options */}
                                  <div className="d-flex align-items-center gap-2 pt-3 mb-5">
                                    <div className="w-50">
                                      <input
                                        type="text"
                                        id={`option-${index}`}
                                        name={`questions[${index}].options`}
                                        placeholder="Enter options"
                                        className="form-control w-100 hello"
                                        onChange={(e) => {
                                          setOption(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === 'Enter' &&
                                            option.trim() !== ''
                                          ) {
                                            question.options.push(option);
                                            e.preventDefault();
                                            setOption('');
                                          }
                                        }}
                                      />
                                      <ErrorMessage
                                        name={`questions[${index}].options`}
                                        component="div"
                                      />
                                    </div>
                                    {/* Add Option Button */}
                                    <RiAddFill
                                      size={30}
                                      className="cursor-pointer"
                                      onClick={() => {
                                        option === ''
                                          ? alert('Please enter option')
                                          : question.options.push(option);
                                        setOption('');
                                        document.querySelector('.hello').value =
                                          '';
                                      }}
                                    />
                                  </div>
                                </Form.Group>

                                <hr />
                              </div>
                            ))}
                            <div className="position-relative">
                              <div
                                className="position-absolute bottom-50"
                                style={{ right: '40%' }}
                              >
                                <Button
                                  variant="dark"
                                  onClick={() => {
                                    push({ questions: '', options: [] });
                                  }}
                                  className="text-capitalize rounded-4"
                                >
                                  Add More Question
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </FieldArray>
                    )}
                  </div>
                  {!showAssignment ? (
                    <div className="my-2 d-flex justify-content-around mx-4 gap-2">
                      <Button
                        variant="dark"
                        onClick={(e) => setShowAssignment(true)}
                        className="m-auto d-block px-5  w-50 w-100 text-capitalize  rounded-4"
                      >
                        Create Assigmnet Questions
                      </Button>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className=" bottom-0 end-0 p-2">
                    <div className="my-2 d-flex justify-content-around mx-4 gap-2 ">
                      {!showAssignment ? (
                        ''
                      ) : (
                        <>
                          <Button
                            variant="secondary"
                            className="w-100 text-capitalize rounded-4"
                          >
                            Preview
                          </Button>

                          <Button
                            type="submit"
                            variant="primary"
                            className=" w-100 text-capitalize rounded-4"
                          >
                            {isLoading ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              'Submit'
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
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
                variant="primary"
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
