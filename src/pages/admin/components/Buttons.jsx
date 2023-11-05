import React from 'react'
import {Button,Row} from 'react-bootstrap'
import {changeDefaultButtonBehaviour} from './changeDefaultBehaviourButton'

export function CustomButton({onButtonClick,onButtonBlur,buttonText,className,rowClassName}) {
    return (
        <>
            <Row className={`my-5 my-md-2 mx-3 p-3 p-md-5 ${rowClassName} `}>
                <Button variant='dark'
                    type='submit'
                    onClick={(e) => {
                        changeDefaultButtonBehaviour(e);
                        onButtonClick(e);
                    }}
                    onBlur={onButtonBlur}
                    className={`m-auto d-block px-5 m-3 mt-lg-5  text-capitalize  rounded-4 ${className}`}
                >
                    {buttonText}
                </Button>
            </Row>
        </>
    )
}
