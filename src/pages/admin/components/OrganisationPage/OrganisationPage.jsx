import React,{useEffect,useState} from 'react'
import backgroundimg from '../image/org-img.svg'
import {Button} from 'react-bootstrap';
import {Form,Row} from 'react-bootstrap';
import './OrganisationPage.css'
import {useNavigate} from 'react-router-dom';
import '../assets/style.css'
import {useFormik} from 'formik';
import {orgPageSchema} from './yup-schema/OrgPageSchema';

// import {getAccessToken} from '../../../../auth/Private';
// import {useAuth0} from '@auth0/auth0-react';
const initialValues = {"org-name": "","org-type": ""};
export default function OrganisationPage() {
    let navigate = useNavigate();

    const {values,errors,touched,handleBlur,handleChange,handleSubmit} =
        useFormik({
            initialValues: initialValues,
            validationSchema: orgPageSchema,
            onSubmit: (values) => {
                console.log(values);
                console.log("Organisation Name :- " + values['org-name'] + "   " + "Organisation Type :-  " + values['org-type']);

                navigate("/create-course");
            }
        });

    // const {user,loginWithRedirect,isAuthenticated,getAccessTokenSilently} =
    //     useAuth0();

    // useEffect(() => {
    //     if(isAuthenticated) {
    //         getAccessToken(getAccessTokenSilently);

    //     }

    // },[isAuthenticated,getAccessTokenSilently]);

    return (
        <>

            <div className='row m-0 p-0 w-100  bg-white ' style={{height: "90vh"}}>


                <img src={backgroundimg} id='org-img-top' className='org-img w-25 img-fluid position-absolute top-0  start-0' alt="" />
                <img src={backgroundimg} id='org-img-bottom' className='org-img w-25 img-fluid position-absolute   bottom-0 end-0 ' alt="" />

                <div id='org-box' className='m-0 p-3 rounded-3 position-absolute top-50  start-50 translate-middle  '>

                    <Form onSubmit={handleSubmit} >
                        <Row className="my-3 mx-3">
                            <Form.Group controlId="admin-organisation">
                                <Form.Label className=' fw-bold'>Organisation Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='org-name'
                                    style={{borderColor: "#707070"}}
                                    className='input-border p-2 border focus-ring focus-ring-light  '
                                    onChange={handleChange}
                                    value={values['org-name']}
                                    onBlur={handleBlur}
                                    placeholder="Organisation Name"
                                />
                                {errors['org-name'] && touched['org-name'] ? <p className=" text-capitalize text-danger px-2">please provide a name</p> : null}
                            </Form.Group>
                        </Row>
                        <Row className="my-3 mx-3">
                            <Form.Group controlId="admin-organisation">
                                <Form.Label className=' fw-bold'>Organisation Type :</Form.Label>
                                <Form.Select aria-label="Select Type "
                                    onChange={handleChange}
                                    value={values['org-type']}
                                    onBlur={handleBlur}
                                    style={{borderColor: "#707070"}}
                                    name='org-type'
                                    className=' input-border p-2 border focus-ring focus-ring-light'>
                                    <option value=''>Select Type</option>
                                    <option value="company">Company</option>
                                    <option value="college">College</option>
                                </Form.Select>
                                {errors['org-type'] && touched['org-type'] ? <p className=" text-capitalize text-danger px-2">please select option</p> : null}
                            </Form.Group>
                        </Row>
                        <Row className="my-5 mx-3 p-3">
                            <Button variant='dark'
                                type='submit'
                                className='btn m-auto d-block px-5 mb-3 rounded-5 '
                            >
                                Get Started
                            </Button>
                        </Row>
                    </Form >
                </div>
            </div>

        </>
    )
}
