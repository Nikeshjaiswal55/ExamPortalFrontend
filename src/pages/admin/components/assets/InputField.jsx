import React from 'react'
import {Form,Row} from 'react-bootstrap'
import './InputField.css'
export function InputField({inputStyle,inputName,inputId,inputClassName,placeholder,labelText,formGroupId}) {
    return (
        <>
            <Row className="my-5 mx-3">
                <Form.Group controlId={`${formGroupId}`}>
                    <Form.Label className='text-capitalize fw-bold'  >{labelText}</Form.Label>
                    <Form.Control
                        type='text'
                        id={`${inputId}`}
                        name={`${inputName}`}
                        className={`input-field p-1 border focus-ring text-capitalize focus-ring-light ${inputClassName}`}
                        placeholder={`${placeholder}`}
                    />
                </Form.Group>
            </Row>
        </>
    )
}
