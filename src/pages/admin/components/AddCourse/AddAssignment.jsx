import React from 'react'
import SideNavBar from '../assets/SideNavBar'
import Header from '../assets/Header'

import {Button,Form,Row} from 'react-bootstrap'
import {changeDefaultButtonBehaviour} from '../assets/changeDefaultBehaviourButton'
import {InputField} from '../assets/InputField'
import {useNavigate} from 'react-router-dom'


const style = {backgroundColor: "#f6f6f6"}

export default function AddAssignment() {
    const navigate = useNavigate();
    return (
        <>
            <SideNavBar />
            <Header />
            <div className='container-body row w-100 rounded-5 m-0 p-0 justify-content-end ps-lg-5'>

                <div className='col-12 row m-0   d-flex p-2 ps-lg-5 ' style={style}>

                    <div className=' col-md-6 bg-white'>
                        <div className='p-3 pe-lg-5'>
                            <p className='text-capitalize fw-bold fs-4 '>create assessment</p>
                            <p className=''>Creating assessments is a breeze! Simply provide the assessment name, and you can further customize it by configuring the paper pattern via video call or online test. Plus, you have the option to set blocking conditions, ensuring your assessment suits your specific needs.</p>
                        </div>
                        <Form >
                            <InputField
                                inputId={'assesement-name'}
                                inputName={"assessement-name"}
                                formGroupId={'assesement-group-name'}
                                placeholder={'enter assessement name'}
                                labelText={"assessement name"}

                            />

                            <InputField
                                inputId={'assesement-pattern'}
                                inputName={"assessement-pattern"}
                                formGroupId={'assesement-group-pattern'}
                                placeholder={'enter assessement  pattern'}
                                labelText={"assessement  pattern"}

                            />
                            <Row className="my-5 mx-3 p-3 d-flex justify-content-center p-md-5 ">
                                <Button variant='dark'
                                    type='submit'
                                    onClick={(e) => {changeDefaultButtonBehaviour(e); navigate('/admin-dashboard')}}
                                    className='m-auto d-block px-5  w-50 mx-5   text-capitalize  rounded-4'
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
