import React from 'react'
import SideNavBar from '../assets/SideNavBar'
import Header from '../assets/Header'
import {Button,Form,Row} from 'react-bootstrap'

const style = {backgroundColor: "#f6f6f6"}

export default function AddCourse() {
    return (
        <>
            <SideNavBar />
            <Header />
            <div className='row w-100 rounded-5 m-0 p-0 justify-content-end p-lg-3'>

                <div className='offset-lg-1 col-lg-11 row m-0 h-auto mt-3 d-flex p-3' style={style}>

                    <div className=' col-md-5 bg-white'>
                        <div className='p-3 pe-lg-5'>
                            <p className='text-capitalize fw-bold fs-4 '>Add course</p>
                            <p>Adding a course is easy! Just provide the course name and the Head of Department's (HOD) email, and you're good to go.</p>
                        </div>
                        <Form >
                            <Row className="my-2 mx-3">
                                <Form.Group controlId="admin-organisation">
                                    <Form.Label className=' text-capitalize fw-bold'>Course Name </Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{borderColor: "#707070"}}
                                        className='p-1 border focus-ring focus-ring-light '
                                        placeholder="Enter Course Name"
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="my-5 mx-3">
                                <Form.Group controlId="admin-organisation">
                                    <Form.Label className='text-capitalize fw-bold'><span className=' text-uppercase'> hod</span> email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{borderColor: "#707070"}}
                                        className='p-1 border focus-ring focus-ring-light '
                                        placeholder="Enter Hod email"
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
