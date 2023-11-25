import React, { useState, useRef } from 'react';

import { Button, FormCheck, Form, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../../theme/InputField/InputField';
import { ImCross } from 'react-icons/im';
import { RiAddFill } from 'react-icons/ri';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import { IoClose } from 'react-icons/io5';
import { MdUpload } from 'react-icons/md';
import * as yup from 'yup';
import { usePostAssignmentMutation,useGetOrgernizationQuery } from '../../../apis/Service';

export default function AddAssignment() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = userId.sub.split('|')[1];

  const [showAssignment, setShowAssignment] = useState(false);
  const [option, setOption] = useState('');
  const [email, setEmail] = useState();
  const [duration, setDuration] = useState('');
  const [AssigmnetData] = usePostAssignmentMutation();
  const {data,isSuccess} = useGetOrgernizationQuery({ accessToken, id: userId });
  if(isSuccess){console.log(data)}

  const addAssignmentSchema = yup.object().shape({
    assessementName: yup.string().required('Please enter assessement name'),
    assessementPattern: yup.string().required('Please enter assessement name'),
    examDuration: yup.string().required('Please enter assessement duration'),
    examBranch: yup.string().required('Please enter branch name'),
    examSession: yup.string().required('Please enter session name'),
    email: yup.array().required('Please enter assessement emails'),
    questions: yup.array().required('Please enter assessement name'),
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
    // {
    //   inputId: 'exam-rounds',
    //   inputName: 'examRound',
    //   formGroupId: 'exam-group-rounds',
    //   placeholder: 'number of assessement rounds',
    //   labelText: 'enter no. of assessement rounds',
    //   colClassName: 'col-md-6 my-3',
    // },
    {
      inputId: 'exam-branch',
      inputName: 'examBranch',
      formGroupId: 'exam-group-branch',
      placeholder: 'enter branch name',
      labelText: 'enter assessement branch',
      colClassName: 'col-md-6 my-3',
    },
    {
      inputId: 'exam-session',
      inputName: 'examSession',
      formGroupId: 'exam-group-session',
      placeholder: 'select of assessement session',
      labelText: 'enter assessement session',
      colClassName: 'col-md-6  my-3',
    },
  ];

  const handleSubmits = (e, handleSubmit) => {
    e.preventDefault();
    // e.stopPropagation();
    handleSubmit();
  };

  return (
    <>
      <div className=" row w-100 rounded-5 m-0 p-0 justify-content-end">
        <Formik
          initialValues={{
            assessementName: '',
            assessementPattern: '',
            examDuration: '',
            examRound: 1,
            examBranch: '',
            examSession: '',
            email: [],
            questions: [
              { questions: '', options: [], correctAns: '', userAns: '' },
            ],
          }}
          onSubmit={async (values) => {
            values.examDuration = duration + '';
            const examDetails = {
              examDuration: values.examDuration,
              examMode: 'Online',
              examRounds: 2,
              paperChecked: false,
              branch: values.examBranch,
              session: values.examSession,
              assessmentName: values.assessementName,
            };
            console.log({
              examDetails,
              email: values.email,
              questions: values.questions,
              userId,
              token: accessToken,
            });
            await AssigmnetData({
              examDetails,
              emails: values.email,
              questions: values.questions,
              userId,
              accessToken,
              orgnizationId: '038bd702-6874-4545-b803-107986fbbc0e',
              token: accessToken,
            });
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
                <div className="col-md-6" style={{ height: '90vh' }}>
                  <div className="pt-3 pe-lg-5 mt-lg-2">
                    <p className="text-capitalize fw-bold fs-4 ">
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
                  <div className="row">
                    {InputFieldData.map((inputData) => (
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
                    ))}
                  </div>

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
                  </div>
                  <p className="text-capitalize fw-bold m-0 p-0 text-center">
                    OR
                  </p>
                  <div className="my-3 py-1 d-flex justify-content-center align-items-center border border-dark  ps-3 pe-2 text-center rounded-5 cursor-pointer  ">
                    <MdUpload size={30} className="cursor-pointer p-1" />
                    <div className="py-1 pe-3 flex-1">
                      Upload student email excel list
                    </div>
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
                                        className="form-control w-100"
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
                            Submit
                          </Button>
                        </>
                      )}
                    </div>
                    {/* <p className="mx-4 fw-bold">
                      NOTE : Please tick on correct option
                    </p> */}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
