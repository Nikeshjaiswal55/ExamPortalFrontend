import React from 'react';
import { Form, Row } from 'react-bootstrap';
import './InputField.css';
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
  rowClassName,
  labelClassName,
  invalidText,
  invalidCondition,
}) {
  return (
    <>
      <Row className={`my-5 mx-3 ${rowClassName} `}>
        <Form.Group controlId={`${formGroupId}`}>
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
          {invalidCondition ? (
            <p className=" text-capitalize text-danger px-2">{invalidText}</p>
          ) : null}
        </Form.Group>
      </Row>
    </>
  );
}
