import React from 'react'
import SideNavBar from '../assets/SideNavBar'
import Header from '../assets/Header'

import {Button,Form,Row} from 'react-bootstrap'


const style = {backgroundColor: "#f6f6f6"}

export default function AddAssignment() {
    return (
        <>
            <SideNavBar />
            <Header />
            <div className='row w-100 rounded-5 m-0 p-0 justify-content-end p-lg-3'>

                <div className='offset-lg-1 col-lg-11 row m-0 h-auto mt-3 d-flex p-3' style={style}>

                    <div className=' col-md-6 bg-white'>
                        <div className='p-3 pe-lg-5'>
                            <p className='text-capitalize fw-bold fs-4 '>create assessment</p>
                            <p className=''>Creating assessments is a breeze! Simply provide the assessment name, and you can further customize it by configuring the paper pattern via video call or online test. Plus, you have the option to set blocking conditions, ensuring your assessment suits your specific needs.</p>
                        </div>
                        <Form >
                            <Row className="my-2 mx-3">
                                <Form.Group controlId="admin-organisation">
                                    <Form.Label className=' text-capitalize fw-bold'>Assessment Name </Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{borderColor: "#707070"}}
                                        className='p-1 border focus-ring focus-ring-light '
                                        placeholder="Enter Assessment Name"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="my-5 mx-3">
                                <Form.Group controlId="admin-organisation">
                                    <Form.Label className='text-capitalize fw-bold'>Assessment Pattern</Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{borderColor: "#707070"}}
                                        className='p-1 border focus-ring focus-ring-light '
                                        placeholder="Enter Assessment Pattern"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="my-5 mx-3 p-3 p-md-5 ">
                                <Button variant='dark'
                                    type='submit'
                                    className='m-auto d-block px-5 m-3 mt-lg-5 text-capitalize  rounded-4'
                                >
                                    Submit
                                </Button>
                            </Row>
                        </Form >
                    </div>

                </div>
            </div>
        </>
    )
}
