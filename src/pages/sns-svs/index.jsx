

import React, { useEffect, useState } from 'react';
import './sns.css'
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from '../../assets/ssism-logo.png'
import bgCollege from '../../../src/assets/college-image.jpg'
import { toast } from 'react-toastify';
import { useSendOtpMutation, useStudentRegistrationMutation } from '../../apis/Service';
import { useNavigate } from 'react-router-dom';
import { setEncryptData } from '../../utils/getDecryptedResponse';


const LeadGenerationPage = () => {
    const navigate = useNavigate()
    const [postStudent, { isError, isSuccess, isLoading }] = useStudentRegistrationMutation()
    const [sendOtp] = useSendOtpMutation()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        fatherName: Yup.string().required('Father Name is required'),
        village: Yup.string().required('Village is required'),
        district: Yup.string().required('District is required'),
        tehsil: Yup.string().required('Tehsil is required'),
        mobileNumber: Yup.string()
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
            .required('Mobile number is required'),
        school: Yup.string().required('Class 12 School is required'),
        stream: Yup.string().required('Class 12 Stream is required'),
    });

    const handleSubmit = (values) => {
        const payload = {
            name: values.name,
            fatherName: values.fatherName,
            mobileNumber: values.mobileNumber,
            school12: values.school,
            subject12: values.stream,
            village: values.village
        }
        try {
            postStudent(payload).then((res) => {
                console.log(res);
                if (res?.data) {
                    sendOtp(res?.data.mobileNumber).then((res)=>{
                        setEncryptData(res?.data.mobileNumber, 'm-num')
                        sessionStorage.setItem("otp", true)
                        navigate('/otp')
                    })
                   
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Otp send successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error('Something went wrong!!😑', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
    }, [isError]);

    useEffect(() => {
        if (sessionStorage.getItem("otp")) {
            navigate("/otp")
        }
    }, []);
    // State for toggling language
    const [isHindi, setIsHindi] = useState(false);

    // const toggleLanguage = (language) => {
    //     setIsHindi(language === "hi");
    // };



    const toggleLanguage = () => {
        setIsHindi((prev) => !prev);
    };



    const streamOptions = [
        { value: "Maths", label: "Maths (गणित)" },
        { value: "Biology", label: "Biology (जीव विज्ञान)" },
        { value: "Commerce", label: "Commerce (वाणिज्य)" },
        { value: "Agriculture", label: "Agriculture (कृषि)" },
        { value: "Arts", label: "Arts (कला)" },
    ];


    return (
        <div className='image-bg' style={{ height: '100vh' }}>
            <div className='container' >
                <div className='mt-2 mb-3 m-0 p-0'>
                    <img src={logo} alt='logo' className='img-fluid image-svs' />
                </div>
                < h3 className='fw-bold text-center mt-3 my-2'>Welcome Folks to SNS-SVS Exam Portal </h3>
                < h6 className='fw-bold text-center mb-5' style={{ color: '#f75b05' }}>Empower rural youth for a brighter future</h6>


                <div>
                    {/* <Form.Group className="mb-3 d-flex">
                        <Form.Label className="fw-bold">Language</Form.Label>
                        <Form.Control
                            as="select"
                            className="form-control"
                            style={{width:'6rem'}}
                            value={isHindi ? "hi" : "en"}
                            onChange={(e) => toggleLanguage(e.target.value)}
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी</option>
                        </Form.Control>
                    </Form.Group> */}
                    <div className='d-flex justify-content-end'><Button
                        className="mb-3 fw-bold"
                        style={{ background: "#007bff" }}
                        onClick={toggleLanguage}
                    >
                        {isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
                    </Button>


                    </div>


                    <Formik
                        initialValues={{
                            name: '',
                            fatherName: '',
                            village: '',
                            mobileNumber: '',
                            school: '',
                            stream: '',
                            district: '',
                            tehsil: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ handleSubmit, handleChange, handleBlur, values }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3 gap-2 gap-lg-0">
                                    <Col xs={12} md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">
                                                {isHindi ? 'नाम' : 'Name'}
                                            </Form.Label>
                                            <Field
                                                as={Form.Control}
                                                name="name"
                                                placeholder={isHindi ? 'अपना नाम दर्ज करें' : 'Enter your name'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="shadow-sm"
                                                value={values.name}
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">
                                                {isHindi ? 'पिता का नाम' : "Father's Name"}
                                            </Form.Label>
                                            <Field
                                                as={Form.Control}
                                                name="fatherName"
                                                placeholder={isHindi ? 'पिता का नाम दर्ज करें' : "Enter father's name"}
                                                onChange={handleChange}
                                                className="shadow-sm"
                                                onBlur={handleBlur}
                                                value={values.fatherName}
                                            />
                                            <ErrorMessage
                                                name="fatherName"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3 gap-2 gap-lg-0">
                                    <Col xs={12} md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">
                                                {isHindi ? 'जिला' : 'District'}
                                            </Form.Label>
                                            <Field
                                                as={Form.Control}
                                                name="district"
                                                placeholder={isHindi ? 'अपना जिला दर्ज करें' : 'Enter your district'}
                                                onChange={handleChange}
                                                className="shadow-sm"
                                                onBlur={handleBlur}
                                                value={values.district}
                                            />
                                            <ErrorMessage
                                                name="district"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">
                                                {isHindi ? 'तहसील' : 'Tehsil'}
                                            </Form.Label>
                                            <Field
                                                as={Form.Control}
                                                name="tehsil"
                                                placeholder={isHindi ? 'अपनी तहसील दर्ज करें' : 'Enter your tehsil'}
                                                onChange={handleChange}
                                                className="shadow-sm"
                                                onBlur={handleBlur}
                                                value={values.tehsil}
                                            />
                                            <ErrorMessage
                                                name="tehsil"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3 gap-2 gap-lg-0">
                                    <Col xs={12} md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">
                                                {isHindi ? 'पता' : 'Local Address'}
                                            </Form.Label>
                                            <Field
                                                as={Form.Control}
                                                name="village"
                                                placeholder={isHindi ? 'अपना गांव दर्ज करें' : 'Enter your village'}
                                                onChange={handleChange}
                                                className="shadow-sm"
                                                onBlur={handleBlur}
                                                value={values.village}
                                            />
                                            <ErrorMessage
                                                name="village"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">
                                                {isHindi ? 'मोबाइल नंबर' : 'Mobile Number'}
                                            </Form.Label>
                                            <Field
                                                as={Form.Control}
                                                name="mobileNumber"
                                                placeholder={isHindi ? 'अपना मोबाइल नंबर दर्ज करें' : 'Enter your mobile number'}
                                                onChange={handleChange}
                                                className="shadow-sm"
                                                onBlur={handleBlur}
                                                value={values.mobileNumber}
                                            />
                                            <ErrorMessage
                                                name="mobileNumber"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3 gap-2 gap-lg-0">
                                    <Col xs={12} md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">
                                                {isHindi ? 'कक्षा 12 विद्यालय' : 'Class 12 School'}
                                            </Form.Label>
                                            <Field
                                                as={Form.Control}
                                                name="school"
                                                placeholder={isHindi ? 'अपना विद्यालय का नाम दर्ज करें' : 'Enter your school name'}
                                                onChange={handleChange}
                                                className="shadow-sm"
                                                onBlur={handleBlur}
                                                value={values.school}
                                            />
                                            <ErrorMessage
                                                name="school"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">Class 12 Stream</Form.Label>
                                            <Field
                                                as="select"
                                                name="stream"
                                                className="form-control shadow-sm"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.stream}
                                            >
                                                <option value="">Select your stream</option>
                                                {streamOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                name="stream"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-center mt-5 mb-4">
                                    <Button
                                        type="submit"
                                        className="w-25 fw-bold"
                                        style={{ background: "#f75b05" }}
                                    >
                                        {isLoading ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : (
                                            isHindi ? 'आगे बढ़ें' : 'Next'
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                {/* <div className='d-flex justify-content-center'>
            < h6 className='position-fixed bottom-0 fw-bold ' style={{color:'#f75b05'}}>Empower rural youth for a brighter future</h6>
            </div> */}
            </div>
        </div>
    );
};

export default LeadGenerationPage;
