import React from 'react'
import SideNavBar from '../assets/SideNavBar'
import Header from '../assets/Header'
import {Button,Form,Row} from 'react-bootstrap'
import learning from '../image/Learning-cuate.svg'

import {changeDefaultButtonBehaviour} from '../assets/changeDefaultBehaviourButton'
import {useNavigate} from 'react-router-dom'

const style = {backgroundColor: "#f6f6f6"}

export default function AddCourse() {
    const navigate = useNavigate();

    return (
        <>
            <SideNavBar />
            <Header />

            <div className='container-body row w-100 rounded-5 m-0 p-0 justify-content-end ms-lg-5 w-auto  bg-white '>

                <div className='col-12 row m-0 d-flex  p-2  ms-lg-5 ps-lg-5 w-auto' style={style}>

                    <div className=' col-md-6 bg-white'>
                        <div className='p-3 pe-lg-5 ms-lg-5 mt-lg-2'>
                            <p className='text-capitalize fw-bold fs-4 '>Add course</p>
                            <p>Adding a course is easy! Just provide the course name and the Head of Department's (HOD) email, and you're good to go.</p>
                        </div>
                        <Form className='mx-lg-5' >
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
                            <Row className="my-5 mx-3 p-3 p-md-5  m-md-5">
                                <Button variant='dark'
                                    type='submit'
                                    onClick={(e) => {changeDefaultButtonBehaviour(e); navigate('/create-assessment')}}
                                    className='m-auto d-block px-5 m-3 mt-lg-5 text-capitalize  rounded-4 m-md-3 '
                                >
                                    Submit
                                </Button>
                            </Row>
                        </Form >
                    </div>

                    <div className='col-md-6  d-flex align-items-center  justify-content-center p-3 bg-white '>
                        <img src={learning} alt="" className='img-fluid w-75' />
                    </div>
                </div>
            </div>
        </>
    )
}
