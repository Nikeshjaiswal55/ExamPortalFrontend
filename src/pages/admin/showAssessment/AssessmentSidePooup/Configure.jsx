import { ErrorMessage, Formik } from 'formik';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { InputField } from '../../../../theme/InputField/InputField';
import { CustomButton } from '../../../../theme/Button/Buttons';
import * as yup from 'yup';
export default function Configure() {
  const getOrgdata = localStorage.getItem('orgData');
  const InputFieldData = [
    {
      inputId: 'exam-duration',
      inputName: 'examDuration',
      formGroupId: 'exam-group-duration',
      placeholder: 'select assessement duration',
      labelText: 'assessement duration',
      colClassName: 'col-lg-6 my-3',
      onInputChange: (e) => handleDurationChange(e, handleChange),
      //   inputValue: duration,
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
      labelText: 'enter assessement session',
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
  const configureSchema = yup.object().shape({
    assessementName: yup.string().required('Please enter assessement name'),
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
  return (
    <div className="col-md-12 col-lg-8 offset-lg-2 ">
      <Formik
        initialValues={{
          assessementName: '',
          examDuration: duration,
          examBranch: '',
          examSession: '',
        }}
        validationSchema={configureSchema}
        onSubmit={async (values) => {
          console.log('values :- ', values);
        }}
      >
        {({ values, handleSubmit, handleBlur, handleChange }) => (
          <div className=" w-100 ">
            {' '}
            <Form onSubmit={(e) => {}}>
              <div className="row d-flex justify-content-around  align-items-center">
                {InputFieldData.map((inputData, index) =>
                  inputData.Orgtype == 'company' ? (
                    ''
                  ) : (
                    <InputField
                      key={index}
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
                <CustomButton
                  className={'px-5 my-3  w-auto'}
                  buttonText={'Save'}
                  onButtonClick={handleSubmit}
                />
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
