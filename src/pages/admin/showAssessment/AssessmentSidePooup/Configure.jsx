import { ErrorMessage, Formik } from 'formik';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { InputField } from '../../../../theme/InputField/InputField';
import { CustomButton } from '../../../../theme/Button/Buttons';
import * as yup from 'yup';

export function Configure({ ConfigureProps }) {
  const getOrgdata = localStorage.getItem('orgData');
  const [duration, setDuration] = useState(ConfigureProps.examDuration);
  console.log(ConfigureProps);
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
      inputId: 'exam-duration',
      inputName: 'examDuration',
      formGroupId: 'exam-group-duration',
      placeholder: 'select assessement duration',
      labelText: 'assessement duration',
      colClassName: 'col-lg-6 my-3',
      onInputChange: (e) => handleDurationChange(e, handleChange),
      inputValue: duration,
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
      inputId: 'exam-session',
      inputName: 'examSession',
      formGroupId: 'exam-group-session',
      placeholder: 'select of assessement session',
      labelText: 'enter assessement session',
      colClassName: 'col-md-6  my-3',
      Orgtype: getOrgdata?.orgnizationType,
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
      placeholder: 'select of assessement session',
      labelText: 'enter minimum marks',
      colClassName: 'col-md-6  my-3',
    },
  ];

  const configureSchema = yup.object().shape({
    examDuration: yup.string().required('Please enter assessement duration'),
    examBranch: yup.string().required('Please enter branch name'),
    examSession: yup.string().required('Please enter session name'),
  });
  const branchOptions = [
    'bca',
    'bba',
    'bcom',
    'btech',
    'mca',
    'mba',
    'mcom',
    'mtech',
  ];

  const intitvalues = {
    examDuration: ConfigureProps.examDuration,
    examBranch: ConfigureProps.examBranch,
    examSession: ConfigureProps.session,
    totalMarks: ConfigureProps.totalMarks,
    minimumMarks: ConfigureProps.minimum_marks,
  };
  return (
    <Formik
      initialValues={intitvalues}
      validationSchema={configureSchema}
      onSubmit={async (values) => {
        console.log('values :- ', values);
      }}
    >
      {({ values, handleSubmit, handleBlur, handleChange }) => (
        <div className=" w-100 ">
          <Form onSubmit={(e) => {}}>
            <div className="row d-flex align-items-center">
              {InputFieldData.map((inputData, index) =>
                inputData.Orgtype == 'company' ? (
                  ''
                ) : (
                  <Form.Group className="col-md-6 my-3">
                    <Form.Label className="text-capitalize fw-bold">
                      {inputData.labelText}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name={inputData.inputName}
                      onChange={
                        inputData.onInputChange
                          ? (e) => handleDurationChange(e, handleChange)
                          : handleChange
                      }
                      value={inputData.inputValue}
                      onBlur={handleBlur}
                      className="input-border p-2 border focus-ring text-capitalize focus-ring-light"
                      placeholder={inputData.placeholder}
                    />
                    <ErrorMessage
                      component={'div'}
                      name={inputData.inputName}
                      className=" input-error"
                    />
                  </Form.Group>
                )
              )}
              {ConfigureProps.branch == '' ? (
                ''
              ) : (
                <div className=" w-100">
                  <label className="text-capitalize fw-bold">
                    Select Candidate Course{' '}
                    <span className="fw-normal">
                      (note: only selected course student will get exam link)
                    </span>
                  </label>
                  <Form.Select
                    className="my-3 focus-ring focus-ring-light w-100 rounded-3 border"
                    aria-label="Default select example"
                    name="examBranch"
                    value={values.examBranch} // Make sure to set the value prop
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select Course</option>
                    {branchOptions.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </Form.Select>
                  <ErrorMessage
                    component={'div'}
                    name="examBranch"
                    className=" input-error"
                  />
                </div>
              )}
              <div
                className={
                  'px-5 my-4 d-flex justify-content-center align-items-center w-100'
                }
              >
                <CustomButton
                  buttonText={'Save'}
                  onButtonClick={handleSubmit}
                  className="w-50"
                />
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
