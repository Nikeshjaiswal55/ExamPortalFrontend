import React from 'react'
import '../components/style.css'
import {Button,Row} from 'react-bootstrap'
export function CreateComponent({Img,onButtonClick,buttonText}) {
    return (
        <>
            <div className='row w-auto rounded-5 m-0  ms-lg-5 p-0 justify-content-end p-lg-3 ps-lg-5'>
                <div className='col-12 container-body position-relative   row m-0 h-auto  d-flex p-3 ps-lg-5 ' >
                    <div className='container-center position-absolute top-50 start-50  '>
                        <img src={Img} className='img-fluid' alt="" /><br />
                        <Row className=" my-0 mx-5 mt-3  ">
                            <Button variant='dark'
                                type='submit'
                                onClick={onButtonClick}
                                className='m-auto d-block px-lg-5   text-capitalize  rounded-4'
                            >
                                {buttonText}
                            </Button>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}
