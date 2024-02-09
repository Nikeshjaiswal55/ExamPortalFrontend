import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  FormCheck,
  FormLabel,
  Modal,
  Nav,
  Spinner,
  Tab,
} from 'react-bootstrap';
import { ImCross } from 'react-icons/im';
import { RiAddFill } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import { MdUpload } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { ExcelDataReader } from '../../../utils/ExcelDataReader';
import ExcelShower from '../../../theme/ExcelShower/ExcelShower';
import * as yup from 'yup';
import {
  useGetAllCoursesQuery,
  useInvitedStudentByMailMutation,
  usePostAssignmentMutation,
} from '../../../apis/Service';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getNotification } from '../../../store/adminSlice';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../routes/RoutesConstant';
import { CkEditor } from './CkEditor';
import { AssessmentModal } from './AssessmentModal';
import { RiMailSettingsLine, RiUserSettingsLine } from 'react-icons/ri';
import { VscSettings } from 'react-icons/vsc';
import { Sample1 } from './Templates';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { QuestionExcelDataReader } from '../../../utils/QuestionExcelDataReader';
const durationTimer = [
  {
    value: '900',
    name: '15 min',
  },
  {
    value: '1800',
    name: '30 min',
  },
  {
    value: '2700',
    name: '45 min',
  },
  {
    value: '3600',
    name: '01 hr',
  },
  {
    value: '5400',
    name: '1.5 hr',
  },
  {
    value: '7200',
    name: '02 hr',
  },
  {
    value: '10800',
    name: '03 hr',
  },
];

const initialvalue = {
  assessmentName: '',
  shortDescription: '',
  assessmentPattern: 'online',
  assessmentDuration: '',
  assessmentTotalMarks: '',
  assessmentMinmumMarks: '',
  assessmentResultConfig: '',
  assessmentOrder: '',
  assessmentInstruction: '',
  questions: [{ questions: '', options: [], correctAns: '', userAns: '' }],
  examBranch: '',
  session: '',
  email: [],
  checkbox: '',
};

const AssesstmentSettingVAlidation = yup.object().shape({
  assessmentName: yup.string().required('Assessment name is required*'),
  shortDescription: yup
    .string()
    .required('Assessment short description is required*'),
  assessmentPattern: yup.string().required('Assessment pattern is required*'),
  assessmentDuration: yup.string().required('Assessment duration is required*'),
  assessmentTotalMarks: yup
    .number()
    .typeError('Assessment total marks must be a number')
    .required('Assessment total marks is required*')
    .positive('Assessment total marks must be a positive number'),
  assessmentMinmumMarks: yup
    .number()
    .typeError('Assessment minimum marks must be a number')
    .required('Assessment minimum marks is required*')
    .positive('Assessment minimum marks must be a positive number'),
  assessmentResultConfig: yup
    .string()
    .required('Select any one this is required**'),
  assessmentOrder: yup.string().required('Select any one this is required**'),
  //   assessmentInstruction: yup.string().required('Assessment name is required*'),
});

const QuestionManagementValidation = yup.object().shape({
  questions: yup.array().of(
    yup.object().shape({
      questions: yup.string().required('Question is required'),
      options: yup
        .array()
        .min(2, 'At least two options are required')
        .of(yup.string().required('Option is required')),
      correctAns: yup.string().required('Correct answer is required'),
    })
  ),
});

export const AddAssignment = () => {
  const [activeTab, setActiveTab] = useState('assessmentSetting');
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = userId.sub.split('|')[1];
  const orgType = localStorage.getItem('orgtype');
  const getOrgdata = JSON.parse(localStorage.getItem('orgData'));
  const [excel, setExcel] = useState([]);
  const [questionExcel, setQuestionExcel] = useState([]);
  const [show, setModalShow] = useState(false);
  const [errorContent, setErrorContent] = useState('');
  const [instruction, setInstruction] = useState(Sample1);
  const [option, setOption] = useState('');

  const validationschema =
    activeTab === 'assessmentSetting'
      ? AssesstmentSettingVAlidation
      : activeTab === 'questionManagement'
      ? QuestionManagementValidation
      : '';
  const handleTabSelect = (key) => {
    setActiveTab(key);
  };

  const [
    AssigmnetData,
    { isLoading, data, isSuccess: AssignmentSuccess, isError },
  ] = usePostAssignmentMutation();
  const [
    inviteStudent,
    {
      isLoading: invitedLoading,
      isError: inviteError,
      isSuccess: inviteSucessFull,
    },
  ] = useInvitedStudentByMailMutation();
  const dipatch = useDispatch();
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

  useEffect(() => {
    if (inviteSucessFull) {
      dipatch(getNotification(false));
    }
  }, [inviteSucessFull]);
  const submitPaper = (values, resetForm) => {
    console.log('inside submit');
    if (activeTab == 'manageCandidate') {
      console.log('inside submit manage candidate');
      if (values.assessmentName !== '') {
        if (
          values.questions[0].questions !== '' ||
          values.questions[0].options.length ||
          values.questions[0].correctAns !== ''||
          questionExcel?.length
        ) {
          if (excel.length || values.email.length || values.examBranch !== '') {
            const excelQuestions = questionExcel?.map((question) => 
              {
                return {
                  questions: question.question,
                  options: [
                    question.option1,
                    question.option2,
                    question.option3,
                    question.option4,
                  ],
                  correctAns: question.answer,
                }
              }
            )

            const sendQuestions=(excelQuestions.length>0) ?excelQuestions:values.questions;
            const sendPaper = {
              questions: sendQuestions,
              examDetails: {
                examDuration: values.assessmentDuration,
                examMode: values.assessmentPattern,
                examRounds: 1,
                paperChecked: false,
                branch: values.examBranch ? values.examBranch : null,
                session: values.session,
                assessmentName: values.assessmentName,
                totalMarks: Math.ceil(values.assessmentTotalMarks),
                minimum_marks: Math.ceil(values.assessmentMinmumMarks),
                is_Active: 'false',
                is_attempted: false,
                is_Setup: true,
              },
              paper: {
                userId: userId,
                orgnizationId: getOrgdata?.orgnizationId,
                description: values.shortDescription,
                instruction: instruction,
                is_Active: true,
                is_setup: true,
                is_auto_check:
                  values.assessmentResultConfig == 'autoCheck' ? true : false,
                is_shorted:
                  values.assessmentOrder == 'sortOrder' ? true : false,
              },
            };
            let emails = excel.reduce(
              (arr, currentvalue) => {
                arr.push(currentvalue.email);
                return arr;
              },
              [...values.email]
            );
            AssigmnetData(sendPaper).then((res) => {
              if (res?.data?.paperId) {
                dipatch(getNotification(true));
                // resetForm();
                navigate(path.ShowAssessment.path);
                inviteStudent({
                  userId: res?.data?.userId,
                  paperId: res?.data?.paperId,
                  orgnizationId: res?.data?.orgnizationId,
                  emails: emails,
                }).then((res) => {
                  // resetForm();

                  if (res.error.originalStatus === 200) {
                    dipatch(getNotification(false));
                  } else {
                    toast.error('student not added successfully!!😑', {
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
                });
              }
            });
            resetForm();
            console.log('===============reset values after change ', values);
            // resetForm();
          } else {
            setModalShow(true);
            setErrorContent('Manage Candidate Form');
          }
        } else {
          setModalShow(true);
          setErrorContent('Question Management Form');
        }
      } else {
        setModalShow(true);
        setErrorContent('Assessment Setting Form');
      }
    } else {
      if (activeTab == 'assessmentSetting') {
        navLinkRef.current.click();
        setActiveTab('questionManagement');
        console.log('inside submit assessmentSetting ', navLinkRef.current);
      }
      if (activeTab == 'questionManagement') {
        navLinkRef.current.click();
        setActiveTab('manageCandidate');
        console.log('inside submit manageCandidate ');
      }
    }
  };
  const navLinkRef = useRef(null);
  return (
    <>
      <div className="h-100 w-100 rounded-5">
        <Formik
          initialValues={initialvalue}
          validationSchema={validationschema}
          onSubmit={(values, { resetForm }) => submitPaper(values, resetForm)}
        >
          {({ values, handleBlur, handleChange }) => (
            <Form className="h-100">
              <Tab.Container
                id="left-tabs-SidePooup"
                defaultActiveKey="assessmentSetting"
                onSelect={handleTabSelect}
              >
                <div className="row h-100 gap-2  m-0 p-0 overflow-auto">
                  <div
                    style={{ height: 'calc(100vh - 77px)' }}
                    className="col-12 col-md-2 px-4 bg-white rounded-3 assesment-side-panel"
                  >
                    <h6 className="text-capitalize fw-bold  my-4">
                      Test Configuration
                    </h6>
                    <div className=" mb-3">
                      <Nav>
                        <div>
                          <Nav.Item>
                            <Nav.Link
                              ref={navLinkRef}
                              eventKey="assessmentSetting"
                              className={` text-capitalize my-3 mx-0 px-0 fw-bold cursor-pointer ${
                                activeTab === 'assessmentSetting'
                                  ? 'active text-primary'
                                  : 'text-dark'
                              }`}
                            >
                              <RiUserSettingsLine size={23} className="me-2" />{' '}
                              Assessment Setting
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              ref={navLinkRef}
                              eventKey="questionManagement"
                              className={`text-capitalize my-3 mx-0 px-0  fw-bold cursor-pointer ${
                                activeTab === 'questionManagement'
                                  ? 'active text-primary'
                                  : 'text-dark'
                              }`}
                            >
                              <VscSettings size={23} className="me-2" />{' '}
                              Question Management
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              ref={navLinkRef}
                              eventKey="manageCandidate"
                              className={`text-capitalize my-3 mx-0 px-0  fw-bold cursor-pointer ${
                                activeTab === 'manageCandidate'
                                  ? 'active text-primary'
                                  : 'text-dark'
                              }`}
                            >
                              <RiMailSettingsLine size={23} className="me-2" />
                              Manage Candidate
                            </Nav.Link>
                          </Nav.Item>
                        </div>
                      </Nav>
                    </div>
                    {/* <Button className='className=" p-lg-2 w-100 btn-dark btn '>
                      Publish
                    </Button> */}
                    {/* <Button
                      type="subbmit"
                      className='className=" p-lg-2 my-2 btn-primary btn w-100'
                    >
                      {isLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        'Submit'
                      )}
                    </Button> */}
                  </div>
                  <div
                    className="col-12 col-md-7 px-0 rounded-top-3"
                    style={{ flex: 1, height: 'calc(100vh - 77px)' }}
                  >
                    <Tab.Content>
                      <Tab.Pane
                        eventKey="assessmentSetting"
                        className=" bg-transparent m-0"
                      >
                        <AssesstmentSetting setInstruction={setInstruction} />
                      </Tab.Pane>
                      <Tab.Pane
                        eventKey="questionManagement"
                        className=" bg-transparent m-0"
                      >
                        <QuestionManagement
                          values={values}
                          setOption={setOption}
                          option={option}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          questionExcel={questionExcel}
                          setQuestionExcel={setQuestionExcel}
                        />
                      </Tab.Pane>
                      <Tab.Pane
                        eventKey="manageCandidate"
                        className=" bg-transparent m-0"
                      >
                        <ManageCandidate
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          values={values}
                          excel={excel}
                          setExcel={setExcel}
                        />
                      </Tab.Pane>
                    </Tab.Content>
                    <div
                      className={`${
                        activeTab === 'questionManagement' ? '' : 'bg-white'
                      } rounded-bottom-3 d-flex justify-content-end pe-3 `}
                    >
                      <Button
                        type="subbmit"
                        className='className="p-lg-2 my-2 btn-primary btn w-25'
                      >
                        {isLoading ? (
                          <Spinner animation="border" size="sm" />
                        ) : activeTab == 'manageCandidate' ? (
                          'Submit'
                        ) : (
                          ' Next'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </Tab.Container>
            </Form>
          )}
        </Formik>
        <AssessmentModal
          show={show}
          errorContent={errorContent}
          setModalShow={setModalShow}
        />
      </div>
    </>
  );
};

const AssesstmentSetting = ({ setInstruction }) => {
  return (
    <div
      className=" p-4 rounded-top-3 bg-white text-dark"
      style={{ height: 'calc(100vh - 135px)' }}
    >
      <div className="my-3">
        <FormLabel className="text-capitalize fw-bold">
          Assessment Name
        </FormLabel>
        <Field
          type="text"
          name="assessmentName"
          className="form-control input-border p-2 border focus-ring text-capitalize focus-ring-light"
          placeholder="Enter Assessment Name"
        />
        <p className="text-danger">
          <ErrorMessage name="assessmentName" className="text-danger" />
        </p>
      </div>
      <div className="my-3">
        <FormLabel className="text-capitalize fw-bold">
          Short Description
        </FormLabel>
        <Field
          type="text"
          name="shortDescription"
          className="form-control input-border p-2 border focus-ring text-capitalize focus-ring-light"
          placeholder="Enter Short Description"
        />
        <p className="text-danger">
          <ErrorMessage name="shortDescription" className="text-danger" />
        </p>
      </div>
      <div className="row  my-3">
        <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column justify-content-between ">
          <FormLabel className="text-capitalize fw-bold">
            Assessment Pattern
          </FormLabel>
          <Field
            type="text"
            name="assessmentPattern"
            className="form-control input-border p-2 border focus-ring text-capitalize focus-ring-light"
            placeholder="Enter Short Description"
          />
          <p className="text-danger">
            <ErrorMessage name="assessmentPattern" className="text-danger" />
          </p>
        </div>
        <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column justify-content-between ">
          <FormLabel className="text-capitalize fw-bold">
            Assessment Duration
          </FormLabel>
          <Field
            as="select"
            name="assessmentDuration"
            className="form-select input-border p-2 border focus-ring text-capitalize focus-ring-light"
          >
            <option value="">Select Assessment Duration</option>
            {durationTimer?.map((durationTimer, index) => (
              <option key={index} value={durationTimer.value}>
                {durationTimer.name}
              </option>
            ))}
          </Field>
          <p className="text-danger">
            <ErrorMessage name="assessmentDuration" className="text-danger" />
          </p>
        </div>
        <div className="col-12 col-sm-6  col-lg-3 d-flex flex-column justify-content-between ">
          <FormLabel className="text-capitalize fw-bold">Total Marks</FormLabel>
          <Field
            type="number"
            name="assessmentTotalMarks"
            className="form-control input-border p-2 border focus-ring text-capitalize focus-ring-light"
            placeholder="Enter Total Marks"
          />
          <p className="text-danger">
            <ErrorMessage name="assessmentTotalMarks" className="text-danger" />
          </p>
        </div>
        <div className="col-12 col-sm-6 col-lg-3 d-flex flex-column justify-content-between ">
          <FormLabel className="text-capitalize fw-bold">
            Minimum Passing Marks
          </FormLabel>
          <Field
            type="text"
            name="assessmentMinmumMarks"
            className="form-control input-border p-2 border focus-ring text-capitalize focus-ring-light"
            placeholder="Enter Minimum Passing Marks"
          />
          <p className="text-danger">
            <ErrorMessage
              name="assessmentMinmumMarks"
              className="text-danger"
            />
          </p>
        </div>
      </div>
      <div className="row  my-3">
        <div className="col-12 col-sm-6">
          <FormLabel className="text-capitalize fw-bold">
            Assessment Result Configuration
          </FormLabel>
          <div role="group" className="form-check">
            <div>
              <FormLabel>
                <Field
                  type="radio"
                  className="form-check-input"
                  name="assessmentResultConfig"
                  value="autoCheck"
                />
                Do You Want To Check Assessment Automatically
              </FormLabel>
            </div>
            <div>
              <FormLabel>
                <Field
                  type="radio"
                  className="form-check-input"
                  name="assessmentResultConfig"
                  value="manualCheck"
                />
                Do You Want To Approve Assessment
              </FormLabel>
            </div>
          </div>
          <p className="text-danger">
            <ErrorMessage
              name="assessmentResultConfig"
              className="text-danger"
            />
          </p>
        </div>
        <div className=" col-12 col-sm-6 ">
          <FormLabel className="text-capitalize fw-bold">
            Assessment Order
          </FormLabel>
          <div role="group" className="form-check">
            <div>
              <FormLabel>
                <Field
                  type="radio"
                  className="form-check-input"
                  name="assessmentOrder"
                  value="sameOrder"
                />
                Do You Want To Assessment Questions In The Same Order?
              </FormLabel>
            </div>
            <div>
              <FormLabel>
                <Field
                  type="radio"
                  className="form-check-input"
                  name="assessmentOrder"
                  value="sortOrder"
                />
                Do You Want To Sort The Assessment Questions?
              </FormLabel>
            </div>
          </div>
          <p className="text-danger">
            <ErrorMessage name="assessmentOrder" className="text-danger" />
          </p>
        </div>
      </div>
      <CkEditor setInstruction={setInstruction} />
    </div>
  );
};

const QuestionManagement = ({
  values,
  option,
  setOption,
  handleBlur,
  handleChange,
  questionExcel,
  setQuestionExcel,
}) => {
  const refArray = useRef([]);
  const messagesContainerRef = useRef(null);
  const handleErrorClose = () => setShowError(false);
  const handleErrorShow = () => setShowError(true);
  const inputFile = useRef(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [showErrkr, setShowPreview] = useState([]);
  const [showError, setShowError] = useState(false);
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (inputFile.current) {
      inputFile.current.value = '';
      inputFile.current.type = 'text';
      inputFile.current.type = 'file';
    }
    setQuestionExcel([]);
  };

  useEffect(() => {
    refArray.current = Array.from({ length: values.questions.length }, () =>
      React.createRef()
    );
  }, [values.questions]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      // Scroll to the bottom of the container
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [values.questions]);

  return (
    <div
      ref={messagesContainerRef}
      className="text-dark overflow-auto"
      style={{ height: 'calc(100vh - 9rem)' }}
    >
      <div onClick={()=>inputFile.current.click()} className=" my-3 py-1 d-flex justify-content-center cursor-pointer align-items-center border border-dark-subtle  my-1 my-md-2 mx-3 mx-sm-5  w-auto  ps-3 pe-2 text-center rounded-5 bg-primary">
        <MdUpload size={30} className=" p-1" />
        <>
          <label for="files" className="text-white cursor-pointer">
            Upload Question Excel
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
              handleChange(e);
              let arr = await QuestionExcelDataReader(e.target.files[0]);
              if (arr instanceof String) {
                console.log(arr);
                setShowPreview(arr)
                // setQuestionExcel([...arr]);
                handleErrorShow();
              } else {
                setQuestionExcel([...arr]);
                console.log('excel data =========', arr);
              }
            }}
            onBlur={handleBlur}
            type="file"
          />
        </>
      </div>
      <div className="my-0  d-flex justify-content-center  ">
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
            </div>
          ) : null}
        </div>
      {showErrkr instanceof String ? (
        <>
          <Modal show={showError} onHide={handleErrorClose}>
            <Modal.Header>
              <Modal.Title>Invalid File Error </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {JSON.stringify(showErrkr).replaceAll('"', ' ')}
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

      <p className='p-0 m-0 mb-2 text-center'>or</p>
      {questionExcel?.length > 0 ?
      <>
      {questionExcel?.map((question,index) => (
        <div key={index} className="p-4 mb-3 rounded-3 bg-white">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <FormLabel className="py-1 fw-bold">
                Question {index + 1} :-
              </FormLabel>
            </div>
            <Field
              type="text"
              value={question.question}
              className="form-control"
            />
          </div>
          <div>
            <FormLabel className="py-2 m-0 fw-bold">Options :-</FormLabel>
              <>
                <div>
                  <FormLabel className="d-flex ">
                    <input
                      type={'radio'}
                      value={question?.option1}
                      checked={question?.option1.toString().replaceAll(" ","").toLowerCase() === question?.answer.toString().replaceAll(" ","").toLowerCase()}                   />
                    <h6 className="mx-2 mb-1 mb-0">{question?.option1}</h6>
                  </FormLabel>
                  <FormLabel className="d-flex">
                    <input
                      type={'radio'}
                      value={question?.option2}
                      checked={question?.option2.toString().replaceAll(" ","").toLowerCase() === question?.answer.toString().replaceAll(" ","").toLowerCase()}                   />
                    <h6 className="mx-2 mb-1 mb-0">{question?.option2}</h6>
                  </FormLabel>
                  <FormLabel className="d-flex">
                    <input
                      type={'radio'}
                      value={question?.option3}
                      checked={question?.option3.toString().replaceAll(" ","").toLowerCase() === question?.answer.toString().replaceAll(" ","").toLowerCase()}                   />
                    <h6 className="mx-2 mb-1 mb-0">{question?.option3}</h6>
                  </FormLabel>
                  <FormLabel className="d-flex ">
                    <input
                      type={'radio'}
                      value={question?.option4}
                      checked={question?.option4.toString().replaceAll(" ","").toLowerCase() === question?.answer.toString().replaceAll(" ","").toLowerCase()}                   />
                    <h6 className="mx-2 mb-1 mb-0">{question?.option4}</h6>
                  </FormLabel>
                </div>
              </>
          </div>
        </div>)
        )}
        </>
       : (
        <FieldArray name="questions">
          {({ push, remove }) => (
            <>
              {values.questions.map((question, index) => (
                <div key={index} className="p-4 mb-3 rounded-3 bg-white">
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <FormLabel className="py-1 fw-bold">
                        Question {index + 1} :-
                      </FormLabel>
                      <div>
                        {/* <FormLabel className="mx-3">
                          <Field
                            type="checkbox"
                            className="form-check-input mx-2"
                            name="checkbox"
                            id={`checkbox-${index}`}
                          />
                          Multiple Correct Answer
                        </FormLabel> */}
                        {values.questions.length === 1 ? (
                          ' '
                        ) : (
                          <ImCross
                            onClick={() => remove(index)}
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                    <Field
                      type="text"
                      name={`questions[${index}].questions`}
                      placeholder="Enter question"
                      className="form-control"
                    />
                    <p className="text-danger">
                      <ErrorMessage
                        name={`questions[${index}].questions`}
                        className="text-danger"
                      />
                    </p>
                  </div>
                  <div>
                    {/* <div className="row align-items-center">
                      <div className="col-2">
                        <FormLabel className="py-2 m-0 fw-bold">
                          Options :-
                        </FormLabel>
                      </div>
                      <div className='col-3'>
                        <Field
                          as="select"
                          name="assessmentDuration"
                          className="form-select input-border p-2 border focus-ring text-capitalize focus-ring-light col-3"
                        >
                          <option value="">Multiple Correct Option</option>
                          {['multiple', 'single']?.map((name, index) => (
                            <option key={index} value={name}>
                              {name}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div> */}
                    <FormLabel className="py-2 m-0 fw-bold">
                      Options :-
                    </FormLabel>
                    {question.options.map((option, optionIndex) => (
                      <>
                        <div
                          key={optionIndex}
                          className="d-flex align-items-center"
                        >
                          <FormLabel className="d-flex align-items-center justify-content-between">
                            <Field
                              type={values.checkbox ? 'checkbox' : 'radio'}
                              id={`option-${index}-${optionIndex}`}
                              name={`questions[${index}].correctAns`}
                              value={option}
                            />

                            <h6 className="mx-2 mb-1 mb-0">{option}</h6>
                            <RiDeleteBin6Line
                              onClick={() => {
                                values.questions[index].options =
                                  values?.questions?.[index]?.options?.filter(
                                    (vlaue, index) => index !== optionIndex
                                  );
                              }}
                              className="cursor-pointer input-error  d-block  float-start"
                            />
                          </FormLabel>
                        </div>
                        <p className="text-danger">
                          <ErrorMessage
                            name={`questions[${index}].correctAns`}
                            className="text-danger"
                          />
                        </p>
                      </>
                    ))}
                    <p className="mt-2 mb-0 fw-bold">
                      NOTE : Please tick on correct option
                    </p>
                    {/* Single input field for options */}
                    <div className="mb-5">
                      <div className="d-flex align-items-center gap-2 pt-3">
                        <div className="w-50">
                          <input
                            type="text"
                            id={`option-${index}`}
                            name={`questions[${index}].options`}
                            placeholder="Enter options"
                            className="form-control hello w-100 input-border p-2 border focus-ring focus-ring-light hello"
                            ref={refArray.current[index]}
                            value={refArray.current[index]?.current?.value}
                            onChange={(e) => {
                              setOption(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && option.trim() !== '') {
                                question.options.push(option);
                                e.preventDefault();
                                setOption('');
                                refArray.current[index].current.value = '';
                              }
                            }}
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
                            refArray.current[index].current.value = '';
                          }}
                        />
                      </div>
                      <p className="text-danger">
                        <ErrorMessage
                          name={`questions[${index}].options`}
                          className="text-danger"
                        />
                      </p>
                    </div>
                  </div>
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
            </>
          )}
        </FieldArray>
      )}
    </div>
  );
};

const ManageCandidate = ({
  handleBlur,
  values,
  handleChange,
  excel,
  setExcel,
}) => {
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = userId.sub.split('|')[1];
  const { data: AllCourse } = useGetAllCoursesQuery({ userId });
  const orgType = localStorage.getItem('orgtype');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState();
  const [duration, setDuration] = useState();

  const handleErrorClose = () => setShowError(false);
  const handleErrorShow = () => setShowError(true);
  const inputFile = useRef(null);
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

  useEffect(() => {
    // Update the available years based on the selected course's duration
    if (values.examBranch) {
      const selectedCourse = AllCourse?.data.find(
        (course) => course.course_id == values.examBranch
      );
      if (selectedCourse) {
        const courseDuration = selectedCourse.duration;
        const years = Array.from(
          { length: courseDuration },
          (_, index) => index + 1
        );
        setDuration(years);
      }
    }
  }, [values.examBranch, AllCourse?.data]);

  return (
    <>
      <div
        className="p-4 bg-white rounded-3 text-dark "
        style={{ height: 'calc(100vh - 140px)' }}
      >
        {orgType == 'company' ? (
          ''
        ) : (
          <>
            <div className="row">
              <div className="col-12 col-md-6">
                <label className="text-capitalize fw-bold">
                  Select Candidate Course
                  <span className="fw-normal">
                    (note: only selected course student will get exam link)
                  </span>
                </label>
                <Field
                  as="select"
                  className="my-3 rounded-3 form-select border px-2"
                  aria-label="Default select example"
                  name="examBranch"
                  value={values.examBranch} // Make sure to set the value prop
                  onChange={handleChange}
                  disabled={
                    values.email.length > 0 || excel.length > 0 ? true : false
                  }
                >
                  <option value="">Select Course</option>
                  {AllCourse?.data.map((branch) => {
                    return (
                      <option key={branch.course_id} value={branch.course_id}>
                        {branch.course_name}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className="col-12 col-md-6">
                <label className="text-capitalize fw-bold">Select Year</label>
                <Field
                  as="select"
                  className="my-3 rounded-3 form-select border px-2"
                  aria-label="Default select example"
                  name="session"
                  value={values.session} // Make sure to set the value prop
                  onChange={handleChange}
                  disabled={
                    values.email.length > 0 || excel.length > 0 ? true : false
                  }
                >
                  <option value="">Select Year</option>
                  {duration?.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
            <p className="text-capitalize fw-bold m-0 p-0 text-center">OR</p>
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
                    values.examBranch || excel.length > 0 ? true : false
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
          <p className="text-danger">
            <ErrorMessage
              name="email"
              component={'div'}
              className=" input-error"
            />
          </p>
        </div>

        <p className="text-capitalize fw-bold m-0 p-0 text-center">OR</p>
        <div className=" my-3 d-flex justify-content-center align-items-center border border-dark-subtle my-1 my-md-2  w-auto text-center rounded-3 h-25 my-3 ">
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
              disabled={
                values.examBranch || values.email.length > 0 ? true : false
              }
              name="excelFile"
              ref={inputFile}
              accept=".xlsx, .xls, .xlsm, .xlsb, .csv,.xlam ,.xltx , .xltm"
              onChange={async (e) => {
                handleFileChange(e);
                handleChange(e);
                let arr = await ExcelDataReader(e.target.files[0]);
                if (arr instanceof String) {
                  setExcel(arr);
                  handleErrorShow();
                } else {
                  setExcel([...arr]);
                }
              }}
              onBlur={handleBlur}
              type="file"
            />
          </>
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
                <FaEye />
              </button>
            </div>
          ) : null}
        </div>

        <p className="text-danger"></p>
        <ErrorMessage
          component={'div'}
          className=" input-error  my-1  mx-5 "
          name="excelFile"
        />
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
      </div>
    </>
  );
};
