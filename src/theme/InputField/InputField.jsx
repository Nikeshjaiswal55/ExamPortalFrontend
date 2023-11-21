import React from 'react';
import { Form, Row } from 'react-bootstrap';
import './InputField.css';
import {ErrorMessage} from 'formik';
export function InputField({
  inputStyle,
  inputName,
  inputId,
  onInputChange,
  inputValue,
  onInputBlur,
  inputClassName,
  placeholder,
  labelText,
  formGroupId,
  formGroupClassName,
  labelClassName,
  invalidText,
  invalidCondition,

}) {
  return (
    <>
      {/* <Row className={`my-1 my-md-4 mx-3 ${rowClassName} `}> */}
      <Form.Group className={` ${formGroupClassName} `}  >
          <Form.Label className={`text-capitalize fw-bold ${labelClassName}`}>
            {labelText}
          </Form.Label>
          <Form.Control
            type="text"
            id={`${inputId}`}
            name={`${inputName}`}
            onChange={onInputChange}
            value={inputValue}
            onBlur={onInputBlur}
            className={`input-border p-2 border focus-ring text-capitalize focus-ring-light ${inputClassName}`}
            placeholder={`${placeholder}`}
          />
          <ErrorMessage component={"div"} name={inputName} className=' input-error' />
          {/* {invalidCondition ? (
            <p className=" text-capitalize text-danger px-2">{invalidText}</p>
          ) : null} */}
        </Form.Group>
      {/* </Row> */}
    </>
  );
}
